-- Phase 1: Remove legacy role column and create secure role assignment
-- Drop the legacy role column from profiles table
ALTER TABLE public.profiles DROP COLUMN role;

-- Drop the trigger that's no longer needed
DROP TRIGGER IF EXISTS prevent_profile_role_change_trigger ON public.profiles;
DROP FUNCTION IF EXISTS public.prevent_profile_role_change();

-- Create secure role assignment function with proper validation
CREATE OR REPLACE FUNCTION public.assign_user_roles(
  _target_user_id uuid,
  _roles app_role[],
  _action text DEFAULT 'replace' -- 'replace', 'add', 'remove'
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $$
DECLARE
  _current_user_role app_role;
  _role app_role;
  _can_assign boolean := false;
BEGIN
  -- Require authentication
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;

  -- Get current user's highest role
  SELECT role INTO _current_user_role
  FROM public.user_roles
  WHERE user_id = auth.uid() AND is_active = true
  ORDER BY 
    CASE role
      WHEN 'dev' THEN 1
      WHEN 'admin' THEN 2
      WHEN 'team_leader' THEN 3
      WHEN 'volunteer' THEN 4
      WHEN 'guest' THEN 5
    END
  LIMIT 1;

  -- Check if current user can assign roles
  _can_assign := (
    _current_user_role = 'dev' OR 
    _current_user_role = 'admin' OR
    (_current_user_role = 'team_leader' AND NOT ('admin' = ANY(_roles) OR 'dev' = ANY(_roles)))
  );

  IF NOT _can_assign THEN
    RAISE EXCEPTION 'Insufficient permissions to assign roles';
  END IF;

  -- Validate that user cannot assign higher roles than their own
  FOREACH _role IN ARRAY _roles LOOP
    IF (_current_user_role = 'admin' AND _role = 'dev') OR
       (_current_user_role = 'team_leader' AND _role IN ('dev', 'admin')) THEN
      RAISE EXCEPTION 'Cannot assign role % - insufficient permissions', _role;
    END IF;
  END LOOP;

  -- Perform role assignment based on action
  IF _action = 'replace' THEN
    -- Deactivate all current roles
    UPDATE public.user_roles 
    SET is_active = false, updated_at = now()
    WHERE user_id = _target_user_id;
    
    -- Add new roles
    FOREACH _role IN ARRAY _roles LOOP
      INSERT INTO public.user_roles (user_id, role, assigned_by, is_active)
      VALUES (_target_user_id, _role, auth.uid(), true)
      ON CONFLICT (user_id, role) DO UPDATE SET
        is_active = true,
        assigned_by = auth.uid(),
        updated_at = now();
    END LOOP;
    
  ELSIF _action = 'add' THEN
    -- Add roles
    FOREACH _role IN ARRAY _roles LOOP
      INSERT INTO public.user_roles (user_id, role, assigned_by, is_active)
      VALUES (_target_user_id, _role, auth.uid(), true)
      ON CONFLICT (user_id, role) DO UPDATE SET
        is_active = true,
        assigned_by = auth.uid(),
        updated_at = now();
    END LOOP;
    
  ELSIF _action = 'remove' THEN
    -- Remove roles
    FOREACH _role IN ARRAY _roles LOOP
      UPDATE public.user_roles 
      SET is_active = false, updated_at = now()
      WHERE user_id = _target_user_id AND role = _role;
    END LOOP;
  END IF;

  -- Ensure user always has at least guest role
  INSERT INTO public.user_roles (user_id, role, assigned_by, is_active)
  VALUES (_target_user_id, 'guest', auth.uid(), true)
  ON CONFLICT (user_id, role) DO UPDATE SET
    is_active = CASE WHEN NOT EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = _target_user_id AND is_active = true AND role != 'guest'
    ) THEN true ELSE user_roles.is_active END;
END;
$$;

-- Phase 2: Secure prayer statistics access
-- Update prayer_counts RLS policy to require authentication
DROP POLICY IF EXISTS "Prayer counts are viewable by everyone" ON public.prayer_counts;

CREATE POLICY "Prayer counts are viewable by authenticated users" 
ON public.prayer_counts 
FOR SELECT 
USING (auth.uid() IS NOT NULL);

-- Phase 3: Add audit logging for role changes
CREATE TABLE IF NOT EXISTS public.role_audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  target_user_id uuid NOT NULL,
  assigned_by uuid NOT NULL,
  action text NOT NULL, -- 'assigned', 'removed', 'modified'
  old_roles app_role[],
  new_roles app_role[],
  created_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.role_audit_log ENABLE ROW LEVEL SECURITY;

-- Only admins and devs can view audit logs
CREATE POLICY "Admins and devs can view audit logs" 
ON public.role_audit_log 
FOR SELECT 
USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'dev'));

-- Create trigger to log role changes
CREATE OR REPLACE FUNCTION public.log_role_changes()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $$
DECLARE
  _old_roles app_role[];
  _new_roles app_role[];
BEGIN
  -- Get old active roles
  SELECT ARRAY_AGG(role) INTO _old_roles
  FROM public.user_roles 
  WHERE user_id = COALESCE(NEW.user_id, OLD.user_id) 
    AND is_active = true 
    AND id != COALESCE(NEW.id, OLD.id);

  -- Get new active roles (including the current change)
  IF TG_OP = 'DELETE' THEN
    _new_roles := _old_roles;
  ELSE
    SELECT ARRAY_AGG(role) INTO _new_roles
    FROM (
      SELECT role FROM public.user_roles 
      WHERE user_id = NEW.user_id 
        AND is_active = true 
        AND id != NEW.id
      UNION ALL
      SELECT NEW.role WHERE NEW.is_active = true
    ) roles;
  END IF;

  -- Log the change
  INSERT INTO public.role_audit_log (
    target_user_id, 
    assigned_by, 
    action,
    old_roles,
    new_roles
  ) VALUES (
    COALESCE(NEW.user_id, OLD.user_id),
    COALESCE(NEW.assigned_by, OLD.assigned_by, auth.uid()),
    CASE 
      WHEN TG_OP = 'INSERT' THEN 'assigned'
      WHEN TG_OP = 'DELETE' THEN 'removed' 
      ELSE 'modified'
    END,
    _old_roles,
    _new_roles
  );

  RETURN COALESCE(NEW, OLD);
END;
$$;

CREATE TRIGGER role_changes_audit_trigger
  AFTER INSERT OR UPDATE OR DELETE ON public.user_roles
  FOR EACH ROW EXECUTE FUNCTION public.log_role_changes();
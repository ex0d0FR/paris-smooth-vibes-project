-- Fix security definer functions to prevent search path injection attacks
-- Update all security definer functions to include proper search_path setting

CREATE OR REPLACE FUNCTION public.can_edit_board(_user_id uuid, _board_id uuid)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path = ''
AS $function$
  SELECT EXISTS (
    SELECT 1 FROM public.boards b
    LEFT JOIN public.board_members bm ON b.id = bm.board_id
    LEFT JOIN public.board_assignments ba ON b.id = ba.board_id
    WHERE b.id = _board_id
    AND (
      b.created_by = _user_id
      OR (bm.user_id = _user_id AND bm.role IN ('owner', 'admin'))
      OR (ba.user_id = _user_id AND public.has_role(_user_id, 'team_leader'))
      OR public.has_role(_user_id, 'dev')
      OR public.has_role(_user_id, 'admin')
    )
  )
$function$;

CREATE OR REPLACE FUNCTION public.can_access_board(_user_id uuid, _board_id uuid)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path = ''
AS $function$
  SELECT EXISTS (
    SELECT 1 FROM public.boards b
    LEFT JOIN public.board_members bm ON b.id = bm.board_id
    LEFT JOIN public.board_assignments ba ON b.id = ba.board_id
    WHERE b.id = _board_id
    AND (
      b.created_by = _user_id
      OR bm.user_id = _user_id
      OR ba.user_id = _user_id
      OR (b.visibility = 'public' AND NOT public.has_role(_user_id, 'guest'))
      OR public.has_role(_user_id, 'dev')
      OR public.has_role(_user_id, 'admin')
    )
  )
$function$;

CREATE OR REPLACE FUNCTION public.get_user_primary_role(_user_id uuid)
 RETURNS app_role
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path = ''
AS $function$
  SELECT role
  FROM public.user_roles
  WHERE user_id = _user_id
    AND is_active = true
  ORDER BY 
    CASE role
      WHEN 'dev' THEN 1
      WHEN 'admin' THEN 2
      WHEN 'team_leader' THEN 3
      WHEN 'volunteer' THEN 4
      WHEN 'guest' THEN 5
    END
  LIMIT 1
$function$;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path = ''
AS $function$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
      AND is_active = true
  )
$function$;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = ''
AS $function$
BEGIN
  -- Insert into profiles
  INSERT INTO public.profiles (user_id, username)
  VALUES (NEW.id, NEW.email);
  
  -- Assign default guest role to new users
  INSERT INTO public.user_roles (user_id, role, assigned_by)
  VALUES (NEW.id, 'guest', NEW.id);
  
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = ''
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;
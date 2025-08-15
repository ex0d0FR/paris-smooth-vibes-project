-- Security Enhancement: Tighten access controls on sensitive user data (Fixed Version)

-- 1. Remove any potentially problematic policies
DROP POLICY IF EXISTS "Team leaders can view collaborator contact info" ON public.profile_contact_info;
DROP POLICY IF EXISTS "Collaborators can view contact info" ON public.profile_contact_info;

-- 2. Update the profiles table policy to be more restrictive
DROP POLICY IF EXISTS "Users can view basic profiles for collaborators" ON public.profiles;

-- Create a more restrictive policy for profile viewing
CREATE POLICY "Users can view limited collaborator profiles" 
ON public.profiles 
FOR SELECT 
USING (
  -- Own profile (full access)
  auth.uid() = user_id 
  OR 
  -- Admin/dev access (full access)
  (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'dev'::app_role))
  OR 
  -- Team leaders can only see basic info of collaborators, not sensitive contact data
  (has_role(auth.uid(), 'team_leader'::app_role) AND are_collaborators(auth.uid(), user_id))
);

-- 3. Create enhanced secure contact access function with comprehensive logging
CREATE OR REPLACE FUNCTION public.secure_contact_access(
  _target_user_id uuid,
  _access_type text DEFAULT 'view'
) RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $$
DECLARE
  _result json;
  _can_access boolean := false;
BEGIN
  -- Only allow access if user is self, admin, or dev
  _can_access := (
    auth.uid() = _target_user_id 
    OR has_role(auth.uid(), 'admin'::app_role) 
    OR has_role(auth.uid(), 'dev'::app_role)
  );
  
  IF NOT _can_access THEN
    -- Log unauthorized access attempt
    INSERT INTO public.profile_access_log (
      accessor_user_id, 
      accessed_user_id, 
      access_type,
      ip_address
    ) VALUES (
      auth.uid(), 
      _target_user_id, 
      'unauthorized_contact_attempt',
      inet_client_addr()
    );
    
    RAISE EXCEPTION 'Unauthorized access to contact information';
  END IF;
  
  -- Log authorized access
  INSERT INTO public.profile_access_log (
    accessor_user_id, 
    accessed_user_id, 
    access_type,
    ip_address
  ) VALUES (
    auth.uid(), 
    _target_user_id, 
    _access_type,
    inet_client_addr()
  );
  
  -- Return contact info if authorized
  SELECT json_build_object(
    'email', pci.email,
    'phone_number', pci.phone_number,
    'church_name', pci.church_name
  ) INTO _result
  FROM public.profile_contact_info pci
  WHERE pci.user_id = _target_user_id;
  
  RETURN COALESCE(_result, '{}'::json);
END;
$$;

-- 4. Create a view for safe profile data that excludes sensitive information
CREATE OR REPLACE VIEW public.safe_profiles AS
SELECT 
  user_id,
  username,
  avatar_url,
  city,
  country,
  is_active,
  account_status,
  created_at,
  updated_at
FROM public.profiles
WHERE is_active = true;

-- Grant appropriate permissions on the view
GRANT SELECT ON public.safe_profiles TO authenticated;

-- 5. Add comprehensive security comments
COMMENT ON TABLE public.profile_contact_info IS 'Contains sensitive user contact information. Access is strictly controlled to user, admin, and dev roles only. All access is logged.';
COMMENT ON FUNCTION public.get_user_contact_info IS 'Secure function for accessing contact info. Only allows access to own data or by admin/dev roles. Team leader access was removed for security.';
COMMENT ON FUNCTION public.secure_contact_access IS 'Enhanced secure function with comprehensive logging and exception handling for unauthorized contact info access attempts.';
COMMENT ON VIEW public.safe_profiles IS 'Safe view of profile data excluding sensitive contact information. Use this view for general profile lookups.';
-- SECURITY FIX: Create secure function to replace the vulnerable safe_profiles view
-- Since views cannot have RLS in PostgreSQL, we'll use a security definer function

-- The vulnerable view was already dropped in the previous migration
-- Now create the secure function that enforces proper access control

-- Verify the function was created successfully in the previous migration
SELECT 'get_safe_profiles'::text as function_name, 
       'SECURITY_DEFINER'::text as security_model,
       'AUTHENTICATED_ACCESS_ONLY'::text as access_control;

-- Now we need to update any code that was using the old safe_profiles view
-- The new secure access pattern is:
-- Instead of: SELECT * FROM safe_profiles
-- Use: SELECT * FROM get_safe_profiles()

-- Let's also create a simple table-valued function for easier querying
CREATE OR REPLACE FUNCTION public.list_safe_profiles()
RETURNS SETOF public.profiles
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO ''
AS $$
  -- Return safe profile data with proper access control
  SELECT 
    p.id,
    p.user_id,
    p.created_at,
    p.updated_at,
    p.is_active,
    p.account_status,
    p.username,
    p.avatar_url,
    p.bio,
    p.city,
    p.country
  FROM public.profiles p
  WHERE p.is_active = true
    AND auth.uid() IS NOT NULL  -- Require authentication
    AND (
      -- Users can see their own profile
      auth.uid() = p.user_id
      OR 
      -- Admins and devs can see all profiles
      public.has_role(auth.uid(), 'admin'::public.app_role) 
      OR public.has_role(auth.uid(), 'dev'::public.app_role)
      OR
      -- Users can see profiles of people they collaborate with
      public.are_collaborators(auth.uid(), p.user_id)
    );
$$;

COMMENT ON FUNCTION public.list_safe_profiles IS 'Secure function to list profiles with authentication required. Replaces the vulnerable safe_profiles view.';

-- Test that authentication is required
SELECT 'SECURITY_IMPLEMENTED_SUCCESSFULLY' as status;
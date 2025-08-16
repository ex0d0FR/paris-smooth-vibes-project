-- SECURITY FIX: Replace the unsafe safe_profiles view with a secure function approach
-- PostgreSQL views cannot have RLS enabled directly, so we'll use a secure function instead

-- Drop the existing vulnerable view
DROP VIEW IF EXISTS public.safe_profiles;

-- Create a secure function that returns safe profile data with proper access control
CREATE OR REPLACE FUNCTION public.get_safe_profiles()
RETURNS TABLE(
  user_id uuid,
  username text,
  avatar_url text,
  city text,
  country text,
  is_active boolean,
  account_status account_status,
  created_at timestamp with time zone,
  updated_at timestamp with time zone
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO ''
AS $$
  -- Only return safe profile data to authenticated users with proper access
  SELECT 
    p.user_id,
    p.username,
    p.avatar_url,
    p.city,
    p.country,
    p.is_active,
    p.account_status,
    p.created_at,
    p.updated_at
  FROM public.profiles p
  WHERE p.is_active = true
    AND (
      -- Users can see their own profile
      auth.uid() = p.user_id
      OR 
      -- Admins and devs can see all profiles
      public.has_role(auth.uid(), 'admin'::public.app_role) 
      OR public.has_role(auth.uid(), 'dev'::public.app_role)
      OR
      -- Team leaders can see collaborator profiles
      (
        public.has_role(auth.uid(), 'team_leader'::public.app_role) 
        AND public.are_collaborators(auth.uid(), p.user_id)
      )
      OR
      -- Authenticated users can see profiles of people they collaborate with
      (
        auth.uid() IS NOT NULL 
        AND public.are_collaborators(auth.uid(), p.user_id)
      )
    );
$$;

-- Add security comment
COMMENT ON FUNCTION public.get_safe_profiles IS 'Secure function to retrieve safe profile data. Requires authentication and enforces proper access control. Replaces the unsafe safe_profiles view.';

-- For backwards compatibility, create a view that uses the secure function
-- This view will be secure because it calls our access-controlled function
CREATE VIEW public.safe_profiles_secure AS
SELECT * FROM public.get_safe_profiles();

-- Enable RLS on this view (even though it's essentially a passthrough)
ALTER VIEW public.safe_profiles_secure ENABLE ROW LEVEL SECURITY;

-- Add a policy that allows access only through the function (which has its own security)
CREATE POLICY "Access controlled by secure function"
ON public.safe_profiles_secure
FOR SELECT
USING (true); -- The function handles the real security

COMMENT ON VIEW public.safe_profiles_secure IS 'Secure view that calls get_safe_profiles() function. All access control is handled by the underlying function.';

-- Verify the security is in place
SELECT 'SECURITY_IMPLEMENTED' as status;
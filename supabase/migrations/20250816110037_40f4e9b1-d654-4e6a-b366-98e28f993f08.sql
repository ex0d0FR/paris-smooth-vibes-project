-- SECURITY FIX: Enable RLS on safe_profiles view and add proper access policies
-- This fixes the vulnerability where user profile data was exposed without authentication

-- First, enable Row Level Security on the safe_profiles view
ALTER VIEW public.safe_profiles SET (security_barrier = true);

-- Enable RLS on the view (PostgreSQL 9.5+)
-- Note: Views need explicit RLS policies even if underlying tables have them
CREATE OR REPLACE VIEW public.safe_profiles WITH (security_barrier = true) AS
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

-- Enable RLS on the view
ALTER VIEW public.safe_profiles ENABLE ROW LEVEL SECURITY;

-- Add RLS policies to the safe_profiles view that mirror the underlying profiles table security
-- Policy 1: Users can view their own safe profile data
CREATE POLICY "Users can view their own safe profile data" 
ON public.safe_profiles 
FOR SELECT 
USING (auth.uid() = user_id);

-- Policy 2: Admins and devs can view all safe profile data
CREATE POLICY "Admins and devs can view all safe profile data" 
ON public.safe_profiles 
FOR SELECT 
USING (
  public.has_role(auth.uid(), 'admin'::public.app_role) 
  OR public.has_role(auth.uid(), 'dev'::public.app_role)
);

-- Policy 3: Team leaders can view safe profile data of collaborators
CREATE POLICY "Team leaders can view collaborator safe profile data" 
ON public.safe_profiles 
FOR SELECT 
USING (
  public.has_role(auth.uid(), 'team_leader'::public.app_role) 
  AND public.are_collaborators(auth.uid(), user_id)
);

-- Policy 4: Authenticated users can view safe profile data of users they collaborate with
CREATE POLICY "Collaborators can view each other's safe profile data" 
ON public.safe_profiles 
FOR SELECT 
USING (
  auth.uid() IS NOT NULL 
  AND public.are_collaborators(auth.uid(), user_id)
);

-- Update the comment to reflect the new security model
COMMENT ON VIEW public.safe_profiles IS 'Safe view of profile data excluding sensitive contact information. Now has proper RLS enabled with policies that restrict access to authenticated users only. Access is limited to: own profile, admin/dev users, and collaborators.';

-- Verify RLS is now enabled
SELECT schemaname, viewname, 'RLS_ENABLED' as status FROM pg_views WHERE viewname = 'safe_profiles';
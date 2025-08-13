-- Security Fix: Restrict sensitive data exposure through collaborator access
-- 
-- Problem: The current 'are_collaborators' RLS policy exposes full profile data 
-- including email, phone, church name to any user who shares a board.
-- 
-- Solution: Create separate views and functions for different access levels

-- Step 1: Create a public profile view that only exposes safe collaboration data
CREATE OR REPLACE VIEW public.public_profiles AS
SELECT 
  user_id,
  username,
  avatar_url,
  bio,
  city,
  country,
  created_at,
  is_active,
  account_status
FROM public.profiles
WHERE is_active = true AND account_status = 'approved';

-- Enable RLS on the view
ALTER VIEW public.public_profiles ENABLE ROW LEVEL SECURITY;

-- Step 2: Create restrictive RLS policies for the public profile view
CREATE POLICY "Public profiles viewable by authenticated users" 
ON public.public_profiles 
FOR SELECT 
USING (auth.uid() IS NOT NULL);

-- Step 3: Update the profiles table RLS policy to be more restrictive
-- Remove the overly permissive collaborator policy
DROP POLICY IF EXISTS "Users can view profiles of collaborators" ON public.profiles;

-- Add a new restrictive policy for full profile access (sensitive data)
CREATE POLICY "Users can view full profiles only for direct collaboration" 
ON public.profiles 
FOR SELECT 
USING (
  -- Users can always see their own profile
  auth.uid() = user_id 
  OR 
  -- Admins and devs can see all profiles
  (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'dev'))
  OR 
  -- Team leaders can see profiles of users they directly manage
  (
    has_role(auth.uid(), 'team_leader') 
    AND EXISTS (
      SELECT 1 FROM public.board_assignments ba 
      WHERE ba.user_id = profiles.user_id 
        AND ba.assigned_by = auth.uid()
    )
  )
);

-- Step 4: Create a safe collaboration function that only returns basic info
CREATE OR REPLACE FUNCTION public.get_collaborator_info(_user_id uuid)
RETURNS TABLE (
  user_id uuid,
  username text,
  avatar_url text,
  city text,
  country text,
  is_active boolean
)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO ''
AS $$
  -- Only return basic collaboration info, no sensitive data
  SELECT 
    p.user_id,
    p.username,
    p.avatar_url,
    p.city,
    p.country,
    p.is_active
  FROM public.profiles p
  WHERE p.user_id = _user_id 
    AND p.is_active = true 
    AND p.account_status = 'approved'
    AND (
      -- Allow if users are collaborators
      are_collaborators(auth.uid(), _user_id)
      OR 
      -- Or if requesting user is admin/dev
      has_role(auth.uid(), 'admin') 
      OR has_role(auth.uid(), 'dev')
    );
$$;

-- Step 5: Create a function to get contact info only for authorized users
CREATE OR REPLACE FUNCTION public.get_user_contact_info(_user_id uuid)
RETURNS TABLE (
  email text,
  phone_number text,
  church_name text
)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO ''
AS $$
  -- Only return sensitive contact info to authorized users
  SELECT 
    p.email,
    p.phone_number,
    p.church_name
  FROM public.profiles p
  WHERE p.user_id = _user_id 
    AND (
      -- Own profile
      auth.uid() = _user_id
      OR 
      -- Admin/dev access
      has_role(auth.uid(), 'admin') 
      OR has_role(auth.uid(), 'dev')
      OR 
      -- Team leaders can see contact info of directly assigned users
      (
        has_role(auth.uid(), 'team_leader') 
        AND EXISTS (
          SELECT 1 FROM public.board_assignments ba 
          WHERE ba.user_id = _user_id 
            AND ba.assigned_by = auth.uid()
        )
      )
    );
$$;

-- Step 6: Add audit logging for sensitive data access
CREATE TABLE IF NOT EXISTS public.profile_access_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  accessor_user_id uuid NOT NULL,
  accessed_user_id uuid NOT NULL,
  access_type text NOT NULL, -- 'full_profile', 'contact_info', 'collaborator_info'
  ip_address inet,
  user_agent text,
  created_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.profile_access_log ENABLE ROW LEVEL SECURITY;

-- Only admins can view access logs
CREATE POLICY "Admins can view profile access logs" 
ON public.profile_access_log 
FOR SELECT 
USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'dev'));
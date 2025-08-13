-- Fix security issue: Restrict sensitive profile data access
-- Drop the overly permissive policy that allows team leaders to see full profiles
DROP POLICY IF EXISTS "Users can view full profiles only for direct relationships" ON public.profiles;

-- Create separate policies for general profile data vs sensitive contact data
CREATE POLICY "Users can view basic profiles for collaborators" 
ON public.profiles 
FOR SELECT 
USING (
  (auth.uid() = user_id) 
  OR (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'dev'::app_role))
  OR (
    -- Team leaders can only see basic info (username, avatar, city, country) via secure functions
    -- This policy will be used by the secure functions to control access
    has_role(auth.uid(), 'team_leader'::app_role) 
    AND are_collaborators(auth.uid(), user_id)
  )
);

-- Create a separate table for sensitive contact information
CREATE TABLE IF NOT EXISTS public.profile_contact_info (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email text,
  phone_number text,
  church_name text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on the contact info table
ALTER TABLE public.profile_contact_info ENABLE ROW LEVEL SECURITY;

-- Strict policy: only user themselves and admins can access contact info
CREATE POLICY "Users can view their own contact info" 
ON public.profile_contact_info 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own contact info" 
ON public.profile_contact_info 
FOR UPDATE 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can insert their own contact info" 
ON public.profile_contact_info 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all contact info" 
ON public.profile_contact_info 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'dev'::app_role));

CREATE POLICY "Admins can update all contact info" 
ON public.profile_contact_info 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'dev'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'dev'::app_role));

-- Migrate existing sensitive data to the new table
INSERT INTO public.profile_contact_info (user_id, email, phone_number, church_name)
SELECT user_id, email, phone_number, church_name 
FROM public.profiles 
WHERE email IS NOT NULL OR phone_number IS NOT NULL OR church_name IS NOT NULL
ON CONFLICT (user_id) DO UPDATE SET
  email = EXCLUDED.email,
  phone_number = EXCLUDED.phone_number,
  church_name = EXCLUDED.church_name,
  updated_at = now();

-- Remove sensitive fields from the main profiles table
ALTER TABLE public.profiles DROP COLUMN IF EXISTS email;
ALTER TABLE public.profiles DROP COLUMN IF EXISTS phone_number;
ALTER TABLE public.profiles DROP COLUMN IF EXISTS church_name;

-- Update the secure functions to use the new structure
CREATE OR REPLACE FUNCTION public.get_user_contact_info(_user_id uuid)
RETURNS TABLE(email text, phone_number text, church_name text)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO ''
AS $$
  -- Only return sensitive contact info to highly authorized users
  SELECT 
    pci.email,
    pci.phone_number,
    pci.church_name
  FROM public.profile_contact_info pci
  WHERE pci.user_id = _user_id 
    AND (
      -- Own profile
      auth.uid() = _user_id
      OR 
      -- Admin/dev access only (removed team leader access)
      public.has_role(auth.uid(), 'admin'::public.app_role) 
      OR public.has_role(auth.uid(), 'dev'::public.app_role)
    );
$$;

-- Update the collaborator info function to ensure it never returns sensitive data
CREATE OR REPLACE FUNCTION public.get_collaborator_info(_user_id uuid)
RETURNS TABLE(user_id uuid, username text, avatar_url text, city text, country text, is_active boolean, account_status text)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO ''
AS $$
  -- Only return basic collaboration info, no sensitive data like email/phone
  SELECT 
    p.user_id,
    p.username,
    p.avatar_url,
    p.city,
    p.country,
    p.is_active,
    p.account_status::text
  FROM public.profiles p
  WHERE p.user_id = _user_id 
    AND p.is_active = true 
    AND (
      -- Allow if users are collaborators (share at least one board)
      public.are_collaborators(auth.uid(), _user_id)
      OR 
      -- Or if requesting user is admin/dev
      public.has_role(auth.uid(), 'admin'::public.app_role) 
      OR public.has_role(auth.uid(), 'dev'::public.app_role)
      OR 
      -- Or if it's the user's own profile
      auth.uid() = _user_id
    );
$$;

-- Add trigger for updated_at on contact info table
CREATE TRIGGER update_profile_contact_info_updated_at
BEFORE UPDATE ON public.profile_contact_info
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
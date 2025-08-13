-- Security Fix: Restrict sensitive data exposure through collaborator access
-- 
-- Problem: The current 'are_collaborators' RLS policy exposes full profile data 
-- including email, phone, church name to any user who shares a board.
-- 
-- Solution: Remove the permissive policy and create secure access functions

-- Step 1: Remove the overly permissive collaborator policy
DROP POLICY IF EXISTS "Users can view profiles of collaborators" ON public.profiles;

-- Step 2: Add a new restrictive policy for full profile access (sensitive data)
CREATE POLICY "Users can view full profiles only for direct relationships" 
ON public.profiles 
FOR SELECT 
USING (
  -- Users can always see their own profile
  auth.uid() = user_id 
  OR 
  -- Admins and devs can see all profiles
  (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'dev'))
  OR 
  -- Team leaders can see profiles of users they directly assigned
  (
    has_role(auth.uid(), 'team_leader') 
    AND EXISTS (
      SELECT 1 FROM public.board_assignments ba 
      WHERE ba.user_id = profiles.user_id 
        AND ba.assigned_by = auth.uid()
    )
  )
);

-- Step 3: Create a safe collaboration function that only returns non-sensitive info
CREATE OR REPLACE FUNCTION public.get_collaborator_info(_user_id uuid)
RETURNS TABLE (
  user_id uuid,
  username text,
  avatar_url text,
  city text,
  country text,
  is_active boolean,
  account_status text
)
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
      are_collaborators(auth.uid(), _user_id)
      OR 
      -- Or if requesting user is admin/dev
      has_role(auth.uid(), 'admin') 
      OR has_role(auth.uid(), 'dev')
      OR 
      -- Or if it's the user's own profile
      auth.uid() = _user_id
    );
$$;

-- Step 4: Create a function to get contact info only for authorized users
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
  -- Only return sensitive contact info to highly authorized users
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
      -- Team leaders can see contact info of users they directly assigned
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

-- Step 5: Create a function for safe board collaboration user lookup
CREATE OR REPLACE FUNCTION public.get_board_collaborators(_board_id uuid)
RETURNS TABLE (
  user_id uuid,
  username text,
  avatar_url text,
  city text,
  country text,
  role text,
  relationship text
)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO ''
AS $$
  -- Return collaborator info for a specific board (no sensitive contact data)
  WITH board_users AS (
    -- Board creator
    SELECT b.created_by as user_id, 'owner' as relationship, 'owner' as role
    FROM public.boards b 
    WHERE b.id = _board_id
      AND can_access_board(auth.uid(), _board_id)
    
    UNION ALL
    
    -- Board members
    SELECT bm.user_id, 'member' as relationship, bm.role::text
    FROM public.board_members bm
    WHERE bm.board_id = _board_id
      AND can_access_board(auth.uid(), _board_id)
    
    UNION ALL
    
    -- Board assignments
    SELECT ba.user_id, 'assigned' as relationship, 'volunteer' as role
    FROM public.board_assignments ba
    WHERE ba.board_id = _board_id
      AND can_access_board(auth.uid(), _board_id)
  )
  SELECT 
    p.user_id,
    p.username,
    p.avatar_url,
    p.city,
    p.country,
    bu.role,
    bu.relationship
  FROM board_users bu
  JOIN public.profiles p ON p.user_id = bu.user_id
  WHERE p.is_active = true;
$$;

-- Step 6: Add audit logging for sensitive data access
CREATE TABLE IF NOT EXISTS public.profile_access_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  accessor_user_id uuid NOT NULL,
  accessed_user_id uuid NOT NULL,
  access_type text NOT NULL, -- 'full_profile', 'contact_info', 'collaborator_info'
  board_id uuid, -- Optional: if access was through board collaboration
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
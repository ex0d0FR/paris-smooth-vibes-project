
-- Create board assignments table to link team leaders with boards
CREATE TABLE public.board_assignments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  board_id UUID REFERENCES public.boards(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  assigned_by UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  assigned_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(board_id, user_id)
);

-- Enable RLS on board assignments
ALTER TABLE public.board_assignments ENABLE ROW LEVEL SECURITY;

-- Create proper RLS policies for board assignments
CREATE POLICY "Users can view board assignments they're involved in"
  ON public.board_assignments FOR SELECT
  USING (
    user_id = auth.uid() 
    OR assigned_by = auth.uid()
    OR has_role(auth.uid(), 'dev')
    OR has_role(auth.uid(), 'admin')
  );

CREATE POLICY "Team leaders and admins can create board assignments"
  ON public.board_assignments FOR INSERT
  WITH CHECK (
    assigned_by = auth.uid()
    AND (
      has_role(auth.uid(), 'team_leader')
      OR has_role(auth.uid(), 'admin')
      OR has_role(auth.uid(), 'dev')
    )
  );

CREATE POLICY "Assigners and admins can update board assignments"
  ON public.board_assignments FOR UPDATE
  USING (
    assigned_by = auth.uid()
    OR has_role(auth.uid(), 'admin')
    OR has_role(auth.uid(), 'dev')
  );

CREATE POLICY "Assigners and admins can delete board assignments"
  ON public.board_assignments FOR DELETE
  USING (
    assigned_by = auth.uid()
    OR has_role(auth.uid(), 'admin')
    OR has_role(auth.uid(), 'dev')
  );

-- Update board access function to include assignments
CREATE OR REPLACE FUNCTION public.can_access_board(_user_id uuid, _board_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.boards b
    LEFT JOIN public.board_members bm ON b.id = bm.board_id
    LEFT JOIN public.board_assignments ba ON b.id = ba.board_id
    WHERE b.id = _board_id
    AND (
      b.created_by = _user_id
      OR bm.user_id = _user_id
      OR ba.user_id = _user_id
      OR (b.visibility = 'public' AND NOT has_role(_user_id, 'guest'))
      OR has_role(_user_id, 'dev')
      OR has_role(_user_id, 'admin')
    )
  )
$$;

-- Update board edit function to include assignments
CREATE OR REPLACE FUNCTION public.can_edit_board(_user_id uuid, _board_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.boards b
    LEFT JOIN public.board_members bm ON b.id = bm.board_id
    LEFT JOIN public.board_assignments ba ON b.id = ba.board_id
    WHERE b.id = _board_id
    AND (
      b.created_by = _user_id
      OR (bm.user_id = _user_id AND bm.role IN ('owner', 'admin'))
      OR (ba.user_id = _user_id AND has_role(_user_id, 'team_leader'))
      OR has_role(_user_id, 'dev')
      OR has_role(_user_id, 'admin')
    )
  )
$$;

-- Replace the current overly permissive board policies with proper role-based ones
DROP POLICY IF EXISTS "Allow all authenticated users full access" ON public.boards;

-- Proper board access policies
CREATE POLICY "Users can view boards they have access to"
  ON public.boards FOR SELECT
  USING (
    NOT has_role(auth.uid(), 'guest') 
    AND can_access_board(auth.uid(), id)
  );

CREATE POLICY "Team leaders and above can create boards"
  ON public.boards FOR INSERT
  WITH CHECK (
    auth.uid() = created_by
    AND (
      has_role(auth.uid(), 'dev')
      OR has_role(auth.uid(), 'admin')
      OR has_role(auth.uid(), 'team_leader')
    )
  );

CREATE POLICY "Users can update boards they can edit"
  ON public.boards FOR UPDATE
  USING (can_edit_board(auth.uid(), id));

CREATE POLICY "Users can delete boards they created or admins"
  ON public.boards FOR DELETE
  USING (
    created_by = auth.uid()
    OR has_role(auth.uid(), 'dev')
    OR has_role(auth.uid(), 'admin')
  );

-- Add board status for better management
ALTER TABLE public.boards ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'active';
ALTER TABLE public.boards ADD COLUMN IF NOT EXISTS category TEXT;

-- Update cards table to ensure assigned_to works properly with volunteers
CREATE POLICY "Volunteers can view cards assigned to them" ON public.cards
  FOR SELECT
  USING (
    assigned_to = auth.uid()
    OR EXISTS (
      SELECT 1 FROM public.lists l
      WHERE l.id = list_id
      AND can_access_board(auth.uid(), l.board_id)
    )
  );

-- Enable realtime for board assignments
ALTER PUBLICATION supabase_realtime ADD TABLE public.board_assignments;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS board_assignments_user_id_idx ON public.board_assignments(user_id);
CREATE INDEX IF NOT EXISTS board_assignments_board_id_idx ON public.board_assignments(board_id);
CREATE INDEX IF NOT EXISTS boards_category_idx ON public.boards(category);
CREATE INDEX IF NOT EXISTS boards_status_idx ON public.boards(status);

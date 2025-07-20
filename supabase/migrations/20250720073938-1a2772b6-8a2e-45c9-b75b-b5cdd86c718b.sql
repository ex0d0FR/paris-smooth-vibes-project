
-- Create enum for board visibility
CREATE TYPE board_visibility AS ENUM ('private', 'team', 'public');

-- Create enum for card priority
CREATE TYPE card_priority AS ENUM ('low', 'medium', 'high');

-- Create enum for card status
CREATE TYPE card_status AS ENUM ('todo', 'in_progress', 'review', 'done');

-- Create enum for board member roles
CREATE TYPE board_member_role AS ENUM ('owner', 'admin', 'member', 'viewer');

-- Create boards table
CREATE TABLE public.boards (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  created_by UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  team_id UUID,
  is_archived BOOLEAN DEFAULT false,
  visibility board_visibility DEFAULT 'private',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create lists table
CREATE TABLE public.lists (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  board_id UUID REFERENCES public.boards(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  position INTEGER NOT NULL DEFAULT 0,
  is_archived BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create cards table
CREATE TABLE public.cards (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  list_id UUID REFERENCES public.lists(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  assigned_to UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_by UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  position INTEGER NOT NULL DEFAULT 0,
  due_date TIMESTAMP WITH TIME ZONE,
  priority card_priority DEFAULT 'medium',
  status card_status DEFAULT 'todo',
  labels TEXT[],
  is_archived BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create card comments table
CREATE TABLE public.card_comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  card_id UUID REFERENCES public.cards(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create board members table
CREATE TABLE public.board_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  board_id UUID REFERENCES public.boards(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role board_member_role DEFAULT 'member',
  added_by UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  added_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(board_id, user_id)
);

-- Enable RLS on all tables
ALTER TABLE public.boards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.card_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.board_members ENABLE ROW LEVEL SECURITY;

-- Create function to check if user can access board
CREATE OR REPLACE FUNCTION public.can_access_board(_user_id uuid, _board_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.boards b
    LEFT JOIN public.board_members bm ON b.id = bm.board_id
    WHERE b.id = _board_id
    AND (
      b.created_by = _user_id
      OR bm.user_id = _user_id
      OR b.visibility = 'public'
      OR has_role(_user_id, 'dev')
      OR has_role(_user_id, 'admin')
    )
  )
$$;

-- Create function to check if user can edit board
CREATE OR REPLACE FUNCTION public.can_edit_board(_user_id uuid, _board_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.boards b
    LEFT JOIN public.board_members bm ON b.id = bm.board_id
    WHERE b.id = _board_id
    AND (
      b.created_by = _user_id
      OR (bm.user_id = _user_id AND bm.role IN ('owner', 'admin'))
      OR has_role(_user_id, 'dev')
      OR has_role(_user_id, 'admin')
      OR has_role(_user_id, 'team_leader')
    )
  )
$$;

-- RLS Policies for boards
CREATE POLICY "Users can view boards they have access to"
  ON public.boards FOR SELECT
  USING (can_access_board(auth.uid(), id));

CREATE POLICY "Users can create boards if they have appropriate role"
  ON public.boards FOR INSERT
  WITH CHECK (
    auth.uid() = created_by
    AND (
      has_role(auth.uid(), 'dev')
      OR has_role(auth.uid(), 'admin')
      OR has_role(auth.uid(), 'team_leader')
      OR has_role(auth.uid(), 'volunteer')
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

-- RLS Policies for lists
CREATE POLICY "Users can view lists from accessible boards"
  ON public.lists FOR SELECT
  USING (can_access_board(auth.uid(), board_id));

CREATE POLICY "Users can create lists on boards they can edit"
  ON public.lists FOR INSERT
  WITH CHECK (can_edit_board(auth.uid(), board_id));

CREATE POLICY "Users can update lists on boards they can edit"
  ON public.lists FOR UPDATE
  USING (can_edit_board(auth.uid(), board_id));

CREATE POLICY "Users can delete lists on boards they can edit"
  ON public.lists FOR DELETE
  USING (can_edit_board(auth.uid(), board_id));

-- RLS Policies for cards
CREATE POLICY "Users can view cards from accessible boards"
  ON public.cards FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.lists l
      WHERE l.id = list_id
      AND can_access_board(auth.uid(), l.board_id)
    )
  );

CREATE POLICY "Users can create cards on accessible boards"
  ON public.cards FOR INSERT
  WITH CHECK (
    auth.uid() = created_by
    AND EXISTS (
      SELECT 1 FROM public.lists l
      WHERE l.id = list_id
      AND can_access_board(auth.uid(), l.board_id)
    )
  );

CREATE POLICY "Users can update their own cards or if they can edit the board"
  ON public.cards FOR UPDATE
  USING (
    (created_by = auth.uid() OR assigned_to = auth.uid())
    OR EXISTS (
      SELECT 1 FROM public.lists l
      WHERE l.id = list_id
      AND can_edit_board(auth.uid(), l.board_id)
    )
  );

CREATE POLICY "Users can delete cards on boards they can edit"
  ON public.cards FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.lists l
      WHERE l.id = list_id
      AND can_edit_board(auth.uid(), l.board_id)
    )
  );

-- RLS Policies for card comments
CREATE POLICY "Users can view comments on accessible cards"
  ON public.card_comments FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.cards c
      JOIN public.lists l ON c.list_id = l.id
      WHERE c.id = card_id
      AND can_access_board(auth.uid(), l.board_id)
    )
  );

CREATE POLICY "Users can create comments on accessible cards"
  ON public.card_comments FOR INSERT
  WITH CHECK (
    auth.uid() = user_id
    AND EXISTS (
      SELECT 1 FROM public.cards c
      JOIN public.lists l ON c.list_id = l.id
      WHERE c.id = card_id
      AND can_access_board(auth.uid(), l.board_id)
    )
  );

CREATE POLICY "Users can update their own comments"
  ON public.card_comments FOR UPDATE
  USING (user_id = auth.uid());

CREATE POLICY "Users can delete their own comments or if they can edit the board"
  ON public.card_comments FOR DELETE
  USING (
    user_id = auth.uid()
    OR EXISTS (
      SELECT 1 FROM public.cards c
      JOIN public.lists l ON c.list_id = l.id
      WHERE c.id = card_id
      AND can_edit_board(auth.uid(), l.board_id)
    )
  );

-- RLS Policies for board members
CREATE POLICY "Users can view members of accessible boards"
  ON public.board_members FOR SELECT
  USING (can_access_board(auth.uid(), board_id));

CREATE POLICY "Users can add members to boards they can edit"
  ON public.board_members FOR INSERT
  WITH CHECK (
    auth.uid() = added_by
    AND can_edit_board(auth.uid(), board_id)
  );

CREATE POLICY "Users can update members on boards they can edit"
  ON public.board_members FOR UPDATE
  USING (can_edit_board(auth.uid(), board_id));

CREATE POLICY "Users can remove members from boards they can edit"
  ON public.board_members FOR DELETE
  USING (can_edit_board(auth.uid(), board_id) OR user_id = auth.uid());

-- Create triggers for updated_at
CREATE TRIGGER update_boards_updated_at BEFORE UPDATE ON public.boards
  FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();

CREATE TRIGGER update_lists_updated_at BEFORE UPDATE ON public.lists
  FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();

CREATE TRIGGER update_cards_updated_at BEFORE UPDATE ON public.cards
  FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();

CREATE TRIGGER update_card_comments_updated_at BEFORE UPDATE ON public.card_comments
  FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();

-- Enable realtime for all tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.boards;
ALTER PUBLICATION supabase_realtime ADD TABLE public.lists;
ALTER PUBLICATION supabase_realtime ADD TABLE public.cards;
ALTER PUBLICATION supabase_realtime ADD TABLE public.card_comments;
ALTER PUBLICATION supabase_realtime ADD TABLE public.board_members;

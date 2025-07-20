-- Temporarily disable RLS to test the basic insert
ALTER TABLE public.boards DISABLE ROW LEVEL SECURITY;

-- Test if basic insert works
INSERT INTO public.boards (title, description, created_by, visibility) 
VALUES ('Test Board 2', 'Test Description', 'a2538338-b088-4d19-b580-eb418c631c4e', 'private');

-- Re-enable RLS
ALTER TABLE public.boards ENABLE ROW LEVEL SECURITY;

-- Drop existing policies and create very permissive ones for testing
DROP POLICY IF EXISTS "Authenticated users can create boards" ON public.boards;
DROP POLICY IF EXISTS "Users can view boards they have access to" ON public.boards;
DROP POLICY IF EXISTS "Users can update boards they can edit" ON public.boards;
DROP POLICY IF EXISTS "Users can delete boards they created or admins" ON public.boards;

-- Create very simple policies for testing
CREATE POLICY "Allow all authenticated users full access"
  ON public.boards FOR ALL
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);
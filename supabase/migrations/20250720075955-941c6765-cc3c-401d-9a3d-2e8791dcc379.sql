-- Let's completely reset the boards policies and create a very simple one for testing
DROP POLICY IF EXISTS "Allow admins to create boards" ON public.boards;
DROP POLICY IF EXISTS "Users can view boards they have access to" ON public.boards;
DROP POLICY IF EXISTS "Users can update boards they can edit" ON public.boards;
DROP POLICY IF EXISTS "Users can delete boards they created or admins" ON public.boards;

-- Create a simple policy that allows any authenticated user to create boards (for testing)
CREATE POLICY "Authenticated users can create boards"
  ON public.boards FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- Also allow viewing boards for authenticated users
CREATE POLICY "Authenticated users can view boards"
  ON public.boards FOR SELECT
  USING (auth.uid() IS NOT NULL);

-- Allow updating boards
CREATE POLICY "Authenticated users can update boards"
  ON public.boards FOR UPDATE
  USING (auth.uid() IS NOT NULL);

-- Allow deleting boards
CREATE POLICY "Authenticated users can delete boards"
  ON public.boards FOR DELETE
  USING (auth.uid() IS NOT NULL);
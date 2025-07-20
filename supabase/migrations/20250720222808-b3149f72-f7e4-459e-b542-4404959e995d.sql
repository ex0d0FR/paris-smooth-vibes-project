-- Fix board creation policy to allow authenticated users to create boards
DROP POLICY IF EXISTS "Users can create boards if they have appropriate role" ON public.boards;
DROP POLICY IF EXISTS "Authenticated users can create boards" ON public.boards;

-- Create a policy that allows any authenticated user to create boards
CREATE POLICY "Authenticated users can create boards"
  ON public.boards FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() = created_by);
-- Let's temporarily disable RLS to test the insert
ALTER TABLE public.boards DISABLE ROW LEVEL SECURITY;

-- Test insert
INSERT INTO boards (title, description, created_by, visibility) 
VALUES ('Test Board', 'Test Description', 'a2538338-b088-4d19-b580-eb418c631c4e', 'private');

-- Re-enable RLS
ALTER TABLE public.boards ENABLE ROW LEVEL SECURITY;

-- Now let's create a simpler policy for testing
DROP POLICY IF EXISTS "Users can create boards if they have appropriate role" ON public.boards;

CREATE POLICY "Allow admins to create boards"
  ON public.boards FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.user_roles ur 
      WHERE ur.user_id = auth.uid() 
      AND ur.role = 'admin'::app_role 
      AND ur.is_active = true
    )
  );
-- Drop the existing policy
DROP POLICY IF EXISTS "Users can create boards if they have appropriate role" ON public.boards;

-- Create a more explicit policy for board creation
CREATE POLICY "Users can create boards if they have appropriate role"
  ON public.boards FOR INSERT
  WITH CHECK (
    auth.uid() IS NOT NULL
    AND auth.uid() = created_by
    AND (
      has_role(auth.uid(), 'dev'::app_role)
      OR has_role(auth.uid(), 'admin'::app_role)
      OR has_role(auth.uid(), 'team_leader'::app_role)
      OR has_role(auth.uid(), 'volunteer'::app_role)
    )
  );
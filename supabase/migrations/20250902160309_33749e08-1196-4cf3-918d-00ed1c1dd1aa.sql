-- Fix security issue: Restrict invitation_requests INSERT to only authenticated service role
-- This forces all requests through the secured edge function while preventing direct table access

-- Drop the current overly permissive INSERT policy
DROP POLICY IF EXISTS "Anyone can create invitation requests" ON public.invitation_requests;

-- Create a new restrictive INSERT policy that only allows the service role
-- This ensures all requests go through the secured edge function
CREATE POLICY "Only service role can insert invitation requests" 
ON public.invitation_requests 
FOR INSERT 
WITH CHECK (
  -- Only allow inserts from the service role (used by edge functions)
  -- This prevents direct table access while allowing the secured edge function
  auth.jwt() ->> 'role' = 'service_role'
);
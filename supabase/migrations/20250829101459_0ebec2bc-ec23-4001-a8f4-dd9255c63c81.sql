-- Create sponsor form submissions table for logging
CREATE TABLE public.sponsor_form_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  organization TEXT,
  sponsorship_type TEXT,
  message TEXT,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT DEFAULT 'submitted' CHECK (status IN ('submitted', 'processed', 'spam'))
);

-- Enable Row Level Security
ALTER TABLE public.sponsor_form_submissions ENABLE ROW LEVEL SECURITY;

-- Only admins and devs can view sponsor submissions
CREATE POLICY "Only admins can view sponsor submissions" 
ON public.sponsor_form_submissions 
FOR SELECT 
USING (
  public.has_role(auth.uid(), 'admin'::app_role) 
  OR public.has_role(auth.uid(), 'dev'::app_role)
);

-- Create function to check sponsor form rate limit
CREATE OR REPLACE FUNCTION public.check_sponsor_rate_limit(_email text, _ip_address inet)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $$
DECLARE
  _email_count integer;
  _ip_count integer;
BEGIN
  -- Check email rate limit (max 3 per hour)
  SELECT COUNT(*) INTO _email_count
  FROM public.sponsor_form_submissions
  WHERE email = _email 
    AND created_at > NOW() - INTERVAL '1 hour';
    
  -- Check IP rate limit (max 5 per hour)
  SELECT COUNT(*) INTO _ip_count
  FROM public.sponsor_form_submissions
  WHERE ip_address = _ip_address 
    AND created_at > NOW() - INTERVAL '1 hour';
    
  -- Return false if limits exceeded
  IF _email_count >= 3 OR _ip_count >= 5 THEN
    RETURN false;
  END IF;
  
  RETURN true;
END;
$$;
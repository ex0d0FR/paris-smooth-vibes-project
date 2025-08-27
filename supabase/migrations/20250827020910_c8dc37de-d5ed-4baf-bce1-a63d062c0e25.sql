-- Security fixes for invitation requests system

-- Add IP address tracking and rate limiting
ALTER TABLE public.invitation_requests 
ADD COLUMN IF NOT EXISTS ip_address inet,
ADD COLUMN IF NOT EXISTS user_agent text;

-- Create a function to check rate limits (max 3 requests per IP/email per hour)
CREATE OR REPLACE FUNCTION public.check_invitation_rate_limit(_email text, _ip_address inet)
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
  FROM public.invitation_requests
  WHERE email = _email 
    AND created_at > NOW() - INTERVAL '1 hour';
    
  -- Check IP rate limit (max 5 per hour)
  SELECT COUNT(*) INTO _ip_count
  FROM public.invitation_requests
  WHERE ip_address = _ip_address 
    AND created_at > NOW() - INTERVAL '1 hour';
    
  -- Return false if limits exceeded
  IF _email_count >= 3 OR _ip_count >= 5 THEN
    RETURN false;
  END IF;
  
  RETURN true;
END;
$$;

-- Create a function to check for duplicate requests (same email within 24 hours)
CREATE OR REPLACE FUNCTION public.check_duplicate_invitation_request(_email text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $$
DECLARE
  _existing_count integer;
BEGIN
  -- Check for existing request from same email in last 24 hours
  SELECT COUNT(*) INTO _existing_count
  FROM public.invitation_requests
  WHERE email = _email 
    AND created_at > NOW() - INTERVAL '24 hours'
    AND status IN ('pending', 'approved');
    
  -- Return true if duplicate found
  RETURN _existing_count > 0;
END;
$$;

-- Create trigger function for validation
CREATE OR REPLACE FUNCTION public.validate_invitation_request()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $$
BEGIN
  -- Validate email format
  IF NEW.email !~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
    RAISE EXCEPTION 'Invalid email format';
  END IF;
  
  -- Check for duplicates
  IF public.check_duplicate_invitation_request(NEW.email) THEN
    RAISE EXCEPTION 'An invitation request from this email address already exists within the last 24 hours';
  END IF;
  
  -- Check rate limits
  IF NEW.ip_address IS NOT NULL AND NOT public.check_invitation_rate_limit(NEW.email, NEW.ip_address) THEN
    RAISE EXCEPTION 'Rate limit exceeded. Please try again later';
  END IF;
  
  -- Set timestamps
  NEW.created_at := COALESCE(NEW.created_at, now());
  NEW.updated_at := now();
  
  RETURN NEW;
END;
$$;

-- Create the trigger
DROP TRIGGER IF EXISTS validate_invitation_request_trigger ON public.invitation_requests;
CREATE TRIGGER validate_invitation_request_trigger
  BEFORE INSERT ON public.invitation_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_invitation_request();

-- Add index for performance on rate limiting queries
CREATE INDEX IF NOT EXISTS idx_invitation_requests_email_created 
ON public.invitation_requests(email, created_at);

CREATE INDEX IF NOT EXISTS idx_invitation_requests_ip_created 
ON public.invitation_requests(ip_address, created_at);

-- Create audit log table for security monitoring
CREATE TABLE IF NOT EXISTS public.invitation_security_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type text NOT NULL,
  email text,
  ip_address inet,
  user_agent text,
  details jsonb,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on audit log
ALTER TABLE public.invitation_security_log ENABLE ROW LEVEL SECURITY;

-- Only admins can view security logs
CREATE POLICY "Admins can view security logs" 
ON public.invitation_security_log 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'dev'::app_role));

-- Function to log security events
CREATE OR REPLACE FUNCTION public.log_invitation_security_event(
  _event_type text,
  _email text DEFAULT NULL,
  _ip_address inet DEFAULT NULL,
  _user_agent text DEFAULT NULL,
  _details jsonb DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $$
BEGIN
  INSERT INTO public.invitation_security_log (
    event_type, email, ip_address, user_agent, details
  ) VALUES (
    _event_type, _email, _ip_address, _user_agent, _details
  );
END;
$$;
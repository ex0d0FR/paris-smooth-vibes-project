-- Create invitation requests table
CREATE TABLE public.invitation_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  organization TEXT,
  language TEXT NOT NULL,
  purpose TEXT NOT NULL,
  address TEXT NOT NULL,
  nationality TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  processed_at TIMESTAMP WITH TIME ZONE,
  processed_by UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.invitation_requests ENABLE ROW LEVEL SECURITY;

-- Create policies for invitation requests
CREATE POLICY "Admins can view all invitation requests" 
ON public.invitation_requests 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'dev'::app_role));

CREATE POLICY "Anyone can create invitation requests" 
ON public.invitation_requests 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admins can update invitation requests" 
ON public.invitation_requests 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'dev'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'dev'::app_role));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_invitation_requests_updated_at
BEFORE UPDATE ON public.invitation_requests
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
-- Create a table for tracking prayer counts by country
CREATE TABLE public.prayer_counts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  country_code VARCHAR(2) NOT NULL UNIQUE,
  country_name TEXT NOT NULL,
  prayer_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.prayer_counts ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Prayer counts are viewable by everyone" 
ON public.prayer_counts 
FOR SELECT 
USING (true);

-- Create policy for updating prayer counts (public can increment)
CREATE POLICY "Anyone can update prayer counts" 
ON public.prayer_counts 
FOR UPDATE 
USING (true);

-- Create policy for inserting new countries
CREATE POLICY "Anyone can insert new countries" 
ON public.prayer_counts 
FOR INSERT 
WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = now();
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_prayer_counts_updated_at
BEFORE UPDATE ON public.prayer_counts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial data for European countries
INSERT INTO public.prayer_counts (country_code, country_name) VALUES
('FR', 'France'),
('DE', 'Germany'),
('IT', 'Italy'),
('ES', 'Spain'),
('GB', 'United Kingdom'),
('PL', 'Poland'),
('RO', 'Romania'),
('NL', 'Netherlands'),
('BE', 'Belgium'),
('GR', 'Greece'),
('PT', 'Portugal'),
('CZ', 'Czech Republic'),
('HU', 'Hungary'),
('SE', 'Sweden'),
('AT', 'Austria'),
('BY', 'Belarus'),
('CH', 'Switzerland'),
('BG', 'Bulgaria'),
('RS', 'Serbia'),
('DK', 'Denmark'),
('FI', 'Finland'),
('SK', 'Slovakia'),
('NO', 'Norway'),
('IE', 'Ireland'),
('HR', 'Croatia'),
('BA', 'Bosnia and Herzegovina'),
('AL', 'Albania'),
('LT', 'Lithuania'),
('SI', 'Slovenia'),
('LV', 'Latvia'),
('EE', 'Estonia'),
('MK', 'North Macedonia'),
('MD', 'Moldova'),
('LU', 'Luxembourg'),
('MT', 'Malta'),
('IS', 'Iceland'),
('ME', 'Montenegro'),
('CY', 'Cyprus'),
('AD', 'Andorra'),
('LI', 'Liechtenstein'),
('MC', 'Monaco'),
('SM', 'San Marino'),
('VA', 'Vatican City'),
('UA', 'Ukraine')
ON CONFLICT (country_code) DO NOTHING;
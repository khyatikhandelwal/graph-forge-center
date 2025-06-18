
-- Create a table for contributions
CREATE TABLE public.contributions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('research', 'dataset', 'methodology', 'community')),
  github_url TEXT,
  paper_url TEXT,
  dataset_url TEXT,
  author_name TEXT NOT NULL,
  author_email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.contributions ENABLE ROW LEVEL SECURITY;

-- Create policy that allows anyone to view approved contributions
CREATE POLICY "Anyone can view contributions" 
  ON public.contributions 
  FOR SELECT 
  USING (true);

-- Create policy that allows anyone to insert contributions
CREATE POLICY "Anyone can create contributions" 
  ON public.contributions 
  FOR INSERT 
  WITH CHECK (true);

-- Create policy that only allows admins to update/delete (you can modify this later based on your admin setup)
CREATE POLICY "Only admins can update contributions" 
  ON public.contributions 
  FOR UPDATE 
  USING (false); -- For now, no updates allowed

CREATE POLICY "Only admins can delete contributions" 
  ON public.contributions 
  FOR DELETE 
  USING (false); -- For now, no deletes allowed

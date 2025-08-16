-- Remove unsafe view that exposed profile data without explicit RLS
DROP VIEW IF EXISTS public.safe_profiles;
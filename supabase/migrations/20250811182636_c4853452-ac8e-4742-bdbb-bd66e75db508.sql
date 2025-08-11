-- 1) Restrict public read access on profiles to authenticated users only
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;

CREATE POLICY "Profiles are viewable by authenticated users"
ON public.profiles
FOR SELECT
TO authenticated
USING (true);

-- 2) Update handle_new_user to avoid storing full emails as usernames
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $function$
BEGIN
  -- Insert into profiles with anonymized username (local part of email only)
  INSERT INTO public.profiles (user_id, username)
  VALUES (NEW.id, split_part(NEW.email, '@', 1));
  
  -- Assign default guest role to new users
  INSERT INTO public.user_roles (user_id, role, assigned_by)
  VALUES (NEW.id, 'guest', NEW.id);
  
  RETURN NEW;
END;
$function$;

-- 3) Backfill existing profiles to strip email domains from username
UPDATE public.profiles
SET username = split_part(username, '@', 1)
WHERE username LIKE '%@%';
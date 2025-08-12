
-- 1) Enum for account status
DO $$ BEGIN
  CREATE TYPE public.account_status AS ENUM ('pending','approved','denied');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- 2) Profiles: add columns if not present
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS phone_number TEXT,
  ADD COLUMN IF NOT EXISTS city TEXT,
  ADD COLUMN IF NOT EXISTS country TEXT,
  ADD COLUMN IF NOT EXISTS church_name TEXT,
  ADD COLUMN IF NOT EXISTS email TEXT,
  ADD COLUMN IF NOT EXISTS is_active BOOLEAN NOT NULL DEFAULT true,
  ADD COLUMN IF NOT EXISTS account_status public.account_status NOT NULL DEFAULT 'pending';

-- 3) Enforce uniqueness and useful indexes
DO $$ BEGIN
  ALTER TABLE public.profiles ADD CONSTRAINT profiles_user_id_unique UNIQUE (user_id);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE INDEX IF NOT EXISTS idx_profiles_city ON public.profiles (city);
CREATE INDEX IF NOT EXISTS idx_profiles_country ON public.profiles (country);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles (email);

-- Ensure unique user_roles(user_id, role) so default role insert is idempotent
DO $$ BEGIN
  ALTER TABLE public.user_roles ADD CONSTRAINT user_roles_user_role_unique UNIQUE (user_id, role);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- 4) Improve the signup handler to also store email and be idempotent
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $function$
BEGIN
  -- Insert or update profile: save username (local part) and email
  INSERT INTO public.profiles (user_id, username, email)
  VALUES (NEW.id, split_part(NEW.email, '@', 1), NEW.email)
  ON CONFLICT (user_id) DO UPDATE
    SET username = EXCLUDED.username,
        email = EXCLUDED.email,
        updated_at = now();

  -- Assign default guest role (idempotent)
  INSERT INTO public.user_roles (user_id, role, assigned_by)
  VALUES (NEW.id, 'guest', NEW.id)
  ON CONFLICT (user_id, role) DO NOTHING;

  RETURN NEW;
END;
$function$;

-- 5) Create the trigger on auth.users so profiles/roles are created automatically
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 6) Optional: Prevent unauthorized changes to profiles.role (if column exists/used)
-- Attach trigger only if the column exists
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'role'
  ) THEN
    DROP TRIGGER IF EXISTS prevent_profile_role_change_trigger ON public.profiles;
    CREATE TRIGGER prevent_profile_role_change_trigger
      BEFORE UPDATE ON public.profiles
      FOR EACH ROW
      EXECUTE FUNCTION public.prevent_profile_role_change();
  END IF;
END$$;

-- 7) Tighten RLS on profiles: self access requires active profile; allow admin/dev updates
-- Drop and recreate the two policies we are tightening
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
CREATE POLICY "Users can view their own profile (active only)"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = user_id AND COALESCE(is_active, true));

DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile (active only)"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = user_id AND COALESCE(is_active, true))
  WITH CHECK (auth.uid() = user_id AND COALESCE(is_active, true));

-- Allow admins/devs to update any profile
DO $$ BEGIN
  CREATE POLICY "Admins and devs can update all profiles"
    ON public.profiles
    FOR UPDATE
    USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'dev'))
    WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'dev'));
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- 8) Admin RPC to approve/deny users and toggle roles
CREATE OR REPLACE FUNCTION public.admin_set_user_access(_user_id uuid, _status public.account_status)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $fn$
BEGIN
  -- Only admins/devs may call
  IF NOT (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'dev')) THEN
    RAISE EXCEPTION 'Not allowed';
  END IF;

  UPDATE public.profiles
  SET account_status = _status,
      is_active = CASE WHEN _status = 'denied' THEN false ELSE true END,
      updated_at = now()
  WHERE user_id = _user_id;

  IF _status = 'denied' THEN
    UPDATE public.user_roles
    SET is_active = false, updated_at = now()
    WHERE user_id = _user_id;
  ELSE
    -- Ensure the default guest role is active
    UPDATE public.user_roles
    SET is_active = true, updated_at = now()
    WHERE user_id = _user_id AND role = 'guest';
  END IF;
END;
$fn$;

-- 9) Backfill email on existing profiles from auth.users (safe operation)
UPDATE public.profiles p
SET email = au.email
FROM auth.users au
WHERE p.user_id = au.id AND p.email IS NULL;

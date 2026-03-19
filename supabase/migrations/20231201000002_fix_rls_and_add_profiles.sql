-- Fix overly permissive RLS policies on subscribers table
DROP POLICY IF EXISTS "update_own_subscription" ON public.subscribers;
DROP POLICY IF EXISTS "insert_subscription" ON public.subscribers;

-- Only service-role (edge functions) can insert/update subscribers
CREATE POLICY "service_role_insert_subscription" ON public.subscribers
FOR INSERT
WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "service_role_update_subscription" ON public.subscribers
FOR UPDATE
USING (auth.role() = 'service_role');

-- Add index on user_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_subscribers_user_id ON public.subscribers(user_id);
CREATE INDEX IF NOT EXISTS idx_subscribers_email ON public.subscribers(email);

-- Add unique constraint on user_id to prevent duplicate records
ALTER TABLE public.subscribers
  ADD CONSTRAINT unique_subscriber_user_id UNIQUE (user_id);

-- Create profiles table to store user data beyond auth.users
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  account_type TEXT NOT NULL CHECK (account_type IN ('architect', 'supplier')),
  phone TEXT,
  avatar_url TEXT,
  bio TEXT,
  company TEXT,
  location TEXT,
  website TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Users can read any profile (needed for contacts/discovery)
CREATE POLICY "profiles_select" ON public.profiles
FOR SELECT USING (true);

-- Users can only update their own profile
CREATE POLICY "profiles_update" ON public.profiles
FOR UPDATE USING (auth.uid() = id);

-- Users can insert their own profile
CREATE POLICY "profiles_insert" ON public.profiles
FOR INSERT WITH CHECK (auth.uid() = id);

-- Trigger to create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, name, account_type, phone)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'accountType', 'architect'),
    NEW.raw_user_meta_data->>'phone'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Index on account_type for filtering
CREATE INDEX IF NOT EXISTS idx_profiles_account_type ON public.profiles(account_type);

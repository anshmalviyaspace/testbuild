-- Recreate view with SECURITY INVOKER
CREATE OR REPLACE VIEW public.public_profiles
  WITH (security_invoker = true) AS
  SELECT id, username, avatar_initials, xp_points, streak_days, current_track
  FROM profiles;
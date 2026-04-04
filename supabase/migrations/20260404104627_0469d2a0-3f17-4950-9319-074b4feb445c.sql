-- Drop the overly permissive SELECT policy
DROP POLICY "Profiles are viewable by everyone" ON profiles;

-- Replace with owner-scoped policy (authenticated users can only read their own profile)
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Create a public view for non-sensitive profile data (leaderboard, public profiles)
CREATE OR REPLACE VIEW public.public_profiles AS
  SELECT id, username, avatar_initials, xp_points, streak_days, current_track
  FROM profiles;
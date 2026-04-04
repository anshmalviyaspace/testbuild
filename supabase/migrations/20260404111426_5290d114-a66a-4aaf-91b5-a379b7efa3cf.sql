
-- Community projects table
CREATE TABLE public.community_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  tags text[] NOT NULL DEFAULT '{}',
  track text NOT NULL DEFAULT 'Full Stack',
  emoji text NOT NULL DEFAULT '🚀',
  gradient_from text NOT NULL DEFAULT 'hsl(160 100% 45% / 0.25)',
  gradient_to text NOT NULL DEFAULT 'hsl(220 100% 50% / 0.15)',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.community_projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view all projects"
  ON public.community_projects FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can insert own projects"
  ON public.community_projects FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own projects"
  ON public.community_projects FOR UPDATE TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own projects"
  ON public.community_projects FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

CREATE TRIGGER update_community_projects_updated_at
  BEFORE UPDATE ON public.community_projects
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Project likes table
CREATE TABLE public.project_likes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  project_id uuid NOT NULL REFERENCES public.community_projects(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id, project_id)
);

ALTER TABLE public.project_likes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view likes"
  ON public.project_likes FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can insert own likes"
  ON public.project_likes FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own likes"
  ON public.project_likes FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

-- Project comments table
CREATE TABLE public.project_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  project_id uuid NOT NULL REFERENCES public.community_projects(id) ON DELETE CASCADE,
  content text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.project_comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view comments"
  ON public.project_comments FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can insert own comments"
  ON public.project_comments FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own comments"
  ON public.project_comments FOR UPDATE TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own comments"
  ON public.project_comments FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

CREATE TRIGGER update_project_comments_updated_at
  BEFORE UPDATE ON public.project_comments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Leaderboard view (live from profiles + project count)
CREATE OR REPLACE VIEW public.leaderboard_view WITH (security_invoker = true) AS
  SELECT
    p.id,
    p.username,
    p.full_name,
    p.avatar_initials,
    p.college,
    p.xp_points,
    p.current_track,
    COUNT(cp.id)::int AS project_count
  FROM public.profiles p
  LEFT JOIN public.community_projects cp ON cp.user_id = p.id
  WHERE p.username IS NOT NULL
  GROUP BY p.id
  ORDER BY p.xp_points DESC NULLS LAST;

-- Enable realtime on community_projects
ALTER PUBLICATION supabase_realtime ADD TABLE public.community_projects;

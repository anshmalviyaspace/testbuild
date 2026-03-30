-- Create profiles table first (referenced by quiz_results)
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  username TEXT UNIQUE,
  college TEXT,
  current_track TEXT,
  xp_points INT DEFAULT 0,
  streak_days INT DEFAULT 0,
  avatar_initials TEXT,
  bio TEXT,
  email TEXT,
  quiz_score INT DEFAULT NULL,
  quiz_level TEXT DEFAULT NULL,
  personality_type TEXT DEFAULT NULL,
  quiz_taken BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profiles are viewable by everyone"
  ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Quiz questions table
CREATE TABLE public.quiz_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  track TEXT NOT NULL,
  category TEXT NOT NULL,
  question TEXT NOT NULL,
  options JSONB NOT NULL,
  question_type TEXT DEFAULT 'single',
  order_index INT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.quiz_questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read quiz questions"
  ON public.quiz_questions FOR SELECT USING (true);

-- User quiz results table
CREATE TABLE public.quiz_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE,
  track TEXT NOT NULL,
  score INT NOT NULL,
  level TEXT NOT NULL,
  personality_type TEXT NOT NULL,
  personality_description TEXT NOT NULL,
  category_scores JSONB NOT NULL,
  answers JSONB NOT NULL,
  taken_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.quiz_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own results"
  ON public.quiz_results FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own results"
  ON public.quiz_results FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own results"
  ON public.quiz_results FOR UPDATE USING (auth.uid() = user_id);

-- Timestamp update function and triggers
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_quiz_results_updated_at
  BEFORE UPDATE ON public.quiz_results
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
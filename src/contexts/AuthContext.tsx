import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Session, User as SupabaseUser } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

// The shape of a user profile loaded from the `profiles` table
export interface User {
  id: string;
  fullName: string;
  username: string;
  college: string;
  currentTrack: string;
  xpPoints: number;
  streakDays: number;
  avatarInitials: string;
  bio?: string;
  email?: string;
}

// Temporary data held between SignupPage → OnboardingPage → Supabase signup
export interface SignupData {
  fullName: string;
  college: string;
  email: string;
  password: string;
}

interface AuthContextType {
  currentUser: User | null;
  session: Session | null;
  signupData: SignupData | null;
  isAuthenticated: boolean;
  isLoading: boolean; // true while we're waiting for Supabase to restore session
  setSignupData: (data: SignupData) => void;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>; // call this after updating the profile
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper: turn a raw `profiles` row into our typed User object
function rowToUser(row: any, email?: string): User {
  return {
    id: row.id,
    fullName: row.full_name ?? "",
    username: row.username ?? "",
    college: row.college ?? "",
    currentTrack: row.current_track ?? "AI & Machine Learning",
    xpPoints: row.xp_points ?? 0,
    streakDays: row.streak_days ?? 0,
    avatarInitials: row.avatar_initials ?? "BU",
    bio: row.bio ?? undefined,
    email: row.email ?? email,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [signupData, setSignupDataState] = useState<SignupData | null>(null);
  // Start as true so the app doesn't flash the login page on refresh
  const [isLoading, setIsLoading] = useState(true);

  // Load the profile row for a given Supabase user
  const loadProfile = async (supabaseUser: SupabaseUser) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", supabaseUser.id)
      .single();

    if (error || !data) {
      // Profile might not exist yet (e.g. mid-onboarding) — that's okay
      setCurrentUser(null);
      return;
    }

    setCurrentUser(rowToUser(data, supabaseUser.email));
  };

  // Re-fetch the profile from Supabase (call after settings updates)
  const refreshProfile = async () => {
    if (!session?.user) return;
    await loadProfile(session.user);
  };

  useEffect(() => {
    // 1. Subscribe to auth state changes (login, logout, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, newSession) => {
        setSession(newSession);

        if (newSession?.user) {
          await loadProfile(newSession.user);
        } else {
          setCurrentUser(null);
        }

        setIsLoading(false);
      }
    );

    // 2. Check for an existing session on mount (handles page refresh)
    supabase.auth.getSession().then(({ data: { session: existingSession } }) => {
      setSession(existingSession);
      if (existingSession?.user) {
        loadProfile(existingSession.user).finally(() => setIsLoading(false));
      } else {
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const setSignupData = (data: SignupData) => setSignupDataState(data);

  const logout = async () => {
    await supabase.auth.signOut();
    setCurrentUser(null);
    setSession(null);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        session,
        signupData,
        isAuthenticated: !!session,
        isLoading,
        setSignupData,
        logout,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
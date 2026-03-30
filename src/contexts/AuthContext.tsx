import { createContext, useContext, useState, ReactNode } from "react";

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

export interface SignupData {
  fullName: string;
  college: string;
  email: string;
  password: string;
}

interface AuthContextType {
  currentUser: User | null;
  signupData: SignupData | null;
  isAuthenticated: boolean;
  setSignupData: (data: SignupData) => void;
  login: (user: User) => void;
  logout: () => void;
}

// No default user — start logged out


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("buildhub_user");
    return stored ? JSON.parse(stored) : null;
  });
  const [signupData, setSignupDataState] = useState<SignupData | null>(null);

  const setSignupData = (data: SignupData) => setSignupDataState(data);

  const login = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem("buildhub_user", JSON.stringify(user));
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("buildhub_user");
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, signupData, isAuthenticated: !!currentUser, setSignupData, login, logout }}
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

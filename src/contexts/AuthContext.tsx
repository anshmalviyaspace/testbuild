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
}

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

const defaultUser: User = {
  id: "u_001",
  fullName: "Rahul Mehta",
  username: "rahulm",
  college: "IIT Delhi",
  currentTrack: "AI & ML",
  xpPoints: 320,
  streakDays: 7,
  avatarInitials: "RM",
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(defaultUser);

  const login = (user: User) => setCurrentUser(user);
  const logout = () => setCurrentUser(null);

  return (
    <AuthContext.Provider value={{ currentUser, isAuthenticated: !!currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}

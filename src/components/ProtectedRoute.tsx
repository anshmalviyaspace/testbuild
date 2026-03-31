import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

/**
 * Wraps routes that require authentication.
 * - While auth is initializing (page refresh), shows a minimal loading screen.
 * - If not authenticated, redirects to /login.
 * - If authenticated, renders the child route via <Outlet />.
 */
export default function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  // Don't redirect until Supabase has finished restoring the session
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          {/* Animated logo */}
          <span className="font-heading text-xl font-extrabold tracking-tight">
            Build<span className="text-foreground">hub</span>
          </span>
          <div className="w-5 h-5 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
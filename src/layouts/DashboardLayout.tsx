import { Outlet, NavLink } from "react-router-dom";
import { Home, BarChart3, FolderKanban, Users, Briefcase, Settings, Zap, Flame } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import clsx from "clsx";

const navItems = [
  { to: "/dashboard/home", label: "Home", icon: Home },
  { to: "/dashboard/track", label: "Track", icon: BarChart3 },
  { to: "/dashboard/projects", label: "Projects", icon: FolderKanban },
  { to: "/dashboard/community", label: "Community", icon: Users },
  { to: "/dashboard/portfolio", label: "Portfolio", icon: Briefcase },
  { to: "/dashboard/settings", label: "Settings", icon: Settings },
];

export default function DashboardLayout() {
  const { currentUser } = useAuth();

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 border-r border-border bg-surface flex flex-col">
        <div className="p-5 border-b border-border">
          <h1 className="font-heading text-xl font-bold tracking-tight">
            <span className="text-primary">Build</span>
            <span className="text-foreground">hub</span>
          </h1>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                clsx(
                  "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                  isActive
                    ? "bg-surface2 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-surface2"
                )
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* User card */}
        {currentUser && (
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-mono font-medium">
                {currentUser.avatarInitials}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">{currentUser.fullName}</p>
                <p className="text-xs text-muted-foreground font-mono">@{currentUser.username}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-3 text-xs font-mono text-muted-foreground">
              <span className="flex items-center gap-1">
                <Zap size={12} className="text-primary" />
                {currentUser.xpPoints} XP
              </span>
              <span className="flex items-center gap-1">
                <Flame size={12} className="text-destructive" />
                {currentUser.streakDays}d streak
              </span>
            </div>
          </div>
        )}
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

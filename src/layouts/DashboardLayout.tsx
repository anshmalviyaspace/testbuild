import { Outlet, NavLink, Link, useNavigate } from "react-router-dom";
import {
  Home,
  Target,
  FolderKanban,
  Users,
  TrendingUp,
  Settings,
  Globe,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import clsx from "clsx";

const navItems = [
  { to: "/dashboard/home", label: "Home", icon: Home },
  { to: "/dashboard/track", label: "My Track", icon: Target },
  { to: "/dashboard/projects", label: "Projects", icon: FolderKanban },
  { to: "/dashboard/community", label: "Community", icon: Users },
  { to: "/dashboard/portfolio", label: "Portfolio", icon: TrendingUp },
  { to: "/dashboard/settings", label: "Settings", icon: Settings },
];

export default function DashboardLayout() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const sidebarContent = (
    <>
      {/* User profile */}
      {currentUser && (
        <div className="p-5 border-b border-border">
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-mono font-semibold text-primary-foreground shrink-0"
              style={{
                background: "linear-gradient(135deg, #00e5a0, #0066ff)",
              }}
            >
              {currentUser.avatarInitials}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-heading font-bold truncate">
                {currentUser.fullName}
              </p>
              <p className="text-xs text-muted-foreground font-mono">
                @{currentUser.username}
              </p>
            </div>
          </div>
          <p className="text-[11px] text-muted-foreground truncate">
            {currentUser.college}
          </p>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-0.5">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              clsx(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 relative",
                isActive
                  ? "bg-primary/[0.08] text-primary border-l-2 border-primary -ml-px pl-[11px]"
                  : "text-muted-foreground hover:text-foreground hover:bg-surface2"
              )
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Bottom */}
      <div className="p-4 border-t border-border space-y-2">
        {currentUser && (
          <Link
            to={`/profile/${currentUser.username}`}
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-primary transition-colors px-1"
          >
            <Globe size={13} />
            View Public Profile →
          </Link>
        )}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-destructive transition-colors px-1 mt-2"
        >
          <LogOut size={13} />
          Logout
        </button>
      </div>
    </>
  );

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-60 shrink-0 border-r border-border bg-surface flex-col">
        {sidebarContent}
      </aside>

      {/* Mobile overlay sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-background/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-surface border-r border-border flex flex-col animate-slide-in-right">
            <div className="flex items-center justify-end p-3 border-b border-border">
              <button
                onClick={() => setMobileOpen(false)}
                className="text-muted-foreground hover:text-foreground p-1"
              >
                <X size={18} />
              </button>
            </div>
            {sidebarContent}
          </aside>
        </div>
      )}

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile header */}
        <header className="md:hidden flex items-center gap-3 p-4 border-b border-border bg-surface">
          <button
            onClick={() => setMobileOpen(true)}
            className="text-muted-foreground hover:text-foreground"
          >
            <Menu size={20} />
          </button>
          <span className="font-heading text-sm font-bold">
            <span className="text-primary">Build</span>hub
          </span>
        </header>

        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

import { Zap, Flame, Target, TrendingUp } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function HomeView() {
  const { currentUser } = useAuth();
  if (!currentUser) return null;

  const stats = [
    { label: "XP Points", value: currentUser.xpPoints, icon: Zap, color: "text-primary" },
    { label: "Day Streak", value: currentUser.streakDays, icon: Flame, color: "text-destructive" },
    { label: "Track", value: currentUser.currentTrack, icon: Target, color: "text-accent" },
    { label: "Rank", value: "#42", icon: TrendingUp, color: "text-primary" },
  ];

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="font-heading text-2xl font-bold">
          Welcome back, <span className="text-primary">{currentUser.fullName.split(" ")[0]}</span>
        </h1>
        <p className="text-sm text-muted-foreground mt-1 font-mono">
          {currentUser.college} · @{currentUser.username}
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-card border border-border rounded-lg p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">{label}</span>
              <Icon size={16} className={color} />
            </div>
            <p className="text-2xl font-heading font-bold">{value}</p>
          </div>
        ))}
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="font-heading text-lg font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {[
            { action: "Completed Module 3: Neural Networks", time: "2h ago", xp: "+25 XP" },
            { action: "Pushed commit to project 'DevFolio'", time: "5h ago", xp: "+10 XP" },
            { action: "Started Track: AI & ML Advanced", time: "1d ago", xp: "+5 XP" },
          ].map((item) => (
            <div key={item.action} className="flex items-center justify-between py-2 border-b border-border last:border-0">
              <div>
                <p className="text-sm">{item.action}</p>
                <p className="text-xs text-muted-foreground font-mono mt-0.5">{item.time}</p>
              </div>
              <span className="text-xs font-mono text-primary">{item.xp}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

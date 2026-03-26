import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Rocket, Flame, Zap, TrendingUp } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const communityFeed = [
  { name: "Sneha K.", college: "BITS Pilani", project: "Campus Event App", time: "12m ago", initials: "SK" },
  { name: "Arjun P.", college: "VIT", project: "Expense Splitter", time: "34m ago", initials: "AP" },
  { name: "Diya S.", college: "NIT Trichy", project: "Prompt Library Tool", time: "1h ago", initials: "DS" },
  { name: "Karan R.", college: "Manipal", project: "Study Buddy Matcher", time: "2h ago", initials: "KR" },
  { name: "Priya N.", college: "SRM", project: "Design System Kit", time: "3h ago", initials: "PN" },
];

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

function formatDate() {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long", month: "short", day: "numeric", year: "numeric",
  });
}

function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`bg-surface2 rounded-lg animate-pulse ${className}`} />;
}

function HomeSkeletonLoader() {
  return (
    <div className="p-6 sm:p-8 max-w-5xl space-y-8">
      <div className="space-y-2">
        <Skeleton className="h-8 w-72" />
        <Skeleton className="h-4 w-48" />
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        {[1, 2, 3].map(i => <Skeleton key={i} className="h-32" />)}
      </div>
      <Skeleton className="h-40" />
      <div className="grid lg:grid-cols-5 gap-6">
        <Skeleton className="lg:col-span-3 h-64" />
        <Skeleton className="lg:col-span-2 h-64" />
      </div>
    </div>
  );
}

export default function HomeView() {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  if (!currentUser) return null;
  if (loading) return <HomeSkeletonLoader />;

  const firstName = currentUser.fullName.split(" ")[0];

  const stats = [
    { label: "PROJECTS SHIPPED", value: "3", change: "+1 this week", accent: "text-primary", accentBg: "bg-primary/10", icon: Rocket },
    { label: "XP POINTS", value: String(currentUser.xpPoints), change: "+45 this week", accent: "text-warning", accentBg: "bg-warning/10", icon: Zap },
    { label: "CURRENT STREAK", value: `${currentUser.streakDays} days`, change: "Personal best!", accent: "text-streak", accentBg: "bg-streak/10", icon: Flame },
  ];

  return (
    <div className="p-6 sm:p-8 max-w-5xl space-y-8 animate-fade-in opacity-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
        <div>
          <h1 className="font-heading text-2xl sm:text-[28px] font-extrabold leading-tight">
            {getGreeting()}, {firstName} 👋
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            You're on a <span className="text-streak font-medium">{currentUser.streakDays}-day streak</span> 🔥 Keep it up.
          </p>
        </div>
        <p className="text-xs font-mono text-muted-foreground shrink-0 mt-1 sm:mt-2">{formatDate()}</p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-4">
        {stats.map(s => (
          <div key={s.label} className="bg-card border border-border rounded-xl p-5 transition-all duration-200 hover:border-border/80">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono text-muted-foreground tracking-widest">{s.label}</span>
              <div className={`w-7 h-7 rounded-lg ${s.accentBg} flex items-center justify-center`}>
                <s.icon size={14} className={s.accent} />
              </div>
            </div>
            <p className={`text-3xl font-heading font-extrabold ${s.accent}`}>{s.value}</p>
            <p className="text-[11px] font-mono text-muted-foreground mt-1.5 flex items-center gap-1">
              <TrendingUp size={10} className="text-primary" />{s.change}
            </p>
          </div>
        ))}
      </div>

      {/* Active Module */}
      <div className="bg-card border border-border rounded-xl p-6">
        <p className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase mb-3">CURRENTLY BUILDING</p>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-2">
            <h2 className="font-heading text-lg font-bold">Build with the Claude API</h2>
            <span className="text-[10px] font-mono bg-primary/10 text-primary px-2.5 py-1 rounded-full">{currentUser.currentTrack}</span>
          </div>
          <Link to="/dashboard/track" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors shrink-0">
            Continue Module <ArrowRight size={14} />
          </Link>
        </div>
        <div className="mt-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-muted-foreground">3 of 8 modules complete</span>
            <span className="text-xs font-mono text-primary">37.5%</span>
          </div>
          <div className="w-full h-2 bg-surface2 rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: "37.5%" }} />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Community Feed */}
        <div className="lg:col-span-3 bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase">BUILDERS ARE SHIPPING</p>
            <Link to="/dashboard/community" className="text-xs font-mono text-primary hover:underline">View All →</Link>
          </div>
          <div className="space-y-1">
            {communityFeed.map(item => (
              <div key={item.name + item.project} className="flex items-center gap-3 py-2.5 border-b border-border last:border-0">
                <div className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-[9px] font-mono font-semibold text-primary-foreground" style={{ background: "linear-gradient(135deg, hsl(160 100% 45%), hsl(220 100% 50%))" }}>
                  {item.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm truncate">
                    <span className="font-medium">{item.name}</span>
                    <span className="text-muted-foreground"> from {item.college} shipped </span>
                    <span className="font-medium text-foreground">{item.project}</span>
                  </p>
                </div>
                <span className="text-[10px] font-mono text-muted-foreground shrink-0">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Suggested Next */}
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6 flex flex-col">
          <p className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase mb-4">UP NEXT</p>
          <div className="flex-1 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center"><span className="text-lg">🧠</span></div>
            <h3 className="font-heading font-bold">RAG — Retrieval Augmented Generation</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">Learn to build AI apps that combine language models with external knowledge sources for more accurate, grounded responses.</p>
          </div>
          <Link to="/dashboard/track" className="mt-5 inline-flex items-center gap-2 border border-border px-5 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:border-muted-foreground/40 transition-colors self-start">
            Preview Module <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}

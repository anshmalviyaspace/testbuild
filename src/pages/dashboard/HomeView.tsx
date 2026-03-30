import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Rocket, Flame, Zap, TrendingUp, Sparkles } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

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
    </div>
  );
}

export default function HomeView() {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [quizResult, setQuizResult] = useState<{ personality_type: string; score: number; level: string } | null>(null);

  useEffect(() => {
    // Load quiz results from localStorage
    const stored = localStorage.getItem("buildhub_quiz_results");
    if (stored) {
      const parsed = JSON.parse(stored);
      setQuizResult({
        personality_type: parsed.personality_type,
        score: parsed.score,
        level: parsed.level,
      });
    }
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  if (!currentUser) return null;
  if (loading) return <HomeSkeletonLoader />;

  const firstName = currentUser.fullName.split(" ")[0];

  const stats = [
    { label: "PROJECTS SHIPPED", value: "0", change: "Start building!", accent: "text-primary", accentBg: "bg-primary/10", icon: Rocket },
    { label: "XP POINTS", value: String(currentUser.xpPoints), change: "Earn by completing modules", accent: "text-warning", accentBg: "bg-warning/10", icon: Zap },
    { label: "CURRENT STREAK", value: `${currentUser.streakDays} days`, change: "Begin your streak today", accent: "text-streak", accentBg: "bg-streak/10", icon: Flame },
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
            Welcome to your builder dashboard.
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

      {/* Builder DNA Card */}
      {quizResult && (
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={14} className="text-primary" />
            <p className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase">YOUR BUILDER DNA</p>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="font-heading text-lg font-bold text-primary">{quizResult.personality_type}</p>
              <p className="text-xs text-muted-foreground mt-1">{quizResult.score} / 100 at start · {quizResult.level}</p>
            </div>
            <Link to={`/profile/${currentUser.username}`} className="text-xs font-mono text-primary hover:underline">
              View Full Profile →
            </Link>
          </div>
        </div>
      )}

      {/* Start Journey Card */}
      <div className="bg-card border border-border rounded-xl p-6">
        <p className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase mb-3">START YOUR JOURNEY</p>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{currentUser.currentTrack?.includes("AI") ? "🤖" : currentUser.currentTrack?.includes("UI") ? "🎨" : currentUser.currentTrack?.includes("Full") ? "💻" : "🚀"}</span>
              <span className="text-[10px] font-mono bg-primary/10 text-primary px-2.5 py-1 rounded-full">{currentUser.currentTrack}</span>
            </div>
            <p className="text-sm text-muted-foreground">You haven't started your first module yet. Module 1 is waiting — it takes about 45 minutes.</p>
          </div>
          <Link to="/dashboard/track" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors shrink-0">
            Begin Module 1 <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Community Feed — Empty State */}
        <div className="lg:col-span-3 bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase">BUILDERS ARE SHIPPING</p>
            <Link to="/dashboard/community" className="text-xs font-mono text-primary hover:underline">View All →</Link>
          </div>
          <div className="text-center py-8">
            <span className="text-3xl block mb-3">🚀</span>
            <p className="text-sm text-muted-foreground">Be the first to ship something this week.</p>
            <Link to="/dashboard/community" className="text-xs font-mono text-primary hover:underline mt-2 inline-block">
              Browse what others built →
            </Link>
          </div>
        </div>

        {/* Suggested Next */}
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6 flex flex-col">
          <p className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase mb-4">UP NEXT</p>
          <div className="flex-1 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center"><span className="text-lg">🧠</span></div>
            <h3 className="font-heading font-bold">Understanding AI & LLMs</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">Start with the fundamentals — understand what AI models are, how they work, and where they're going.</p>
          </div>
          <Link to="/dashboard/track" className="mt-5 inline-flex items-center gap-2 border border-border px-5 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:border-muted-foreground/40 transition-colors self-start">
            Preview Module <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}

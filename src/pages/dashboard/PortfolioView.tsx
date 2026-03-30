import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowRight, PartyPopper } from "lucide-react";
import { useEffect, useState } from "react";

export default function PortfolioView() {
  const { currentUser } = useAuth();
  const [quizResult, setQuizResult] = useState<{ personality_type: string; personality_description: string; score: number; level: string; taken_at?: string } | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("buildhub_quiz_results");
    if (stored) {
      const parsed = JSON.parse(stored);
      setQuizResult({
        personality_type: parsed.personality_type,
        personality_description: parsed.personality_description,
        score: parsed.score,
        level: parsed.level,
      });
    }
  }, []);

  if (!currentUser) return null;

  return (
    <div className="p-6 sm:p-8 max-w-4xl animate-fade-in opacity-0">
      <h1 className="font-heading text-2xl font-extrabold mb-2">Portfolio</h1>
      <p className="text-sm text-muted-foreground mb-8">Your public-facing builder profile</p>

      {/* Profile Header */}
      <section className="bg-card border border-border rounded-xl p-6 mb-8">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-full shrink-0 flex items-center justify-center text-lg font-heading font-bold text-primary-foreground" style={{ background: "linear-gradient(135deg, hsl(160 100% 45%), hsl(220 100% 50%))" }}>
            {currentUser.avatarInitials}
          </div>
          <div>
            <h2 className="font-heading text-xl font-extrabold">{currentUser.fullName}</h2>
            <p className="text-sm font-mono text-primary">@{currentUser.username}</p>
            <p className="text-xs text-muted-foreground mt-1">{currentUser.college}</p>
            {currentUser.bio && <p className="text-sm text-muted-foreground/80 mt-2">{currentUser.bio}</p>}
          </div>
        </div>
      </section>

      {/* Builder Profile from Quiz */}
      {quizResult ? (
        <section className="bg-card border border-border rounded-xl p-6 mb-8 space-y-5">
          <p className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase">BUILDER PROFILE</p>
          
          {/* Personality pill */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 border border-primary/30 bg-primary/5 text-primary px-5 py-2.5 rounded-full text-sm font-mono tracking-wider">
              ✦ {quizResult.personality_type.toUpperCase()}
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase">BASE LEVEL</p>
              <p className="font-heading text-xl font-extrabold mt-1">{quizResult.level}</p>
              <p className="text-[10px] text-muted-foreground">when joined</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase">KNOWLEDGE SCORE</p>
              <p className="font-heading text-xl font-extrabold text-primary mt-1">{quizResult.score} / 100</p>
              <p className="text-[10px] text-muted-foreground">at assessment</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase">CURRENT XP</p>
              <p className="font-heading text-xl font-extrabold mt-1">{currentUser.xpPoints}</p>
              <p className="text-[10px] text-muted-foreground">earned building</p>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground/80 italic text-center max-w-lg mx-auto leading-relaxed">
            "{quizResult.personality_description}"
          </p>
        </section>
      ) : (
        <section className="bg-card border border-border border-dashed rounded-xl p-6 mb-8 text-center">
          <p className="text-sm text-muted-foreground">Assessment not taken yet</p>
          <Link to="/quiz" className="text-xs font-mono text-primary hover:underline mt-2 inline-block">
            Take Assessment →
          </Link>
        </section>
      )}

      {/* Projects — Empty State */}
      <section className="mb-8">
        <p className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase mb-4">SHIPPED PROJECTS</p>
        <div className="bg-card border border-border rounded-xl p-8 text-center">
          <p className="text-sm text-muted-foreground mb-1">Your portfolio is empty — for now.</p>
          <p className="text-xs text-muted-foreground mb-4">Every project you ship here becomes part of your permanent portfolio.</p>
          <Link to="/dashboard/track" className="text-xs font-mono text-primary hover:underline">
            Start with your first project brief →
          </Link>
        </div>
      </section>

      {/* Activity Timeline */}
      <section>
        <p className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase mb-4">ACTIVITY</p>
        <div className="relative pl-6 space-y-0">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />
          <div className="relative flex items-start gap-4 py-3">
            <div className="absolute left-[-17px] top-[18px] w-3.5 h-3.5 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            </div>
            <div className="flex-1 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <PartyPopper size={14} className="text-primary" />
                <span className="text-sm text-foreground">Joined Buildhub</span>
              </div>
              <span className="text-[10px] font-mono text-muted-foreground whitespace-nowrap">Just now</span>
            </div>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-4 pl-6">Your story starts here. Start building to fill this timeline.</p>
      </section>
    </div>
  );
}

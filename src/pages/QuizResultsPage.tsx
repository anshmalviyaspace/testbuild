import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface QuizResult {
  track: string;
  score: number;
  level: string;
  personality_type: string;
  personality_description: string;
  category_scores: {
    technical: number;
    technicalMax: number;
    level: string;
    personality: string;
  };
  answers: { questionId: string; optionId: string; category: string; trait?: string; points?: number }[];
  technicalScore: number;
}

const PERSONALITY_ADVICE: Record<string, string> = {
  "The Shipper": "you will learn fastest by starting projects before you feel ready.",
  "The Visionary": "you will learn fastest by pairing big ideas with small, shipped experiments.",
  "The Architect": "you will learn fastest by understanding the why behind each module before starting.",
  "The Analyst": "you will learn fastest by reading the documentation alongside the videos.",
  "The Explorer": "you will learn fastest by trying every project brief, not just the ones that feel safe.",
};

function ScoreRing({ score, size = 120 }: { score: number; size?: number }) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedScore / 100) * circumference;

  useEffect(() => {
    let frame: number;
    const start = Date.now();
    const duration = 1500;
    const animate = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedScore(Math.round(score * eased));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [score]);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} strokeWidth={strokeWidth} fill="none" className="stroke-border" />
        <circle
          cx={size / 2} cy={size / 2} r={radius} strokeWidth={strokeWidth} fill="none"
          className="stroke-primary transition-all duration-100"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-heading text-3xl font-extrabold">{animatedScore}</span>
        <span className="text-xs text-muted-foreground font-mono">/100</span>
      </div>
    </div>
  );
}

export default function QuizResultsPage() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [result, setResult] = useState<QuizResult | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("buildhub_quiz_results");
    if (!stored) {
      navigate("/quiz", { replace: true });
      return;
    }
    setResult(JSON.parse(stored));
  }, [navigate]);

  if (!result || !currentUser) return null;

  const technicalAnswers = result.answers.filter(a => a.category === "technical");
  const advice = PERSONALITY_ADVICE[result.personality_type] || PERSONALITY_ADVICE["The Explorer"];

  const getInsightCards = () => {
    const cards: string[] = [];
    if (result.score < 40) {
      cards.push("Start with Module 1 — it was built for exactly where you are now.");
      cards.push("The AI & ML track is designed so zero prior knowledge is needed.");
    } else if (result.score <= 70) {
      cards.push("You already have a solid foundation — you can skip some early material.");
      cards.push("Focus on Module 3 onwards where real building begins.");
    } else {
      cards.push("Strong technical baseline — you are ready for advanced modules.");
      cards.push("Consider starting from Module 5 (RAG) where things get interesting.");
    }
    cards.push(`Your ${result.personality_type} trait means ${advice}`);
    return cards;
  };

  const handleEnter = () => {
    navigate("/dashboard/home");
  };

  const handleRetake = () => {
    localStorage.removeItem("buildhub_quiz_results");
    navigate("/quiz", { replace: true });
  };

  const trackEmoji = currentUser.currentTrack?.includes("AI") ? "🤖" :
    currentUser.currentTrack?.includes("UI") ? "🎨" :
    currentUser.currentTrack?.includes("Full") ? "💻" : "🚀";

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-glow pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none opacity-50" />

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-12 space-y-10">
        {/* Section 1 — Identity */}
        <section className="text-center animate-fade-in opacity-0" style={{ animationDelay: "0ms" }}>
          <p className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase mb-4">YOUR BUILDHUB PROFILE</p>
          <div className="w-[72px] h-[72px] rounded-full mx-auto mb-4 flex items-center justify-center text-xl font-heading font-bold text-primary-foreground" style={{ background: "linear-gradient(135deg, hsl(160 100% 45%), hsl(220 100% 50%))" }}>
            {currentUser.avatarInitials}
          </div>
          <h1 className="font-heading text-2xl sm:text-[28px] font-extrabold">{currentUser.fullName}</h1>
          <p className="text-sm font-mono text-primary mt-1">@{currentUser.username}</p>
          <p className="text-xs text-muted-foreground mt-1">{currentUser.college}</p>
        </section>

        {/* Section 2 — Personality Type */}
        <section className="text-center animate-fade-in opacity-0" style={{ animationDelay: "150ms" }}>
          <div className="inline-flex items-center gap-2 border border-primary/30 bg-primary/5 text-primary px-5 py-2.5 rounded-full text-sm font-mono tracking-wider">
            ✦ {result.personality_type.toUpperCase()}
          </div>
          <p className="text-foreground/70 mt-4 max-w-[480px] mx-auto leading-relaxed">
            {result.personality_description}
          </p>
        </section>

        {/* Section 3 — Score Card */}
        <section className="animate-fade-in opacity-0" style={{ animationDelay: "300ms" }}>
          <div className="bg-card border border-border rounded-xl p-6 flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
            {/* Left — Base Level */}
            <div className="text-center sm:text-left flex-1">
              <p className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase">BASE LEVEL</p>
              <p className="font-heading text-2xl sm:text-[28px] font-extrabold mt-1">{result.level}</p>
              <p className="text-xs text-muted-foreground mt-1">your starting point</p>
            </div>

            {/* Center — Score Ring */}
            <div className="flex flex-col items-center">
              <ScoreRing score={result.score} />
              <p className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase mt-2">KNOWLEDGE SCORE</p>
            </div>

            {/* Right — Track */}
            <div className="text-center sm:text-right flex-1">
              <p className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase">YOUR TRACK</p>
              <p className="font-heading text-lg font-bold mt-1">
                <span className="mr-2">{trackEmoji}</span>
                {currentUser.currentTrack}
              </p>
            </div>
          </div>
        </section>

        {/* Section 4 — Knowledge Breakdown */}
        <section className="animate-fade-in opacity-0" style={{ animationDelay: "450ms" }}>
          <p className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase mb-4">KNOWLEDGE BREAKDOWN</p>
          <div className="bg-card border border-border rounded-xl divide-y divide-border">
            {technicalAnswers.map((a, i) => (
              <div key={i} className="flex items-center justify-between px-4 py-3">
                <span className="text-sm text-foreground truncate flex-1">Question {i + 1}</span>
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-mono ${(a.points || 0) > 0 ? "text-primary" : "text-destructive"}`}>
                    {(a.points || 0) > 0 ? "✓" : "✗"}
                  </span>
                  <span className={`text-xs font-mono ${(a.points || 0) > 0 ? "text-primary" : "text-muted-foreground"}`}>
                    +{a.points || 0} XP
                  </span>
                </div>
              </div>
            ))}
          </div>
          <p className={`text-sm font-mono mt-3 ${result.technicalScore >= 30 ? "text-primary" : "text-warning"}`}>
            You earned {result.technicalScore} / 60 points
          </p>
        </section>

        {/* Section 5 — What This Means */}
        <section className="animate-fade-in opacity-0" style={{ animationDelay: "600ms" }}>
          <p className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase mb-4">WHAT THIS MEANS FOR YOU</p>
          <div className="space-y-3">
            {getInsightCards().map((card, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-4">
                <p className="text-sm text-foreground/80 leading-relaxed">{card}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 6 — Profile Preview note */}
        <section className="text-center animate-fade-in opacity-0" style={{ animationDelay: "700ms" }}>
          <p className="text-xs text-muted-foreground">This score and your builder type will be visible on your public portfolio.</p>
          <p className="text-xs text-primary mt-1">It updates as you complete modules and ship projects.</p>
        </section>

        {/* Section 7 — CTA */}
        <section className="text-center space-y-3 animate-fade-in opacity-0 pb-8" style={{ animationDelay: "800ms" }}>
          <button
            onClick={handleEnter}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-lg font-semibold text-sm font-heading hover:bg-primary/90 transition-colors"
          >
            Enter Buildhub <ArrowRight size={16} />
          </button>
          <div>
            <button
              onClick={handleRetake}
              className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
            >
              Retake quiz
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

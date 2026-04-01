import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import clsx from "clsx";

interface QuizOption {
  id: string;
  text: string;
  trait?: string;
  correct?: boolean;
  points?: number;
}

interface QuizQuestion {
  id: string;
  track: string;
  category: string;
  question: string;
  options: QuizOption[];
  question_type: string;
  order_index: number;
}

const SECTION_MAP: Record<string, { label: string; emoji: string; tint: string; sectionNum: number; sectionName: string }> = {
  mindset: { label: "🧠 MINDSET", emoji: "🧠", tint: "bg-accent/10 text-accent border-accent/20", sectionNum: 1, sectionName: "MINDSET" },
  technical: { label: "⚡ KNOWLEDGE CHECK", emoji: "⚡", tint: "bg-warning/10 text-warning border-warning/20", sectionNum: 2, sectionName: "KNOWLEDGE" },
  future: { label: "🚀 FUTURE THINKING", emoji: "🚀", tint: "bg-primary/10 text-primary border-primary/20", sectionNum: 3, sectionName: "FUTURE" },
};

const PERSONALITY_DESCRIPTIONS: Record<string, string> = {
  "The Shipper": "You move fast and learn by launching. You get more done in a week than most do in a month. Your superpower is momentum.",
  "The Visionary": "You think in systems and possibilities. You see what others miss. Your challenge is turning ideas into shipped things — this platform will help.",
  "The Architect": "You want to understand everything deeply before you build. When you ship, it is solid. Your superpower is thinking before acting.",
  "The Analyst": "You are driven by understanding. You ask why before how. You will build AI tools that actually make sense of the world.",
  "The Explorer": "You learn by trying everything. You are not afraid to go in a new direction. Your superpower is curiosity without limits.",
};

function getLevel(score: number): string {
  if (score <= 19) return "Beginner";
  if (score <= 39) return "Explorer";
  if (score <= 59) return "Builder";
  if (score <= 79) return "Maker";
  return "Architect";
}

function getPersonalityType(traits: string[], futureTraits: string[]): string {
  const counts: Record<string, number> = {};
  traits.forEach(t => { counts[t] = (counts[t] || 0) + 1; });
  
  let maxCount = 0;
  let maxTrait = "explorer";
  const ties: string[] = [];
  
  Object.entries(counts).forEach(([trait, count]) => {
    if (count > maxCount) {
      maxCount = count;
      maxTrait = trait;
      ties.length = 0;
      ties.push(trait);
    } else if (count === maxCount) {
      ties.push(trait);
    }
  });

  if (ties.length > 1 && futureTraits.length > 0) {
    maxTrait = futureTraits[futureTraits.length - 1];
  }

  const nameMap: Record<string, string> = {
    shipper: "The Shipper",
    visionary: "The Visionary",
    architect: "The Architect",
    analyst: "The Analyst",
    explorer: "The Explorer",
  };
  return nameMap[maxTrait] || "The Explorer";
}

// Section transition interstitial
function SectionTransition({ category, onComplete }: { category: string; onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  const content = category === "mindset"
    ? { emoji: "🧠", title: "Mindset mapped.", sub: "Now let's check your technical baseline." }
    : { emoji: "⚡", title: "Knowledge logged.", sub: "Last section — tell us about your future." };

  return (
    <div className="flex flex-col items-center justify-center animate-fade-in opacity-0">
      <span className="text-7xl mb-6">{content.emoji}</span>
      <h2 className="font-heading text-3xl sm:text-4xl font-extrabold mb-3">{content.title}</h2>
      <p className="text-sm text-muted-foreground">{content.sub}</p>
    </div>
  );
}

export default function QuizPage() {
  const navigate = useNavigate();
  const { currentUser, session, refreshProfile } = useAuth();
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const [answers, setAnswers] = useState<{ questionId: string; optionId: string; category: string; trait?: string; points?: number }[]>([]);
  const [showTransition, setShowTransition] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [slideDirection, setSlideDirection] = useState<"in" | "out">("in");
  const [saving, setSaving] = useState(false);

  const userId = session?.user?.id;

  useEffect(() => {
    async function fetchQuestions() {
      // Check if quiz already taken
      if (userId) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("quiz_taken")
          .eq("id", userId)
          .single();
        if (profile?.quiz_taken) {
          navigate("/dashboard/home", { replace: true });
          return;
        }
      }

      const { data, error } = await supabase
        .from("quiz_questions")
        .select("*")
        .order("order_index", { ascending: true });

      if (error) {
        console.error("Error fetching questions:", error);
        setLoading(false);
        return;
      }

      const mapped = (data || []).map(q => ({
        ...q,
        options: q.options as unknown as QuizOption[],
        question_type: q.question_type || "single",
        order_index: q.order_index || 0,
      }));
      setQuestions(mapped);
      setLoading(false);
    }
    fetchQuestions();
  }, [userId, navigate]);

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const progress = totalQuestions > 0 ? ((currentIndex) / totalQuestions) * 100 : 0;

  const currentSection = currentQuestion ? SECTION_MAP[currentQuestion.category] : null;

  const handleSelect = useCallback((optionId: string) => {
    if (selectedOption) return;
    setSelectedOption(optionId);

    const q = questions[currentIndex];
    const option = q.options.find(o => o.id === optionId);

    if (q.question_type === "personality" || q.category !== "technical") {
      setShowNext(true);
    } else {
      // Technical question — reveal after 400ms
      setTimeout(() => setRevealed(true), 400);
      setTimeout(() => setShowNext(true), 800);
    }

    setAnswers(prev => [...prev, {
      questionId: q.id,
      optionId,
      category: q.category,
      trait: option?.trait,
      points: option?.points || 0,
    }]);
  }, [selectedOption, questions, currentIndex]);

  const handleNext = useCallback(async () => {
    const q = questions[currentIndex];
    const nextIndex = currentIndex + 1;

    // Check if we're transitioning between sections
    if (nextIndex < totalQuestions) {
      const nextQ = questions[nextIndex];
      if (q.category !== nextQ.category) {
        setShowTransition(q.category);
        setSelectedOption(null);
        setRevealed(false);
        setShowNext(false);
        return;
      }
    }

    if (nextIndex >= totalQuestions) {
      // Quiz complete — calculate results
      await calculateAndSaveResults();
      return;
    }

    setSlideDirection("out");
    setTimeout(() => {
      setCurrentIndex(nextIndex);
      setSelectedOption(null);
      setRevealed(false);
      setShowNext(false);
      setSlideDirection("in");
    }, 200);
  }, [currentIndex, questions, totalQuestions]);

  const handleTransitionComplete = useCallback(() => {
    setShowTransition(null);
    setSlideDirection("out");
    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
      setSlideDirection("in");
    }, 200);
  }, []);

  const calculateAndSaveResults = async () => {
    if (!userId) {
      console.error("No user ID available for saving quiz results");
      return;
    }

    setSaving(true);

    const technicalAnswers = answers.filter(a => a.category === "technical");
    const technicalScore = technicalAnswers.reduce((sum, a) => sum + (a.points || 0), 0);
    const finalScore = Math.round((technicalScore / 60) * 100);
    const level = getLevel(finalScore);

    const personalityTraits = answers.filter(a => a.trait).map(a => a.trait!);
    const futureTraits = answers.filter(a => a.category === "future" && a.trait).map(a => a.trait!);
    const personalityType = getPersonalityType(personalityTraits, futureTraits);
    const personalityDescription = PERSONALITY_DESCRIPTIONS[personalityType] || "";

    const categoryScores = {
      technical: technicalScore,
      technicalMax: 60,
      level,
      personality: personalityType,
    };

    const track = currentUser?.currentTrack || "AI & Machine Learning";

    // Save results to localStorage for the results page
    const resultData = {
      track,
      score: finalScore,
      level,
      personality_type: personalityType,
      personality_description: personalityDescription,
      category_scores: categoryScores,
      answers,
      technicalScore,
    };
    localStorage.setItem("buildhub_quiz_results", JSON.stringify(resultData));

    // Save to database
    try {
      const { error: upsertError } = await supabase.from("quiz_results").upsert({
        user_id: userId,
        track,
        score: finalScore,
        level,
        personality_type: personalityType,
        personality_description: personalityDescription,
        category_scores: categoryScores,
        answers,
      });
      if (upsertError) console.error("Quiz results upsert error:", upsertError);

      const { error: profileError } = await supabase.from("profiles").update({
        quiz_score: finalScore,
        quiz_level: level,
        personality_type: personalityType,
        quiz_taken: true,
      }).eq("id", userId);
      if (profileError) console.error("Profile update error:", profileError);
    } catch (err) {
      console.error("Error saving quiz results:", err);
    }

    await refreshProfile();
    setSaving(false);
    navigate("/quiz/results");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground font-mono text-sm">Loading quiz...</div>
      </div>
    );
  }

  if (showTransition) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <SectionTransition category={showTransition} onComplete={handleTransitionComplete} />
      </div>
    );
  }

  if (!currentQuestion) return null;

  const isPersonality = currentQuestion.question_type === "personality" || currentQuestion.category !== "technical";
  const correctOption = !isPersonality ? currentQuestion.options.find(o => o.correct) : null;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Green radial glow */}
      <div className="absolute inset-0 bg-radial-glow pointer-events-none" />
      {/* Dot grid */}
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none opacity-50" />

      {/* Top Bar */}
      <header className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-border">
        <div className="flex items-center gap-2">
          <span className="font-heading text-lg font-extrabold tracking-tight">
            <span className="text-primary">Build</span>hub
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-dot" />
        </div>

        <div className="hidden sm:block text-xs font-mono text-muted-foreground tracking-widest">
          SECTION {currentSection?.sectionNum} OF 3 — {currentSection?.sectionName}
        </div>

        <span className="text-xs font-mono text-muted-foreground">
          {currentIndex + 1} / {totalQuestions}
        </span>
      </header>

      {/* Progress bar */}
      <div className="relative z-10 h-0.5 bg-border">
        <div
          className="h-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-60px)] p-6">
        <div
          className={clsx(
            "w-full max-w-[680px] transition-all duration-300",
            slideDirection === "in" ? "animate-slide-from-right" : "opacity-0 -translate-x-10"
          )}
          key={currentIndex}
        >
          {/* Section pill */}
          <div className={clsx("inline-flex items-center gap-1.5 text-[10px] font-mono tracking-widest px-3 py-1 rounded-full border mb-6", currentSection?.tint)}>
            {currentSection?.label}
          </div>

          {/* Question */}
          <h2 className="font-heading text-xl sm:text-2xl font-bold text-foreground mb-8 leading-tight tracking-tight">
            {currentQuestion.question}
          </h2>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, i) => {
              const letter = String.fromCharCode(65 + i);
              const isSelected = selectedOption === option.id;
              const isCorrect = option.correct;
              const showCorrect = revealed && isCorrect;
              const showWrong = revealed && isSelected && !isCorrect;

              return (
                <button
                  key={option.id}
                  onClick={() => handleSelect(option.id)}
                  disabled={!!selectedOption}
                  className={clsx(
                    "w-full flex items-center gap-4 p-4 rounded-[10px] border text-left transition-all duration-200",
                    // Default
                    !selectedOption && "bg-card border-border hover:border-muted-foreground/40 hover:bg-surface2",
                    // Personality selected
                    isPersonality && isSelected && "border-primary bg-primary/5",
                    // Technical correct
                    showCorrect && "border-primary bg-primary/10",
                    // Technical wrong
                    showWrong && "border-destructive bg-destructive/10",
                    // Technical not selected, not correct, after reveal
                    revealed && !isSelected && !isCorrect && "opacity-50",
                    // Personality not selected
                    isPersonality && selectedOption && !isSelected && "opacity-50",
                  )}
                >
                  {/* Letter badge */}
                  <div className={clsx(
                    "w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono shrink-0 transition-colors",
                    isPersonality && isSelected ? "bg-primary text-primary-foreground" : 
                    showCorrect ? "bg-primary text-primary-foreground" :
                    showWrong ? "bg-destructive text-destructive-foreground" :
                    "bg-surface2 text-muted-foreground"
                  )}>
                    {letter}
                  </div>

                  {/* Text */}
                  <span className="text-sm text-foreground flex-1">{option.text}</span>

                  {/* Result badges */}
                  {showCorrect && (
                    <span className="text-xs font-mono text-primary shrink-0">✓ Correct</span>
                  )}
                  {showWrong && (
                    <span className="text-xs font-mono text-destructive shrink-0">✗</span>
                  )}
                  {isPersonality && isSelected && (
                    <div className="w-1 h-8 bg-primary rounded-full shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Technical explanation */}
          {revealed && !isPersonality && (
            <p className="text-sm text-muted-foreground italic mt-4 animate-fade-in opacity-0">
              {correctOption?.text && `The answer is "${correctOption.text}".`}
            </p>
          )}

          {/* Next button */}
          {showNext && (
            <div className="flex justify-end mt-6 animate-fade-in opacity-0">
              <button
                onClick={handleNext}
                className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg text-sm font-semibold font-heading hover:bg-primary/90 transition-colors"
              >
                {currentIndex >= totalQuestions - 1 ? "See My Results" : "Next"} <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

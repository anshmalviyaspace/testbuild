import { CheckCircle2, PlayCircle, Lock } from "lucide-react";
import clsx from "clsx";
import type { Module } from "@/data/trackData";

const TRACK_META: Record<string, { emoji: string; difficulty: string }> = {
  "AI & Machine Learning": { emoji: "🤖", difficulty: "Beginner Friendly" },
  "UI/UX Design":          { emoji: "🎨", difficulty: "Visual" },
  "Full Stack Dev":        { emoji: "💻", difficulty: "Intermediate" },
  "Build a Startup":       { emoji: "🚀", difficulty: "Advanced" },
};

interface Props {
  modules: Module[];
  activeModuleId: number;
  completedCount: number;
  totalXp: number;
  totalPossibleXp: number;
  progressPercent: number;
  track: string;
  onModuleClick: (mod: Module) => void;
}

export default function TrackSidebar({
  modules,
  activeModuleId,
  completedCount,
  totalXp,
  totalPossibleXp,
  progressPercent,
  track,
  onModuleClick,
}: Props) {
  const meta = TRACK_META[track] ?? { emoji: "🚀", difficulty: "Self-paced" };

  return (
    <div className="w-full lg:w-[400px] shrink-0 border-r border-border bg-surface overflow-y-auto p-6 space-y-6">
      {/* Track header */}
      <div>
        <h1 className="font-heading text-xl font-extrabold flex items-center gap-2">
          <span className="text-2xl">{meta.emoji}</span> {track}
        </h1>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-[10px] font-mono bg-primary/10 text-primary px-2 py-0.5 rounded-full">
            {meta.difficulty}
          </span>
          <span className="text-xs font-mono text-muted-foreground">
            {completedCount} of {modules.length} modules complete
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div>
        <div className="w-full h-2 bg-surface2 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="text-xs font-mono text-muted-foreground mt-2">
          <span className="text-primary font-medium">{totalXp}</span> / {totalPossibleXp} XP
        </p>
      </div>

      {/* Module list */}
      <div className="space-y-1.5">
        {modules.map((mod) => {
          const isActive = mod.id === activeModuleId;
          return (
            <button
              key={mod.id}
              onClick={() => onModuleClick(mod)}
              className={clsx(
                "w-full text-left rounded-lg p-3.5 transition-all duration-200",
                isActive ? "bg-surface2 ring-1 ring-border" : "hover:bg-surface2/60",
                mod.status === "locked" && "opacity-60 cursor-not-allowed"
              )}
            >
              <div className="flex items-start gap-3">
                {/* Status icon */}
                <div className="mt-0.5 shrink-0">
                  {mod.status === "completed" ? (
                    <CheckCircle2 size={18} className="text-primary" />
                  ) : mod.status === "in-progress" ? (
                    <PlayCircle size={18} className="text-warning" />
                  ) : (
                    <Lock size={14} className="text-muted-foreground mt-0.5" />
                  )}
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <p
                    className={clsx(
                      "text-sm leading-snug",
                      mod.status === "completed"
                        ? "text-muted-foreground"
                        : mod.status === "in-progress"
                        ? "text-foreground font-semibold"
                        : "text-muted-foreground/70"
                    )}
                  >
                    {mod.title}
                  </p>

                  <div className="flex items-center gap-2 mt-1.5">
                    {mod.status === "completed" && (
                      <>
                        <span className="text-[10px] font-mono text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                          ✓ Completed
                        </span>
                        <span className="text-[10px] font-mono text-muted-foreground">
                          +{mod.xp} XP
                        </span>
                      </>
                    )}
                    {mod.status === "in-progress" && (
                      <>
                        <span className="text-[10px] font-mono text-warning bg-warning/10 px-1.5 py-0.5 rounded">
                          ▶ In Progress
                        </span>
                        <span className="text-[10px] font-mono text-primary">
                          +{mod.xp} XP
                        </span>
                      </>
                    )}
                    {mod.status === "locked" && (
                      <span className="text-[10px] font-mono text-muted-foreground/50 bg-surface2 px-1.5 py-0.5 rounded">
                        🔒 Locked · +{mod.xp} XP
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
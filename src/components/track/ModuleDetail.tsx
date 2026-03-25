import { Play, FileText, BookOpen, Lock, ArrowRight, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import type { Module, Resource } from "@/data/trackData";

const typeConfig: Record<Resource["type"], { icon: typeof Play; color: string; bg: string }> = {
  video: { icon: Play, color: "text-destructive", bg: "bg-destructive/10" },
  article: { icon: FileText, color: "text-accent", bg: "bg-accent/10" },
  docs: { icon: BookOpen, color: "text-primary", bg: "bg-primary/10" },
};

interface Props {
  module: Module;
  checkedResources: Set<string>;
  onToggleResource: (id: string) => void;
  onRequestComplete: () => void;
}

export default function ModuleDetail({
  module,
  checkedResources,
  onToggleResource,
  onRequestComplete,
}: Props) {
  const navigate = useNavigate();
  const isCompleted = module.status === "completed";
  const isInProgress = module.status === "in-progress";
  const briefUnlocked = isCompleted && module.projectBrief;

  return (
    <div className="p-6 sm:p-8 max-w-3xl space-y-8 animate-fade-in opacity-0">
      {/* Module header */}
      <div>
        <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2">
          MODULE {String(module.id).padStart(2, "0")}
        </p>
        <h1 className="font-heading text-2xl font-extrabold leading-tight">
          {module.title}
        </h1>
        <div className="flex items-center gap-2 mt-3">
          {isCompleted && (
            <span className="text-[10px] font-mono bg-primary/10 text-primary px-2 py-0.5 rounded-full flex items-center gap-1">
              <CheckCircle2 size={10} /> Completed
            </span>
          )}
          {isInProgress && (
            <span className="text-[10px] font-mono bg-primary/10 text-primary px-2 py-0.5 rounded-full">
              ▶ In Progress
            </span>
          )}
          <span className="text-[10px] font-mono text-muted-foreground">
            +{module.xp} XP
          </span>
        </div>
        <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
          {module.description}
        </p>
      </div>

      {/* Resources */}
      <div>
        <p className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase mb-4">
          RESOURCES
        </p>
        <div className="space-y-2">
          {module.resources.map((r) => {
            const cfg = typeConfig[r.type];
            const checked = checkedResources.has(r.id);
            return (
              <div
                key={r.id}
                className={clsx(
                  "flex items-center gap-3 bg-card border border-border rounded-lg p-3.5 transition-all duration-200",
                  checked && "border-primary/20 bg-primary/[0.03]"
                )}
              >
                {/* Checkbox */}
                <button
                  onClick={() => onToggleResource(r.id)}
                  className={clsx(
                    "w-5 h-5 rounded border-2 shrink-0 flex items-center justify-center transition-all",
                    checked
                      ? "bg-primary border-primary"
                      : "border-border hover:border-muted-foreground"
                  )}
                >
                  {checked && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-foreground" />
                    </svg>
                  )}
                </button>

                {/* Type icon */}
                <div className={`w-8 h-8 rounded-lg ${cfg.bg} flex items-center justify-center shrink-0`}>
                  <cfg.icon size={14} className={cfg.color} />
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={clsx(
                      "text-sm font-medium hover:text-primary transition-colors block truncate",
                      checked ? "text-muted-foreground line-through" : "text-foreground"
                    )}
                  >
                    {r.title}
                  </a>
                  <p className="text-[10px] font-mono text-muted-foreground mt-0.5">
                    {r.source}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Project Brief */}
      <div>
        <p className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase mb-4">
          🎯 PROJECT BRIEF
        </p>

        {briefUnlocked && module.projectBrief ? (
          /* Unlocked brief */
          <div className="bg-card border border-border rounded-xl p-6 space-y-5">
            <div>
              <h2 className="font-heading text-xl font-extrabold">{module.projectBrief.title}</h2>
              <p className="text-sm italic text-muted-foreground mt-1">{module.projectBrief.tagline}</p>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              {module.projectBrief.description}
            </p>

            <ul className="space-y-2">
              {module.projectBrief.features.map((f) => (
                <li key={f} className="text-sm flex items-start gap-2">
                  <span className="text-primary mt-0.5">✦</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center gap-2">
              {module.projectBrief.techStack.map((t) => (
                <span
                  key={t}
                  className="text-[10px] font-mono bg-surface2 text-muted-foreground px-2.5 py-1 rounded-full"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground">
              <span>⏱ {module.projectBrief.estimatedHours} hours</span>
              <span className="bg-surface2 px-2 py-0.5 rounded">{module.projectBrief.difficulty}</span>
            </div>

            {/* Starter tip */}
            <div className="border-l-2 border-primary bg-primary/[0.04] rounded-r-lg px-4 py-3">
              <p className="text-xs font-mono text-primary uppercase tracking-wider mb-1">💡 Starter Tip</p>
              <p className="text-sm text-muted-foreground">{module.projectBrief.starterTip}</p>
            </div>

            <button
              onClick={() =>
                navigate("/dashboard/projects", {
                  state: {
                    prefillTitle: module.projectBrief!.title,
                    prefillDescription: module.projectBrief!.description,
                  },
                })
              }
              className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors"
            >
              Start This Project <ArrowRight size={14} />
            </button>
          </div>
        ) : (
          /* Locked/blurred brief */
          <div className="relative rounded-xl overflow-hidden">
            {/* Blurred content */}
            <div className="bg-card border border-border rounded-xl p-6 space-y-3 blur-sm select-none pointer-events-none">
              <h2 className="font-heading text-lg font-bold">Project Title Here</h2>
              <p className="text-sm text-muted-foreground">
                This project brief will be unlocked once you complete this module. It includes
                a full project specification, features, tech stack, and starter tips.
              </p>
              <div className="flex gap-2">
                <span className="bg-surface2 px-3 py-1 rounded text-xs">React</span>
                <span className="bg-surface2 px-3 py-1 rounded text-xs">Python</span>
              </div>
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-card/60 backdrop-blur-[2px] rounded-xl flex flex-col items-center justify-center gap-3">
              <Lock size={24} className="text-muted-foreground" />
              <p className="text-sm text-muted-foreground text-center max-w-xs">
                Complete this module to unlock your project brief
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Mark complete button */}
      {isInProgress && (
        <button
          onClick={onRequestComplete}
          className="w-full bg-primary text-primary-foreground py-3.5 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
        >
          Mark Module as Complete ✓
        </button>
      )}
    </div>
  );
}

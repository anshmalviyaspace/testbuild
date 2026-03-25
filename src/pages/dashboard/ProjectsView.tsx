import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Plus, Heart, Eye, Calendar, Pencil, ArrowRight, Rocket } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import NewProjectModal from "@/components/projects/NewProjectModal";

export interface ShippedProject {
  id: string;
  title: string;
  description: string;
  tags: string[];
  emoji: string;
  likes: number;
  views: number;
  shippedAt: string;
  gradientFrom: string;
  gradientTo: string;
  url?: string;
}

const gradients = [
  { from: "hsl(160 100% 45% / 0.3)", to: "hsl(220 100% 50% / 0.2)" },
  { from: "hsl(280 80% 60% / 0.3)", to: "hsl(346 100% 62% / 0.2)" },
  { from: "hsl(220 100% 50% / 0.3)", to: "hsl(160 100% 45% / 0.2)" },
  { from: "hsl(45 100% 60% / 0.3)", to: "hsl(25 95% 55% / 0.2)" },
];

const initialProjects: ShippedProject[] = [
  {
    id: "p1",
    title: "AI Resume Analyzer",
    description:
      "An AI-powered tool that analyzes resumes against job descriptions, highlights gaps, and suggests improvements using Claude.",
    tags: ["AI", "Python"],
    emoji: "🤖",
    likes: 47,
    views: 234,
    shippedAt: "2 weeks ago",
    gradientFrom: gradients[0].from,
    gradientTo: gradients[0].to,
  },
  {
    id: "p2",
    title: "Prompt Battle Arena",
    description:
      "A gamified platform where users pit different prompts against each other to see which generates better AI outputs.",
    tags: ["React", "Claude API"],
    emoji: "⚡",
    likes: 31,
    views: 189,
    shippedAt: "1 month ago",
    gradientFrom: gradients[1].from,
    gradientTo: gradients[1].to,
  },
  {
    id: "p3",
    title: "AI Concept Explainer",
    description:
      "A simple web tool that takes any AI/ML concept and explains it in plain language with analogies and examples.",
    tags: ["HTML", "JS", "Claude API"],
    emoji: "🧠",
    likes: 22,
    views: 156,
    shippedAt: "6 weeks ago",
    gradientFrom: gradients[2].from,
    gradientTo: gradients[2].to,
  },
];

export default function ProjectsView() {
  const { toast } = useToast();
  const location = useLocation();
  const [projects, setProjects] = useState<ShippedProject[]>(initialProjects);
  const [showModal, setShowModal] = useState(false);

  // Check if navigated from Track with brief pre-fill
  const briefData = location.state as {
    prefillTitle?: string;
    prefillDescription?: string;
  } | null;

  // Auto-open modal if brief data passed
  useEffect(() => {
    if (briefData?.prefillTitle) {
      setShowModal(true);
    }
  }, [briefData]);

  const handlePublish = (project: {
    title: string;
    description: string;
    tags: string[];
    emoji: string;
    url: string;
    track: string;
  }) => {
    const gradIdx = projects.length % gradients.length;
    const newProject: ShippedProject = {
      id: `p_${Date.now()}`,
      title: project.title,
      description: project.description,
      tags: project.tags,
      emoji: project.emoji,
      likes: 0,
      views: 0,
      shippedAt: "Just now",
      gradientFrom: gradients[gradIdx].from,
      gradientTo: gradients[gradIdx].to,
      url: project.url || undefined,
    };

    setProjects((prev) => [newProject, ...prev]);
    setShowModal(false);

    toast({
      title: "Project shipped! 🚀",
      description: "It's now live on your portfolio.",
    });
  };

  // Empty state
  if (projects.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-sm">
          <span className="text-6xl block mb-6">🚀</span>
          <h2 className="font-heading text-xl font-bold mb-2">
            You haven't shipped anything yet.
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            Your first project is one brief away.
          </p>
          <Link
            to="/dashboard/track"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors"
          >
            Start With a Brief <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-8 animate-fade-in opacity-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <h1 className="font-heading text-2xl font-extrabold">My Projects</h1>
          <span className="text-[10px] font-mono bg-primary/10 text-primary px-2.5 py-1 rounded-full">
            {projects.length} shipped
          </span>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors"
        >
          <Plus size={16} /> Ship a New Project
        </button>
      </div>

      {/* Projects grid */}
      <div className="grid sm:grid-cols-2 gap-5">
        {projects.map((p) => (
          <div
            key={p.id}
            className="bg-card border border-border rounded-xl overflow-hidden card-hover-glow group"
          >
            {/* Emoji thumbnail */}
            <div
              className="h-32 flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${p.gradientFrom}, ${p.gradientTo})`,
              }}
            >
              <span className="text-5xl group-hover:scale-110 transition-transform duration-300">
                {p.emoji}
              </span>
            </div>

            <div className="p-5 space-y-3">
              <h3 className="font-heading text-base font-bold">{p.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                {p.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap items-center gap-1.5">
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono bg-surface2 text-muted-foreground px-2 py-0.5 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground pt-1">
                <span className="flex items-center gap-1">
                  <Heart size={11} className="text-destructive" /> {p.likes}
                </span>
                <span className="flex items-center gap-1">
                  <Eye size={11} /> {p.views}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={11} /> {p.shippedAt}
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-2">
                <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors font-mono">
                  <Pencil size={11} /> Edit
                </button>
                <Link
                  to="/dashboard/portfolio"
                  className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors font-mono"
                >
                  View on Portfolio <ArrowRight size={11} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <NewProjectModal
          onClose={() => setShowModal(false)}
          onPublish={handlePublish}
          prefillTitle={briefData?.prefillTitle}
          prefillDescription={briefData?.prefillDescription}
        />
      )}
    </div>
  );
}

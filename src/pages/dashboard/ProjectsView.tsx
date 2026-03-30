import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Plus, Heart, Eye, Calendar, Pencil, ArrowRight, Rocket } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
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

export default function ProjectsView() {
  const { toast } = useToast();
  const location = useLocation();
  const [projects, setProjects] = useState<ShippedProject[]>([]);
  const [showModal, setShowModal] = useState(false);

  const briefData = location.state as { prefillTitle?: string; prefillDescription?: string; openModal?: boolean } | null;

  useEffect(() => {
    if (briefData?.prefillTitle || briefData?.openModal) setShowModal(true);
  }, [briefData]);

  useKeyboardShortcuts({
    onNewProject: () => setShowModal(true),
    onEscape: () => setShowModal(false),
  });

  const handlePublish = (project: { title: string; description: string; tags: string[]; emoji: string; url: string; track: string }) => {
    const gradIdx = projects.length % gradients.length;
    setProjects(prev => [{ id: `p_${Date.now()}`, title: project.title, description: project.description, tags: project.tags, emoji: project.emoji, likes: 0, views: 0, shippedAt: "Just now", gradientFrom: gradients[gradIdx].from, gradientTo: gradients[gradIdx].to, url: project.url || undefined }, ...prev]);
    setShowModal(false);
    toast({ title: "Project shipped! 🚀", description: "It's now live on your portfolio." });
  };

  if (projects.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-8 animate-fade-in opacity-0">
        <div className="text-center max-w-sm">
          <span className="text-6xl block mb-6">🚀</span>
          <h2 className="font-heading text-xl font-bold mb-2">Nothing shipped yet.</h2>
          <p className="text-sm text-muted-foreground mb-6">Your first project brief is waiting in your track.</p>
          <Link to="/dashboard/track" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors">
            Go to My Track <ArrowRight size={14} />
          </Link>
        </div>
        {showModal && (
          <NewProjectModal onClose={() => setShowModal(false)} onPublish={handlePublish} prefillTitle={briefData?.prefillTitle} prefillDescription={briefData?.prefillDescription} />
        )}
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-8 animate-fade-in opacity-0">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <h1 className="font-heading text-2xl font-extrabold">My Projects</h1>
          <span className="text-[10px] font-mono bg-primary/10 text-primary px-2.5 py-1 rounded-full">{projects.length} shipped</span>
        </div>
        <button onClick={() => setShowModal(true)} className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors">
          <Plus size={16} /> Ship a New Project
        </button>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        {projects.map(p => (
          <div key={p.id} className="bg-card border border-border rounded-xl overflow-hidden card-hover-glow group">
            <div className="h-32 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${p.gradientFrom}, ${p.gradientTo})` }}>
              <span className="text-5xl group-hover:scale-110 transition-transform duration-300">{p.emoji}</span>
            </div>
            <div className="p-5 space-y-3">
              <h3 className="font-heading text-base font-bold">{p.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{p.description}</p>
              <div className="flex flex-wrap items-center gap-1.5">
                {p.tags.map(tag => <span key={tag} className="text-[10px] font-mono bg-surface2 text-muted-foreground px-2 py-0.5 rounded">{tag}</span>)}
              </div>
              <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground pt-1">
                <span className="flex items-center gap-1"><Heart size={11} className="text-destructive" /> {p.likes}</span>
                <span className="flex items-center gap-1"><Eye size={11} /> {p.views}</span>
                <span className="flex items-center gap-1"><Calendar size={11} /> {p.shippedAt}</span>
              </div>
              <div className="flex items-center gap-3 pt-2">
                <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors font-mono"><Pencil size={11} /> Edit</button>
                <Link to="/dashboard/portfolio" className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors font-mono">View on Portfolio <ArrowRight size={11} /></Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <NewProjectModal onClose={() => setShowModal(false)} onPublish={handlePublish} prefillTitle={briefData?.prefillTitle} prefillDescription={briefData?.prefillDescription} />
      )}
    </div>
  );
}

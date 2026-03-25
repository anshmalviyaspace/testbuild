import { X, Eye, Heart, MessageSquare } from "lucide-react";
import type { Project } from "./ProjectsFeed";

const fakeComments = [
  { user: "arjun_dev", text: "This is super clean! Love the approach.", time: "2 days ago" },
  { user: "sneha.codes", text: "How did you handle the API rate limiting?", time: "1 day ago" },
  { user: "priya_ux", text: "The UI is 🔥. Would love to see a dark mode version.", time: "5 hours ago" },
];

export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />

      {/* Modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-card border border-border rounded-xl overflow-hidden animate-scale-in"
      >
        {/* Header image area */}
        <div className="h-40 bg-surface2 flex items-center justify-center relative">
          <span className="text-5xl opacity-30">
            {project.tags[0] === "AI" || project.tags[0] === "ML" ? "🤖" : project.tags[0] === "React" || project.tags[0] === "Next.js" ? "💻" : "🎨"}
          </span>
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/60 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Title & meta */}
          <div>
            <h3 className="font-heading text-xl font-bold">{project.name}</h3>
            <p className="text-sm text-muted-foreground font-mono mt-1">
              {project.author} · {project.college}
            </p>
          </div>

          {/* Tags */}
          <div className="flex items-center gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-mono bg-surface2 text-muted-foreground px-2.5 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6 text-sm font-mono text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Eye size={14} /> {project.views} views
            </span>
            <span className="flex items-center gap-1.5">
              <Heart size={14} /> {project.likes} likes
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed">
            A student-built project showcasing real-world application of{" "}
            {project.tags.join(" & ")} skills. Built as part of the Buildhub
            track curriculum with peer feedback and mentor review.
          </p>

          {/* Comments */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <MessageSquare size={14} className="text-muted-foreground" />
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                Comments ({fakeComments.length})
              </span>
            </div>
            <div className="space-y-3">
              {fakeComments.map((c) => (
                <div
                  key={c.user}
                  className="bg-surface rounded-lg p-3"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-mono text-primary">@{c.user}</span>
                    <span className="text-[10px] font-mono text-muted-foreground">{c.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{c.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

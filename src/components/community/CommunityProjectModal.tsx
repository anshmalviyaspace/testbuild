import { useState } from "react";
import { X, Heart, ExternalLink, ArrowRight, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import type { CommunityProject } from "@/data/communityData";
import { avatarColors } from "@/data/communityData";

interface Comment {
  id: string;
  author: string;
  username: string;
  text: string;
  time: string;
}

const defaultComments: Comment[] = [
  {
    id: "c1",
    author: "Sneha K.",
    username: "snehak",
    text: "This is exactly what I needed for my semester project! How did you handle the PDF parsing?",
    time: "2 days ago",
  },
  {
    id: "c2",
    author: "Karan R.",
    username: "karanr",
    text: "The prompt engineering here is really clever. Would love to see a video walkthrough.",
    time: "3 days ago",
  },
  {
    id: "c3",
    author: "Meera S.",
    username: "meeras",
    text: "Shipped mine inspired by this. Check it out!",
    time: "1 week ago",
  },
];

interface Props {
  project: CommunityProject;
  liked: boolean;
  onLike: () => void;
  onClose: () => void;
}

export default function CommunityProjectModal({ project: p, liked, onLike, onClose }: Props) {
  const { currentUser } = useAuth();
  const [comments, setComments] = useState<Comment[]>(defaultComments);
  const [commentText, setCommentText] = useState("");

  const initials = p.author.replace(/\./g, "").split(" ").map((w) => w[0]).join("").toUpperCase();

  const handlePost = () => {
    if (!commentText.trim() || !currentUser) return;
    setComments((prev) => [
      {
        id: `c_${Date.now()}`,
        author: currentUser.fullName,
        username: currentUser.username,
        text: commentText.trim(),
        time: "Just now",
      },
      ...prev,
    ]);
    setCommentText("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-[5vh] overflow-y-auto" onClick={onClose}>
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-card border border-border rounded-xl overflow-hidden animate-scale-in mb-8"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-background/60 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
        >
          <X size={16} />
        </button>

        {/* Thumbnail */}
        <div
          className="h-44 flex items-center justify-center"
          style={{ background: `linear-gradient(135deg, ${p.gradientFrom}, ${p.gradientTo})` }}
        >
          <span className="text-6xl">{p.emoji}</span>
        </div>

        <div className="p-6 space-y-6">
          {/* Title & author */}
          <div>
            <h2 className="font-heading text-2xl font-extrabold">{p.title}</h2>
            <div className="flex items-center gap-2 mt-2">
              <div
                className={`w-7 h-7 rounded-full bg-gradient-to-br ${avatarColors[p.username] || "from-primary to-accent"} flex items-center justify-center text-[9px] font-mono font-semibold text-primary-foreground`}
              >
                {initials}
              </div>
              <span className="text-sm text-muted-foreground font-mono">
                {p.author} · {p.college}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>

          {/* Tech stack */}
          <div className="flex flex-wrap items-center gap-2">
            {p.tags.map((tag) => (
              <span key={tag} className="text-[10px] font-mono bg-surface2 text-muted-foreground px-2.5 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>

          {/* Stats & actions */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors"
            >
              Visit Project <ExternalLink size={14} />
            </a>
            <button
              onClick={onLike}
              className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-mono transition-all border ${
                liked
                  ? "border-destructive/30 bg-destructive/10 text-destructive"
                  : "border-border text-muted-foreground hover:text-destructive hover:border-destructive/30"
              }`}
            >
              <Heart size={14} className={liked ? "fill-current" : ""} />
              {liked ? p.likes + 1 : p.likes}
            </button>
          </div>

          {/* Author card */}
          <div className="bg-surface border border-border rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full bg-gradient-to-br ${avatarColors[p.username] || "from-primary to-accent"} flex items-center justify-center text-xs font-mono font-semibold text-primary-foreground`}
              >
                {initials}
              </div>
              <div>
                <p className="text-sm font-medium">{p.author}</p>
                <p className="text-xs text-muted-foreground font-mono">
                  {p.college} ·{" "}
                  <span className="text-primary">{p.track}</span>
                </p>
              </div>
            </div>
            <Link
              to={`/profile/${p.username}`}
              onClick={onClose}
              className="text-xs font-mono text-primary hover:underline flex items-center gap-1"
            >
              View Portfolio <ArrowRight size={11} />
            </Link>
          </div>

          {/* Comments */}
          <div>
            <p className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase mb-4">
              COMMENTS ({comments.length})
            </p>

            {/* Comment input */}
            <div className="flex items-start gap-3 mb-5">
              {currentUser && (
                <div
                  className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-[9px] font-mono font-semibold text-primary-foreground shrink-0 mt-1"
                >
                  {currentUser.avatarInitials}
                </div>
              )}
              <div className="flex-1 flex gap-2">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value.slice(0, 500))}
                  onKeyDown={(e) => { if (e.key === "Enter") handlePost(); }}
                  maxLength={500}
                  placeholder="Add a comment..."
                  className="flex-1 bg-surface border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary transition-shadow"
                />
                <button
                  onClick={handlePost}
                  disabled={!commentText.trim()}
                  className="bg-primary text-primary-foreground px-3 py-2 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Send size={14} />
                </button>
              </div>
            </div>

            {/* Comments list */}
            <div className="space-y-3">
              {comments.map((c) => {
                const cInitials = c.author.replace(/\./g, "").split(" ").map((w) => w[0]).join("").toUpperCase();
                return (
                  <div key={c.id} className="bg-surface rounded-lg p-3.5">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-5 h-5 rounded-full bg-gradient-to-br ${avatarColors[c.username] || "from-primary to-accent"} flex items-center justify-center text-[7px] font-mono font-semibold text-primary-foreground`}
                        >
                          {cInitials}
                        </div>
                        <span className="text-xs font-mono text-primary">
                          {c.author}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-muted-foreground">
                        {c.time}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground pl-7">{c.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

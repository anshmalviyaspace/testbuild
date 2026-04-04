import { Heart } from "lucide-react";
import type { CommunityProjectRow } from "@/hooks/useCommunity";

interface Props {
  project: CommunityProjectRow;
  onLike: () => void;
  onClick: () => void;
}

export default function CommunityProjectCard({ project: p, onLike, onClick }: Props) {
  const initials = (p.author_initials || "??").toUpperCase();

  return (
    <div
      onClick={onClick}
      className="bg-card border border-border rounded-xl overflow-hidden card-hover-glow cursor-pointer group"
    >
      {/* Thumbnail */}
      <div
        className="h-28 flex items-center justify-center"
        style={{ background: `linear-gradient(135deg, ${p.gradient_from}, ${p.gradient_to})` }}
      >
        <span className="text-4xl group-hover:scale-110 transition-transform duration-300">
          {p.emoji}
        </span>
      </div>

      <div className="p-4 space-y-2.5">
        {/* Author */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-[8px] font-mono font-semibold text-primary-foreground shrink-0">
            {initials}
          </div>
          <div className="min-w-0">
            <span className="text-xs font-mono text-muted-foreground truncate block">
              {p.author_name} · {p.author_college}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-heading text-sm font-bold leading-snug">{p.title}</h3>

        {/* Description */}
        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
          {p.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {p.tags.map((tag) => (
            <span key={tag} className="text-[9px] font-mono bg-surface2 text-muted-foreground px-1.5 py-0.5 rounded">
              {tag}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between pt-1 text-[11px] font-mono text-muted-foreground">
          <span className="flex items-center gap-1">
            <Heart size={11} className={p.user_liked ? "fill-current text-destructive" : ""} />
            {p.like_count}
          </span>
          <button
            onClick={(e) => { e.stopPropagation(); onLike(); }}
            className={`flex items-center gap-1 px-2 py-1 rounded-md transition-all ${
              p.user_liked
                ? "bg-destructive/10 text-destructive"
                : "hover:bg-surface2 hover:text-destructive"
            }`}
          >
            <Heart size={12} className={p.user_liked ? "fill-current" : ""} />
            {p.user_liked ? "Liked" : "Like"}
          </button>
        </div>
      </div>
    </div>
  );
}

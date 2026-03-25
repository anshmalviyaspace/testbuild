import { Heart, Eye } from "lucide-react";
import type { CommunityProject } from "@/data/communityData";
import { avatarColors } from "@/data/communityData";

interface Props {
  project: CommunityProject;
  liked: boolean;
  onLike: () => void;
  onClick: () => void;
}

export default function CommunityProjectCard({ project: p, liked, onLike, onClick }: Props) {
  const initials = p.author.replace(/\./g, "").split(" ").map((w) => w[0]).join("").toUpperCase();

  return (
    <div
      onClick={onClick}
      className="bg-card border border-border rounded-xl overflow-hidden card-hover-glow cursor-pointer group"
    >
      {/* Thumbnail */}
      <div
        className="h-28 flex items-center justify-center"
        style={{ background: `linear-gradient(135deg, ${p.gradientFrom}, ${p.gradientTo})` }}
      >
        <span className="text-4xl group-hover:scale-110 transition-transform duration-300">
          {p.emoji}
        </span>
      </div>

      <div className="p-4 space-y-2.5">
        {/* Author */}
        <div className="flex items-center gap-2">
          <div
            className={`w-6 h-6 rounded-full bg-gradient-to-br ${avatarColors[p.username] || "from-primary to-accent"} flex items-center justify-center text-[8px] font-mono font-semibold text-primary-foreground shrink-0`}
          >
            {initials}
          </div>
          <div className="min-w-0">
            <span className="text-xs font-mono text-muted-foreground truncate block">
              {p.author} · {p.college}
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
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Eye size={11} /> {p.views}
            </span>
            <span className="flex items-center gap-1">
              <Heart size={11} className={liked ? "fill-current text-destructive" : ""} />
              {liked ? p.likes + 1 : p.likes}
            </span>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onLike(); }}
            className={`flex items-center gap-1 px-2 py-1 rounded-md transition-all ${
              liked
                ? "bg-destructive/10 text-destructive"
                : "hover:bg-surface2 hover:text-destructive"
            }`}
          >
            <Heart size={12} className={liked ? "fill-current" : ""} />
            {liked ? "Liked" : "Like"}
          </button>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Heart, Eye } from "lucide-react";
import ProjectModal from "./ProjectModal";
import { Marquee } from "@/components/ui/marquee";

export interface Project {
  id: number;
  name: string;
  author: string;
  college: string;
  tags: string[];
  views: number;
  likes: number;
}

const projects: Project[] = [
  { id: 1, name: "AI Resume Analyzer", author: "Rahul M.", college: "IIT Delhi", tags: ["AI", "Python"], views: 234, likes: 47 },
  { id: 2, name: "Campus Event App", author: "Sneha K.", college: "BITS Pilani", tags: ["React", "Firebase"], views: 189, likes: 31 },
  { id: 3, name: "Prompt Library Tool", author: "Diya S.", college: "NIT Trichy", tags: ["AI", "Open Source"], views: 312, likes: 58 },
  { id: 4, name: "Expense Splitter", author: "Aryan P.", college: "VIT", tags: ["Next.js"], views: 156, likes: 22 },
  { id: 5, name: "Study Buddy Matcher", author: "Karan R.", college: "Manipal", tags: ["ML", "Firebase"], views: 278, likes: 43 },
  { id: 6, name: "Design System Kit", author: "Priya N.", college: "SRM", tags: ["Figma", "UI/UX"], views: 201, likes: 37 },
];

const firstRow = projects.slice(0, 3);
const secondRow = projects.slice(3);

function ProjectCard({
  p,
  liked,
  onLike,
  onClick,
}: {
  p: Project;
  liked: boolean;
  onLike: (e: React.MouseEvent) => void;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="group w-[280px] sm:w-[320px] shrink-0 bg-card border border-border rounded-xl p-5 card-hover-glow cursor-pointer"
    >
      <div className="h-32 bg-surface2 rounded-lg mb-4 flex items-center justify-center">
        <span className="text-3xl opacity-40 group-hover:opacity-60 transition-opacity">
          {p.tags[0] === "AI" || p.tags[0] === "ML" ? "🤖" : p.tags[0] === "React" || p.tags[0] === "Next.js" ? "💻" : "🎨"}
        </span>
      </div>

      <h3 className="font-heading font-semibold mb-1">{p.name}</h3>
      <p className="text-xs text-muted-foreground font-mono mb-3">
        {p.author} · {p.college}
      </p>

      <div className="flex items-center gap-2 mb-4">
        {p.tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] font-mono bg-surface2 text-muted-foreground px-2 py-0.5 rounded"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
        <span className="flex items-center gap-1">
          <Eye size={12} /> {p.views}
        </span>
        <button
          onClick={onLike}
          className={`flex items-center gap-1 transition-colors ${
            liked ? "text-destructive" : "hover:text-destructive"
          }`}
        >
          <Heart size={12} className={liked ? "fill-current" : ""} />
          {liked ? p.likes + 1 : p.likes}
        </button>
      </div>
    </div>
  );
}

export default function ProjectsFeed() {
  const [likedIds, setLikedIds] = useState<Set<number>>(new Set());
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const toggleLike = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <section id="projects" className="border-t border-border py-[50px]">
      <div className="container mb-8">
        <p className="text-xs font-mono text-primary tracking-widest uppercase mb-3">
          BUILT BY STUDENTS
        </p>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold">
          What builders are shipping
        </h2>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-background to-transparent z-10" />

        <Marquee pauseOnHover className="[--duration:30s] mb-4">
          {firstRow.map((p) => (
            <ProjectCard
              key={p.id}
              p={p}
              liked={likedIds.has(p.id)}
              onLike={(e) => toggleLike(p.id, e)}
              onClick={() => setSelectedProject(p)}
            />
          ))}
        </Marquee>

        <Marquee pauseOnHover reverse className="[--duration:30s]">
          {secondRow.map((p) => (
            <ProjectCard
              key={p.id}
              p={p}
              liked={likedIds.has(p.id)}
              onLike={(e) => toggleLike(p.id, e)}
              onClick={() => setSelectedProject(p)}
            />
          ))}
        </Marquee>
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}

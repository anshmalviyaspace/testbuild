import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import clsx from "clsx";
import { communityProjects, leaderboardData } from "@/data/communityData";
import type { CommunityProject } from "@/data/communityData";
import CommunityProjectCard from "@/components/community/CommunityProjectCard";
import CommunityProjectModal from "@/components/community/CommunityProjectModal";
import Leaderboard from "@/components/community/Leaderboard";

const filters = ["All", "AI & ML", "UI/UX", "Full Stack", "Startup"];

export default function CommunityView() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [likedIds, setLikedIds] = useState<Set<number>>(new Set());
  const [selectedProject, setSelectedProject] = useState<CommunityProject | null>(null);
  const [activeTab, setActiveTab] = useState<"latest" | "leaderboard">("latest");
  const [visibleCount, setVisibleCount] = useState(6);

  const filtered = useMemo(() => {
    let list = communityProjects;
    if (activeFilter !== "All") {
      list = list.filter((p) => p.track === activeFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((p) => p.title.toLowerCase().includes(q));
    }
    return list;
  }, [activeFilter, searchQuery]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const toggleLike = (id: number) => {
    setLikedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="p-6 sm:p-8 animate-fade-in opacity-0">
      {/* Header */}
      <h1 className="font-heading text-2xl font-extrabold mb-1">
        What builders are shipping 🚀
      </h1>
      <p className="text-sm text-muted-foreground mb-6">
        {communityProjects.length} projects shipped this month across 4 tracks
      </p>

      {/* Tabs */}
      <div className="flex items-center gap-1 mb-6 border-b border-border">
        <button
          onClick={() => setActiveTab("latest")}
          className={clsx(
            "px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px",
            activeTab === "latest"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          )}
        >
          Latest
        </button>
        <button
          onClick={() => setActiveTab("leaderboard")}
          className={clsx(
            "px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px",
            activeTab === "leaderboard"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          )}
        >
          🏆 Leaderboard
        </button>
      </div>

      {activeTab === "latest" ? (
        <>
          {/* Filter bar */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
            <div className="flex items-center gap-1.5 flex-wrap">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => { setActiveFilter(f); setVisibleCount(6); }}
                  className={clsx(
                    "text-xs font-mono px-3 py-1.5 rounded-full transition-all duration-200",
                    activeFilter === f
                      ? "bg-primary text-primary-foreground"
                      : "bg-surface2 text-muted-foreground hover:text-foreground"
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
            <div className="relative sm:ml-auto">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setVisibleCount(6); }}
                maxLength={100}
                placeholder="Search projects..."
                className="w-full sm:w-56 bg-surface border border-border rounded-lg pl-9 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary transition-shadow"
              />
            </div>
          </div>

          {/* Grid */}
          {visible.length === 0 ? (
            <div className="text-center py-16">
              <span className="text-4xl block mb-4">🔍</span>
              <p className="text-muted-foreground text-sm">No projects found matching your search.</p>
            </div>
          ) : (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {visible.map((p) => (
                  <CommunityProjectCard
                    key={p.id}
                    project={p}
                    liked={likedIds.has(p.id)}
                    onLike={() => toggleLike(p.id)}
                    onClick={() => setSelectedProject(p)}
                  />
                ))}
              </div>

              {hasMore && (
                <div className="flex justify-center mt-8">
                  <button
                    onClick={() => setVisibleCount((c) => c + 6)}
                    className="border border-border px-6 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:border-muted-foreground/40 transition-colors font-mono"
                  >
                    Load More
                  </button>
                </div>
              )}
            </>
          )}
        </>
      ) : (
        <Leaderboard data={leaderboardData} />
      )}

      {/* Modal */}
      {selectedProject && (
        <CommunityProjectModal
          project={selectedProject}
          liked={likedIds.has(selectedProject.id)}
          onLike={() => toggleLike(selectedProject.id)}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}

import { Link } from "react-router-dom";
import clsx from "clsx";
import type { LeaderboardEntry } from "@/data/communityData";
import { avatarColors } from "@/data/communityData";

interface Props {
  data: LeaderboardEntry[];
}

export default function Leaderboard({ data }: Props) {
  return (
    <div>
      <h2 className="font-heading text-xl font-bold mb-6">🏆 Top Builders</h2>

      <div className="space-y-2">
        {data.map((entry) => {
          const initials = entry.name.replace(/\./g, "").split(" ").map((w) => w[0]).join("").toUpperCase();
          return (
            <div
              key={entry.rank}
              className={clsx(
                "flex items-center gap-4 p-4 rounded-xl border transition-colors",
                entry.isCurrentUser
                  ? "bg-primary/[0.06] border-primary/20"
                  : "bg-card border-border"
              )}
            >
              {/* Rank */}
              <span className="w-8 text-center font-heading font-bold text-lg shrink-0">
                {entry.medal || `#${entry.rank}`}
              </span>

              {/* Avatar */}
              <div
                className={`w-9 h-9 rounded-full bg-gradient-to-br ${avatarColors[entry.username] || "from-primary to-accent"} flex items-center justify-center text-[10px] font-mono font-semibold text-primary-foreground shrink-0`}
              >
                {initials}
              </div>

              {/* Info */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium truncate">{entry.name}</p>
                  {entry.isCurrentUser && (
                    <span className="text-[9px] font-mono bg-primary/10 text-primary px-1.5 py-0.5 rounded">
                      ← You
                    </span>
                  )}
                </div>
                <p className="text-xs font-mono text-muted-foreground">{entry.college}</p>
              </div>

              {/* Stats */}
              <div className="text-right shrink-0">
                <p className="text-sm font-heading font-bold text-primary tabular-nums">
                  {entry.xp} XP
                </p>
                <p className="text-[10px] font-mono text-muted-foreground">
                  {entry.projects} projects
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-center text-sm text-muted-foreground mt-8">
        Keep building to climb the leaderboard 🚀
      </p>

      <div className="flex justify-center mt-4">
        <Link
          to="/dashboard/track"
          className="text-xs font-mono text-primary hover:underline"
        >
          Continue your track →
        </Link>
      </div>
    </div>
  );
}

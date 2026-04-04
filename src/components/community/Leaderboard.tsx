import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import type { LeaderboardRow } from "@/hooks/useCommunity";

interface Props {
  data: LeaderboardRow[];
  loading?: boolean;
}

export default function Leaderboard({ data, loading }: Props) {
  const { currentUser } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 size={24} className="animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-16">
        <span className="text-4xl block mb-4">🏆</span>
        <p className="text-muted-foreground text-sm">No builders on the leaderboard yet. Start building to claim your spot!</p>
      </div>
    );
  }

  const medals = ["🥇", "🥈", "🥉"];

  return (
    <div>
      <h2 className="font-heading text-xl font-bold mb-6">🏆 Top Builders</h2>

      <div className="space-y-2">
        {data.map((entry, idx) => {
          const initials = (entry.avatar_initials || "??").toUpperCase();
          const isMe = currentUser?.id === entry.id;
          const rank = idx + 1;

          return (
            <div
              key={entry.id}
              className={`flex items-center gap-4 p-4 rounded-xl border transition-colors ${
                isMe ? "bg-primary/[0.06] border-primary/20" : "bg-card border-border"
              }`}
            >
              {/* Rank */}
              <span className="w-8 text-center font-heading font-bold text-lg shrink-0">
                {medals[idx] || `#${rank}`}
              </span>

              {/* Avatar */}
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-[10px] font-mono font-semibold text-primary-foreground shrink-0">
                {initials}
              </div>

              {/* Info */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium truncate">{entry.full_name}</p>
                  {isMe && (
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
                  {entry.xp_points ?? 0} XP
                </p>
                <p className="text-[10px] font-mono text-muted-foreground">
                  {entry.project_count} projects
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

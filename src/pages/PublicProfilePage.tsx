import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Pencil, PartyPopper, Heart } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface ProfileData {
  id: string;
  fullName: string;
  username: string;
  initials: string;
  college: string;
  bio: string;
  track: string;
  xp: number;
  personalityType?: string;
  personalityDescription?: string;
  quizScore?: number;
  quizLevel?: string;
  quizTaken: boolean;
  createdAt?: string;
}

interface ProjectData {
  id: string;
  title: string;
  description: string;
  tags: string[];
  emoji: string;
  gradient_from: string;
  gradient_to: string;
  track: string;
  created_at: string;
  like_count: number;
}

function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`bg-surface2 rounded-lg animate-pulse ${className}`} />;
}

export default function PublicProfilePage() {
  const { username } = useParams();
  const { currentUser } = useAuth();
  const isOwnProfile = currentUser?.username === username;

  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setNotFound(false);

      // 1. Fetch profile by username
      const { data: profileRow, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("username", username)
        .single();

      if (error || !profileRow) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      setProfile({
        id: profileRow.id,
        fullName: profileRow.full_name || "",
        username: profileRow.username || "",
        initials: profileRow.avatar_initials || "BU",
        college: profileRow.college || "",
        bio: profileRow.bio || "",
        track: profileRow.current_track || "AI & Machine Learning",
        xp: profileRow.xp_points || 0,
        personalityType: profileRow.personality_type || undefined,
        quizScore: profileRow.quiz_score ?? undefined,
        quizLevel: profileRow.quiz_level ?? undefined,
        quizTaken: profileRow.quiz_taken || false,
        createdAt: profileRow.created_at || undefined,
      });

      // 2. Fetch their quiz description separately if quiz taken
      if (profileRow.quiz_taken) {
        const { data: quizRow } = await supabase
          .from("quiz_results")
          .select("personality_description")
          .eq("user_id", profileRow.id)
          .single();
        if (quizRow) {
          setProfile((prev) => prev ? { ...prev, personalityDescription: quizRow.personality_description } : prev);
        }
      }

      // 3. Fetch their shipped projects with like counts
      const { data: projectRows } = await supabase
        .from("community_projects")
        .select("*")
        .eq("user_id", profileRow.id)
        .order("created_at", { ascending: false });

      if (projectRows?.length) {
        const projectIds = projectRows.map((p) => p.id);
        const { data: likes } = await supabase
          .from("project_likes")
          .select("project_id")
          .in("project_id", projectIds);

        const likeCounts = new Map<string, number>();
        (likes || []).forEach((l) => {
          likeCounts.set(l.project_id, (likeCounts.get(l.project_id) || 0) + 1);
        });

        setProjects(
          projectRows.map((p) => ({ ...p, like_count: likeCounts.get(p.id) || 0 }))
        );
      }

      setLoading(false);
    }

    if (username) load();
  }, [username]);

  const trackEmoji = (track: string) =>
    track?.includes("AI") ? "🤖" : track?.includes("UI") ? "🎨" : track?.includes("Full") ? "💻" : "🚀";

  // ── Loading ──
  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <nav className="border-b border-border bg-surface/80 backdrop-blur-md sticky top-0 z-30">
          <div className="max-w-4xl mx-auto flex items-center justify-between px-6 py-3">
            <span className="font-heading text-lg font-extrabold">Just<span className="text-primary">Build</span></span>
          </div>
        </nav>
        <div className="max-w-4xl mx-auto px-6 py-10 space-y-6">
          <Skeleton className="h-48" />
          <Skeleton className="h-32" />
          <Skeleton className="h-64" />
        </div>
      </div>
    );
  }

  // ── Not found ──
  if (notFound || !profile) {
    return (
      <div className="min-h-screen bg-background p-8 max-w-2xl mx-auto text-center">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft size={14} /> Back
        </Link>
        <div className="bg-card border border-border rounded-xl p-12">
          <span className="text-5xl block mb-4">👤</span>
          <h1 className="font-heading text-xl font-bold mb-2">Profile not found</h1>
          <p className="text-sm text-muted-foreground">@{username} doesn't exist yet.</p>
        </div>
      </div>
    );
  }

  const joinedDate = profile.createdAt
    ? new Date(profile.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })
    : "Recently";

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="border-b border-border bg-surface/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-4xl mx-auto flex items-center justify-between px-6 py-3">
          <Link to="/" className="font-heading text-lg font-extrabold tracking-tight">
            Just<span className="text-primary">Build</span>
          </Link>
          <Link to={isOwnProfile ? "/dashboard/home" : "/"} className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={12} /> {isOwnProfile ? "Dashboard" : "Back"}
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-10 space-y-10 animate-fade-in opacity-0">

        {/* HEADER */}
        <section className="bg-surface border border-border rounded-xl p-8">
          <div className="flex flex-col sm:flex-row sm:items-start gap-6">
            <div className="w-[60px] h-[60px] shrink-0 rounded-full flex items-center justify-center text-lg font-heading font-bold text-primary-foreground"
              style={{ background: "linear-gradient(135deg, hsl(160 100% 45%), hsl(220 100% 50%))" }}>
              {profile.initials}
            </div>
            <div className="flex-1 space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="font-heading text-[32px] leading-tight font-extrabold">{profile.fullName}</h1>
                {isOwnProfile && (
                  <Link to="/dashboard/settings" className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground border border-border rounded-lg px-3 py-1.5 hover:text-foreground hover:border-muted-foreground/40 transition-colors">
                    <Pencil size={11} /> Edit Profile
                  </Link>
                )}
              </div>
              <p className="text-sm font-mono text-primary">@{profile.username}</p>
              <p className="text-sm text-muted-foreground">{profile.college}</p>
              {profile.bio && <p className="text-sm text-muted-foreground/80 leading-relaxed max-w-xl">{profile.bio}</p>}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-xs font-mono bg-surface2 text-foreground px-3 py-1 rounded-full">
                  {trackEmoji(profile.track)} {profile.track}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-border mt-4">
                <div>
                  <p className="font-heading text-xl font-bold">{projects.length}</p>
                  <p className="text-[10px] font-mono text-muted-foreground tracking-wide uppercase">Projects Shipped</p>
                </div>
                <div>
                  <p className="font-heading text-xl font-bold">{profile.xp}</p>
                  <p className="text-[10px] font-mono text-muted-foreground tracking-wide uppercase">XP Earned</p>
                </div>
                <div>
                  <p className="font-heading text-xl font-bold">{joinedDate}</p>
                  <p className="text-[10px] font-mono text-muted-foreground tracking-wide uppercase">Joined</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BUILDER PROFILE */}
        {profile.quizTaken && profile.personalityType ? (
          <section>
            <p className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase mb-4">BUILDER PROFILE</p>
            <div className="bg-surface border border-border rounded-xl p-6 space-y-5">
              <div className="flex justify-center">
                <div className="inline-flex items-center gap-2 border border-primary/30 bg-primary/5 text-primary px-5 py-2.5 rounded-full text-sm font-mono tracking-wider">
                  ✦ {profile.personalityType.toUpperCase()}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase">BASE LEVEL</p>
                  <p className="font-heading text-xl font-extrabold mt-1">{profile.quizLevel}</p>
                  <p className="text-[10px] text-muted-foreground">when joined</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase">KNOWLEDGE SCORE</p>
                  <p className="font-heading text-xl font-extrabold text-primary mt-1">{profile.quizScore} / 100</p>
                  <p className="text-[10px] text-muted-foreground">at assessment</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase">CURRENT XP</p>
                  <p className="font-heading text-xl font-extrabold mt-1">{profile.xp}</p>
                  <p className="text-[10px] text-muted-foreground">earned building</p>
                </div>
              </div>
              {profile.personalityDescription && (
                <p className="text-sm text-muted-foreground/80 italic text-center max-w-lg mx-auto leading-relaxed">
                  "{profile.personalityDescription}"
                </p>
              )}
            </div>
          </section>
        ) : isOwnProfile ? (
          <section>
            <div className="bg-surface border border-border border-dashed rounded-xl p-6 text-center">
              <p className="text-sm text-muted-foreground">Assessment not taken yet</p>
              <Link to="/quiz" className="text-xs font-mono text-primary hover:underline mt-2 inline-block">Take Assessment →</Link>
            </div>
          </section>
        ) : null}

        {/* PROJECTS */}
        <section>
          <p className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase mb-4">
            SHIPPED PROJECTS{projects.length > 0 && ` (${projects.length})`}
          </p>
          {projects.length === 0 ? (
            <div className="bg-card border border-border rounded-xl p-8 text-center">
              <p className="text-sm text-muted-foreground">No projects shipped yet.</p>
              {isOwnProfile && (
                <Link to="/dashboard/track" className="text-xs font-mono text-primary hover:underline mt-2 inline-block">
                  Start with your first project brief →
                </Link>
              )}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-5">
              {projects.map((p) => (
                <div key={p.id} className="bg-card border border-border rounded-xl overflow-hidden card-hover-glow group">
                  <div className="h-28 flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${p.gradient_from}, ${p.gradient_to})` }}>
                    <span className="text-4xl group-hover:scale-110 transition-transform duration-300">{p.emoji}</span>
                  </div>
                  <div className="p-4 space-y-2">
                    <h3 className="font-heading text-sm font-bold">{p.title}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">{p.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {p.tags.map((tag) => (
                        <span key={tag} className="text-[10px] font-mono bg-surface2 text-muted-foreground px-2 py-0.5 rounded">{tag}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-3 text-[11px] font-mono text-muted-foreground pt-1">
                      <span className="flex items-center gap-1"><Heart size={10} className="text-destructive" /> {p.like_count}</span>
                      <span>{new Date(p.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ACTIVITY */}
        <section>
          <p className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase mb-4">Activity</p>
          <div className="relative pl-6 space-y-0">
            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />
            {projects.slice(0, 3).map((p) => (
              <div key={p.id} className="relative flex items-start gap-4 py-3">
                <div className="absolute left-[-17px] top-[18px] w-3.5 h-3.5 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                </div>
                <div className="flex-1 flex items-center justify-between gap-4">
                  <span className="text-sm text-foreground">Shipped — {p.title}</span>
                  <span className="text-[10px] font-mono text-muted-foreground whitespace-nowrap">
                    {new Date(p.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </span>
                </div>
              </div>
            ))}
            <div className="relative flex items-start gap-4 py-3">
              <div className="absolute left-[-17px] top-[18px] w-3.5 h-3.5 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              </div>
              <div className="flex-1 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <PartyPopper size={14} className="text-primary" />
                  <span className="text-sm text-foreground">Joined JustBuild</span>
                </div>
                <span className="text-[10px] font-mono text-muted-foreground whitespace-nowrap">{joinedDate}</span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA for visitors */}
        {!isOwnProfile && (
          <section className="bg-surface border border-border rounded-xl p-8 text-center space-y-4">
            <h2 className="font-heading text-xl font-bold">Want your own profile like this?</h2>
            <Link to="/signup" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors">
              Join JustBuild and start building <ExternalLink size={14} />
            </Link>
          </section>
        )}

      </div>
    </div>
  );
}
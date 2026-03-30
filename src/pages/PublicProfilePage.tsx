import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Pencil, PartyPopper } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";

export default function PublicProfilePage() {
  const { username } = useParams();
  const { currentUser } = useAuth();
  const isOwnProfile = currentUser?.username === username;
  const [quizResult, setQuizResult] = useState<{ personality_type: string; personality_description: string; score: number; level: string } | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("buildhub_quiz_results");
    if (stored) {
      const parsed = JSON.parse(stored);
      setQuizResult({
        personality_type: parsed.personality_type,
        personality_description: parsed.personality_description,
        score: parsed.score,
        level: parsed.level,
      });
    }
  }, []);

  // Only show profile if it's the current user's profile (no more hardcoded data)
  const profile = isOwnProfile && currentUser ? {
    fullName: currentUser.fullName,
    username: currentUser.username,
    initials: currentUser.avatarInitials,
    college: currentUser.college,
    bio: currentUser.bio || "",
    track: currentUser.currentTrack,
    xp: currentUser.xpPoints,
  } : null;

  if (!profile) {
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

  const trackEmoji = profile.track?.includes("AI") ? "🤖" :
    profile.track?.includes("UI") ? "🎨" :
    profile.track?.includes("Full") ? "💻" : "🚀";

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="border-b border-border bg-surface/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-4xl mx-auto flex items-center justify-between px-6 py-3">
          <Link to="/" className="font-heading text-lg font-extrabold tracking-tight text-foreground">
            Buildhub
          </Link>
          <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={12} /> Back
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-10 space-y-10 animate-fade-in opacity-0">
        {/* HEADER */}
        <section className="bg-surface border border-border rounded-xl p-8">
          <div className="flex flex-col sm:flex-row sm:items-start gap-6">
            <div className="w-[60px] h-[60px] shrink-0 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-lg font-heading font-bold text-primary-foreground">
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
                <span className="text-xs font-mono bg-surface2 text-foreground px-3 py-1 rounded-full">{trackEmoji} {profile.track}</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-border mt-4">
                <div>
                  <p className="font-heading text-xl font-bold">0</p>
                  <p className="text-[10px] font-mono text-muted-foreground tracking-wide uppercase">Projects Shipped</p>
                </div>
                <div>
                  <p className="font-heading text-xl font-bold">{profile.xp}</p>
                  <p className="text-[10px] font-mono text-muted-foreground tracking-wide uppercase">XP Earned</p>
                </div>
                <div>
                  <p className="font-heading text-xl font-bold">Today</p>
                  <p className="text-[10px] font-mono text-muted-foreground tracking-wide uppercase">Joined</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BUILDER PROFILE */}
        {quizResult ? (
          <section>
            <p className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase mb-4">BUILDER PROFILE</p>
            <div className="bg-surface border border-border rounded-xl p-6 space-y-5">
              <div className="flex justify-center">
                <div className="inline-flex items-center gap-2 border border-primary/30 bg-primary/5 text-primary px-5 py-2.5 rounded-full text-sm font-mono tracking-wider">
                  ✦ {quizResult.personality_type.toUpperCase()}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase">BASE LEVEL</p>
                  <p className="font-heading text-xl font-extrabold mt-1">{quizResult.level}</p>
                  <p className="text-[10px] text-muted-foreground">when joined</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase">KNOWLEDGE SCORE</p>
                  <p className="font-heading text-xl font-extrabold text-primary mt-1">{quizResult.score} / 100</p>
                  <p className="text-[10px] text-muted-foreground">at assessment</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase">CURRENT XP</p>
                  <p className="font-heading text-xl font-extrabold mt-1">{profile.xp}</p>
                  <p className="text-[10px] text-muted-foreground">earned building</p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground/80 italic text-center max-w-lg mx-auto leading-relaxed">
                "{quizResult.personality_description}"
              </p>
            </div>
          </section>
        ) : isOwnProfile ? (
          <section>
            <div className="bg-surface border border-border border-dashed rounded-xl p-6 text-center">
              <p className="text-sm text-muted-foreground">Assessment not taken yet</p>
              <Link to="/quiz" className="text-xs font-mono text-primary hover:underline mt-2 inline-block">
                Take Assessment →
              </Link>
            </div>
          </section>
        ) : null}

        {/* PROJECTS — Empty */}
        <section>
          <p className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase mb-4">Shipped Projects</p>
          <div className="bg-card border border-border rounded-xl p-8 text-center">
            <p className="text-sm text-muted-foreground">No projects shipped yet. Start building to fill this section.</p>
          </div>
        </section>

        {/* ACTIVITY TIMELINE */}
        <section>
          <p className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase mb-4">Activity</p>
          <div className="relative pl-6 space-y-0">
            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />
            <div className="relative flex items-start gap-4 py-3">
              <div className="absolute left-[-17px] top-[18px] w-3.5 h-3.5 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              </div>
              <div className="flex-1 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <PartyPopper size={14} className="text-primary" />
                  <span className="text-sm text-foreground">Joined Buildhub</span>
                </div>
                <span className="text-[10px] font-mono text-muted-foreground whitespace-nowrap">Just now</span>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER CTA — only for visitors */}
        {!isOwnProfile && (
          <section className="bg-surface border border-border rounded-xl p-8 text-center space-y-4">
            <h2 className="font-heading text-xl font-bold">Want your own profile like this?</h2>
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors"
            >
              Join Buildhub and start building <ExternalLink size={14} />
            </Link>
          </section>
        )}
      </div>
    </div>
  );
}

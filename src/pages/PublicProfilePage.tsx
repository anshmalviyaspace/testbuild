import { useParams, Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, ExternalLink, Rocket, BookCheck, PartyPopper, Pencil } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const profileData = {
  rahulm: {
    fullName: "Rahul Mehta",
    username: "rahulm",
    initials: "RM",
    college: "IIT Delhi · CSE '26",
    bio: "Building at the intersection of AI and product. Shipped 3 projects on Buildhub. Obsessed with making AI tools for students.",
    track: "🤖 AI & ML",
    verified: true,
    stats: { projects: 3, xp: 320, likes: 100, joined: "Feb 2026" },
    skills: ["Python", "React", "Claude API", "Prompt Engineering", "LangChain", "HTML/CSS", "JavaScript"],
    projects: [
      {
        id: "p1", title: "AI Resume Analyzer", emoji: "🤖",
        description: "An AI-powered tool that analyzes resumes against job descriptions, highlights gaps, and suggests improvements using Claude.",
        tags: ["AI", "Python"], likes: 47, views: 234, shippedAt: "2 weeks ago",
        gradientFrom: "hsl(160 100% 45% / 0.3)", gradientTo: "hsl(220 100% 50% / 0.2)",
      },
      {
        id: "p2", title: "Prompt Battle Arena", emoji: "⚡",
        description: "A gamified platform where users pit different prompts against each other to see which generates better AI outputs.",
        tags: ["React", "Claude API"], likes: 31, views: 189, shippedAt: "1 month ago",
        gradientFrom: "hsl(280 80% 60% / 0.3)", gradientTo: "hsl(346 100% 62% / 0.2)",
      },
      {
        id: "p3", title: "AI Concept Explainer", emoji: "🧠",
        description: "A simple web tool that takes any AI/ML concept and explains it in plain language with analogies and examples.",
        tags: ["HTML", "JS", "Claude API"], likes: 22, views: 156, shippedAt: "6 weeks ago",
        gradientFrom: "hsl(220 100% 50% / 0.3)", gradientTo: "hsl(160 100% 45% / 0.2)",
      },
    ],
    timeline: [
      { icon: "rocket", text: 'Shipped "AI Resume Analyzer"', time: "2 weeks ago" },
      { icon: "check", text: 'Completed "Build with Claude API" module', time: "3 weeks ago" },
      { icon: "rocket", text: 'Shipped "Prompt Battle Arena"', time: "1 month ago" },
      { icon: "check", text: 'Completed "Prompt Engineering Fundamentals" module', time: "5 weeks ago" },
      { icon: "rocket", text: 'Shipped "AI Concept Explainer"', time: "6 weeks ago" },
      { icon: "check", text: 'Completed "Understanding AI & LLMs" module', time: "7 weeks ago" },
      { icon: "party", text: "Joined Buildhub", time: "Feb 2026" },
    ],
  },
};

const TimelineIcon = ({ type }: { type: string }) => {
  if (type === "rocket") return <Rocket size={14} className="text-primary" />;
  if (type === "check") return <BookCheck size={14} className="text-primary" />;
  return <PartyPopper size={14} className="text-primary" />;
};

export default function PublicProfilePage() {
  const { username } = useParams();
  const { currentUser } = useAuth();
  const isOwnProfile = currentUser?.username === username;
  const profile = profileData[username as keyof typeof profileData];

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
            {/* Avatar */}
            <div className="w-[60px] h-[60px] shrink-0 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-lg font-heading font-bold text-primary-foreground">
              {profile.initials}
            </div>

            <div className="flex-1 space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="font-heading text-[32px] leading-tight font-extrabold">{profile.fullName}</h1>
                {isOwnProfile && (
                  <Link
                    to="/dashboard/settings"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground border border-border rounded-lg px-3 py-1.5 hover:text-foreground hover:border-muted-foreground/40 transition-colors"
                  >
                    <Pencil size={11} /> Edit Profile
                  </Link>
                )}
              </div>

              <p className="text-sm font-mono text-primary">@{profile.username}</p>
              <p className="text-sm text-muted-foreground">{profile.college}</p>
              <p className="text-sm text-muted-foreground/80 leading-relaxed max-w-xl">{profile.bio}</p>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-xs font-mono bg-surface2 text-foreground px-3 py-1 rounded-full">{profile.track}</span>
                {profile.verified && (
                  <span className="inline-flex items-center gap-1 text-xs font-mono text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
                    <CheckCircle2 size={12} /> Verified Builder
                  </span>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-border mt-4">
                {[
                  { value: profile.stats.projects, label: "Projects Shipped" },
                  { value: `${profile.stats.xp}`, label: "XP Earned" },
                  { value: profile.stats.likes, label: "Likes Received" },
                  { value: profile.stats.joined, label: "Joined" },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="font-heading text-xl font-bold">{s.value}</p>
                    <p className="text-[10px] font-mono text-muted-foreground tracking-wide uppercase">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section>
          <p className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase mb-4">Skills & Tools</p>
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((s) => (
              <span key={s} className="text-xs font-mono bg-surface2 text-muted-foreground px-3 py-1.5 rounded-full border border-border">
                {s}
              </span>
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        <section>
          <p className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase mb-4">Shipped Projects</p>
          <div className="grid sm:grid-cols-2 gap-5">
            {profile.projects.map((p) => (
              <div key={p.id} className="bg-card border border-border rounded-xl overflow-hidden group hover:border-primary/30 transition-colors">
                <div
                  className="h-28 flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${p.gradientFrom}, ${p.gradientTo})` }}
                >
                  <span className="text-4xl group-hover:scale-110 transition-transform duration-300">{p.emoji}</span>
                </div>
                <div className="p-5 space-y-2.5">
                  <h3 className="font-heading text-base font-bold">{p.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{p.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <span key={t} className="text-[10px] font-mono bg-surface2 text-muted-foreground px-2 py-0.5 rounded">{t}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground pt-1">
                    <span>❤️ {p.likes}</span>
                    <span>👁 {p.views}</span>
                    <span>{p.shippedAt}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ACTIVITY TIMELINE */}
        <section>
          <p className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase mb-4">Activity</p>
          <div className="relative pl-6 space-y-0">
            {/* Vertical line */}
            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />

            {profile.timeline.map((item, i) => (
              <div key={i} className="relative flex items-start gap-4 py-3">
                {/* Dot */}
                <div className="absolute left-[-17px] top-[18px] w-3.5 h-3.5 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                </div>

                <div className="flex-1 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <TimelineIcon type={item.icon} />
                    <span className="text-sm text-foreground">{item.text}</span>
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground whitespace-nowrap">{item.time}</span>
                </div>
              </div>
            ))}
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

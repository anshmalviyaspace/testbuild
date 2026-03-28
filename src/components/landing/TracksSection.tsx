import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import CardSwap, { Card } from "@/components/CardSwap";

const tracks = [
  {
    emoji: "🤖",
    title: "AI & Machine Learning",
    desc: "From prompts to models. Build real AI tools.",
    tag1: "Beginner Friendly",
    tag2: "8 Projects",
  },
  {
    emoji: "🎨",
    title: "UI/UX Design",
    desc: "Design thinking, Figma, and shipping interfaces.",
    tag1: "Visual",
    tag2: "6 Projects",
  },
  {
    emoji: "💻",
    title: "Full Stack Dev",
    desc: "Build web apps from scratch to deployment.",
    tag1: "Intermediate",
    tag2: "10 Projects",
  },
  {
    emoji: "🚀",
    title: "Build a Startup",
    desc: "Validate ideas, build MVPs, pitch to peers.",
    tag1: "Advanced",
    tag2: "5 Projects",
  },
];

function TrackCard({ track }: { track: (typeof tracks)[number] }) {
  return (
    <div className="w-full h-full p-8 flex flex-col justify-between">
      <div>
        <span className="text-4xl mb-4 block">{track.emoji}</span>
        <h3 className="font-heading text-xl font-bold mb-2 text-foreground">
          {track.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-5">{track.desc}</p>
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-mono bg-surface2 text-muted-foreground px-2.5 py-1 rounded">
            {track.tag1}
          </span>
          <span className="text-[11px] font-mono bg-surface2 text-muted-foreground px-2.5 py-1 rounded">
            {track.tag2}
          </span>
        </div>
      </div>
      <Link
        to="/signup"
        className="inline-flex items-center gap-1.5 text-sm font-mono text-primary hover:underline mt-6"
      >
        Explore Track <ArrowRight size={14} />
      </Link>
    </div>
  );
}

export default function TracksSection() {
  return (
    <section id="tracks" className="py-24 border-t border-border">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — text */}
          <div>
            <p className="text-xs font-mono text-primary tracking-widest uppercase mb-3">
              WHAT YOU'LL BUILD IN
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-5">
              Explore Tracks
            </h2>
            <p className="text-muted-foreground max-w-md mb-8">
              Curated learning paths with real projects. Pick a track, build
              alongside peers, and ship a portfolio that proves your skills.
            </p>
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Browse All Tracks <ArrowRight size={16} />
            </Link>
          </div>

          {/* Right — card swap */}
          <div className="relative h-[500px] overflow-visible hidden lg:block">
            <CardSwap
              cardDistance={50}
              verticalDistance={55}
              delay={4000}
              pauseOnHover
              width={380}
              height={320}
            >
              {tracks.map((t) => (
                <Card key={t.title}>
                  <TrackCard track={t} />
                </Card>
              ))}
            </CardSwap>
          </div>
        </div>

        {/* Mobile fallback grid */}
        <div className="grid sm:grid-cols-2 gap-5 mt-12 lg:hidden">
          {tracks.map((t) => (
            <div
              key={t.title}
              className="group relative bg-card border border-border rounded-xl p-6 card-hover-glow overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              <span className="text-3xl mb-4 block">{t.emoji}</span>
              <h3 className="font-heading text-lg font-bold mb-2">{t.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{t.desc}</p>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[11px] font-mono bg-surface2 text-muted-foreground px-2.5 py-1 rounded">
                  {t.tag1}
                </span>
                <span className="text-[11px] font-mono bg-surface2 text-muted-foreground px-2.5 py-1 rounded">
                  {t.tag2}
                </span>
              </div>
              <Link
                to="/signup"
                className="inline-flex items-center gap-1.5 text-sm font-mono text-primary hover:underline"
              >
                Explore Track <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

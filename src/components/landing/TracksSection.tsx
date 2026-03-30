import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

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

export default function TracksSection() {
  return (
    <section id="tracks" className="border-t border-border py-[50px]">
      <div className="container">
        <p className="text-xs font-mono text-primary tracking-widest uppercase mb-3">
          WHAT YOU'LL BUILD IN
        </p>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-12">
          Explore Tracks
        </h2>

        <div className="grid sm:grid-cols-2 gap-5">
          {tracks.map((t) => (
            <div
              key={t.title}
              className="group relative bg-card border border-border rounded-xl p-6 card-hover-glow overflow-hidden"
            >
              {/* Top green line */}
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

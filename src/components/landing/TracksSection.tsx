import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ScrollStack, { ScrollStackItem } from "../ScrollStack";

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
    <section id="tracks" className="py-24 border-t border-border">
      <div className="container">
        <p className="text-xs font-mono text-primary tracking-widest uppercase mb-3">
          WHAT YOU'LL BUILD IN
        </p>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">
          Explore Tracks
        </h2>
      </div>

      <ScrollStack
        useWindowScroll
        itemDistance={80}
        itemScale={0.02}
        itemStackDistance={25}
        stackPosition="25%"
        scaleEndPosition="15%"
        baseScale={0.88}
        blurAmount={2}
      >
        {tracks.map((t) => (
          <ScrollStackItem key={t.title}>
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <span className="text-5xl">{t.emoji}</span>
              <div className="flex-1">
                <h3 className="font-heading text-xl sm:text-2xl font-bold mb-2 text-foreground">{t.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 max-w-lg">{t.desc}</p>
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
            </div>
          </ScrollStackItem>
        ))}
      </ScrollStack>
    </section>
  );
}

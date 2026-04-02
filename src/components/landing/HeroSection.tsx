import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { lazy, Suspense } from "react";
import Shuffle from "@/components/Shuffle";

const Dither = lazy(() => import("@/components/Dither"));

const stats = [
  { value: "2,400+", label: "BUILDERS" },
  { value: "180+", label: "PROJECTS SHIPPED" },
  { value: "12", label: "COLLEGES" },
  { value: "4", label: "TRACKS" },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Dither background */}
      <div className="absolute inset-0">
        <Suspense fallback={<div className="absolute inset-0 bg-background" />}>
          <Dither
            waveColor={[0.4, 0.4, 0.4]}
            disableAnimation={false}
            enableMouseInteraction
            mouseRadius={0.3}
            colorNum={4}
            waveAmplitude={0.3}
            waveFrequency={5}
            waveSpeed={0.03}
          />
        </Suspense>
      </div>

      <div className="container relative z-10 pt-24 pb-20 max-w-4xl mx-auto text-center py-[55px]">
        {/* Beta badge */}
        <div className="inline-flex items-center gap-2 border-primary/40 rounded-full px-4 py-1.5 mb-8 animate-fade-in opacity-0 animate-glow-pulse border">
          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          <span className="text-xs font-mono text-primary tracking-wider">
            NOW IN BETA — AI TRACK LIVE
          </span>
        </div>

        {/* Headline with Shuffle animation */}
        <h1 className="font-heading font-extrabold tracking-tight">
          <Shuffle
            text="Don't just learn."
            tag="span"
            className="block text-5xl sm:text-6xl lg:text-7xl leading-[1.05] font-heading font-extrabold tracking-tight text-foreground"
            shuffleDirection="right"
            duration={0.35}
            animationMode="evenodd"
            shuffleTimes={1}
            ease="power3.out"
            stagger={0.03}
            threshold={0.1}
            triggerOnce={true}
            triggerOnHover
          />
          <Shuffle
            text="BUILD."
            tag="span"
            className="block text-6xl sm:text-7xl lg:text-[5.5rem] leading-[1.05] mt-2 font-heading font-extrabold tracking-tight text-gradient-primary"
            shuffleDirection="up"
            duration={0.4}
            animationMode="evenodd"
            shuffleTimes={2}
            ease="power3.out"
            stagger={0.04}
            threshold={0.1}
            triggerOnce={true}
            triggerOnHover
          />
          <Shuffle
            text="while you learn."
            tag="span"
            className="block text-3xl sm:text-4xl lg:text-5xl leading-[1.1] mt-2 font-heading font-bold text-foreground"
            shuffleDirection="left"
            duration={0.35}
            animationMode="evenodd"
            shuffleTimes={1}
            ease="power3.out"
            stagger={0.03}
            threshold={0.1}
            triggerOnce={true}
            triggerOnHover
          />
        </h1>

        {/* Subtext */}
        <p className="mt-8 text-lg max-w-2xl mx-auto text-pretty animate-fade-in-up opacity-0 stagger-3 text-foreground">
          Buildhub is where college students learn AI, design, and tech by shipping real
          projects — not watching videos.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex items-center justify-center gap-4 animate-fade-in-up opacity-0 stagger-4">
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 text-primary-foreground px-7 py-3.5 rounded-lg font-semibold transition-colors bg-foreground"
          >
            Start Building <ArrowRight size={16} />
          </Link>
          <a
            href="#projects"
            className="inline-flex items-center gap-2 border px-7 py-3.5 rounded-lg text-sm transition-colors text-foreground border-foreground"
          >
            See Projects
          </a>
        </div>

        {/* Stats row */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto animate-fade-in-up opacity-0 stagger-5">
          {stats.map(({ value, label }) => (
            <div key={label}>
              <p className="text-2xl font-heading font-bold">{value}</p>
              <p className="text-[10px] font-mono tracking-widest mt-1 text-foreground">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

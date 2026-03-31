import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { lazy, Suspense } from "react";

const Dither = lazy(() => import("@/components/Dither"));

const stats = [
{ value: "2,400+", label: "BUILDERS" },
{ value: "180+", label: "PROJECTS SHIPPED" },
{ value: "12", label: "COLLEGES" },
{ value: "4", label: "TRACKS" }];


export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Dither background */}
      <div className="absolute inset-0">
        <Suspense fallback={<div className="absolute inset-0 bg-background" />}>
          <Dither
            waveColor={[0.7, 0.7, 0.5]}
            disableAnimation={false}
            enableMouseInteraction
            mouseRadius={0.3}
            colorNum={2}
            waveAmplitude={0.3}
            waveFrequency={3}
            waveSpeed={0.05} />
          
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

        {/* Headline */}
        <h1 className="font-heading font-extrabold tracking-tight animate-fade-in-up opacity-0 stagger-1">
          <span className="block text-5xl sm:text-6xl lg:text-7xl leading-[1.05]">
            Don't just learn.
          </span>
          <span className="block text-6xl sm:text-7xl lg:text-[5.5rem] leading-[1.05] mt-2 text-gradient-primary">
            BUILD.
          </span>
          <span className="block text-3xl sm:text-4xl lg:text-5xl leading-[1.1] mt-2 font-bold text-white">
            while you learn.
          </span>
        </h1>

        {/* Subtext */}
        <p className="mt-8 text-lg max-w-2xl mx-auto text-pretty animate-fade-in-up opacity-0 stagger-3 text-white">
          Buildhub is where college students learn AI, design, and tech by shipping real
          projects — not watching videos.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex items-center justify-center gap-4 animate-fade-in-up opacity-0 stagger-4">
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 text-primary-foreground px-7 py-3.5 rounded-lg font-semibold transition-colors bg-white">
            
            Start Building <ArrowRight size={16} />
          </Link>
          <a
            href="#projects"
            className="inline-flex items-center gap-2 border px-7 py-3.5 rounded-lg text-sm transition-colors text-white border-white">
            
            See Projects
          </a>
        </div>

        {/* Stats row */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto animate-fade-in-up opacity-0 stagger-5">
          {stats.map(({ value, label }) =>
          <div key={label}>
              <p className="text-2xl font-heading font-bold">{value}</p>
              <p className="text-[10px] font-mono tracking-widest mt-1 text-white">
                {label}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>);

}
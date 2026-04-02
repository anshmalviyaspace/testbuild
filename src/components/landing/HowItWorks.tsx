import { useState } from "react";
import StarBorder from "@/components/StarBorder";

const steps = [
  {
    num: "01",
    title: "Pick a Track",
    desc: "Choose AI, Design, Coding, or Business — each with a curated path.",
    visual: "🤖",
    visualLabel: "AI · Design · Code · Business",
  },
  {
    num: "02",
    title: "Get Your Learning Path",
    desc: "AI curates the best resources, tutorials, and references for you.",
    visual: "🗺️",
    visualLabel: "Personalized roadmap generated",
  },
  {
    num: "03",
    title: "Build the Project",
    desc: "Every module ends with a real project brief — not a quiz.",
    visual: "🔨",
    visualLabel: "Hands-on project brief",
  },
  {
    num: "04",
    title: "Publish to Portfolio",
    desc: "Your work goes live instantly on your public Buildhub portfolio.",
    visual: "🚀",
    visualLabel: "Live portfolio page",
  },
  {
    num: "05",
    title: "Get Peer Feedback",
    desc: "Community reviews your build and helps you level up.",
    visual: "💬",
    visualLabel: "Peer reviews & ratings",
  },
];

export default function HowItWorks() {
  const [active, setActive] = useState(0);

  return (
    <section className="border-t border-border py-[50px]">
      <div className="container">
        <p className="text-xs font-mono text-primary tracking-widest uppercase mb-3">
          THE PROCESS
        </p>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-12">
          Learn. Build. Ship. Repeat.
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Steps accordion */}
          <div className="space-y-2">
            {steps.map((step, i) => (
              <StarBorder
                key={step.num}
                as="button"
                color={active === i ? "hsl(160, 100%, 45%)" : "hsl(212, 16%, 48%)"}
                speed="6s"
                thickness={1}
                className="w-full"
                onClick={() => setActive(i)}
              >
                <div className={`w-full text-left p-5 transition-all duration-300 ${
                  active === i ? "bg-surface" : "bg-transparent"
                }`}>
                  <div className="flex items-start gap-4">
                    <span
                      className={`font-mono text-sm font-medium mt-0.5 transition-colors ${
                        active === i ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {step.num}
                    </span>
                    <div>
                      <p
                        className={`font-heading font-semibold transition-colors ${
                          active === i ? "text-foreground" : "text-muted-foreground"
                        }`}
                      >
                        {step.title}
                      </p>
                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          active === i ? "max-h-20 opacity-100 mt-2" : "max-h-0 opacity-0"
                        }`}
                      >
                        <p className="text-sm text-muted-foreground">{step.desc}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </StarBorder>
            ))}
          </div>

          {/* Visual panel */}
          <div className="bg-card border border-border rounded-xl p-10 flex flex-col items-center justify-center min-h-[360px] transition-all duration-300">
            <span className="text-6xl mb-6 block animate-float">
              {steps[active].visual}
            </span>
            <p className="font-heading text-lg font-semibold mb-2">
              {steps[active].title}
            </p>
            <p className="text-sm font-mono text-muted-foreground">
              {steps[active].visualLabel}
            </p>
            <div className="mt-6 flex gap-1.5">
              {steps.map((_, i) => (
                <span
                  key={i}
                  className={`w-8 h-1 rounded-full transition-colors ${
                    i === active ? "bg-primary" : "bg-border"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

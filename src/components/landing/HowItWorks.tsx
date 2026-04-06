import Stepper, { Step } from "@/components/Stepper";

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
    desc: "Your work goes live instantly on your public JustBuild portfolio.",
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
  return (
    <section className="border-t border-border py-[50px]">
      <div className="container">
        <p className="text-xs font-mono text-primary tracking-widest uppercase mb-3">
          THE PROCESS
        </p>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-12">
          Learn. Build. Ship. Repeat.
        </h2>

        <Stepper
          initialStep={1}
          onStepChange={() => {}}
          onFinalStepCompleted={() => {}}
          backButtonText="Previous"
          nextButtonText="Next Step"
        >
          {steps.map((step) => (
            <Step key={step.num}>
              <div className="text-center space-y-4">
                <span className="text-6xl block">{step.visual}</span>
                <p className="text-xs font-mono text-primary tracking-widest">
                  STEP {step.num}
                </p>
                <h3 className="font-heading text-xl font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                  {step.desc}
                </p>
                <p className="text-xs font-mono text-muted-foreground mt-2">
                  {step.visualLabel}
                </p>
              </div>
            </Step>
          ))}
        </Stepper>
      </div>
    </section>
  );
}

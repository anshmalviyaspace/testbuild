import { Link } from "react-router-dom";
import { Check, X } from "lucide-react";

const freePlan = {
  name: "Builder",
  price: "₹0",
  period: "forever",
  features: [
    { text: "1 track access", included: true },
    { text: "3 project briefs", included: true },
    { text: "Public portfolio page", included: true },
    { text: "Community access", included: true },
    { text: "AI learning path", included: false },
    { text: "Mentor feedback", included: false },
    { text: "Verified badge", included: false },
  ],
};

const proPlan = {
  name: "Pro Builder",
  price: "₹299",
  period: "/month",
  features: [
    { text: "All 4 tracks", included: true },
    { text: "Unlimited project briefs", included: true },
    { text: "AI learning path", included: true },
    { text: "Mentor feedback", included: true },
    { text: "Verified portfolio badge", included: true },
    { text: "Priority community", included: true },
  ],
};

export default function PricingSection() {
  return (
    <section id="pricing" className="border-t border-border py-[50px]">
      <div className="container max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-mono text-primary tracking-widest uppercase mb-3">
            PRICING
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold">
            Simple, student-friendly pricing
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {/* Free */}
          <div className="bg-card border border-border rounded-xl p-7">
            <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-1">
              FREE
            </p>
            <h3 className="font-heading text-xl font-bold mb-4">{freePlan.name}</h3>
            <div className="mb-6">
              <span className="text-4xl font-heading font-bold">{freePlan.price}</span>
              <span className="text-sm text-muted-foreground ml-2 font-mono">{freePlan.period}</span>
            </div>
            <div className="space-y-3 mb-8">
              {freePlan.features.map((f) => (
                <div key={f.text} className="flex items-center gap-3 text-sm">
                  {f.included ? (
                    <Check size={14} className="text-primary shrink-0" />
                  ) : (
                    <X size={14} className="text-muted-foreground/40 shrink-0" />
                  )}
                  <span className={f.included ? "text-foreground" : "text-muted-foreground/50"}>
                    {f.text}
                  </span>
                </div>
              ))}
            </div>
            <Link
              to="/signup"
              className="block w-full text-center border border-border py-3 rounded-lg text-sm font-medium text-foreground hover:bg-surface2 transition-colors"
            >
              Get Started Free
            </Link>
          </div>

          {/* Pro */}
          <div className="relative bg-card border border-primary/40 rounded-xl p-7 card-hover-glow">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] font-mono font-medium px-3 py-1 rounded-full uppercase tracking-wider">
              Most Popular
            </span>
            <p className="text-xs font-mono text-primary uppercase tracking-wider mb-1">
              PRO
            </p>
            <h3 className="font-heading text-xl font-bold mb-4">{proPlan.name}</h3>
            <div className="mb-6">
              <span className="text-4xl font-heading font-bold">{proPlan.price}</span>
              <span className="text-sm text-muted-foreground ml-2 font-mono">{proPlan.period}</span>
            </div>
            <div className="space-y-3 mb-8">
              {proPlan.features.map((f) => (
                <div key={f.text} className="flex items-center gap-3 text-sm">
                  <Check size={14} className="text-primary shrink-0" />
                  <span>{f.text}</span>
                </div>
              ))}
            </div>
            <Link
              to="/signup"
              className="block w-full text-center bg-primary text-primary-foreground py-3 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors"
            >
              Start Pro — ₹299/mo
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

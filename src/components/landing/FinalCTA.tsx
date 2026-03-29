import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

export default function FinalCTA() {
  return (
    <section className="py-24 border-t border-border relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-glow-strong" />
      <div className="container relative z-10 text-center max-w-2xl mx-auto">
        <h2 className="font-heading text-4xl sm:text-5xl font-extrabold mb-4 text-balance">
          Your portfolio starts today.
        </h2>
        <p className="text-lg text-muted-foreground mb-10">
          Stop bookmarking tutorials. Start shipping.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3.5 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Pick Your Track <ArrowRight size={16} />
          </Link>
          <a
            href="#projects"
            className="inline-flex items-center gap-2 border border-border px-7 py-3.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:border-muted-foreground/50 transition-colors"
          >
            See What Others Built
          </a>
        </div>
      </div>
    </section>
  );
}

import { Link } from "react-router-dom";
import { ArrowRight, Zap, Code2, Users } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Nav */}
      <header className="border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <h1 className="font-heading text-xl font-bold">
            <span className="text-primary">Build</span>hub
          </h1>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Log in
            </Link>
            <Link
              to="/signup"
              className="text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="flex-1 flex items-center">
        <div className="container py-24 text-center max-w-3xl mx-auto">
          <p className="font-mono text-xs text-primary tracking-widest uppercase mb-4">
            Initialize your dev career
          </p>
          <h2 className="font-heading text-5xl sm:text-6xl font-extrabold leading-tight tracking-tight text-balance">
            The command center for{" "}
            <span className="text-primary">ambitious builders</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto text-pretty">
            Track your learning, ship projects, build streaks, and level up — all in one place built for developers.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors"
            >
              Start Building <ArrowRight size={16} />
            </Link>
            <Link
              to="/dashboard/home"
              className="inline-flex items-center gap-2 border border-border px-6 py-3 rounded-md text-sm text-muted-foreground hover:text-foreground hover:border-muted-foreground/50 transition-colors"
            >
              View Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-border">
        <div className="container py-20 grid sm:grid-cols-3 gap-8">
          {[
            { icon: Zap, title: "XP & Streaks", desc: "Gamified progress tracking that keeps you consistent." },
            { icon: Code2, title: "Project Tracker", desc: "Manage builds with tags, milestones, and GitHub links." },
            { icon: Users, title: "Community", desc: "Connect with builders from top colleges across India." },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="p-6 rounded-lg border border-border bg-card">
              <Icon size={24} className="text-primary mb-4" />
              <h3 className="font-heading text-lg font-semibold mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container text-center text-xs text-muted-foreground font-mono">
          buildhub © {new Date().getFullYear()} — ship faster, learn deeper.
        </div>
      </footer>
    </div>
  );
}

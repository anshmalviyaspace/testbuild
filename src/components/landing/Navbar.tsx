import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";

const navLinks = [
  { label: "Tracks", href: "#tracks" },
  { label: "Projects", href: "#projects" },
  { label: "Community", href: "#community" },
  { label: "Pricing", href: "#pricing" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <span className="font-heading text-xl font-extrabold tracking-tight">
            Build<span className="text-foreground">hub</span>
          </span>
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse-dot" />
        </a>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-sm transition-colors text-white"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <Link
          to="/signup"
          className="text-primary-foreground px-5 py-2 rounded-lg text-sm font-semibold transition-colors bg-white"
        >
          Start Building
        </Link>
      </div>
    </header>
  );
}

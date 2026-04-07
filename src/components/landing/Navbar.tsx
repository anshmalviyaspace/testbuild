import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import clsx from "clsx";

const navLinks = [
  { label: "Tracks", href: "#tracks" },
  { label: "Projects", href: "#projects" },
  { label: "Community", href: "#community" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "/about", isRoute: true },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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
            Just<span className="text-foreground">Build</span>
          </span>
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse-dot" />
        </a>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(({ label, href, isRoute }) =>
            isRoute ? (
              <Link key={label} to={href} className="text-sm transition-colors text-white">
                {label}
              </Link>
            ) : (
              <a key={label} href={href} className="text-sm transition-colors text-white">
                {label}
              </a>
            )
          )}
        </nav>

        {/* Desktop CTA */}
        <Link
          to="/signup"
          className="hidden md:inline-block text-primary-foreground px-5 py-2 rounded-lg text-sm font-semibold transition-colors bg-white"
        >
          Start Building
        </Link>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-foreground p-2"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="container flex flex-col gap-1 py-4">
            {navLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2.5 px-3 rounded-lg hover:bg-muted"
              >
                {label}
              </a>
            ))}
            <Link
              to="/signup"
              onClick={() => setMobileOpen(false)}
              className="mt-2 text-center text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold bg-white"
            >
              Start Building
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

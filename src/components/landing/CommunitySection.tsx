import { Link } from "react-router-dom";

const avatarColors = [
  "bg-primary/30",
  "bg-accent/30",
  "bg-destructive/30",
  "bg-primary/20",
  "bg-accent/20",
  "bg-destructive/20",
];
const initials = ["RM", "SK", "DS", "AP", "KR", "PN"];

export default function CommunitySection() {
  return (
    <section id="community" className="border-t border-border py-[50px]">
      <div className="container max-w-2xl mx-auto text-center">
        {/* Overlapping avatars */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex -space-x-3">
            {initials.map((init, i) => (
              <div
                key={init}
                className={`w-11 h-11 rounded-full ${avatarColors[i]} border-2 border-background flex items-center justify-center text-xs font-mono font-medium text-foreground`}
              >
                {init}
              </div>
            ))}
          </div>
          <span className="ml-3 text-xs font-mono bg-surface2 text-primary px-3 py-1.5 rounded-full">
            +2,400
          </span>
        </div>

        <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4 text-balance">
          Join a community that ships, not just scrolls.
        </h2>
        <p className="text-muted-foreground mb-8 max-w-lg mx-auto text-pretty">
          Every week, builders share what they made, review each other's projects,
          and level up together.
        </p>
        <Link
          to="/signup"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3.5 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
        >
          Join Buildhub Free →
        </Link>
      </div>
    </section>
  );
}

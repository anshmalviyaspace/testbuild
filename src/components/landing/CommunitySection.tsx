import { Link } from "react-router-dom";
import { lazy, Suspense } from "react";
import type { GlobeMarker } from "@/components/ui/3d-globe";

const Globe3D = lazy(() => import("@/components/ui/3d-globe"));

const avatarColors = [
  "bg-primary/30",
  "bg-accent/30",
  "bg-destructive/30",
  "bg-primary/20",
  "bg-accent/20",
  "bg-destructive/20",
];
const initials = ["RM", "SK", "DS", "AP", "KR", "PN"];

const globeMarkers: GlobeMarker[] = [
  { lat: 28.6139, lng: 77.209, src: "https://assets.aceternity.com/avatars/1.webp", label: "Delhi" },
  { lat: 19.076, lng: 72.8777, src: "https://assets.aceternity.com/avatars/2.webp", label: "Mumbai" },
  { lat: 13.0827, lng: 80.2707, src: "https://assets.aceternity.com/avatars/3.webp", label: "Chennai" },
  { lat: 12.9716, lng: 77.5946, src: "https://assets.aceternity.com/avatars/4.webp", label: "Bangalore" },
  { lat: 22.5726, lng: 88.3639, src: "https://assets.aceternity.com/avatars/5.webp", label: "Kolkata" },
  { lat: 23.0225, lng: 72.5714, src: "https://assets.aceternity.com/avatars/6.webp", label: "Ahmedabad" },
  { lat: 17.385, lng: 78.4867, src: "https://assets.aceternity.com/avatars/7.webp", label: "Hyderabad" },
  { lat: 26.9124, lng: 75.7873, src: "https://assets.aceternity.com/avatars/8.webp", label: "Jaipur" },
  { lat: 30.7333, lng: 76.7794, src: "https://assets.aceternity.com/avatars/9.webp", label: "Chandigarh" },
  { lat: 15.3173, lng: 75.7139, src: "https://assets.aceternity.com/avatars/10.webp", label: "Manipal" },
  { lat: 10.8505, lng: 76.2711, src: "https://assets.aceternity.com/avatars/11.webp", label: "Palakkad" },
  { lat: 25.4358, lng: 81.8463, src: "https://assets.aceternity.com/avatars/12.webp", label: "Allahabad" },
];

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

      {/* 3D Globe */}
      <div className="container mt-16">
        <p className="text-xs font-mono text-primary tracking-widest uppercase mb-3 text-center">
          BUILDERS ACROSS INDIA
        </p>
        <div className="h-[400px] sm:h-[500px] w-full max-w-3xl mx-auto">
          <Suspense fallback={<div className="h-full flex items-center justify-center text-muted-foreground font-mono text-sm animate-pulse">Loading globe...</div>}>
            <Globe3D
              markers={globeMarkers}
              config={{
                atmosphereColor: "#00e5a0",
                atmosphereIntensity: 20,
                bumpScale: 5,
                autoRotateSpeed: 0.3,
                showAtmosphere: true,
              }}
            />
          </Suspense>
        </div>
      </div>
    </section>
  );
}

import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import clsx from "clsx";
import ConfettiEffect from "@/components/onboarding/ConfettiEffect";

const tracks = [
  {
    emoji: "🤖",
    name: "AI & Machine Learning",
    difficulty: "Beginner Friendly",
    desc: "From prompts to models. Build real AI tools and ship them.",
  },
  {
    emoji: "🎨",
    name: "UI/UX Design",
    difficulty: "Visual",
    desc: "Design thinking, Figma workflows, and shipping polished interfaces.",
  },
  {
    emoji: "💻",
    name: "Full Stack Dev",
    difficulty: "Intermediate",
    desc: "Build web apps from scratch — frontend, backend, and deployment.",
  },
  {
    emoji: "🚀",
    name: "Build a Startup",
    difficulty: "Advanced",
    desc: "Validate ideas, build MVPs, and pitch to peers and mentors.",
  },
];

export default function OnboardingPage() {
  const navigate = useNavigate();
  const { signupData } = useAuth();
  const { toast } = useToast();

  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState<"right" | "left">("right");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Step 1 state
  const [selectedTrack, setSelectedTrack] = useState<number | null>(null);

  // Step 2 state
  const autoUsername = useMemo(() => {
    if (!signupData) return "builder";
    return signupData.fullName
      .toLowerCase()
      .replace(/\s+/g, "")
      .slice(0, 12);
  }, [signupData]);

  const [username, setUsername] = useState(autoUsername);
  const [bio, setBio] = useState("");
  const [college, setCollege] = useState(signupData?.college || "");

  const firstName = signupData?.fullName?.split(" ")[0] || "Builder";

  const goNext = () => { setDirection("right"); setStep((s) => s + 1); };
  const goBack = () => { setDirection("left"); setStep((s) => s - 1); };

  const handleFinish = async () => {
    if (!signupData) {
      navigate("/signup");
      return;
    }

    setIsSubmitting(true);

    const track = selectedTrack !== null ? tracks[selectedTrack] : tracks[0];
    const initials = signupData.fullName
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

    // 1. Create the Supabase auth user (auto-confirm is enabled)
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email: signupData.email,
      password: signupData.password,
      options: {
        data: {
          full_name: signupData.fullName,
        },
      },
    });

    if (signUpError) {
      setIsSubmitting(false);
      if (signUpError.message.includes("already registered")) {
        toast({
          title: "Email already in use",
          description: "Try logging in instead.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Signup failed",
          description: signUpError.message,
          variant: "destructive",
        });
      }
      return;
    }

    const userId = authData.user?.id;
    if (!userId) {
      setIsSubmitting(false);
      toast({ title: "Something went wrong", description: "Please try again.", variant: "destructive" });
      return;
    }

    // 2. Insert the profile row into `profiles`
    const { error: profileError } = await supabase.from("profiles").insert({
      id: userId,
      full_name: signupData.fullName,
      username: username || autoUsername,
      college: college || signupData.college,
      current_track: track.name,
      xp_points: 0,
      streak_days: 0,
      avatar_initials: initials,
      bio: bio || null,
      email: signupData.email,
    });

    if (profileError) {
      console.error("Profile insert error:", profileError.message);
      toast({
        title: "Account created!",
        description: "We had trouble saving your profile — you can update it in Settings.",
      });
    }

    // 3. signUp with auto-confirm creates a session immediately.
    //    onAuthStateChange will fire and load the profile.
    //    Wait a moment for the auth state to settle, then navigate.
    await new Promise((r) => setTimeout(r, 1000));

    setIsSubmitting(false);
    navigate("/quiz");
  };

  const animClass =
    direction === "right" ? "animate-slide-from-right" : "animate-slide-from-left";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      {/* Progress dots */}
      <div className="flex items-center gap-2 mb-10">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={clsx(
              "h-2 rounded-full transition-all duration-300",
              i === step ? "w-8 bg-primary" : i < step ? "w-2 bg-primary/50" : "w-2 bg-border"
            )}
          />
        ))}
      </div>

      <div className="w-full max-w-2xl">
        {/* STEP 1: Pick a Track */}
        {step === 0 && (
          <div key="step0" className={animClass}>
            <h1 className="font-heading text-2xl sm:text-3xl font-extrabold mb-2 text-center">
              What do you want to build?
            </h1>
            <p className="text-sm text-muted-foreground text-center mb-8">
              Pick a track to get started. You can change this later.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {tracks.map((t, i) => {
                const active = selectedTrack === i;
                return (
                  <button
                    key={t.name}
                    onClick={() => setSelectedTrack(i)}
                    className={clsx(
                      "relative text-left bg-card border rounded-xl p-5 transition-all duration-200",
                      active
                        ? "border-primary ring-1 ring-primary/30"
                        : "border-border hover:border-muted-foreground/30"
                    )}
                  >
                    {active && (
                      <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                        <Check size={12} className="text-primary-foreground" />
                      </div>
                    )}
                    <span className="text-3xl block mb-3">{t.emoji}</span>
                    <h3 className="font-heading font-bold text-base mb-1">{t.name}</h3>
                    <span className="inline-block text-[10px] font-mono bg-surface2 text-muted-foreground px-2 py-0.5 rounded mb-2">
                      {t.difficulty}
                    </span>
                    <p className="text-sm text-muted-foreground">{t.desc}</p>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 flex justify-center">
              <button
                onClick={goNext}
                disabled={selectedTrack === null}
                className={clsx(
                  "flex items-center gap-2 px-7 py-3 rounded-lg font-semibold text-sm transition-all",
                  selectedTrack !== null
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-border text-muted-foreground cursor-not-allowed"
                )}
              >
                Continue <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Profile info */}
        {step === 1 && (
          <div key="step1" className={clsx(animClass, "max-w-md mx-auto")}>
            <h1 className="font-heading text-2xl sm:text-3xl font-extrabold mb-2 text-center">
              Tell us about yourself
            </h1>
            <p className="text-sm text-muted-foreground text-center mb-8">
              Set up your public builder profile.
            </p>

            <div className="space-y-5">
              {/* Username */}
              <div>
                <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) =>
                    setUsername(
                      e.target.value
                        .toLowerCase()
                        .replace(/[^a-z0-9_]/g, "")
                        .slice(0, 20)
                    )
                  }
                  maxLength={20}
                  className="w-full mt-1.5 bg-surface border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-shadow"
                />
                <p className="text-xs text-muted-foreground mt-1.5 font-mono">
                  Your profile will be at{" "}
                  <span className="text-primary">buildhub.io/@{username || "..."}</span>
                </p>
              </div>

              {/* Bio */}
              <div>
                <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                  Bio <span className="text-muted-foreground/50">(optional)</span>
                </label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value.slice(0, 280))}
                  maxLength={280}
                  rows={3}
                  placeholder="What are you trying to build?"
                  className="w-full mt-1.5 bg-surface border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary transition-shadow resize-none"
                />
              </div>

              {/* College */}
              <div>
                <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                  College
                </label>
                <input
                  type="text"
                  value={college}
                  onChange={(e) => setCollege(e.target.value.slice(0, 150))}
                  maxLength={150}
                  className="w-full mt-1.5 bg-surface border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-shadow"
                />
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between">
              <button
                onClick={goBack}
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft size={14} /> Back
              </button>
              <button
                onClick={goNext}
                disabled={!username.trim()}
                className={clsx(
                  "flex items-center gap-2 px-7 py-3 rounded-lg font-semibold text-sm transition-all",
                  username.trim()
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-border text-muted-foreground cursor-not-allowed"
                )}
              >
                Continue <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: All set — confirm + create account */}
        {step === 2 && (
          <div key="step2" className={clsx(animClass, "max-w-md mx-auto text-center")}>
            <ConfettiEffect />

            <h1 className="font-heading text-3xl sm:text-4xl font-extrabold mb-3">
              Welcome to Buildhub,{" "}
              <span className="text-gradient-primary">{firstName}!</span>
            </h1>
            <p className="text-sm text-muted-foreground mb-8">
              You're all set. Here's your builder profile summary.
            </p>

            {/* Summary card */}
            <div className="bg-card border border-border rounded-xl p-6 text-left space-y-4 mb-8">
              {selectedTrack !== null && (
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{tracks[selectedTrack].emoji}</span>
                  <div>
                    <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                      Track
                    </p>
                    <p className="text-sm font-medium">{tracks[selectedTrack].name}</p>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-mono text-primary">
                  @
                </div>
                <div>
                  <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                    Username
                  </p>
                  <p className="text-sm font-medium">@{username || autoUsername}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-xs">
                  🎓
                </div>
                <div>
                  <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                    College
                  </p>
                  <p className="text-sm font-medium">{college || signupData?.college || "—"}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4">
              <button
                onClick={goBack}
                disabled={isSubmitting}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors disabled:opacity-40"
              >
                ← Back
              </button>
              <button
                onClick={handleFinish}
                disabled={isSubmitting}
                className="flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-lg font-semibold text-sm hover:bg-primary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Creating account…
                  </>
                ) : (
                  <>
                    Enter Buildhub <ArrowRight size={16} />
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
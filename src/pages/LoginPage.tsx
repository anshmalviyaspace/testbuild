import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});

  const validate = () => {
    const e: typeof errors = {};
    if (!email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) e.email = "Enter a valid email";
    if (!password) e.password = "Password is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setErrors({});

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    setIsLoading(false);

    if (error) {
      // Map Supabase error messages to friendly ones
      if (error.message.includes("Invalid login credentials")) {
        setErrors({ general: "Incorrect email or password. Please try again." });
      } else if (error.message.includes("Email not confirmed")) {
        setErrors({ general: "Please confirm your email before logging in." });
      } else {
        setErrors({ general: error.message });
      }
      return;
    }

    // AuthContext's onAuthStateChange will handle loading the profile.
    // ProtectedRoute will let us through once currentUser is set.
    toast({ title: "Welcome back! 👋" });
    navigate("/dashboard/home");
  };

  const inputBase =
    "w-full mt-1.5 bg-surface border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary transition-shadow";

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left branding panel */}
      <div className="hidden lg:flex lg:w-[55%] relative bg-surface flex-col justify-between p-10 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-60" />
        <div className="absolute inset-0 bg-radial-glow" />

        {/* Logo */}
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-heading text-xl font-extrabold tracking-tight">
              Build<span className="text-foreground">hub</span>
            </span>
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse-dot" />
          </Link>
        </div>

        {/* Quote */}
        <div className="relative z-10 max-w-lg">
          <blockquote className="font-heading text-3xl xl:text-4xl font-bold leading-tight text-balance">
            "Every expert was once a{" "}
            <span className="text-gradient-primary">beginner who shipped.</span>"
          </blockquote>
        </div>

        {/* Bottom badge */}
        <div className="relative z-10">
          <span className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground border border-border px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-dot" />
            2,400+ builders active this month
          </span>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10 lg:p-16">
        <div className="w-full max-w-sm animate-fade-in opacity-0">
          {/* Mobile logo */}
          <div className="lg:hidden mb-8">
            <Link to="/" className="flex items-center gap-2">
              <span className="font-heading text-xl font-extrabold tracking-tight">
                Build<span className="text-foreground">hub</span>
              </span>
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse-dot" />
            </Link>
          </div>

          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold mb-2">
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground mb-8">
            Log in to continue building.
          </p>

          {/* General error banner */}
          {errors.general && (
            <div className="mb-5 bg-destructive/10 border border-destructive/20 text-destructive text-sm font-mono px-4 py-3 rounded-lg">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors((p) => ({ ...p, email: undefined, general: undefined }));
                }}
                placeholder="rahul@example.com"
                autoComplete="email"
                className={inputBase}
              />
              {errors.email && (
                <p className="text-xs text-destructive mt-1 font-mono">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                  Password
                </label>
                {/* Placeholder for future forgot-password flow */}
                <button
                  type="button"
                  className="text-[11px] font-mono text-muted-foreground hover:text-primary transition-colors"
                  onClick={() => toast({ title: "Coming soon", description: "Password reset will be added shortly." })}
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors((p) => ({ ...p, password: undefined, general: undefined }));
                  }}
                  placeholder="Your password"
                  autoComplete="current-password"
                  className={`${inputBase} pr-11`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 mt-0.5 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-destructive mt-1 font-mono">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold text-sm hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Logging in…
                </>
              ) : (
                <>
                  Log In <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary hover:underline font-medium">
              Sign up →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
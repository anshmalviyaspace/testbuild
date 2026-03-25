import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const avatarInitials = ["RM", "SK", "DS", "AP", "KR", "PN"];
const avatarColors = [
  "bg-primary/30",
  "bg-accent/30",
  "bg-destructive/30",
  "bg-primary/20",
  "bg-accent/20",
  "bg-destructive/20",
];

export default function SignupPage() {
  const navigate = useNavigate();
  const { setSignupData } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    fullName: "",
    college: "",
    email: "",
    password: "",
  });

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required";
    else if (form.fullName.trim().length > 100) e.fullName = "Name must be less than 100 characters";
    if (!form.college.trim()) e.college = "College name is required";
    else if (form.college.trim().length > 150) e.college = "College name too long";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      e.email = "Enter a valid email";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 6) e.password = "At least 6 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSignupData({
      fullName: form.fullName.trim(),
      college: form.college.trim(),
      email: form.email.trim(),
      password: form.password,
    });
    navigate("/onboarding");
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left branding panel */}
      <div className="hidden lg:flex lg:w-[60%] relative bg-surface flex-col justify-between p-10 overflow-hidden">
        {/* Grid background */}
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
            "The best way to learn is to{" "}
            <span className="text-gradient-primary">build something real.</span>"
          </blockquote>
        </div>

        {/* Avatars */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="flex -space-x-2.5">
            {avatarInitials.map((init, i) => (
              <div
                key={init}
                className={`w-9 h-9 rounded-full ${avatarColors[i]} border-2 border-surface flex items-center justify-center text-[10px] font-mono font-medium text-foreground`}
              >
                {init}
              </div>
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            Join <span className="text-foreground font-medium">2,400+</span> builders
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
            Create your account
          </h1>
          <p className="text-sm text-muted-foreground mb-8">
            Start building real projects today.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                Full Name
              </label>
              <input
                type="text"
                value={form.fullName}
                onChange={(e) => updateField("fullName", e.target.value)}
                maxLength={100}
                placeholder="Rahul Mehta"
                className="w-full mt-1.5 bg-surface border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary transition-shadow"
              />
              {errors.fullName && (
                <p className="text-xs text-destructive mt-1 font-mono">{errors.fullName}</p>
              )}
            </div>

            {/* College */}
            <div>
              <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                College Name
              </label>
              <input
                type="text"
                value={form.college}
                onChange={(e) => updateField("college", e.target.value)}
                maxLength={150}
                placeholder="IIT Delhi"
                className="w-full mt-1.5 bg-surface border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary transition-shadow"
              />
              {errors.college && (
                <p className="text-xs text-destructive mt-1 font-mono">{errors.college}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                maxLength={255}
                placeholder="rahul@example.com"
                className="w-full mt-1.5 bg-surface border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary transition-shadow"
              />
              {errors.email && (
                <p className="text-xs text-destructive mt-1 font-mono">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => updateField("password", e.target.value)}
                  maxLength={128}
                  placeholder="Min 6 characters"
                  className="w-full mt-1.5 bg-surface border border-border rounded-lg px-4 py-2.5 pr-11 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary transition-shadow"
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
              className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold text-sm hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
            >
              Create Account <ArrowRight size={16} />
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline font-medium">
              Login →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

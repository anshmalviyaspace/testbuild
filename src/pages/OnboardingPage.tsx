import { Link } from "react-router-dom";

export default function OnboardingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-lg space-y-6 text-center">
        <h1 className="font-heading text-3xl font-bold">Set up your profile</h1>
        <p className="text-muted-foreground text-sm">Tell us a bit about yourself so we can personalize your experience.</p>
        <div className="space-y-4 bg-card border border-border rounded-lg p-6 text-left">
          <div>
            <label className="text-xs font-mono text-muted-foreground">Username</label>
            <input className="w-full mt-1 bg-surface border border-border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary" placeholder="@yourhandle" />
          </div>
          <div>
            <label className="text-xs font-mono text-muted-foreground">College / Organization</label>
            <input className="w-full mt-1 bg-surface border border-border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
          <div>
            <label className="text-xs font-mono text-muted-foreground">Choose a Track</label>
            <select className="w-full mt-1 bg-surface border border-border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary">
              <option>AI & ML</option>
              <option>Full Stack Web</option>
              <option>Mobile Dev</option>
              <option>DevOps & Cloud</option>
              <option>Cybersecurity</option>
            </select>
          </div>
          <Link
            to="/dashboard/home"
            className="block w-full text-center bg-primary text-primary-foreground py-2.5 rounded-md font-medium text-sm hover:bg-primary/90 transition-colors"
          >
            Launch Dashboard →
          </Link>
        </div>
      </div>
    </div>
  );
}

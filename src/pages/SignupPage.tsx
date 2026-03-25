import { Link } from "react-router-dom";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="font-heading text-2xl font-bold">Create your account</h1>
          <p className="text-sm text-muted-foreground mt-2">Start building your dev profile</p>
        </div>
        <div className="space-y-4 bg-card border border-border rounded-lg p-6">
          <div>
            <label className="text-xs font-mono text-muted-foreground">Full Name</label>
            <input className="w-full mt-1 bg-surface border border-border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
          <div>
            <label className="text-xs font-mono text-muted-foreground">Email</label>
            <input type="email" className="w-full mt-1 bg-surface border border-border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
          <div>
            <label className="text-xs font-mono text-muted-foreground">Password</label>
            <input type="password" className="w-full mt-1 bg-surface border border-border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
          <button className="w-full bg-primary text-primary-foreground py-2.5 rounded-md font-medium text-sm hover:bg-primary/90 transition-colors">
            Sign Up
          </button>
        </div>
        <p className="text-center text-xs text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}

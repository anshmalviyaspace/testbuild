import { useAuth } from "@/contexts/AuthContext";

export default function SettingsView() {
  const { currentUser } = useAuth();
  if (!currentUser) return null;

  return (
    <div className="p-8">
      <h1 className="font-heading text-2xl font-bold mb-8">Settings</h1>
      <div className="space-y-6 max-w-lg">
        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
          <h2 className="font-heading font-semibold">Profile</h2>
          <div>
            <label className="text-xs font-mono text-muted-foreground">Full Name</label>
            <input defaultValue={currentUser.fullName} className="w-full mt-1 bg-surface border border-border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
          <div>
            <label className="text-xs font-mono text-muted-foreground">Username</label>
            <input defaultValue={`@${currentUser.username}`} className="w-full mt-1 bg-surface border border-border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
          <div>
            <label className="text-xs font-mono text-muted-foreground">College</label>
            <input defaultValue={currentUser.college} className="w-full mt-1 bg-surface border border-border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
        </div>
      </div>
    </div>
  );
}

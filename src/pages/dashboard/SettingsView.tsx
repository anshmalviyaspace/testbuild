import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { AlertTriangle, ArrowRight, X, Loader2 } from "lucide-react";

const trackOptions = [
  { value: "AI & Machine Learning", emoji: "🤖" },
  { value: "UI/UX Design", emoji: "🎨" },
  { value: "Full Stack Dev", emoji: "💻" },
  { value: "Build a Startup", emoji: "🚀" },
];

const avatarEmojis = ["😎", "🧑‍💻", "🦊", "🐱", "🤖", "👾", "🎯", "🔥", "🧠", "⚡", "🌈", "🎨"];

export default function SettingsView() {
  const { currentUser, logout, refreshProfile } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState(currentUser?.fullName || "");
  const [username, setUsername] = useState(currentUser?.username || "");
  const [college, setCollege] = useState(currentUser?.college || "");
  const [bio, setBio] = useState(currentUser?.bio || "");
  const [avatarEmoji, setAvatarEmoji] = useState<string | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  const [showTrackModal, setShowTrackModal] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState(currentUser?.currentTrack || "AI & Machine Learning");
  const [isSavingTrack, setIsSavingTrack] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  if (!currentUser) return null;

  const handleSaveProfile = async () => {
    if (!fullName.trim() || !username.trim()) {
      toast({ title: "Missing fields", description: "Name and username are required.", variant: "destructive" });
      return;
    }

    setIsSavingProfile(true);

    const initials = fullName.trim().split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: fullName.trim(),
        username: username.trim().replace(/^@/, ""),
        college: college.trim(),
        bio: bio.trim() || null,
        avatar_initials: initials,
      })
      .eq("id", currentUser.id);

    setIsSavingProfile(false);

    if (error) {
      if (error.message.includes("duplicate key") || error.message.includes("unique")) {
        toast({ title: "Username taken", description: "Please choose a different username.", variant: "destructive" });
      } else {
        toast({ title: "Failed to save", description: error.message, variant: "destructive" });
      }
      return;
    }

    // Re-fetch the profile so the sidebar/header updates immediately
    await refreshProfile();
    toast({ title: "Profile updated ✓", description: "Your changes have been saved." });
  };

  const handleSwitchTrack = async () => {
    setIsSavingTrack(true);

    const { error } = await supabase
      .from("profiles")
      .update({ current_track: selectedTrack })
      .eq("id", currentUser.id);

    setIsSavingTrack(false);
    setShowTrackModal(false);

    if (error) {
      toast({ title: "Failed to switch track", description: error.message, variant: "destructive" });
      return;
    }

    await refreshProfile();
    toast({ title: "Track switched!", description: "Your progress is saved." });
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    // Sign out — the user row in auth.users can only be deleted server-side.
    // For now we sign them out and clear their session.
    await logout();
    navigate("/");
  };

  const inputClass =
    "w-full mt-1.5 bg-surface border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary transition-shadow";

  const currentTrackEmoji = trackOptions.find((t) => t.value === currentUser.currentTrack)?.emoji || "🤖";

  return (
    <div className="p-6 sm:p-8 max-w-2xl animate-fade-in opacity-0">
      <h1 className="font-heading text-2xl font-extrabold mb-8">Settings</h1>

      <div className="space-y-8">
        {/* Profile */}
        <section className="bg-card border border-border rounded-xl p-6 space-y-5">
          <h2 className="font-heading text-base font-bold">Profile Settings</h2>

          {/* Avatar */}
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-heading font-bold text-primary-foreground shrink-0"
              style={{ background: "linear-gradient(135deg, hsl(160 100% 45%), hsl(220 100% 50%))" }}
            >
              {avatarEmoji || currentUser.avatarInitials}
            </div>
            <div>
              <button
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="text-xs font-mono text-primary hover:underline"
              >
                Change Avatar
              </button>
              {showEmojiPicker && (
                <div className="grid grid-cols-6 gap-1.5 mt-2 bg-surface border border-border rounded-lg p-3">
                  {avatarEmojis.map((em) => (
                    <button
                      key={em}
                      onClick={() => { setAvatarEmoji(em); setShowEmojiPicker(false); }}
                      className="w-9 h-9 rounded-lg text-lg flex items-center justify-center bg-surface2 hover:bg-primary/10 transition-colors"
                    >
                      {em}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="text-xs font-mono text-muted-foreground">Full Name</label>
            <input value={fullName} onChange={(e) => setFullName(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="text-xs font-mono text-muted-foreground">Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, "").slice(0, 20))}
              className={inputClass}
            />
          </div>
          <div>
            <label className="text-xs font-mono text-muted-foreground">College</label>
            <input value={college} onChange={(e) => setCollege(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="text-xs font-mono text-muted-foreground">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              maxLength={300}
              rows={3}
              placeholder="Tell the world about yourself..."
              className={`${inputClass} resize-none`}
            />
          </div>

          <button
            onClick={handleSaveProfile}
            disabled={isSavingProfile}
            className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-60 flex items-center gap-2"
          >
            {isSavingProfile ? <><Loader2 size={14} className="animate-spin" /> Saving…</> : "Save Changes"}
          </button>
        </section>

        {/* Track */}
        <section className="bg-card border border-border rounded-xl p-6 space-y-4">
          <h2 className="font-heading text-base font-bold">Track Settings</h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{currentTrackEmoji}</span>
              <div>
                <p className="text-sm font-medium">{currentUser.currentTrack}</p>
                <p className="text-[10px] font-mono text-muted-foreground">Current track</p>
              </div>
            </div>
            <button
              onClick={() => setShowTrackModal(true)}
              className="text-xs font-mono text-primary border border-primary/20 px-4 py-2 rounded-lg hover:bg-primary/10 transition-colors"
            >
              Switch Track
            </button>
          </div>
        </section>

        {/* Account — email is read-only for now (Supabase email change needs verification flow) */}
        <section className="bg-card border border-border rounded-xl p-6 space-y-5">
          <h2 className="font-heading text-base font-bold">Account</h2>

          <div>
            <label className="text-xs font-mono text-muted-foreground">Email</label>
            <input
              value={currentUser.email || ""}
              readOnly
              className={`${inputClass} opacity-60 cursor-not-allowed`}
            />
            <p className="text-[11px] font-mono text-muted-foreground mt-1">
              Email changes require verification — coming soon.
            </p>
          </div>

          <div className="pt-4 border-t border-border">
            <button
              onClick={() => setShowDeleteModal(true)}
              className="text-xs font-mono text-destructive hover:underline"
            >
              Delete Account
            </button>
          </div>
        </section>
      </div>

      {/* Track Switch Modal */}
      {showTrackModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowTrackModal(false)}>
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
          <div onClick={(e) => e.stopPropagation()} className="relative w-full max-w-sm bg-card border border-border rounded-xl p-6 space-y-5 animate-scale-in">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-bold">Switch Track</h3>
              <button onClick={() => setShowTrackModal(false)} className="text-muted-foreground hover:text-foreground"><X size={16} /></button>
            </div>
            <div className="space-y-2">
              {trackOptions.map((t) => (
                <button
                  key={t.value}
                  onClick={() => setSelectedTrack(t.value)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg text-sm transition-colors ${
                    selectedTrack === t.value
                      ? "bg-primary/10 border border-primary/30 text-primary"
                      : "bg-surface border border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span className="text-lg">{t.emoji}</span> {t.value}
                </button>
              ))}
            </div>
            <button
              onClick={handleSwitchTrack}
              disabled={isSavingTrack}
              className="w-full bg-primary text-primary-foreground py-2.5 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {isSavingTrack ? <><Loader2 size={14} className="animate-spin" /> Saving…</> : <>Confirm Switch <ArrowRight size={14} /></>}
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowDeleteModal(false)}>
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
          <div onClick={(e) => e.stopPropagation()} className="relative w-full max-w-sm bg-card border border-border rounded-xl p-6 space-y-4 animate-scale-in">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                <AlertTriangle size={18} className="text-destructive" />
              </div>
              <div>
                <h3 className="font-heading font-bold">Delete Account</h3>
                <p className="text-xs text-muted-foreground">This action cannot be undone.</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              All your projects, progress, and data will be permanently deleted.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 bg-surface2 border border-border py-2.5 rounded-lg text-sm font-mono text-muted-foreground hover:text-foreground transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={isDeleting}
                className="flex-1 bg-destructive text-destructive-foreground py-2.5 rounded-lg text-sm font-semibold hover:bg-destructive/90 transition-colors disabled:opacity-60"
              >
                {isDeleting ? "Deleting…" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
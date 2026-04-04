import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { useSubmitProject } from "@/hooks/useCommunity";
import { toast } from "@/hooks/use-toast";

const tracks = ["AI & ML", "UI/UX", "Full Stack", "Startup"];
const emojis = ["🚀", "🤖", "🎨", "💡", "⚡", "🛠️", "📱", "🌐", "💰", "🎯"];

interface Props {
  onClose: () => void;
}

export default function SubmitProjectModal({ onClose }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [track, setTrack] = useState(tracks[0]);
  const [emoji, setEmoji] = useState("🚀");

  const submit = useSubmitProject();

  const handleSubmit = () => {
    if (!title.trim() || !description.trim()) return;
    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    submit.mutate(
      { title: title.trim(), description: description.trim(), tags, track, emoji },
      {
        onSuccess: () => {
          toast({ title: "Project shipped! 🚀", description: "Your project is now live in the community feed." });
          onClose();
        },
        onError: () => {
          toast({ title: "Error", description: "Failed to submit project. Try again.", variant: "destructive" });
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-[10vh] overflow-y-auto" onClick={onClose}>
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-card border border-border rounded-xl p-6 animate-scale-in"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-background/60 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
        >
          <X size={16} />
        </button>

        <h2 className="font-heading text-xl font-extrabold mb-6">Ship a Project 🚀</h2>

        <div className="space-y-4">
          {/* Title */}
          <div>
            <label className="text-xs font-mono text-muted-foreground mb-1.5 block">Project Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={100}
              placeholder="My awesome project"
              className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-mono text-muted-foreground mb-1.5 block">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={500}
              rows={3}
              placeholder="What does it do? What tech did you use?"
              className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary resize-none"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="text-xs font-mono text-muted-foreground mb-1.5 block">Tags (comma separated)</label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              maxLength={200}
              placeholder="React, AI, Python"
              className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* Track */}
          <div>
            <label className="text-xs font-mono text-muted-foreground mb-1.5 block">Track</label>
            <div className="flex flex-wrap gap-2">
              {tracks.map((t) => (
                <button
                  key={t}
                  onClick={() => setTrack(t)}
                  className={`text-xs font-mono px-3 py-1.5 rounded-full transition-all ${
                    track === t
                      ? "bg-primary text-primary-foreground"
                      : "bg-surface2 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Emoji */}
          <div>
            <label className="text-xs font-mono text-muted-foreground mb-1.5 block">Icon</label>
            <div className="flex flex-wrap gap-2">
              {emojis.map((e) => (
                <button
                  key={e}
                  onClick={() => setEmoji(e)}
                  className={`w-9 h-9 rounded-lg text-lg flex items-center justify-center transition-all ${
                    emoji === e
                      ? "bg-primary/10 ring-1 ring-primary"
                      : "bg-surface2 hover:bg-surface2/80"
                  }`}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={!title.trim() || !description.trim() || submit.isPending}
            className="w-full bg-primary text-primary-foreground py-2.5 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {submit.isPending ? <Loader2 size={16} className="animate-spin" /> : null}
            Ship It 🚀
          </button>
        </div>
      </div>
    </div>
  );
}

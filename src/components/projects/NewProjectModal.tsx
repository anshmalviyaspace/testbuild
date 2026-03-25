import { useState, useCallback } from "react";
import { X, ArrowRight, Sparkles } from "lucide-react";
import clsx from "clsx";

const emojiOptions = [
  "🤖", "🎨", "💻", "🚀", "📱", "🔬", "🎮", "📊",
  "🛠️", "🧠", "⚡", "🌐", "🔥", "💡", "🎯", "🏗",
];

const trackOptions = ["AI & ML", "UI/UX Design", "Full Stack Dev", "Build a Startup"];

interface Props {
  onClose: () => void;
  onPublish: (project: {
    title: string;
    description: string;
    tags: string[];
    emoji: string;
    url: string;
    track: string;
  }) => void;
  prefillTitle?: string;
  prefillDescription?: string;
}

export default function NewProjectModal({
  onClose,
  onPublish,
  prefillTitle,
  prefillDescription,
}: Props) {
  const hasPrefill = !!(prefillTitle || prefillDescription);

  const [title, setTitle] = useState(prefillTitle || "");
  const [description, setDescription] = useState(prefillDescription || "");
  const [track, setTrack] = useState("AI & ML");
  const [url, setUrl] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [emoji, setEmoji] = useState("🤖");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleTagInput = useCallback(
    (value: string) => {
      if (value.endsWith(",") || value.endsWith(" ")) {
        const tag = value.slice(0, -1).trim();
        if (tag && !tags.includes(tag) && tags.length < 6) {
          setTags((prev) => [...prev, tag]);
        }
        setTagInput("");
      } else {
        setTagInput(value);
      }
    },
    [tags]
  );

  const removeTag = useCallback((tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  }, []);

  const handleSubmit = () => {
    const e: Record<string, string> = {};
    if (!title.trim()) e.title = "Project title is required";
    else if (title.trim().length > 100) e.title = "Title must be under 100 characters";
    if (!description.trim()) e.description = "Please describe what you built";
    else if (description.trim().length > 500) e.description = "Keep it under 500 characters";
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    // Add any remaining tag input
    const finalTags = [...tags];
    if (tagInput.trim() && !finalTags.includes(tagInput.trim())) {
      finalTags.push(tagInput.trim());
    }

    onPublish({
      title: title.trim(),
      description: description.trim(),
      tags: finalTags.length > 0 ? finalTags : [track],
      emoji,
      url: url.trim(),
      track,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-[10vh] overflow-y-auto" onClick={onClose}>
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-card border border-border rounded-xl overflow-hidden animate-scale-in"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h2 className="font-heading text-lg font-bold">Ship a Project 🚀</h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-5 space-y-5 max-h-[65vh] overflow-y-auto">
          {/* Pre-fill banner */}
          {hasPrefill && (
            <div className="flex items-center gap-2 bg-primary/[0.06] border border-primary/20 rounded-lg px-4 py-2.5">
              <Sparkles size={14} className="text-primary shrink-0" />
              <p className="text-xs text-primary">
                ✨ Brief pre-filled from your module project
              </p>
            </div>
          )}

          {/* Title */}
          <div>
            <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
              Project Title <span className="text-destructive">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title) setErrors((p) => { const n = { ...p }; delete n.title; return n; });
              }}
              maxLength={100}
              placeholder="e.g. AI Study Buddy"
              className="w-full mt-1.5 bg-surface border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary transition-shadow"
            />
            {errors.title && (
              <p className="text-xs text-destructive mt-1 font-mono">{errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
              What did you build? <span className="text-destructive">*</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                if (errors.description) setErrors((p) => { const n = { ...p }; delete n.description; return n; });
              }}
              maxLength={500}
              rows={3}
              placeholder="Describe your project in a few sentences..."
              className="w-full mt-1.5 bg-surface border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary transition-shadow resize-none"
            />
            {errors.description && (
              <p className="text-xs text-destructive mt-1 font-mono">{errors.description}</p>
            )}
          </div>

          {/* Track */}
          <div>
            <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
              Track
            </label>
            <select
              value={track}
              onChange={(e) => setTrack(e.target.value)}
              className="w-full mt-1.5 bg-surface border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            >
              {trackOptions.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* URL */}
          <div>
            <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
              Project URL
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              maxLength={500}
              placeholder="GitHub, Figma, live link..."
              className="w-full mt-1.5 bg-surface border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary transition-shadow"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
              Tags <span className="text-muted-foreground/50">(comma separated)</span>
            </label>
            <div className="flex flex-wrap items-center gap-1.5 mt-1.5 bg-surface border border-border rounded-lg px-3 py-2 min-h-[42px] focus-within:ring-1 focus-within:ring-primary transition-shadow">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 text-[10px] font-mono bg-surface2 text-muted-foreground px-2 py-1 rounded"
                >
                  {tag}
                  <button
                    onClick={() => removeTag(tag)}
                    className="hover:text-destructive transition-colors"
                  >
                    ×
                  </button>
                </span>
              ))}
              <input
                type="text"
                value={tagInput}
                onChange={(e) => handleTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    if (tagInput.trim() && !tags.includes(tagInput.trim()) && tags.length < 6) {
                      setTags((prev) => [...prev, tagInput.trim()]);
                      setTagInput("");
                    }
                  }
                  if (e.key === "Backspace" && !tagInput && tags.length > 0) {
                    setTags((prev) => prev.slice(0, -1));
                  }
                }}
                maxLength={30}
                placeholder={tags.length === 0 ? "React, Python, Claude API..." : ""}
                className="flex-1 min-w-[80px] bg-transparent text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none py-0.5"
              />
            </div>
          </div>

          {/* Emoji picker */}
          <div>
            <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
              Pick a thumbnail emoji
            </label>
            <div className="grid grid-cols-8 gap-2 mt-2">
              {emojiOptions.map((em) => (
                <button
                  key={em}
                  onClick={() => setEmoji(em)}
                  className={clsx(
                    "w-10 h-10 rounded-lg text-lg flex items-center justify-center transition-all duration-150",
                    emoji === em
                      ? "bg-primary/10 ring-2 ring-primary scale-110"
                      : "bg-surface2 hover:bg-surface2/80"
                  )}
                >
                  {em}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-border">
          <button
            onClick={handleSubmit}
            className="w-full bg-primary text-primary-foreground py-3 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
          >
            Publish Project <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function TrackView() {
  return (
    <div className="p-8">
      <h1 className="font-heading text-2xl font-bold mb-2">Your Track</h1>
      <p className="text-sm text-muted-foreground font-mono mb-8">AI & ML — Progress: 42%</p>
      <div className="w-full bg-surface2 rounded-full h-2 mb-8">
        <div className="bg-primary h-2 rounded-full" style={{ width: "42%" }} />
      </div>
      <div className="space-y-3">
        {["Intro to Python", "Data Structures", "Neural Networks", "Computer Vision", "NLP Basics"].map((mod, i) => (
          <div key={mod} className="flex items-center justify-between bg-card border border-border rounded-lg p-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-muted-foreground w-6">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-sm">{mod}</span>
            </div>
            <span className={`text-xs font-mono ${i < 2 ? "text-primary" : "text-muted-foreground"}`}>
              {i < 2 ? "completed" : i === 2 ? "in progress" : "locked"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

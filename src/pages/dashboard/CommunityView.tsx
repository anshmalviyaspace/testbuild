export default function CommunityView() {
  const members = [
    { name: "Priya Sharma", handle: "priyas", college: "IIT Bombay", xp: 580 },
    { name: "Arjun Patel", handle: "arjunp", college: "BITS Pilani", xp: 445 },
    { name: "Sneha Reddy", handle: "snehar", college: "IIIT Hyderabad", xp: 390 },
  ];

  return (
    <div className="p-8">
      <h1 className="font-heading text-2xl font-bold mb-2">Community</h1>
      <p className="text-sm text-muted-foreground mb-8">Top builders this week</p>
      <div className="space-y-3">
        {members.map((m, i) => (
          <div key={m.handle} className="flex items-center justify-between bg-card border border-border rounded-lg p-4">
            <div className="flex items-center gap-4">
              <span className="text-lg font-heading font-bold text-muted-foreground w-6">#{i + 1}</span>
              <div>
                <p className="text-sm font-medium">{m.name}</p>
                <p className="text-xs font-mono text-muted-foreground">@{m.handle} · {m.college}</p>
              </div>
            </div>
            <span className="text-sm font-mono text-primary">{m.xp} XP</span>
          </div>
        ))}
      </div>
    </div>
  );
}

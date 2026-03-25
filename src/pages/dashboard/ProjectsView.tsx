import { Plus } from "lucide-react";

const projects = [
  { name: "DevFolio", tech: ["React", "Tailwind"], status: "active" },
  { name: "ML Pipeline", tech: ["Python", "FastAPI"], status: "active" },
  { name: "CLI Todo", tech: ["Rust"], status: "completed" },
];

export default function ProjectsView() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-heading text-2xl font-bold">Projects</h1>
        <button className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
          <Plus size={16} /> New Project
        </button>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((p) => (
          <div key={p.name} className="bg-card border border-border rounded-lg p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-semibold">{p.name}</h3>
              <span className={`text-xs font-mono ${p.status === "active" ? "text-primary" : "text-muted-foreground"}`}>
                {p.status}
              </span>
            </div>
            <div className="flex gap-2">
              {p.tech.map((t) => (
                <span key={t} className="text-xs font-mono bg-surface2 text-muted-foreground px-2 py-0.5 rounded">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

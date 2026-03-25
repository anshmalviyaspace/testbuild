import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import type { Module } from "@/data/trackData";
import { initialModules } from "@/data/trackData";
import TrackSidebar from "@/components/track/TrackSidebar";
import ModuleDetail from "@/components/track/ModuleDetail";
import CompletionModal from "@/components/track/CompletionModal";

export default function TrackView() {
  const { toast } = useToast();
  const [modules, setModules] = useState<Module[]>(initialModules);
  const [activeModuleId, setActiveModuleId] = useState(4);
  const [checkedResources, setCheckedResources] = useState<Set<string>>(() => {
    const saved = localStorage.getItem("buildhub_checked_resources");
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [xpAnimation, setXpAnimation] = useState<{ show: boolean; amount: number }>({
    show: false,
    amount: 0,
  });

  const activeModule = modules.find((m) => m.id === activeModuleId)!;
  const completedCount = modules.filter((m) => m.status === "completed").length;
  const totalXp = modules.filter((m) => m.status === "completed").reduce((sum, m) => sum + m.xp, 0);
  const totalPossibleXp = modules.reduce((sum, m) => sum + m.xp, 0);
  const progressPercent = (completedCount / modules.length) * 100;

  const handleModuleClick = useCallback(
    (mod: Module) => {
      if (mod.status === "locked") {
        toast({
          title: "Module locked 🔒",
          description: "Complete the previous module to unlock this one.",
        });
        return;
      }
      setActiveModuleId(mod.id);
    },
    [toast]
  );

  const toggleResource = useCallback((resourceId: string) => {
    setCheckedResources((prev) => {
      const next = new Set(prev);
      if (next.has(resourceId)) next.delete(resourceId);
      else next.add(resourceId);
      localStorage.setItem("buildhub_checked_resources", JSON.stringify([...next]));
      return next;
    });
  }, []);

  const handleCompleteModule = useCallback(() => {
    const mod = modules.find((m) => m.id === activeModuleId);
    if (!mod || mod.status !== "in-progress") return;

    const xpAmount = mod.xp;

    setModules((prev) =>
      prev.map((m) => {
        if (m.id === activeModuleId) return { ...m, status: "completed" as const };
        if (m.id === activeModuleId + 1 && m.status === "locked")
          return { ...m, status: "in-progress" as const };
        return m;
      })
    );

    // XP animation
    setXpAnimation({ show: true, amount: xpAmount });
    setTimeout(() => setXpAnimation({ show: false, amount: 0 }), 2000);

    // Toast
    toast({
      title: "Module complete! 🎉",
      description: `+${xpAmount} XP — Your project brief is unlocked.`,
    });

    // Move to next module
    const nextModule = modules.find((m) => m.id === activeModuleId + 1);
    if (nextModule) {
      setTimeout(() => setActiveModuleId(activeModuleId + 1), 600);
    }

    setShowConfirmModal(false);
  }, [modules, activeModuleId, toast]);

  return (
    <div className="flex h-full">
      {/* Left panel — Module list */}
      <TrackSidebar
        modules={modules}
        activeModuleId={activeModuleId}
        completedCount={completedCount}
        totalXp={totalXp}
        totalPossibleXp={totalPossibleXp}
        progressPercent={progressPercent}
        onModuleClick={handleModuleClick}
      />

      {/* Right panel — Module detail */}
      <div className="flex-1 overflow-y-auto relative">
        {/* XP animation */}
        {xpAnimation.show && (
          <div className="absolute top-8 left-1/2 -translate-x-1/2 z-30 animate-fade-in-up opacity-0">
            <span className="text-3xl font-heading font-extrabold text-primary drop-shadow-lg">
              +{xpAnimation.amount} XP
            </span>
          </div>
        )}

        <ModuleDetail
          module={activeModule}
          checkedResources={checkedResources}
          onToggleResource={toggleResource}
          onRequestComplete={() => setShowConfirmModal(true)}
        />
      </div>

      {/* Completion modal */}
      {showConfirmModal && (
        <CompletionModal
          moduleName={activeModule.title}
          onConfirm={handleCompleteModule}
          onCancel={() => setShowConfirmModal(false)}
        />
      )}
    </div>
  );
}

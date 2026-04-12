import { useState, useCallback, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import type { Module } from "@/data/trackData";
import { initialModules } from "@/data/trackData";
import TrackSidebar from "@/components/track/TrackSidebar";
import ModuleDetail from "@/components/track/ModuleDetail";
import CompletionModal from "@/components/track/CompletionModal";
import {
  useTrackProgress,
  useToggleResource,
  useCompleteModule,
  useSaveActiveModule,
} from "@/hooks/useTrackProgress";

// Build the live module list by merging static data with saved progress
function buildModules(
  completedIds: string[],
  activeModuleId: number
): Module[] {
  return initialModules.map((mod, idx) => {
    const isCompleted = completedIds.includes(String(mod.id));

    // A module is in-progress if it's the active one and not completed,
    // OR if it's the first module that isn't completed yet
    const prevCompleted = idx === 0 || completedIds.includes(String(initialModules[idx - 1].id));
    const isInProgress = !isCompleted && prevCompleted;
    const isLocked = !isCompleted && !isInProgress;

    return {
      ...mod,
      status: isCompleted ? "completed" : isInProgress ? "in-progress" : "locked",
    };
  });
}

function TrackSkeleton() {
  return (
    <div className="flex h-full">
      <div className="w-full lg:w-[400px] shrink-0 border-r border-border bg-surface p-6 space-y-5">
        <div className="h-7 w-48 bg-surface2 rounded-lg animate-pulse" />
        <div className="h-2 w-full bg-surface2 rounded-full animate-pulse" />
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-16 bg-surface2 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
      <div className="flex-1 p-8 space-y-6">
        <div className="h-8 w-3/4 bg-surface2 rounded-lg animate-pulse" />
        <div className="h-4 w-full bg-surface2 rounded animate-pulse" />
        <div className="h-4 w-5/6 bg-surface2 rounded animate-pulse" />
        <div className="space-y-2 mt-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-14 bg-surface2 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function TrackView() {
  const { toast } = useToast();
  const { currentUser } = useAuth();

  // User's selected track — from their profile
  const userTrack = currentUser?.currentTrack || "AI & Machine Learning";

  // Load saved progress from Supabase
  const { data: progress, isLoading } = useTrackProgress(userTrack);

  const toggleResourceMutation = useToggleResource();
  const completeModuleMutation = useCompleteModule();
  const saveActiveModuleMutation = useSaveActiveModule();

  // Derive module state from Supabase progress
  const completedIds = progress?.completed_modules ?? [];
  const checkedResourceIds = progress?.checked_resources ?? [];
  const savedActiveId = progress?.active_module_id ?? null;

  // Build live module list
  const modules = buildModules(completedIds, savedActiveId ?? 1);

  // Active module — default to first in-progress one
  const [activeModuleId, setActiveModuleId] = useState<number>(1);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [xpAnimation, setXpAnimation] = useState<{ show: boolean; amount: number }>({
    show: false,
    amount: 0,
  });

  // Once progress loads, jump to the right module
  useEffect(() => {
    if (isLoading) return;
    if (savedActiveId) {
      setActiveModuleId(savedActiveId);
    } else {
      // Default to first in-progress module
      const firstInProgress = modules.find((m) => m.status === "in-progress");
      setActiveModuleId(firstInProgress?.id ?? 1);
    }
  }, [isLoading, savedActiveId]);

  const activeModule = modules.find((m) => m.id === activeModuleId) ?? modules[0];
  const completedCount = completedIds.length;
  const totalXp = modules
    .filter((m) => completedIds.includes(String(m.id)))
    .reduce((sum, m) => sum + m.xp, 0);
  const totalPossibleXp = modules.reduce((sum, m) => sum + m.xp, 0);
  const progressPercent = (completedCount / modules.length) * 100;

  const checkedResources = new Set<string>(checkedResourceIds);

  // ── Handlers ──────────────────────────────────────────────────────────────

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
      // Persist the active module to Supabase (fire and forget)
      saveActiveModuleMutation.mutate({ track: userTrack, moduleId: mod.id });
    },
    [toast, userTrack, saveActiveModuleMutation]
  );

  const handleToggleResource = useCallback(
    (resourceId: string) => {
      toggleResourceMutation.mutate({
        track: userTrack,
        resourceId,
        currentChecked: checkedResourceIds,
      });
    },
    [toggleResourceMutation, userTrack, checkedResourceIds]
  );

  const handleCompleteModule = useCallback(async () => {
    const mod = modules.find((m) => m.id === activeModuleId);
    if (!mod || mod.status !== "in-progress") return;

    const nextModule = modules.find((m) => m.id === activeModuleId + 1);

    try {
      await completeModuleMutation.mutateAsync({
        track: userTrack,
        moduleId: activeModuleId,
        nextModuleId: nextModule?.id ?? null,
        xpEarned: mod.xp,
        currentCompleted: completedIds,
        currentXp: currentUser?.xpPoints ?? 0,
      });

      // XP animation
      setXpAnimation({ show: true, amount: mod.xp });
      setTimeout(() => setXpAnimation({ show: false, amount: 0 }), 2000);

      toast({
        title: "Module complete! 🎉",
        description: `+${mod.xp} XP — Your project brief is unlocked.`,
      });

      // Move to next module after brief delay
      if (nextModule) {
        setTimeout(() => {
          setActiveModuleId(nextModule.id);
        }, 600);
      }
    } catch (err: any) {
      toast({
        title: "Failed to save progress",
        description: err.message,
        variant: "destructive",
      });
    }

    setShowConfirmModal(false);
  }, [
    modules,
    activeModuleId,
    completedIds,
    currentUser,
    userTrack,
    completeModuleMutation,
    toast,
  ]);

  // ── Render ─────────────────────────────────────────────────────────────────

  if (isLoading) return <TrackSkeleton />;

  return (
    <div className="flex h-full">
      {/* Left panel — module list */}
      <TrackSidebar
        modules={modules}
        activeModuleId={activeModuleId}
        completedCount={completedCount}
        totalXp={totalXp}
        totalPossibleXp={totalPossibleXp}
        progressPercent={progressPercent}
        track={userTrack}
        onModuleClick={handleModuleClick}
      />

      {/* Right panel — module detail */}
      <div className="flex-1 overflow-y-auto relative">
        {/* XP animation */}
        {xpAnimation.show && (
          <div className="absolute top-8 left-1/2 -translate-x-1/2 z-30 animate-fade-in-up opacity-0 pointer-events-none">
            <span className="text-3xl font-heading font-extrabold text-primary drop-shadow-lg">
              +{xpAnimation.amount} XP
            </span>
          </div>
        )}

        <ModuleDetail
          module={activeModule}
          checkedResources={checkedResources}
          onToggleResource={handleToggleResource}
          onRequestComplete={() => setShowConfirmModal(true)}
        />
      </div>

      {/* Completion modal */}
      {showConfirmModal && (
        <CompletionModal
          moduleName={activeModule.title}
          uncheckedCount={
            activeModule.resources.filter((r) => !checkedResources.has(r.id)).length
          }
          onConfirm={handleCompleteModule}
          onCancel={() => setShowConfirmModal(false)}
          isSaving={completeModuleMutation.isPending}
        />
      )}
    </div>
  );
}
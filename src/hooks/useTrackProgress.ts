import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface TrackProgressRow {
  id: string;
  user_id: string;
  track: string;
  completed_modules: string[];
  checked_resources: string[];
  active_module_id: number;
}

// ── Load progress for the user's current track ──────────────────────────────

export function useTrackProgress(track: string) {
  const { currentUser } = useAuth();

  return useQuery({
    queryKey: ["track-progress", currentUser?.id, track],
    enabled: !!currentUser && !!track,
    staleTime: 0, // always fresh — progress must be accurate
    queryFn: async (): Promise<TrackProgressRow | null> => {
      if (!currentUser) return null;

      const { data, error } = await supabase
        .from("user_track_progress")
        .select("*")
        .eq("user_id", currentUser.id)
        .eq("track", track)
        .maybeSingle();

      if (error) throw error;
      return data as TrackProgressRow | null;
    },
  });
}

// ── Toggle a resource checked/unchecked ─────────────────────────────────────

export function useToggleResource() {
  const qc = useQueryClient();
  const { currentUser } = useAuth();

  return useMutation({
    mutationFn: async ({
      track,
      resourceId,
      currentChecked,
    }: {
      track: string;
      resourceId: string;
      currentChecked: string[];
    }) => {
      if (!currentUser) throw new Error("Not authenticated");

      const next = currentChecked.includes(resourceId)
        ? currentChecked.filter((r) => r !== resourceId)
        : [...currentChecked, resourceId];

      // Upsert — creates row if first time, updates otherwise
      const { error } = await supabase
        .from("user_track_progress")
        .upsert(
          {
            user_id: currentUser.id,
            track,
            checked_resources: next,
          },
          { onConflict: "user_id,track" }
        );

      if (error) throw error;
      return next;
    },
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["track-progress", currentUser?.id, vars.track] });
    },
  });
}

// ── Complete a module ────────────────────────────────────────────────────────

export function useCompleteModule() {
  const qc = useQueryClient();
  const { currentUser, refreshProfile } = useAuth();

  return useMutation({
    mutationFn: async ({
      track,
      moduleId,
      nextModuleId,
      xpEarned,
      currentCompleted,
      currentXp,
    }: {
      track: string;
      moduleId: number;
      nextModuleId: number | null;
      xpEarned: number;
      currentCompleted: string[];
      currentXp: number;
    }) => {
      if (!currentUser) throw new Error("Not authenticated");

      const newCompleted = currentCompleted.includes(String(moduleId))
        ? currentCompleted
        : [...currentCompleted, String(moduleId)];

      // 1. Upsert track progress
      const { error: progressError } = await supabase
        .from("user_track_progress")
        .upsert(
          {
            user_id: currentUser.id,
            track,
            completed_modules: newCompleted,
            active_module_id: nextModuleId ?? moduleId,
          },
          { onConflict: "user_id,track" }
        );

      if (progressError) throw progressError;

      // 2. Update XP in profiles
      const newXp = currentXp + xpEarned;
      const { error: xpError } = await supabase
        .from("profiles")
        .update({ xp_points: newXp })
        .eq("id", currentUser.id);

      if (xpError) throw xpError;

      return { newCompleted, newXp };
    },
    onSuccess: async (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["track-progress", currentUser?.id, vars.track] });
      // Refresh profile so XP updates in sidebar/HomeView immediately
      await refreshProfile();
    },
  });
}

// ── Save which module the user is currently viewing ─────────────────────────

export function useSaveActiveModule() {
  const qc = useQueryClient();
  const { currentUser } = useAuth();

  return useMutation({
    mutationFn: async ({
      track,
      moduleId,
    }: {
      track: string;
      moduleId: number;
    }) => {
      if (!currentUser) return;

      await supabase
        .from("user_track_progress")
        .upsert(
          {
            user_id: currentUser.id,
            track,
            active_module_id: moduleId,
          },
          { onConflict: "user_id,track" }
        );
    },
    onSuccess: (_d, vars) => {
      qc.invalidateQueries({ queryKey: ["track-progress", currentUser?.id, vars.track] });
    },
  });
}
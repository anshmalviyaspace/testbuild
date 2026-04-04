import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

// ── Types ──

export interface CommunityProjectRow {
  id: string;
  user_id: string;
  title: string;
  description: string;
  tags: string[];
  track: string;
  emoji: string;
  gradient_from: string;
  gradient_to: string;
  created_at: string;
  // joined
  author_name?: string;
  author_username?: string;
  author_college?: string;
  author_initials?: string;
  like_count: number;
  user_liked: boolean;
}

export interface CommentRow {
  id: string;
  user_id: string;
  project_id: string;
  content: string;
  created_at: string;
  author_name?: string;
  author_username?: string;
  author_initials?: string;
}

export interface LeaderboardRow {
  id: string;
  username: string;
  full_name: string;
  avatar_initials: string;
  college: string;
  xp_points: number;
  current_track: string;
  project_count: number;
}

// ── Fetch community projects with author info + like counts ──

export function useCommunityProjects(filter?: string, search?: string) {
  const { currentUser } = useAuth();

  return useQuery({
    queryKey: ["community-projects", filter, search],
    staleTime: 30_000, // 30s client cache
    queryFn: async () => {
      // Get projects
      let q = supabase
        .from("community_projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (filter && filter !== "All") {
        q = q.eq("track", filter);
      }
      if (search?.trim()) {
        q = q.ilike("title", `%${search.trim()}%`);
      }

      const { data: projects, error } = await q;
      if (error) throw error;
      if (!projects?.length) return [];

      // Get author profiles
      const userIds = [...new Set(projects.map((p) => p.user_id))];
      const { data: profiles } = await supabase
        .from("profiles")
        .select("id, full_name, username, college, avatar_initials")
        .in("id", userIds);

      const profileMap = new Map(
        (profiles || []).map((p) => [p.id, p])
      );

      // Get like counts
      const projectIds = projects.map((p) => p.id);
      const { data: likes } = await supabase
        .from("project_likes")
        .select("project_id")
        .in("project_id", projectIds);

      const likeCounts = new Map<string, number>();
      (likes || []).forEach((l) => {
        likeCounts.set(l.project_id, (likeCounts.get(l.project_id) || 0) + 1);
      });

      // Get current user's likes
      let userLikes = new Set<string>();
      if (currentUser) {
        const { data: myLikes } = await supabase
          .from("project_likes")
          .select("project_id")
          .eq("user_id", currentUser.id)
          .in("project_id", projectIds);
        userLikes = new Set((myLikes || []).map((l) => l.project_id));
      }

      return projects.map((p) => {
        const profile = profileMap.get(p.user_id);
        return {
          ...p,
          author_name: profile?.full_name || "Unknown",
          author_username: profile?.username || "",
          author_college: profile?.college || "",
          author_initials: profile?.avatar_initials || "??",
          like_count: likeCounts.get(p.id) || 0,
          user_liked: userLikes.has(p.id),
        } as CommunityProjectRow;
      });
    },
  });
}

// ── Toggle like ──

export function useToggleLike() {
  const qc = useQueryClient();
  const { currentUser } = useAuth();

  return useMutation({
    mutationFn: async ({ projectId, liked }: { projectId: string; liked: boolean }) => {
      if (!currentUser) throw new Error("Not authenticated");
      if (liked) {
        await supabase
          .from("project_likes")
          .delete()
          .eq("user_id", currentUser.id)
          .eq("project_id", projectId);
      } else {
        await supabase
          .from("project_likes")
          .insert({ user_id: currentUser.id, project_id: projectId });
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["community-projects"] });
    },
  });
}

// ── Comments ──

export function useProjectComments(projectId: string | null) {
  return useQuery({
    queryKey: ["project-comments", projectId],
    enabled: !!projectId,
    staleTime: 15_000,
    queryFn: async () => {
      if (!projectId) return [];

      const { data: comments, error } = await supabase
        .from("project_comments")
        .select("*")
        .eq("project_id", projectId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      if (!comments?.length) return [];

      const userIds = [...new Set(comments.map((c) => c.user_id))];
      const { data: profiles } = await supabase
        .from("profiles")
        .select("id, full_name, username, avatar_initials")
        .in("id", userIds);

      const profileMap = new Map(
        (profiles || []).map((p) => [p.id, p])
      );

      return comments.map((c) => {
        const profile = profileMap.get(c.user_id);
        return {
          ...c,
          author_name: profile?.full_name || "Unknown",
          author_username: profile?.username || "",
          author_initials: profile?.avatar_initials || "??",
        } as CommentRow;
      });
    },
  });
}

export function useAddComment() {
  const qc = useQueryClient();
  const { currentUser } = useAuth();

  return useMutation({
    mutationFn: async ({ projectId, content }: { projectId: string; content: string }) => {
      if (!currentUser) throw new Error("Not authenticated");
      const { error } = await supabase
        .from("project_comments")
        .insert({ user_id: currentUser.id, project_id: projectId, content });
      if (error) throw error;
    },
    onSuccess: (_d, vars) => {
      qc.invalidateQueries({ queryKey: ["project-comments", vars.projectId] });
      qc.invalidateQueries({ queryKey: ["community-projects"] });
    },
  });
}

// ── Leaderboard ──

export function useLeaderboard() {
  return useQuery({
    queryKey: ["leaderboard"],
    staleTime: 60_000, // 1 min cache
    queryFn: async () => {
      const { data, error } = await supabase
        .from("leaderboard_view")
        .select("*")
        .order("xp_points", { ascending: false })
        .limit(20);

      if (error) throw error;
      return (data || []) as LeaderboardRow[];
    },
  });
}

// ── Submit project ──

export function useSubmitProject() {
  const qc = useQueryClient();
  const { currentUser } = useAuth();

  return useMutation({
    mutationFn: async (project: {
      title: string;
      description: string;
      tags: string[];
      track: string;
      emoji: string;
    }) => {
      if (!currentUser) throw new Error("Not authenticated");
      const gradients = [
        { f: "hsl(160 100% 45% / 0.25)", t: "hsl(220 100% 50% / 0.15)" },
        { f: "hsl(280 80% 60% / 0.25)", t: "hsl(346 100% 62% / 0.15)" },
        { f: "hsl(220 100% 50% / 0.25)", t: "hsl(160 100% 45% / 0.15)" },
        { f: "hsl(45 100% 60% / 0.25)", t: "hsl(25 95% 55% / 0.15)" },
      ];
      const g = gradients[Math.floor(Math.random() * gradients.length)];

      const { error } = await supabase.from("community_projects").insert({
        user_id: currentUser.id,
        title: project.title,
        description: project.description,
        tags: project.tags,
        track: project.track,
        emoji: project.emoji,
        gradient_from: g.f,
        gradient_to: g.t,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["community-projects"] });
    },
  });
}

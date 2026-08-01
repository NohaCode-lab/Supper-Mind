import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../services/supabase";
import { useAuth } from "./useAuth";

const DEMO_MOODS = [
  {
    id: "m-1",
    mood_score: "Good",
    note: "Productive morning! Completed 3 deep work sessions.",
    created_at: new Date(Date.now() - 3600 * 1000 * 4).toISOString(),
  },
  {
    id: "m-2",
    mood_score: "Rad",
    note: "Went for a 5km run in the park and felt energized.",
    created_at: new Date(Date.now() - 3600 * 1000 * 28).toISOString(),
  },
];

export function useMood() {
  const { currentUser } = useAuth();
  const queryClient = useQueryClient();
  const [localMoods, setLocalMoods] = useState(DEMO_MOODS);

  const { data: moodHistory = localMoods, isLoading: isFetchingMoods } = useQuery({
    queryKey: ["moods", currentUser?.id],
    queryFn: async () => {
      if (!currentUser?.id) return DEMO_MOODS;
      try {
        const { data, error } = await supabase
          .from("mood_logs")
          .select("*")
          .eq("user_id", currentUser.id)
          .order("created_at", { ascending: false })
          .limit(30);

        if (error || !data || data.length === 0) return localMoods;
        return data;
      } catch {
        return localMoods;
      }
    },
    initialData: DEMO_MOODS,
  });

  const { mutate: logMood, isPending: isLoggingMood } = useMutation({
    mutationFn: async (newEntry) => {
      const entry = {
        id: `mood-${Date.now()}`,
        user_id: currentUser?.id || "demo-user",
        mood_score: newEntry.mood_score,
        note: newEntry.note,
        created_at: new Date().toISOString(),
      };

      try {
        await supabase.from("mood_logs").insert([entry]);
      } catch {
        // Fallback for demo mode
      }

      setLocalMoods((prev) => [entry, ...prev]);
      return entry;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["moods"] });
    },
  });

  return {
    moodHistory,
    isFetchingMoods,
    logMood,
    isLoggingMood,
  };
}
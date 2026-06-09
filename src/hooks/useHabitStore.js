import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../../services/supabase";
import { useAuth } from "../../../hooks/useAuth";

export function useHabitStore() {
  const { currentUser } = useAuth();
  const queryClient = useQueryClient();

  // جلب العادات من قاعدة البيانات
  const { data: habits = [], isLoading } = useQuery({
    queryKey: ["habits", currentUser?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("habits")
        .select("*")
        .eq("user_id", currentUser.id)
        .order("created_at", { ascending: true });

      if (error) throw new Error(error.message);
      return data;
    },
    enabled: !!currentUser,
  });

  // إضافة عادة جديدة
  const addHabitMutation = useMutation({
    mutationFn: async (name) => {
      const { error } = await supabase
        .from("habits")
        .insert([{ 
          name, 
          streak: 0, 
          last_completed: null, 
          user_id: currentUser.id 
        }]);

      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["habits"] }),
  });

  // تبديل حالة العادة (إنجاز أو إلغاء الإنجاز)
  const toggleHabitMutation = useMutation({
    mutationFn: async (id) => {
      const habit = habits.find((h) => h.id === id);
      if (!habit) return;

      const today = new Date().toISOString().split("T")[0];
      const isCompletedToday = habit.last_completed === today;

      const newStreak = isCompletedToday ? Math.max(0, habit.streak - 1) : habit.streak + 1;
      const newLastCompleted = isCompletedToday ? null : today;

      const { error } = await supabase
        .from("habits")
        .update({ streak: newStreak, last_completed: newLastCompleted })
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["habits"] }),
  });

  // حذف العادة
  const removeHabitMutation = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from("habits").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["habits"] }),
  });

  return {
    habits,
    isLoading,
    addHabit: addHabitMutation.mutate,
    toggleHabit: toggleHabitMutation.mutate,
    removeHabit: removeHabitMutation.mutate,
  };
}
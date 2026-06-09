import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useAuth } from "../../../hooks/useAuth";
import { supabase } from "../../../services/supabase";

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
      const { error } = await supabase.from("habits").insert([
        {
          name,
          streak: 0,
          last_completed: null,
          user_id: currentUser.id,
        },
      ]);

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

      const newStreak = isCompletedToday
        ? Math.max(0, habit.streak - 1)
        : habit.streak + 1;
      const newLastCompleted = isCompletedToday ? null : today;

      const { error } = await supabase
        .from("habits")
        .update({ streak: newStreak, last_completed: newLastCompleted })
        .eq("id", id);

      if (error) throw error;

      return { isCompletedNow: !isCompletedToday, habitName: habit.name };
    },
    // تحديث متفائل (Optimistic Update) لتبديل العادة
    onMutate: async (id) => {
      await queryClient.cancelQueries({
        queryKey: ["habits", currentUser?.id],
      });
      const previousHabits = queryClient.getQueryData([
        "habits",
        currentUser?.id,
      ]);

      queryClient.setQueryData(["habits", currentUser?.id], (old) => {
        if (!old) return [];
        const today = new Date().toISOString().split("T")[0];
        return old.map((habit) => {
          if (habit.id === id) {
            const isCompletedToday = habit.last_completed === today;
            return {
              ...habit,
              streak: isCompletedToday
                ? Math.max(0, habit.streak - 1)
                : habit.streak + 1,
              last_completed: isCompletedToday ? null : today,
            };
          }
          return habit;
        });
      });
      return { previousHabits };
    },
    onError: (err, id, context) => {
      if (context?.previousHabits) {
        queryClient.setQueryData(
          ["habits", currentUser?.id],
          context.previousHabits,
        );
      }
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["habits"] }),
    onSuccess: (data) => {
      // إظهار الإشعار فقط إذا تم إنجاز العادة (وليس عند إلغاء الإنجاز)
      if (data?.isCompletedNow) {
        toast.success(`Great job completing "${data.habitName}"! 🥳`);
      }
    },
  });

  // حذف العادة
  const removeHabitMutation = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from("habits").delete().eq("id", id);
      if (error) throw error;
    },
    // تحديث متفائل لحذف العادة
    onMutate: async (id) => {
      await queryClient.cancelQueries({
        queryKey: ["habits", currentUser?.id],
      });
      const previousHabits = queryClient.getQueryData([
        "habits",
        currentUser?.id,
      ]);

      queryClient.setQueryData(["habits", currentUser?.id], (old) =>
        old ? old.filter((habit) => habit.id !== id) : [],
      );
      return { previousHabits };
    },
    onError: (err, id, context) => {
      if (context?.previousHabits) {
        queryClient.setQueryData(
          ["habits", currentUser?.id],
          context.previousHabits,
        );
      }
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["habits"] }),
  });

  return {
    habits,
    isLoading,
    addHabit: addHabitMutation.mutate,
    toggleHabit: toggleHabitMutation.mutate,
    removeHabit: removeHabitMutation.mutate,
  };
}

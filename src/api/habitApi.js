import { supabase } from "../services/supabase";

export const habitApi = {
  async fetchHabits(userId) {
    if (!userId) return [];
    const { data, error } = await supabase
      .from("habits")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  },

  async createHabit(userId, name) {
    const { data, error } = await supabase
      .from("habits")
      .insert([{ user_id: userId, name, streak: 0 }])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async updateStreak(habitId, streak, lastCompleted) {
    const { data, error } = await supabase
      .from("habits")
      .update({ streak, last_completed: lastCompleted })
      .eq("id", habitId)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async deleteHabit(habitId) {
    const { error } = await supabase.from("habits").delete().eq("id", habitId);
    if (error) throw error;
  },
};

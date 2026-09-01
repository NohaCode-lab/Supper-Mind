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

  async updateStreak(habitId, streak, lastCompleted, userId = null) {
    let query = supabase
      .from("habits")
      .update({ streak, last_completed: lastCompleted })
      .eq("id", habitId);
    if (userId) {
      query = query.eq("user_id", userId);
    }
    const { data, error } = await query.select().single();
    if (error) throw error;
    return data;
  },

  async deleteHabit(habitId, userId = null) {
    let query = supabase.from("habits").delete().eq("id", habitId);
    if (userId) {
      query = query.eq("user_id", userId);
    }
    const { error } = await query;
    if (error) throw error;
  },
};

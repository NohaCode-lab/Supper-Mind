import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../services/supabase";
import { useAuth } from "./useAuth";
import { toast } from "react-toastify";

export function useJournal() {
  const { currentUser } = useAuth();
  const queryClient = useQueryClient();

  // جلب اليوميات
  const { data: entries = [], isLoading } = useQuery({
    queryKey: ["journals", currentUser?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("journals")
        .select("*")
        .eq("user_id", currentUser.id)
        .order("created_at", { ascending: false });

      if (error) throw new Error(error.message);
      return data;
    },
    enabled: !!currentUser,
  });

  // إضافة يومية جديدة
  const addEntryMutation = useMutation({
    mutationFn: async (text) => {
      const { error } = await supabase
        .from("journals")
        .insert([{ text, user_id: currentUser.id }]);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["journals"] });
      toast.success("Journal entry saved! 📝");
    },
  });

  // حذف يومية
  const deleteEntryMutation = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from("journals").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["journals"] });
      toast.info("Entry deleted 🗑️");
    },
  });

  return { entries, isLoading, addEntry: addEntryMutation.mutate, isAdding: addEntryMutation.isPending, deleteEntry: deleteEntryMutation.mutate };
}
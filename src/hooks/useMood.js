import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../services/supabase";
import { useAuth } from "./useAuth";

export function useMood() {
  const { currentUser } = useAuth();
  const queryClient = useQueryClient();

  // 1. استخدام useQuery لجلب البيانات وإدارتها تلقائياً
  const { data: moodHistory = [], isLoading: isFetchingMoods } = useQuery({
    // مفتاح الاستعلام: فريد لكل طلب بيانات
    queryKey: ["moods", currentUser?.id],
    // دالة جلب البيانات
    queryFn: async () => {
      const { data, error } = await supabase
        .from("mood_logs")
        .select("*")
        .eq("user_id", currentUser.id)
        .order("created_at", { ascending: false })
        .limit(30);

      if (error) throw new Error(error.message);
      return data;
    },
    // تشغيل الاستعلام فقط في حال وجود مستخدم مسجل
    enabled: !!currentUser,
  });
  
  // 2. استخدام useMutation لإضافة/تحديث البيانات
  const { mutate: logMood, isPending: isLoggingMood } = useMutation({
    mutationFn: async (moodData) => {
      const { error } = await supabase
        .from("mood_logs")
        .insert([{ ...moodData, user_id: currentUser.id }]);

      if (error) throw error;
    },
    // عند النجاح، قم بإلغاء صلاحية الكاش لجلب البيانات الجديدة تلقائياً
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["moods"] });
    },
    onError: (error) => {
      console.error("Error logging mood:", error.message);
    },
  });

  return {
    moodHistory,
    isFetchingMoods,
    logMood,
    isLoggingMood,
  };
}
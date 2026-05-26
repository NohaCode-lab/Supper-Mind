
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../services/supabase';
import { toast } from 'react-toastify';
import { handleAppError } from '../utils/helper';

// Direct asynchronous function to fetch the user's mood history
const fetchMoodHistory = async () => {
  const { data, error } = await supabase
    .from('moods')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(30); // Fetch the last 30 entries for the dashboard chart

  if (error) throw error;
  return data;
};

export function useMood() {
  const queryClient = useQueryClient();

  // 1. Fetch data with automatic caching and loading states
  const { 
    data: moodHistory = [], 
    isLoading: isFetchingMoods 
  } = useQuery({
    queryKey: ['moods'],
    queryFn: fetchMoodHistory,
    staleTime: 1000 * 60 * 5, // Keep data fresh for 5 minutes without refetching
  });

  // 2. Direct mutation to save a new mood entry
  const logMoodMutation = useMutation({
    mutationFn: async (moodEntry) => {
      const { data, error } = await supabase
        .from('moods')
        .insert([moodEntry])
        .select();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      // Instantly refresh the dashboard chart data
      queryClient.invalidateQueries({ queryKey: ['moods'] });
      toast.success('Your mood has been logged.');
    },
    onError: (error) => {
      handleAppError(error, 'We could not save your mood entry.');
    }
  });

  return {
    moodHistory,
    isFetchingMoods,
    logMood: logMoodMutation.mutate,
    isLoggingMood: logMoodMutation.isPending
  };
}
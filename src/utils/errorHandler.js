
import { toast } from 'react-toastify';

/**
 * A direct, unified error handler to process API and application errors.
 * It logs the exact issue for developers and shows a safe toast to the user.
 * * @param {Error|Object} error - The caught error object
 * @param {string} customFallbackMsg - An optional friendly message for the user
 */
export const handleAppError = (error, customFallbackMsg = 'Something went wrong. Please try again.') => {
  // 1. Log the full error to the console for debugging
  console.error('[Supper Mind Error]:', error);

  // 2. Extract the most readable error message
  // Checks common error structures (Axios, Supabase, basic Error)
  const userMessage = 
    error?.response?.data?.message || 
    error?.message || 
    customFallbackMsg;

  // 3. Trigger the UI notification seamlessly
  toast.error(userMessage);
};
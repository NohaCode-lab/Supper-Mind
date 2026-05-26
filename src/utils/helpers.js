
import { clsx } from 'clsx';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { toast } from 'react-toastify';
import { FALLBACK_MESSAGES } from './constand';

// Initialize the relative time plugin for "2 hours ago" formatting
dayjs.extend(relativeTime);

/**
 * UTILITY 1: Class Name Merger
 * Safely merges conditional Tailwind classes to keep components clean.
 */
export function cn(...inputs) {
  return clsx(inputs);
}

/**
 * UTILITY 2: Time Formatters
 * Direct formatting functions for chat bubbles and dashboard stats.
 */
export const formatMessageTime = (date) => {
  if (!date) return '';
  return dayjs(date).format('HH:mm'); // e.g., "14:30"
};

export const formatRelativeTime = (date) => {
  if (!date) return '';
  return dayjs(date).fromNow(); // e.g., "5 minutes ago"
};

/**
 * UTILITY 3: Global Error Handler
 * Consistently catches API/Auth errors, logs them securely, and alerts the user.
 */
export const handleAppError = (error, customMessage) => {
  // 1. Log the exact developer error to the console
  console.error('[Supper Mind Application Error]:', error);

  // 2. Determine the safest, most readable message for the UI
  const displayMessage = 
    customMessage || 
    error?.message || 
    FALLBACK_MESSAGES.ERROR_GENERIC;

  // 3. Trigger the UI toast notification
  toast.error(displayMessage);
};
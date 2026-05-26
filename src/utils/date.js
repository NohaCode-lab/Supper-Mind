
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// Extend dayjs to support "time ago" formatting
dayjs.extend(relativeTime);

/**
 * Direct formatter for chat message timestamps.
 * @param {Date|string|number} date 
 * @returns {string} e.g., "14:30"
 */
export const formatMessageTime = (date) => {
  if (!date) return '';
  return dayjs(date).format('HH:mm');
};

/**
 * Direct formatter for dashboard statistics or session history.
 * @param {Date|string|number} date 
 * @returns {string} e.g., "2 days ago"
 */
export const formatTimeAgo = (date) => {
  if (!date) return '';
  return dayjs(date).fromNow();
};

/**
 * Standard date formatter for user profiles and account creation.
 * @param {Date|string|number} date 
 * @returns {string} e.g., "Oct 12, 2026"
 */
export const formatStandardDate = (date) => {
  if (!date) return '';
  return dayjs(date).format('MMM DD, YYYY');
};

import { clsx } from 'clsx';

/**
 * A direct utility function to seamlessly merge conditional Tailwind classes.
 * This keeps our JSX clean and readable across the entire project.
 * * @param  {...any} inputs - Class names, arrays, or conditional objects
 * @returns {string} - The cleanly merged class string
 */
export function cn(...inputs) {
  return clsx(inputs);
}
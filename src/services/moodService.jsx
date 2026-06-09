import { FiSmile, FiMeh, FiFrown } from "react-icons/fi";

// ✅ Centralized mood configuration
export const MOODS = [
  {
    value: 3,
    icon: <FiSmile size={24} />,
    label: "Good",
    color: "text-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
    border: "border-emerald-200 dark:border-emerald-800",
    ring: "ring-emerald-500",
  },
  {
    value: 2,
    icon: <FiMeh size={24} />,
    label: "Okay",
    color: "text-amber-500",
    bg: "bg-amber-50 dark:bg-amber-900/20",
    border: "border-amber-200 dark:border-amber-800",
    ring: "ring-amber-500",
  },
  {
    value: 1,
    icon: <FiFrown size={24} />,
    label: "Rough",
    color: "text-rose-500",
    bg: "bg-rose-50 dark:bg-rose-900/20",
    border: "border-rose-200 dark:border-rose-800",
    ring: "ring-rose-500",
  },
];
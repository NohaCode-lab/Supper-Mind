import { toast } from "react-toastify";

export const handleAppError = (error, fallbackMessage) => {
  console.error(error);
  toast.error(error?.message || fallbackMessage);
};

export const formatRelativeTime = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString);
  const diffInSeconds = Math.floor((new Date() - date) / 1000);

  if (diffInSeconds < 60) return "Just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;

  return `${Math.floor(diffInSeconds / 86400)}d ago`;
};

export const getUserDisplayName = (currentUser, t) => {
  const guestLabel = t ? t("navigation.guest", "Guest") : "Guest";
  if (!currentUser) return guestLabel;

  const rawName =
    currentUser?.user_metadata?.full_name ||
    currentUser?.user_metadata?.name ||
    currentUser?.full_name ||
    currentUser?.name ||
    currentUser?.username ||
    (currentUser?.email ? currentUser.email.split("@")[0] : "");

  if (!rawName) return guestLabel;
  const firstName = rawName.trim().split(" ")[0];
  return firstName.charAt(0).toUpperCase() + firstName.slice(1);
};
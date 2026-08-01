import { Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute() {
  const { isAuthLoading } = useAuth();

  if (isAuthLoading) {
    return (
      <div className="flex h-full items-center justify-center p-12 text-slate-500 text-sm">
        Loading page...
      </div>
    );
  }

  // Permits guest visitors to experience full demo navigation using local Zustand store.
  // Database API & Supabase persistence calls remain strictly protected by isAuthenticated checks.
  return <Outlet />;
}


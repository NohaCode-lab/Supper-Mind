import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute() {
  const { isAuthenticated, isAuthLoading } = useAuth();

  // While checking the session, show a clean loading state to prevent flickering
  if (isAuthLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-teal-600 dark:border-slate-800 dark:border-t-teal-500"></div>
      </div>
    );
  }

  // If the user is not authenticated, redirect them safely to the registration page
  if (!isAuthenticated) {
    return <Navigate to="/register" replace />;
  }

  // If authenticated, simply pass through to the nested routes
  return <Outlet />;
}

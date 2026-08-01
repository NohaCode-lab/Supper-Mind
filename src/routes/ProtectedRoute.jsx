import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute() {
  const { isAuthenticated, isAuthLoading } = useAuth();

  if (isAuthLoading) {
    return (
      <div className="flex h-full items-center justify-center p-12 text-slate-500 text-sm">
        Verifying security session...
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/register" replace />;
}

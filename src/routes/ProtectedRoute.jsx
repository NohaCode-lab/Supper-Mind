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

  return <Outlet />;
}


import { Navigate, Outlet } from 'react-router-dom';
import { useAppStore } from '../context/useAppStore';

export default function ProtectedRoute() {
  // Pulling the authentication state directly from our Zustand store
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);

  // If the user is not authenticated, redirect them safely to the registration page
  if (!isAuthenticated) {
    return <Navigate to="/register" replace />;
  }

  // If authenticated, render the requested child routes
  return <Outlet />;
}
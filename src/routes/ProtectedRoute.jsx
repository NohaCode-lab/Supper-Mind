import { Navigate, Outlet, NavLink } from "react-router-dom";
import { FiGrid, FiMessageCircle, FiLogOut } from "react-icons/fi";
import { useAuth } from "../hooks/useAuth";
import { ROUTES } from "../utils/constants";

export default function ProtectedRoute() {
  // Pulling the real authentication state and actions directly from our Supabase auth hook
  const { isAuthenticated, isAuthLoading, currentUser, signOut } = useAuth();

  // Safely extract user details for the sidebar profile
  const userName = currentUser?.user_metadata?.full_name || 'Guest User';
  const userEmail = currentUser?.email || '';

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

  // Common styling for navigation links to keep the JSX clean
  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${
      isActive
        ? "bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400"
        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200"
    }`;

  // If authenticated, render the layout with the Sidebar and the requested child routes
  return (
    <div className="flex h-screen w-full bg-slate-50 dark:bg-slate-950 overflow-hidden">
      {/* Sidebar Navigation (Hidden on very small screens for now) */}
      <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col shrink-0 hidden md:flex">
        {/* Brand Header */}
        <div className="h-16 flex items-center px-6 border-b border-slate-200 dark:border-slate-800 shrink-0">
          <span className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white text-sm">SM</span>
            Supper Mind
          </span>
        </div>
        
        {/* Main Navigation Links */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          <NavLink to={ROUTES.DASHBOARD} className={navLinkClass}>
            <FiGrid size={18} />
            Dashboard
          </NavLink>
          
          <NavLink to={ROUTES.CHAT} className={navLinkClass}>
            <FiMessageCircle size={18} />
            AI Companion
          </NavLink>
        </nav>

        {/* User Profile & Logout */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 shrink-0 space-y-2">
          
          {/* User Info Header */}
          <div className="flex items-center gap-3 px-2 mb-3">
            <div className="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-900/50 flex items-center justify-center text-teal-700 dark:text-teal-300 font-bold shrink-0">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">
                {userName}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                {userEmail}
              </p>
            </div>
          </div>

          <button 
            onClick={signOut}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all font-medium text-sm text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20"
          >
            <FiLogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area where the specific page components will render */}
      <main className="flex-1 overflow-y-auto relative">
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

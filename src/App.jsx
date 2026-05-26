import { Outlet } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';

export default function App() {
  // Calm, SaaS-focused color palette using Tailwind v4 defaults
  // The layout ensures the sidebar is fixed and the main content scrolls smoothly.
  
  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-sans antialiased selection:bg-teal-200 selection:text-teal-900">
      
      {/* Sidebar - Desktop primary navigation */}
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden relative">
        {/* Navbar - Top header for mobile menu, user profile, and theme toggle */}
        <Navbar />

        {/* Main Content Area - Renders the active route */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12">
          <Outlet />
        </main>
      </div>
      
    </div>
  );
}
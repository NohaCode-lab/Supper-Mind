import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden">
      {/* The Sidebar handles its own mobile/desktop visibility */}
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        {/* The Navbar stays fixed at the top of the content area */}
        <Navbar />

        {/* The Main Content Area where AppRoutes injects the pages */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <AppRoutes />
        </main>
      </div>
    </div>
  );
}
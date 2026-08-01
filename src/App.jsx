import { Suspense } from "react";
import Navbar from "./components/layouts/Navbar";
import Sidebar from "./components/layouts/Sidebar";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden text-slate-800 dark:text-slate-100 antialiased font-sans selection:bg-teal-200 selection:text-teal-900 dark:selection:bg-teal-900 dark:selection:text-teal-100">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <Suspense
            fallback={
              <div className="flex h-full items-center justify-center text-slate-400 text-sm">
                Loading Supper Mind...
              </div>
            }
          >
            <AppRoutes />
          </Suspense>
        </main>
      </div>
    </div>
  );
}

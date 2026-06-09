import { Suspense, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "./components/layouts/Navbar";
import Sidebar from "./components/layouts/Sidebar";
import { useAuth } from "./hooks/useAuth";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// إنشاء نسخة واحدة من QueryClient
const queryClient = new QueryClient();

export default function App() {
  const { cleanupAuth } = useAuth();

  useEffect(() => {
    // سيتم تنفيذ هذه الدالة فقط عند تفكيك (Unmount) تطبيق App
    return () => {
      cleanupAuth();
    };
  }, [cleanupAuth]);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden">
        <Sidebar />

        <div className="flex-1 flex flex-col min-w-0">
          <Navbar />

          <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
            <Suspense
              fallback={
                <div className="flex h-full items-center justify-center text-slate-500">
                  Loading...
                </div>
              }
            >
              <AppRoutes />
            </Suspense>
          </main>
          <ToastContainer position="bottom-right" autoClose={3000} />
        </div>
      </div>
    </QueryClientProvider>
  );
}

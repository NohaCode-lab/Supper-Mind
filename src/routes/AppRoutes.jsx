import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

// Route Guards
import ProtectedRoute from "./ProtectedRoute";

// Lazy-loaded Pages for aggressive code-splitting
const Home = lazy(() => import("../pages/Home"));
const Register = lazy(() => import("../pages/Register"));
const Chat = lazy(() => import("../pages/Chat"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Settings = lazy(() => import("../pages/Settings"));
const JournalFeature = lazy(() => import("../pages/JournalFeature"));
const NotFound = lazy(() => import("../pages/NotFound"));

export default function AppRoutes() {
  return (
    <Routes>
      {/* ------------------------------------------------------------------
          PUBLIC ROUTES
          Accessible to anyone. No session required.
          ------------------------------------------------------------------ */}
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />

      {/* ------------------------------------------------------------------
          PROTECTED ROUTES
          Accessible ONLY to authenticated users. Unauthenticated traffic 
          is automatically intercepted and redirected to /register.
          ------------------------------------------------------------------ */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/journal" element={<JournalFeature />} />
      </Route>

      {/* ------------------------------------------------------------------
          FALLBACK ROUTE
          Catches all undefined URLs and renders the 404 page.
          ------------------------------------------------------------------ */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

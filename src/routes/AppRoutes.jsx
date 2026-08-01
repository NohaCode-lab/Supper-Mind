import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

const Home = lazy(() => import("../pages/Home"));
const Register = lazy(() => import("../pages/Register"));
const Login = lazy(() => import("../pages/Login"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Chat = lazy(() => import("../pages/Chat"));
const HabitTracker = lazy(() => import("../pages/HabitTracker"));
const JournalFeature = lazy(() => import("../pages/JournalFeature"));
const MoodTracker = lazy(() => import("../pages/MoodTracker"));
const StressCheckin = lazy(() => import("../pages/StressCheckin"));
const Settings = lazy(() => import("../pages/Settings"));
const NotFound = lazy(() => import("../pages/NotFound"));

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/habits" element={<HabitTracker />} />
        <Route path="/journal" element={<JournalFeature />} />
        <Route path="/mood" element={<MoodTracker />} />
        <Route path="/stress" element={<StressCheckin />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      {/* Fallback Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

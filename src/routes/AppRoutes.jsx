import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Chat from "../pages/Chat";
import NotFound from "../pages/NotFound";

import MainLayout from "../components/layouts/MainLayout";

function AppRoutes() {
  return (
    <Routes>

      {/* Layout wrapper */}
      <Route element={<MainLayout />}>
        
        {/* Public pages */}
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chat" element={<Chat />} />

      </Route>

      {/* 404 Page */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}

export default AppRoutes;
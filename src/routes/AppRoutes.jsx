import { Routes, Route } from 'react-router-dom';

// Route Guards
import ProtectedRoute from './ProtectedRoute';

// Pages
import Home from '../pages/Home'; // Assuming you have a basic landing page
import Register from '../pages/Register';
import Chat from '../pages/Chat';
import Dashboard from '../pages/Dashboard'; // Placeholder if not yet fully built
import NotFound from '../pages/NotFound';

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
      </Route>

      {/* ------------------------------------------------------------------
          FALLBACK ROUTE
          Catches all undefined URLs and renders the 404 page.
          ------------------------------------------------------------------ */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
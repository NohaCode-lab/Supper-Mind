import { Routes, Route } from 'react-router-dom';
import App from '../App';

// Pages
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import Chat from '../pages/Chat';
import Register from '../pages/Register';
import NotFound from '../pages/NotFound';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Parent Route handling the global UI layout */}
      <Route path="/" element={<App />}>
        
        {/* Public/Landing Route */}
        <Route index element={<Home />} />
        
        {/* Core SaaS Application Routes */}
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="chat" element={<Chat />} />
        
        {/* Authentication Routes */}
        <Route path="register" element={<Register />} />
        
        {/* 404 Catch-All */}
        <Route path="*" element={<NotFound />} />
        
      </Route>
    </Routes>
  );
}
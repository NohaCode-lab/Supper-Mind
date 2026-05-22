
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-gray-300 border-t border-slate-800 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Brand */}
          <div>
            <h2 className="text-xl font-bold text-white mb-3">
              Supper Mind
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              Your AI-powered companion for mental clarity, journaling,
              mood tracking, and stress management.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              <li><Link to="/journal" className="hover:text-white">Journal</Link></li>
              <li><Link to="/mood" className="hover:text-white">Mood Tracker</Link></li>
              <li><Link to="/stress" className="hover:text-white">Stress Tools</Link></li>
              <li><Link to="/ai" className="hover:text-white">AI Companion</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-3">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Help Center</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Terms of Use</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-800 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Supper Mind. All rights reserved.
          </p>

          {/* Socials (placeholder ready for expansion) */}
          <div className="flex gap-4 text-sm">
            <a href="#" className="hover:text-white">Twitter</a>
            <a href="#" className="hover:text-white">GitHub</a>
            <a href="#" className="hover:text-white">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
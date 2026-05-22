import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-white/10 backdrop-blur-md bg-white/5">

      {/* Brand */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600"></div>

        <h1 className="text-lg font-bold tracking-wide text-white">
          Supper Mind
        </h1>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">

        {/* Future: Notifications */}
        <button className="text-gray-400 hover:text-white transition text-sm">
          🔔
        </button>

        {/* Login */}
        <Link
          to="/login"
          className="text-gray-300 hover:text-white transition text-sm"
        >
          Login
        </Link>

        {/* CTA Button */}
        <Link
          to="/register"
          className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 px-4 py-2 rounded-lg text-sm font-medium transition shadow-md"
        >
          Get Started
        </Link>

      </div>

    </header>
  );
}

export default Navbar;
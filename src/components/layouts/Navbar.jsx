
import { Link } from "react-router-dom"

function Navbar() {
  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-white/10 backdrop-blur-md bg-white/5">

      <h1 className="text-lg font-bold tracking-wide text-white">
        Supper Mind
      </h1>

      <div className="flex items-center gap-4">

        <Link
          to="/login"
          className="text-gray-300 hover:text-white transition"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg transition"
        >
          Get Started
        </Link>

      </div>

    </header>
  )
}

export default Navbar

import { Link } from "react-router-dom"

function Sidebar() {
  return (
    <aside className="w-64 hidden md:flex flex-col border-r border-white/10 bg-white/5 backdrop-blur-md p-5">

      <nav className="flex flex-col gap-4 text-gray-300">

        <Link className="hover:text-white" to="/">
          🏠 Home
        </Link>

        <Link className="hover:text-white" to="/dashboard">
          📊 Dashboard
        </Link>

        <Link className="hover:text-white" to="/journal">
          📓 Journal
        </Link>

        <Link className="hover:text-white" to="/mood">
          😊 Mood Tracker
        </Link>

      </nav>

    </aside>
  )
}

export default Sidebar

import { Link } from "react-router-dom"

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0f172a] text-white px-6 text-center">

      <h1 className="text-7xl font-bold mb-4">404</h1>

      <h2 className="text-2xl font-semibold mb-3">
        Page Not Found
      </h2>

      <p className="text-gray-400 max-w-md mb-8">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>

      <Link
        to="/"
        className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-xl transition"
      >
        Go Back Home
      </Link>

    </div>
  )
}

export default NotFound
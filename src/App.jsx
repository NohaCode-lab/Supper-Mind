import { Outlet } from "react-router-dom"
import Navbar from "./components/layout/Navbar"
import Sidebar from "./components/layout/Sidebar"

function App() {
  return (
    <div className="min-h-screen flex bg-gradient-to-b from-[#0f172a] to-[#0b1220] text-white">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1 flex flex-col">

        {/* Navbar */}
        <Navbar />

        {/* 👇 هنا الصفحات تتغير */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>

      </div>

    </div>
  )
}

export default App
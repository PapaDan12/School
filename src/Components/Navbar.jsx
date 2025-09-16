import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { LogOut, LogIn, UserPlus, GraduationCap, Home, BookOpen, Phone, Info } from "lucide-react"

const Navbar = () => {
  const navigate = useNavigate()

  const token = localStorage.getItem("accessToken")
  let user = null
  try {
    user = JSON.parse(localStorage.getItem("user"))
  } catch {
    user = null
  }

  const isLoggedIn = token && user
  const role = user?.role

  const handleLogout = () => {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    localStorage.removeItem("user")
    navigate("/") // send user to Home after logout
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-100 to-white shadow-md text-blue-700 sticky top-0 w-full z-50"
    >
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src="/School.svg" alt="Logo" className="w-10 h-10" />
        <Link to="/" className="text-xl font-bold hover:text-amber-600 transition">
          Edubox
        </Link>
      </div>

      {/* Links */}
      <ul className="hidden md:flex items-center gap-6 font-medium">
        <li className="flex items-center gap-1 hover:text-amber-600 transition">
          <Home size={18} />
          <Link to="/">Home</Link>
        </li>
        <li className="flex items-center gap-1 hover:text-amber-600 transition">
          <Info size={18} />
          <Link to="/about">About Us</Link>
        </li>
        <li className="flex items-center gap-1 hover:text-amber-600 transition">
          <BookOpen size={18} />
          <Link to="/courses">Courses</Link>
        </li>
        <li className="flex items-center gap-1 hover:text-amber-600 transition">
          <Phone size={18} />
          <Link to="/contact">Contact Us</Link>
        </li>

        {isLoggedIn && role === "admin" && (
          <li className="flex items-center gap-1 hover:text-amber-600 transition">
            <GraduationCap size={18} />
            <Link to="/admin-dashboard">Admin Dashboard</Link>
          </li>
        )}

        {isLoggedIn && role === "student" && (
          <li className="flex items-center gap-1 hover:text-amber-600 transition">
            <GraduationCap size={18} />
            <Link to="/student-dashboard">Student Dashboard</Link>
          </li>
        )}
      </ul>

      {/* Auth Buttons */}
      <div className="flex gap-3">
        {!isLoggedIn ? (
          <>
            <Link to="/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1 bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition"
              >
                <LogIn size={16} /> Login
              </motion.button>
            </Link>
            <Link to="/register">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1 bg-amber-500 text-white px-4 py-2 rounded shadow hover:bg-amber-600 transition"
              >
                <UserPlus size={16} /> Register
              </motion.button>
            </Link>
          </>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="flex items-center gap-1 bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600 transition"
          >
            <LogOut size={16} /> Logout
          </motion.button>
        )}
      </div>
    </motion.nav>
  )
}

export default Navbar

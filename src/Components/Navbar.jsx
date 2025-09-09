import React from "react"
import { Link, useNavigate } from "react-router-dom"

const Navbar = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem("accessToken")
  const user = JSON.parse(localStorage.getItem("user"))
  const isLoggedIn = !!token
  const role = user?.role

  const handleLogout = () => {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    localStorage.removeItem("user")
    navigate("/") // send user to Home after logout
  }

  return (
    <nav className="flex items-center justify-between p-4 bg-gradient-to-t from-white to-blue-100 shadow-lg text-blue-500 top-0 w-full sticky z-50">
      <div className="flex items-center">
        <img src="/School.svg" alt="Logo" className="w-10 h-10" />
        <Link to="/">
          <span className="text-xl font-bold ml-2 hover:text-amber-700">Edubox</span>
        </Link>
      </div>

      <ul className="hidden md:flex">
        <li className="mx-4 hover:text-amber-700">
          <Link to="/">Home</Link>
        </li>
        <li className="mx-4 hover:text-amber-700">
          <Link to="/about">About Us</Link>
        </li>
        <li className="mx-4 hover:text-amber-700">
          <Link to="/courses">Courses</Link>
        </li>
        <li className="mx-4 hover:text-amber-700">
          <Link to="/contact">Contact Us</Link>
        </li>

        {isLoggedIn && role === "admin" && (
          <li className="mx-4 hover:text-amber-700">
            <Link to="/admin-dashboard">Admin Dashboard</Link>
          </li>
        )}

        {isLoggedIn && role === "student" && (
          <li className="mx-4 hover:text-amber-700">
            <Link to="/student-dashboard">Student Dashboard</Link>
          </li>
        )}
      </ul>

      <div className="space-x-4">
        {!isLoggedIn ? (
          <>
            <Link to="/login">
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-amber-700">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-amber-700">
                Register
              </button>
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-amber-700"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  )
}

export default Navbar

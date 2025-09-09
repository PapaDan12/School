import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./Pages/Login"
import AdminDashboard from "./Pages/AdminDashboard"
import StudentDashboard from "./Pages/StudentDashboard"
import "./index.css"
import Navbar from "./Components/Navbar"
import Register from "./Pages/Register"
import Home from "./Pages/Home"
import About from "./Pages/About"
import Courses from "./Pages/Courses"
import Contact from "./Pages/Contact"
import Footer from "./Components/Footer"

// helper to check authentication
const getUser = () => {
  const user = localStorage.getItem("user")
  return user ? JSON.parse(user) : null
}

// Protected route wrapper
const ProtectedRoute = ({ children, role }) => {
  const user = getUser()

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (role && user.role !== role) {
    // redirect to their correct dashboard if they try to access another role's page
    return user.role === "admin" ? (
      <Navigate to="/admin-dashboard" replace />
    ) : (
      <Navigate to="/student-dashboard" replace />
    )
  }

  return children
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Public route */}
        <Route path="/login" element={<Login />} />

        {/* Student routes */}
        <Route
          path="/student-dashboard"
          element={
            <ProtectedRoute role="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        {/* Admin routes */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Default redirect */}
        <Route path="*" element={<Navigate to="/login" replace />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </React.StrictMode>
)

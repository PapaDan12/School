import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"

import Login from "./Pages/Login"
import AdminDashboard from "./Pages/AdminDashboard"
import StudentDashboard from "./Pages/StudentDashboard"
import CourseDetails from "./Pages/CourseDetails"
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
  try {
    const user = localStorage.getItem("user")
    return user ? JSON.parse(user) : null
  } catch (e) {
    return null
  }
}

// Protected route wrapper
const ProtectedRoute = ({ children, role }) => {
  const user = getUser()

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (role && user.role !== role) {
    return user.role === "admin" ? (
      <Navigate to="/admin-dashboard" replace />
    ) : (
      <Navigate to="/student-dashboard" replace />
    )
  }

  return children
}

// Page wrapper with motion
const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.4 }}
    className="min-h-screen"
  >
    {children}
  </motion.div>
)

const AnimatedRoutes = () => {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public */}
        <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
        <Route path="/register" element={<PageWrapper><Register /></PageWrapper>} />
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
        <Route path="/courses" element={<PageWrapper><Courses /></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />

        {/* Student */}
        <Route
          path="/student-dashboard"
          element={
            <ProtectedRoute role="student">
              <PageWrapper><StudentDashboard /></PageWrapper>
            </ProtectedRoute>
          }
        />

        {/* Admin */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute role="admin">
              <PageWrapper><AdminDashboard /></PageWrapper>
            </ProtectedRoute>
          }
        />

        {/* Shared: course details */}
        <Route
          path="/course-details/:id"
          element={
            <ProtectedRoute>
              <PageWrapper><CourseDetails /></PageWrapper>
            </ProtectedRoute>
          }
        />

        {/* Default */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </AnimatePresence>
  )
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <AnimatedRoutes />
      <Footer />
    </BrowserRouter>
  </React.StrictMode>
)

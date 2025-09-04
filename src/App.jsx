import React from "react"
import { Routes, Route } from "react-router-dom"
import Navbar from "./Components/Navbar"
import Home from "./Pages/Home"
import About from "./Pages/About"
import Courses from "./Pages/Courses"
import Contact from "./Pages/Contact"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import StudentDashboard from "./Pages/StudentDashboard"
import AdminDashboard from "./Pages/AdminDashboard"
import Footer from "./Components/Footer"

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App

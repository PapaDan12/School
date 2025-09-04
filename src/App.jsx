import React from 'react'
import { Link } from 'react-router-dom'

const App = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-100 to-amber-200">
      <h1 className="text-4xl font-bold mb-6">Welcome to SchoolApp</h1>
      <div className="space-x-4">
        <Link to="/register" className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600">Register</Link>
        <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Login</Link>
      </div>
    </div>
  )
}

export default App

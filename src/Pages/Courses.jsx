import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Courses = () => {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => { fetchCourses() }, [])

  const fetchCourses = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken')
      if (!accessToken) {
        navigate('/login')
        return
      }

      const res = await fetch('https://sophisticated-eden-dr-white004-48b8c072.koyeb.app/api/courses', {
        headers: { Authorization: `Bearer ${accessToken}` }
      })

      if (!res.ok) throw new Error('Failed to fetch')

      const data = await res.json()
      const list = Array.isArray(data) ? data : data.results || []
      setCourses(list)
      setLoading(false)
    } catch (e) {
      setError('Failed to load courses')
      setLoading(false)
    }
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center text-blue-600 text-lg">Loading...</div>
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-amber-50 text-gray-900 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-10 text-blue-700">Available Courses</h1>
        {courses.length === 0 ? (
          <div className="text-center text-gray-500">No courses available.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map(course => (
              <div 
                key={course.id} 
                className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition"
              >
                <h2 className="text-xl font-bold text-blue-700 mb-2">{course.title}</h2>
                <p className="text-gray-700 mb-4 line-clamp-3">{course.description}</p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Instructor:</strong> {course.instructor_name || 'Unknown'}
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  <strong>Created:</strong> {new Date(course.created_at).toLocaleDateString()}
                </p>
                <Link 
                  to={`/courses/${course.id}`} 
                  className="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Courses

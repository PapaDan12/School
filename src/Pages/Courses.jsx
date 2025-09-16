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

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>

  return (
    <>
      
      <div className="min-h-screen bg-neutral-400 text-black py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-8">Available Courses</h1>
          {courses.length === 0 ? (
            <div className="text-center text-gray-100">No courses available.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map(course => (
                <div key={course.id} className="bg-transparent   rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-bold mb-2">{course.title}</h2>
                  <p className="text-black mb-4">{course.description}</p>
                  <p className="text-sm text-black mb-2">
                    <strong>Instructor:</strong> {course.instructor_name || 'Unknown'}
                  </p>
                  <p className="text-sm text-black mb-4">
                    <strong>Created:</strong> {new Date(course.created_at).toLocaleDateString()}
                  </p>
                  <Link to={`/courses/${course.id}`} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
     
    </>
  )
}

export default Courses

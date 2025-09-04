import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Courses = () => {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken')
      if (!accessToken) {
        setError('Please log in to view courses')
        setLoading(false)
        return
      }

      const response = await fetch('https://sophisticated-eden-dr-white004-48b8c072.koyeb.app/api/courses', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json' }
      })

      if (!response.ok) throw new Error('Failed to fetch courses')

      const data = await response.json()
      setCourses(Array.isArray(data) ? data : [])
      setLoading(false)
    } catch (err) {
      console.error(err)
      setError('Failed to load courses. Please try again.')
      setLoading(false)
    }
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading courses...</div>
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-8">Available Courses</h1>
          {courses.length === 0 ? (
            <div className="text-center text-gray-500">No courses available.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  {course.thumbnail && <img src={course.thumbnail} alt={course.title} className="w-full h-48 object-cover" />}
                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-2">{course.title}</h2>
                    <p className="text-gray-600 mb-4">{course.description}</p>
                    <p className="text-sm text-gray-500"><strong>Instructor:</strong> {course.instructor_name || `ID: ${course.instructor}`}</p>
                    <p className="text-sm text-gray-500"><strong>Duration:</strong> {course.start_date ? new Date(course.start_date).toLocaleDateString() : 'N/A'} - {course.end_date ? new Date(course.end_date).toLocaleDateString() : 'N/A'}</p>
                    <p className="text-sm text-gray-500"><strong>Status:</strong> <span className={course.is_active ? 'text-green-600' : 'text-red-600'}>{course.is_active ? 'Active' : 'Inactive'}</span></p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Courses

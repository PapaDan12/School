import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


const Courses = () => {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken')
      const user = JSON.parse(localStorage.getItem('user'))

      if (!accessToken || !user) {
        navigate('/login') // force login if not authenticated
        return
      }

      const response = await fetch(
        'https://sophisticated-eden-dr-white004-48b8c072.koyeb.app/api/courses',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      )

      if (!response.ok) {
        if (response.status === 401) {
          // token expired or invalid
          localStorage.removeItem('accessToken')
          localStorage.removeItem('refreshToken')
          localStorage.removeItem('user')
          navigate('/login')
          return
        }
        throw new Error('Failed to fetch courses')
      }

      const data = await response.json()
      setCourses(data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching courses:', error)
      setError('Failed to load courses. Please try again.')
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl">Loading courses...</div>
      </div>
    )
  }

  if (error) {
    return (
      <>
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="text-red-500 text-xl">{error}</div>
        </div>
       
      </>
    )
  }

  return (
    <>
    
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-8">Available Courses</h1>

          {courses.length === 0 ? (
            <div className="text-center text-gray-500">
              No courses available at the moment.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  {course.thumbnail && (
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-2">{course.title}</h2>
                    <p className="text-gray-600 mb-4">{course.description}</p>

                    <div className="text-sm text-gray-500 mb-2">
                      <strong>Instructor:</strong>{' '}
                      {course.instructor_name || `ID: ${course.instructor}`}
                    </div>

                    <div className="text-sm text-gray-500 mb-2">
                      <strong>Duration:</strong>{' '}
                      {new Date(course.start_date).toLocaleDateString()} -{' '}
                      {new Date(course.end_date).toLocaleDateString()}
                    </div>

                    <div className="text-sm text-gray-500 mb-4">
                      <strong>Status:</strong>
                      <span
                        className={`ml-1 ${
                          course.is_active ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {course.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </div>

                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                      View Details
                    </button>
                  </div>
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

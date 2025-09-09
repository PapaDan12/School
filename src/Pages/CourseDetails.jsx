import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const CourseDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => { fetchCourse() }, [id])

  const fetchCourse = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken')
      if (!accessToken) {
        navigate('/login')
        return
      }

      const res = await fetch(`https://sophisticated-eden-dr-white004-48b8c072.koyeb.app/api/courses/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      })

      if (!res.ok) throw new Error('Failed to fetch')

      const data = await res.json()
      setCourse(data)
      setLoading(false)
    } catch (e) {
      setError('Failed to load course')
      setLoading(false)
    }
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>
  if (!course) return null

  return (
    <>
      
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="container mx-auto px-4 max-w-3xl bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
          <p className="text-gray-700 mb-6">{course.description}</p>
          <div className="space-y-2 text-sm text-gray-600">
            <p><strong>Instructor:</strong> {course.instructor_name || 'Unknown'}</p>
            <p><strong>Created:</strong> {new Date(course.created_at).toLocaleString()}</p>
            <p><strong>ID:</strong> {course.id}</p>
          </div>
          <div className="mt-6">
            <Link to="/courses" className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">Back to Courses</Link>
          </div>
        </div>
      </div>
     
    </>
  )
}

export default CourseDetails

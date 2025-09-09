import React, { useEffect, useState } from "react"

const StudentDashboard = () => {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")

  useEffect(() => {
    // Debug user object on first load
    const storedUser = JSON.parse(localStorage.getItem("user"))
    console.log("Stored user object:", storedUser)

    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem("accessToken")

      const response = await fetch(
        "https://sophisticated-eden-dr-white004-48b8c072.koyeb.app/api/courses/",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )

      const data = await response.json()
      console.log("Courses response:", response.status, data)

      if (response.ok) {
        setCourses(data.results || data)
      } else {
        setError(data.message || "Failed to load courses")
      }
    } catch (err) {
      console.error(err)
      setError("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  const handleEnroll = async (courseId) => {
    setError("")
    setMessage("")

    try {
      const token = localStorage.getItem("accessToken")
      const user = JSON.parse(localStorage.getItem("user"))

      if (!user) {
        setError("User not found. Please log in again.")
        return
      }

      console.log("User before enrolling:", user)

      const response = await fetch(
        `https://sophisticated-eden-dr-white004-48b8c072.koyeb.app/api/courses/${courseId}/enroll/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            student: user.id // we’ll confirm this key from the logs
          })
        }
      )

      const data = await response.json()
      console.log("Enroll response:", response.status, data)

      if (response.ok) {
        setMessage(`Enrolled successfully in ${data.course?.title || "course"}`)
      } else {
        setError(data.message || JSON.stringify(data))
      }
    } catch (err) {
      console.error("Error enrolling:", err)
      setError("Failed to enroll. Try again.")
    }
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Student Dashboard</h1>

      {loading && <p>Loading courses...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {message && <p className="text-green-600">{message}</p>}

      {courses.length > 0 ? (
        <ul className="space-y-3">
          {courses.map((course) => (
            <li key={course.id} className="p-4 border rounded bg-white shadow">
              <h3 className="text-lg font-bold">{course.title}</h3>
              <p className="text-sm text-gray-600">
                Instructor: {course.instructor_name || "N/A"}
              </p>
              <p>{course.description}</p>
              <button
                onClick={() => handleEnroll(course.id)}
                className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Enroll
              </button>
            </li>
          ))}
        </ul>
      ) : (
        !loading && <p>No courses available</p>
      )}
    </div>
  )
}

export default StudentDashboard

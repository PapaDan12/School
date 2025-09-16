import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { BookOpen, PlayCircle, Loader2 } from "lucide-react"

const StudentDashboard = () => {
  const [courses, setCourses] = useState([])
  const [enrollments, setEnrollments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const user = JSON.parse(localStorage.getItem("user"))
  const token = localStorage.getItem("accessToken")

  const cloudBase = "https://res.cloudinary.com/dlev4b4pu"
  const getThumbnailUrl = (path) => {
    if (!path || typeof path !== "string") return null
    if (path.startsWith("http")) return path
    if (path.startsWith("/")) return `${cloudBase}${path}`
    return `${cloudBase}/${path}`
  }

  const fetchCourses = async () => {
    try {
      const res = await fetch(
        "https://sophisticated-eden-dr-white004-48b8c072.koyeb.app/api/courses/",
        { headers: { Authorization: `Bearer ${token}` } }
      )
      const data = await res.json()
      if (res.ok) setCourses(data.results || data)
      else setError("Failed to fetch courses")
    } catch {
      setError("Error fetching courses")
    }
  }

  const fetchEnrollments = async () => {
    try {
      const res = await fetch(
        `https://sophisticated-eden-dr-white004-48b8c072.koyeb.app/api/enrollments/?student=${user.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      const data = await res.json()
      if (res.ok) setEnrollments(data.results || data)
      else setError("Failed to fetch enrollments")
    } catch {
      setError("Error fetching enrollments")
    } finally {
      setLoading(false)
    }
  }

  const handleEnroll = async (courseId) => {
    try {
      const body = { student: user.id, course: courseId, status: "pending" }
      const res = await fetch(
        "https://sophisticated-eden-dr-white004-48b8c072.koyeb.app/api/enrollments/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        }
      )
      if (!res.ok) throw new Error("Failed to enroll")
      setMessage("Enrollment request sent")
      fetchEnrollments()
    } catch {
      setError("Error enrolling in course")
    }
  }

  useEffect(() => {
    fetchCourses()
    fetchEnrollments()
  }, [])

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin w-8 h-8 text-blue-500" />
      </div>
    )
  if (error) return <p className="p-4 text-red-500">{error}</p>

  const approvedEnrollments = enrollments.filter((en) => en.status === "approved")

  return (
    <>
        <section className="bg-[url(photo-3.avif)] bg-cover bg-center min-h-screen flex flex-col items-center justify-center py-12">
    <div className="p-6 bg-amber-300  max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
        <BookOpen className="text-blue-600" /> Student Dashboard
      </h1>

      {message && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-green-600 mb-4"
        >
          {message}
        </motion.p>
      )}

      {/* My Courses */}
      <h2 className="text-2xl font-semibold mb-4">My Courses</h2>
      {approvedEnrollments.length > 0 ? (
        <div className="grid bg-[url(photo-1.avif)] p-10 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {approvedEnrollments.map((en, i) => {
            const course = courses.find((c) => c.id === en.course)
            if (!course) return null
            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-gray-200 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
              >
                {course.thumbnail && (
                  <img
                    src={getThumbnailUrl(course.thumbnail)}
                    alt={course.title}
                    className="w-full h-40 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="text-lg font-bold">{course.title}</h3>
                  <p className="text-sm text-gray-600">
                    {course.start_date} - {course.end_date}
                  </p>
                  <p className="mt-2 text-gray-700">{course.description}</p>
                  <Link
                    to={`/course-details/${course.id}`}
                    className="mt-3 inline-flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                  >
                    <PlayCircle size={18} /> View Details
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </div>
      ) : (
        <p className="mb-10 text-gray-600">No approved courses yet.</p>
      )}

      {/* Available Courses */}
      <h2 className="text-2xl font-semibold mb-4">Available Courses</h2>
      <div className="grid bg-[url(photo-2.avif)] p-12 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, i) => {
          const enrollment = enrollments.find((en) => en.course === course.id)
          const status = enrollment?.status || null

          return (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              {course.thumbnail && (
                <img
                  src={getThumbnailUrl(course.thumbnail)}
                  alt={course.title}
                  className="w-full h-40 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="text-lg font-bold">{course.title}</h3>
                <p className="text-sm text-gray-600">
                  {course.start_date} - {course.end_date}
                </p>
                <p className="mt-2 text-gray-700">{course.description}</p>

                <div className="flex items-center gap-3 mt-4">
                  <Link
                    to={`/course-details/${course.id}`}
                    className="text-blue-600 underline"
                  >
                    View Details
                  </Link>

                  {!status && (
                    <button
                      onClick={() => handleEnroll(course.id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Enroll
                    </button>
                  )}

                  {status && (
                    <span
                      className={`px-2 py-1 rounded text-white ${
                        status === "approved"
                          ? "bg-green-500"
                          : status === "rejected"
                          ? "bg-red-500"
                          : "bg-yellow-500"
                      }`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
    </section>
    </>
  )
}

export default StudentDashboard

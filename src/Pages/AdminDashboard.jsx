import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { BookOpen, Loader2, CheckCircle, XCircle, Trash2, PlusCircle } from "lucide-react"

const AdminDashboard = () => {
  const [courses, setCourses] = useState([])
  const [pendingEnrollments, setPendingEnrollments] = useState([])
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    start_date: "",
    end_date: "",
    thumbnail: null
  })

  const user = JSON.parse(localStorage.getItem("user"))
  const token = localStorage.getItem("accessToken")

  const cloudBase = "https://res.cloudinary.com/dlev4b4pu"
  const getThumbnailUrl = (path) => {
    if (!path || typeof path !== "string") return null
    if (path.startsWith("http")) return path
    if (path.startsWith("/")) return `${cloudBase}${path}`
    if (path.startsWith("image/")) return `${cloudBase}/${path}`
    return `${cloudBase}/image/upload/${path}`
  }

  // Fetch courses
  const fetchCourses = async () => {
    try {
      const res = await fetch(
        `https://sophisticated-eden-dr-white004-48b8c072.koyeb.app/api/courses/?instructor=${user.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      const data = await res.json()
      if (res.ok) setCourses(data.results || data)
      else setError("Failed to fetch courses")
    } catch {
      setError("Error fetching courses")
    }
  }

  // Fetch pending enrollments
  const fetchPendingEnrollments = async () => {
    try {
      const res = await fetch(
        `https://sophisticated-eden-dr-white004-48b8c072.koyeb.app/api/enrollments/?status=pending`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      const data = await res.json()
      if (res.ok) setPendingEnrollments(data.results || data)
      else setError("Failed to fetch pending enrollments")
    } catch {
      setError("Error fetching enrollments")
    } finally {
      setLoading(false)
    }
  }

  // Fetch students
  const fetchStudents = async () => {
    try {
      const res = await fetch(
        `https://sophisticated-eden-dr-white004-48b8c072.koyeb.app/api/users/?role=student`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      const data = await res.json()
      if (res.ok) setStudents(data.results || data)
    } catch {
      console.log("Error fetching students")
    }
  }

  // Create course
  const handleCreateCourse = async (e) => {
    e.preventDefault()
    setMessage("")
    setError("")
    try {
      const body = new FormData()
      body.append("title", newCourse.title)
      body.append("description", newCourse.description)
      body.append("start_date", newCourse.start_date)
      body.append("end_date", newCourse.end_date)
      if (newCourse.thumbnail) body.append("thumbnail", newCourse.thumbnail)
      if (user?.id) body.append("instructor", user.id)

      const res = await fetch(
        "https://sophisticated-eden-dr-white004-48b8c072.koyeb.app/api/courses/",
        { method: "POST", headers: { Authorization: `Bearer ${token}` }, body }
      )
      if (!res.ok) throw new Error("Failed to create course")
      setMessage("Course created successfully")
      setNewCourse({ title: "", description: "", start_date: "", end_date: "", thumbnail: null })
      fetchCourses()
    } catch {
      setError("Error creating course")
    }
  }

  // Delete course
  const handleDeleteCourse = async (courseId) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return
    try {
      const res = await fetch(
        `https://sophisticated-eden-dr-white004-48b8c072.koyeb.app/api/courses/${courseId}/`,
        { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
      )
      if (!res.ok) throw new Error("Failed to delete course")
      setMessage("Course deleted successfully")
      fetchCourses()
    } catch {
      setError("Error deleting course")
    }
  }

  // Update enrollment
  const handleUpdateEnrollment = async (id, status) => {
    try {
      const res = await fetch(
        `https://sophisticated-eden-dr-white004-48b8c072.koyeb.app/api/enrollments/${id}/`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ status })
        }
      )
      if (!res.ok) throw new Error("Failed to update enrollment")
      setMessage(`Enrollment ${status}`)
      fetchPendingEnrollments()
    } catch {
      setError("Error updating enrollment")
    }
  }

  useEffect(() => {
    fetchCourses()
    fetchPendingEnrollments()
    fetchStudents()
  }, [])

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin w-8 h-8 text-blue-500" />
      </div>
    )

  const getStudentName = (id) => {
    const student = students.find((s) => s.id === id)
    return student ? `${student.firstname} ${student.lastname}` : `Student ${id}`
  }

  const getCourseTitle = (id) => {
    const course = courses.find((c) => c.id === id)
    return course ? course.title : `Course ${id}`
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return ""
    return new Date(dateStr).toLocaleDateString()
  }

  return (
    <section className="bg-[url(/photo-3.avif)] bg-cover bg-center min-h-screen flex flex-col items-center py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 bg-amber-200 max-w-6xl mx-auto w-full rounded-xl shadow-lg"
      >
        <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
          <BookOpen className="text-blue-600" /> Admin Dashboard
        </h1>

        {message && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-600 mb-4">
            {message}
          </motion.p>
        )}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Create Course */}
        <form
          onSubmit={handleCreateCourse}
          className="mb-10 space-y-4 bg-white p-4 rounded shadow border border-gray-200"
        >
          <input
            type="text"
            placeholder="Title"
            value={newCourse.title}
            onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
            className="w-full border p-2 rounded"
            required
          />
          <textarea
            placeholder="Description"
            value={newCourse.description}
            onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="date"
            value={newCourse.start_date}
            onChange={(e) => setNewCourse({ ...newCourse, start_date: e.target.value })}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="date"
            value={newCourse.end_date}
            onChange={(e) => setNewCourse({ ...newCourse, end_date: e.target.value })}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setNewCourse({ ...newCourse, thumbnail: e.target.files[0] })}
            className="w-full border p-2 rounded"
          />
          <button
            type="submit"
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            <PlusCircle size={18} /> Create Course
          </button>
        </form>

        {/* Courses */}
        <h2 className="text-2xl font-semibold mb-4">My Courses</h2>
        {courses.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {courses.map((course) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
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
                    {formatDate(course.start_date)} - {formatDate(course.end_date)}
                  </p>
                  <p className="mt-2 text-gray-700">{course.description}</p>
                  <div className="flex gap-2 mt-3">
                    <Link
                      to={`/course-details/${course.id}`}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      View Details
                    </Link>
                    <button
                      onClick={() => handleDeleteCourse(course.id)}
                      className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="mb-10 text-gray-600">No courses created yet.</p>
        )}

        {/* Pending Enrollments */}
        <h2 className="text-2xl font-semibold mb-4">Pending Enrollments</h2>
        {pendingEnrollments.length > 0 ? (
          <div className="space-y-4">
            {pendingEnrollments.map((en) => (
              <motion.div
                key={en.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
              >
                <div>
                  <p className="font-bold">Student: {getStudentName(en.student)}</p>
                  <p>Course: {getCourseTitle(en.course)}</p>
                  <p>Enrollment Date: {formatDate(en.enrolled_at)}</p>
                  <p>Status: {en.status}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdateEnrollment(en.id, "approved")}
                    className="flex items-center gap-1 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    <CheckCircle size={16} /> Approve
                  </button>
                  <button
                    onClick={() => handleUpdateEnrollment(en.id, "rejected")}
                    className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    <XCircle size={16} /> Reject
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No pending enrollments.</p>
        )}
      </motion.div>
    </section>
  )
}

export default AdminDashboard

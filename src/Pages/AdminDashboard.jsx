import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const AdminDashboard = () => {
  const [courses, setCourses] = useState([])
  const [enrollments, setEnrollments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    start_date: "",
    end_date: "",
    thumbnail: null
  })

  const user = JSON.parse(localStorage.getItem("user"))
  const cloudBase = "https://res.cloudinary.com/dlev4b4pu"
  const getThumbnailUrl = (path) => {
    if (!path || typeof path !== "string") return null
    if (path.startsWith("http")) return path
    if (path.startsWith("/")) return `${cloudBase}${path}`
    return `${cloudBase}/${path}`
  }

  // Fetch courses
  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem("accessToken")
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

  // Fetch enrollments
  const fetchEnrollments = async () => {
    try {
      const token = localStorage.getItem("accessToken")
      const res = await fetch(
        "https://sophisticated-eden-dr-white004-48b8c072.koyeb.app/api/enrollments/",
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

  // Create course
  const handleCreateCourse = async (e) => {
    e.preventDefault()
    setError("")
    setMessage("")
    try {
      const token = localStorage.getItem("accessToken")
      const body = new FormData()
      body.append("title", formData.title)
      body.append("description", formData.description)
      body.append("start_date", formData.start_date)
      body.append("end_date", formData.end_date)
      if (formData.thumbnail) body.append("thumbnail", formData.thumbnail)
      if (user?.id) body.append("instructor", user.id)

      const res = await fetch(
        "https://sophisticated-eden-dr-white004-48b8c072.koyeb.app/api/courses/",
        { method: "POST", headers: { Authorization: `Bearer ${token}` }, body }
      )
      const data = await res.json()
      if (!res.ok) throw new Error(JSON.stringify(data))
      setMessage("Course created successfully")
      setFormData({ title: "", description: "", start_date: "", end_date: "", thumbnail: null })
      fetchCourses()
    } catch {
      setError("Error creating course")
    }
  }

  // Delete course
  const handleDeleteCourse = async (courseId) => {
    try {
      const token = localStorage.getItem("accessToken")
      const res = await fetch(
        `https://sophisticated-eden-dr-white004-48b8c072.koyeb.app/api/courses/${courseId}/`,
        { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
      )
      if (!res.ok) throw new Error()
      setMessage("Course deleted successfully")
      fetchCourses()
    } catch {
      setError("Error deleting course")
    }
  }

  // Approve/reject enrollment
  const handleUpdateEnrollment = async (id, status) => {
    try {
      const token = localStorage.getItem("accessToken")
      const res = await fetch(
        `https://sophisticated-eden-dr-white004-48b8c072.koyeb.app/api/enrollments/${id}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ status })
        }
      )
      if (!res.ok) throw new Error()
      setMessage(`Enrollment ${status}`)
      fetchEnrollments()
    } catch {
      setError("Error updating enrollment")
    }
  }

  useEffect(() => {
    fetchCourses()
    fetchEnrollments()
  }, [])

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {message && <p className="text-green-600">{message}</p>}

      {/* Create Course */}
      <form onSubmit={handleCreateCourse} className="mb-6 space-y-4 bg-gray-100 p-4 rounded">
        <h2 className="text-xl font-semibold">Create New Course</h2>
        <input type="text" name="title" value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Course Title" className="w-full p-2 border rounded" required />
        <textarea name="description" value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Course Description" className="w-full p-2 border rounded" required />
        <div className="flex gap-4">
          <input type="date" name="start_date" value={formData.start_date}
            onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
            className="w-1/2 p-2 border rounded" required />
          <input type="date" name="end_date" value={formData.end_date}
            onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
            className="w-1/2 p-2 border rounded" required />
        </div>
        <input type="file" name="thumbnail" accept="image/*"
          onChange={(e) => setFormData({ ...formData, thumbnail: e.target.files[0] })}
          className="w-full p-2 border rounded" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Create Course
        </button>
      </form>

      {/* Courses */}
      <h2 className="text-xl font-semibold mb-2">Your Courses</h2>
      <ul className="space-y-3">
        {courses.filter(c => c.instructor === user?.id).map((course) => (
          <li key={course.id} className="p-4 border rounded bg-white shadow">
            <h3 className="text-lg font-bold">{course.title}</h3>
            <p className="text-sm text-gray-600">{course.start_date} - {course.end_date}</p>
            {course.thumbnail && (
              <img src={getThumbnailUrl(course.thumbnail)} alt={course.title}
                   className="w-full h-40 object-cover rounded mb-2" />
            )}
            <p>{course.description}</p>
            <div className="flex gap-3 mt-2">
              <Link to={`/course-details/${course.id}`}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                View Details
              </Link>
              <button onClick={() => handleDeleteCourse(course.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Pending Enrollments */}
      <h2 className="text-xl font-semibold mt-8 mb-2">Pending Enrollments</h2>
      {enrollments.filter(en => en.status === "pending").length > 0 ? (
        <ul className="space-y-3">
          {enrollments.filter(en => en.status === "pending").map((en) => (
            <li key={en.id} className="p-4 border rounded bg-white shadow">
              <p>Student ID: <b>{en.student}</b> requested enrollment in course <b>{en.course}</b></p>
              <div className="flex gap-2 mt-2">
                <button onClick={() => handleUpdateEnrollment(en.id, "approved")}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                  Approve
                </button>
                <button onClick={() => handleUpdateEnrollment(en.id, "rejected")}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : <p>No pending enrollments</p>}
    </div>
  )
}

export default AdminDashboard

import React, { useEffect, useState } from "react"

const AdminDashboard = () => {
  const [courses, setCourses] = useState([])
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

  // Fetch courses
  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem("accessToken")

      const response = await fetch(
        "https://sophisticated-eden-dr-white004-48b8c072.koyeb.app/api/courses/",
        { headers: { Authorization: `Bearer ${token}` } }
      )

      const data = await response.json()
      console.log("Admin fetch response:", response.status, data)

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

  // Handle input change
  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (name === "thumbnail") {
      setFormData({ ...formData, thumbnail: files[0] })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  // Handle create course
  const handleCreateCourse = async (e) => {
    e.preventDefault()
    setError("")
    setMessage("")

    try {
      const token = localStorage.getItem("accessToken")
      const user = JSON.parse(localStorage.getItem("user"))

      const body = new FormData()
      body.append("title", formData.title)
      body.append("description", formData.description)
      body.append("start_date", formData.start_date)
      body.append("end_date", formData.end_date)
      if (formData.thumbnail) body.append("thumbnail", formData.thumbnail)
      if (user?.id) body.append("instructor", user.id)

      const response = await fetch(
        "https://sophisticated-eden-dr-white004-48b8c072.koyeb.app/api/courses/",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`
          },
          body
        }
      )

      const data = await response.json()
      console.log("Create course response:", response.status, data)

      if (!response.ok) {
        throw new Error(JSON.stringify(data))
      }

      setMessage("Course created successfully")
      setFormData({
        title: "",
        description: "",
        start_date: "",
        end_date: "",
        thumbnail: null
      })
      fetchCourses()
    } catch (err) {
      console.error("Error creating course:", err)
      setError(err.message || "Error creating course. Try again")
    }
  }

  useEffect(() => {
    fetchCourses()
  }, [])

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {loading && <p>Loading courses...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {message && <p className="text-green-600">{message}</p>}

      {/* Create Course Form */}
      <form
        onSubmit={handleCreateCourse}
        className="mb-6 space-y-4 bg-gray-100 p-4 rounded"
      >
        <h2 className="text-xl font-semibold">Create New Course</h2>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Course Title"
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Course Description"
          className="w-full p-2 border rounded"
          required
        />
        <div className="flex gap-4">
          <input
            type="date"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
            className="w-1/2 p-2 border rounded"
            required
          />
          <input
            type="date"
            name="end_date"
            value={formData.end_date}
            onChange={handleChange}
            className="w-1/2 p-2 border rounded"
            required
          />
        </div>
        <input
          type="file"
          name="thumbnail"
          onChange={handleChange}
          accept="image/*"
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Course
        </button>
      </form>

      {/* Display Courses */}
      <h2 className="text-xl font-semibold mb-2">Existing Courses</h2>
      {courses.length > 0 ? (
        <ul className="space-y-3">
          {courses.map((course) => (
            <li key={course.id} className="p-4 border rounded bg-white shadow">
              <h3 className="text-lg font-bold">{course.title}</h3>
              <p className="text-sm text-gray-600">
                {course.start_date} - {course.end_date}
              </p>
              {course.thumbnail && (
                <img
    src={`https://res.cloudinary.com/dlev4b4pu${course.thumbnail}`}
    alt={course.title}
    className="w-full h-40 object-cover rounded mb-2"
  />
              )}
              <p>{course.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        !loading && <p>No courses available</p>
      )}
    </div>
  )
}

export default AdminDashboard

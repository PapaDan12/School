import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export default function CourseDetails() {
  const { id } = useParams()
  const [course, setCourse] = useState(null)
  const [contents, setContents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")

  const [title, setTitle] = useState("")
  const [contentType, setContentType] = useState("")
  const [file, setFile] = useState(null)
  const [description, setDescription] = useState("")
  const [order, setOrder] = useState(0)
  const [editingId, setEditingId] = useState(null)

  const token = localStorage.getItem("accessToken")
  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user"))
    } catch {
      return null
    }
  })()

  const cloudBase = "https://res.cloudinary.com/dlev4b4pu"
  const getFileUrl = (path) => {
    if (!path || typeof path !== "string") return null
    if (path.startsWith("http")) return path
    if (path.startsWith("/")) return `${cloudBase}${path}`
    return `${cloudBase}/${path}`
  }

  const fetchCourse = async () => {
    try {
      const res = await fetch(
        `https://sophisticated-eden-dr-white004-48b8c072.koyeb.app/api/courses/${id}/`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      const data = await res.json()
      if (!res.ok) {
        setError("Failed to load course")
        return
      }
      setCourse(data)
    } catch {
      setError("Failed to load course")
    }
  }

  const fetchContents = async () => {
    try {
      const res = await fetch(
        `https://sophisticated-eden-dr-white004-48b8c072.koyeb.app/api/contents/?course=${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      const data = await res.json()
      if (!res.ok) {
        setError("Failed to load contents")
        setContents([])
        return
      }
      const list = Array.isArray(data.results) ? data.results : Array.isArray(data) ? data : []
      setContents(list)
    } catch {
      setError("Failed to load contents")
      setContents([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setLoading(true)
    fetchCourse()
    fetchContents()
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setMessage("")

    if (!title || !contentType || (!file && !editingId)) {
      setError("Provide title, type, and file (for new uploads)")
      return
    }

    const isOwner = course && Number(course.instructor) === Number(user?.id)
    if (!user || user.role !== "admin" || !isOwner) {
      setError("Not allowed")
      return
    }

    try {
      if (editingId) {
        const payload = {
          title,
          content_type: contentType,
          description,
          order: Number(order),
          is_active: true,
          course: Number(id),
        }

        const res = await fetch(
          `https://sophisticated-eden-dr-white004-48b8c072.koyeb.app/api/contents/${editingId}/`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        )
        const data = await res.json()
        if (!res.ok) {
          setError(data.detail || "Update failed")
          return
        }
        setMessage("Content updated")
      } else {
        const form = new FormData()
        form.append("course", id)
        form.append("title", title)
        form.append("content_type", contentType)
        form.append("content_file", file)
        form.append("description", description || "")
        form.append("order", order)
        form.append("is_active", true)

        const res = await fetch(
          `https://sophisticated-eden-dr-white004-48b8c072.koyeb.app/api/contents/`,
          { method: "POST", headers: { Authorization: `Bearer ${token}` }, body: form }
        )
        const data = await res.json()
        if (!res.ok) {
          setError(data.detail || "Upload failed")
          return
        }
        setMessage("Content uploaded")
      }

      resetForm()
      fetchContents()
    } catch {
      setError(editingId ? "Update failed" : "Upload failed")
    }
  }

  const resetForm = () => {
    setTitle("")
    setContentType("")
    setFile(null)
    setDescription("")
    setOrder(0)
    setEditingId(null)
  }

  const handleDelete = async (contentId) => {
    try {
      const res = await fetch(
        `https://sophisticated-eden-dr-white004-48b8c072.koyeb.app/api/contents/${contentId}/`,
        { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
      )
      if (!res.ok) {
        setError("Delete failed")
        return
      }
      setMessage("Content deleted")
      setContents((prev) => prev.filter((c) => c.id !== contentId))
    } catch {
      setError("Delete failed")
    }
  }

  const renderContentPreview = (c) => {
    const finalUrl = getFileUrl(c.content_file)
    if (!finalUrl) return null

    if (c.content_type === "video") {
      return (
        <video controls className="w-full rounded mt-2">
          <source src={finalUrl} type="video/mp4" />
        </video>
      )
    }

    if (c.content_type === "image") {
      return <img src={finalUrl} alt={c.title} className="w-full h-48 object-cover rounded mt-2" />
    }

    if (c.content_type === "document") {
      return (
        <div className="mt-2">
          <iframe
            src={`https://docs.google.com/gview?url=${encodeURIComponent(finalUrl)}&embedded=true`}
            className="w-full h-96 border rounded"
            title={c.title}
          />
          <a
            href={finalUrl}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 underline mt-2 inline-block"
          >
            Open Document
          </a>
        </div>
      )
    }

    return (
      <a
        href={finalUrl}
        target="_blank"
        rel="noreferrer"
        className="text-blue-600 underline mt-2 inline-block"
      >
        Download File
      </a>
    )
  }

  return (
    <section className="bg-yellow-100 min-h-screen">
      <div className="p-12 max-w-4xl bg-blue-100 mx-auto rounded-xl shadow-md">
        {error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>}
        {message && <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">{message}</div>}

        {course ? (
          <>
            <h1 className="text-3xl font-bold text-blue-900 mb-2">{course.title}</h1>
            <p className="text-gray-700 mb-4">{course.description}</p>
            {course.thumbnail && (
              <img
                src={getFileUrl(course.thumbnail)}
                alt={course.title}
                className="w-full h-64 object-cover rounded mb-6"
              />
            )}

            {user && user.role === "admin" && Number(course.instructor) === Number(user.id) && (
              <form onSubmit={handleSubmit} className="mb-8 border-t pt-4 space-y-3">
                <h2 className="text-lg font-semibold text-blue-800">
                  {editingId ? "Edit Content" : "Upload Content"}
                </h2>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title"
                  className="w-full p-2 border rounded"
                  required
                />
                <select
                  value={contentType}
                  onChange={(e) => setContentType(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="">Select Type</option>
                  <option value="video">Video</option>
                  <option value="document">Document</option>
                  <option value="image">Image</option>
                  <option value="other">Other</option>
                </select>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description"
                  className="w-full p-2 border rounded"
                />
                <input
                  type="number"
                  value={order}
                  onChange={(e) => setOrder(e.target.value)}
                  placeholder="Order"
                  className="w-full p-2 border rounded"
                />
                {!editingId && (
                  <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="w-full"
                    required
                  />
                )}
                <div className="flex gap-2">
                  <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                    {editingId ? "Update" : "Upload"}
                  </button>
                  {editingId && (
                    <button
                      type="button"
                      onClick={resetForm}
                      className="bg-yellow-500 text-white px-4 py-2 rounded"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            )}

            <h2 className="text-xl font-semibold text-blue-800 mt-4 mb-3">Contents</h2>
            {contents.length === 0 ? (
              <p className="text-gray-700">No content uploaded yet</p>
            ) : (
              <ul className="space-y-3">
                {contents.map((c) => (
                  <li key={c.id} className="p-4 border rounded bg-yellow-50 shadow">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-blue-900">{c.title}</p>
                        <p className="text-sm text-gray-600">{c.content_type}</p>
                        {c.description && <p className="text-sm">{c.description}</p>}
                        {renderContentPreview(c)}
                      </div>
                      {user && user.role === "admin" && Number(course.instructor) === Number(user.id) && (
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => {
                              setEditingId(c.id)
                              setTitle(c.title)
                              setContentType(c.content_type)
                              setDescription(c.description || "")
                              setOrder(c.order || 0)
                            }}
                            className="bg-blue-500 text-white px-3 py-1 rounded"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(c.id)}
                            className="bg-red-500 text-white px-3 py-1 rounded"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : (
          <p>Course not found</p>
        )}
      </div>
    </section>
  )
}

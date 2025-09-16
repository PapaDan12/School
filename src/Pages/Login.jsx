import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [role, setRole] = useState('student')
  const [formData, setFormData] = useState({ email: '', password: '', secretKey: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const requestData = { email: formData.email, password: formData.password }
      if (role === 'admin') requestData.secretKey = formData.secretKey

      const response = await fetch(
        'https://sophisticated-eden-dr-white004-48b8c072.koyeb.app/api/auth/login/',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestData),
        }
      )

      const data = await response.json()
      if (response.ok) {
        localStorage.setItem('accessToken', data.access)
        localStorage.setItem('refreshToken', data.refresh)
        localStorage.setItem('user', JSON.stringify(data.user))

        if (data.user.role === 'admin') {
          navigate('/admin-dashboard')
        } else {
          navigate('/student-dashboard')
        }
      } else {
        setError(data.detail || data.message || 'Login failed')
      }
    } catch (err) {
      console.error(err)
      setError('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
    <section 
      className="min-h-screen bg-[url(photo-3.avif)] flex flex-col items-center justify-center  py-12">
    <div className="p-12 max-w-md mx-auto bg-blue-200 mt-5 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6">Login</h1>
      {error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>}

      <div className="mb-4">
        <label className="mr-4">
          <input
            type="radio"
            value="student"
            checked={role === 'student'}
            onChange={() => setRole('student')}
          /> Student
        </label>
        <label>
          <input
            type="radio"
            value="admin"
            checked={role === 'admin'}
            onChange={() => setRole('admin')}
          /> Admin
        </label>
      </div>

      <form className="space-y-4" onSubmit={handleLogin}>
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="password"
          value={formData.password}
          onChange={handleChange}
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
          required
        />
        {role === 'admin' && (
          <input
            name="secretKey"
            value={formData.secretKey}
            onChange={handleChange}
            type="password"
            placeholder="Secret Key"
            className="w-full p-2 border rounded"
            required
          />
        )}
        <button
          type="submit"
          disabled={loading}
          className={`bg-amber-500 text-white px-6 py-2 rounded w-full hover:bg-amber-600 flex justify-center items-center ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {loading ? (
            <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            'Login'
          )}
        </button>
      </form>
    </div>
    </section>
    </>
  )
}

export default Login

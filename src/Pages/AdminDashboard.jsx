import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";

export default function AdminDashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      window.location.href = "/login";
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar role="admin" />
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        {user && <p className="mb-4">Welcome, {user.email}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-white shadow rounded">
            <h2 className="text-xl font-semibold mb-2">Manage Students</h2>
            <p>Add, remove, or update student details.</p>
          </div>
          <div className="p-6 bg-white shadow rounded">
            <h2 className="text-xl font-semibold mb-2">Manage Courses</h2>
            <p>Create and assign courses to students.</p>
          </div>
          <div className="p-6 bg-white shadow rounded">
            <h2 className="text-xl font-semibold mb-2">Certificates</h2>
            <p>Generate certificates for students who finish courses.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

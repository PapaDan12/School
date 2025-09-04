import { useEffect, useState } from "react";


export default function StudentDashboard() {
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
    
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">Student Dashboard</h1>
        {user && <p className="mb-4">Welcome, {user.email}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-white shadow rounded">
            <h2 className="text-xl font-semibold mb-2">My Courses</h2>
            <p>View and manage the courses you enrolled in.</p>
          </div>
          <div className="p-6 bg-white shadow rounded">
            <h2 className="text-xl font-semibold mb-2">Available Tutors</h2>
            <p>Browse tutors and the courses they offer.</p>
          </div>
          <div className="p-6 bg-white shadow rounded">
            <h2 className="text-xl font-semibold mb-2">Certificates</h2>
            <p>Download certificates for completed courses.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

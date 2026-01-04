import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import DashboardCard from "../../components/features/dashboard/DashboardCard";
import { getStoredUser } from "../../utils/storage";
import api from "../../services/api"; // Import your API instance

export default function DashboardPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState("");

  // State for real-time counts
  const [stats, setStats] = useState({
    complaints: 0,
    services: 0,
    pending: 0,
  });

  useEffect(() => {
    const user = getStoredUser();
    if (user) setRole(user.role);

    // Fetch real-time data
    const fetchDashboardStats = async () => {
      try {
        // 1. Get Complaints Count (limit=1 is enough to get the 'total' field)
        const complaintRes = await api.get("/complaints?limit=1");
        // 2. Get Services Count
        const serviceRes = await api.get("/services?limit=1");

        // 3. Get Pending Counts (We filter by status='pending')
        const pendingCompRes = await api.get(
          "/complaints?status=pending&limit=1"
        );
        const pendingSvcRes = await api.get("/services?status=pending&limit=1");

        setStats({
          complaints: complaintRes.data.total || 0,
          services: serviceRes.data.total || 0,
          // Sum of pending complaints + pending services
          pending:
            (pendingCompRes.data.total || 0) + (pendingSvcRes.data.total || 0),
        });
      } catch (error) {
        console.error("Error loading dashboard stats:", error);
      }
    };

    fetchDashboardStats();
  }, [navigate]);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 1. Total Complaints Card */}
        <DashboardCard
          title="Total Complaints"
          value={stats.complaints} // Real-time value
          icon="📢"
          colorClass="text-blue-500"
          onClick={() => navigate("/staff/complaints")}
        />

        {/* 2. Services Requested Card */}
        <DashboardCard
          title="Services Requested"
          value={stats.services} // Real-time value
          icon="🛠️"
          colorClass="text-green-500"
          onClick={() => navigate("/staff/services")}
        />

        {/* 3. Pending Requests */}
        <DashboardCard
          title="Pending Requests"
          value={stats.pending} // Real-time value
          icon="⏳"
          colorClass="text-yellow-500"
        />
      </div>

      {/* Role-based quick links */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Link
            to="/complaints"
            className="px-4 py-3 bg-white rounded-lg shadow hover:shadow-md transition text-center"
          >
            File Complaint
          </Link>

          <Link
            to="/services/new"
            className="px-4 py-3 bg-white rounded-lg shadow hover:shadow-md transition text-center"
          >
            Request Service
          </Link>

          <Link
            to="/announcements"
            className="px-4 py-3 bg-white rounded-lg shadow hover:shadow-md transition text-center"
          >
            Announcements
          </Link>

          <Link
            to="/chat"
            className="px-4 py-3 bg-white rounded-lg shadow hover:shadow-md transition text-center"
          >
            Live Chat Support
          </Link>

          {role === "admin" && (
            <Link
              to="/admin"
              className="px-4 py-3 bg-red-500 text-white rounded-lg shadow hover:shadow-md transition text-center"
            >
              Admin Panel
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import StaffSidebar from "../../components/layouts/StaffSidebar";

const getStatusColor = (status) => {
  const s = status ? status.toLowerCase() : "";
  switch (s) {
    case "resolved":
    case "completed":
      return "bg-green-100 text-green-800";
    case "in progress":
    case "in-progress":
      return "bg-yellow-100 text-yellow-800";
    case "pending":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function StaffComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const res = await api.get("/complaints");

      if (res.data && Array.isArray(res.data.complaints)) {
        setComplaints(res.data.complaints);
      } else if (res.data && Array.isArray(res.data.items)) {
        setComplaints(res.data.items);
      } else if (Array.isArray(res.data)) {
        setComplaints(res.data);
      } else {
        console.warn("Unexpected data format:", res.data);
        setComplaints([]);
      }
    } catch (err) {
      console.error("Error fetching complaints:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.patch(`/complaints/${id}/status`, { status: newStatus });

      // Refresh the local table
      fetchComplaints();
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update status.");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50 items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600 font-medium">Loading complaints...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <StaffSidebar />

      <div className="flex-1 p-8 overflow-y-auto h-screen">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Complaint Management
          </h1>
          <button
            onClick={() => navigate("/dashboard")}
            className="md:hidden text-blue-600 hover:underline"
          >
            Back to Dashboard
          </button>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-100">
          <table className="min-w-full text-left">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-3 text-gray-600 font-medium text-sm uppercase">
                  ID
                </th>
                <th className="px-6 py-3 text-gray-600 font-medium text-sm uppercase">
                  Citizen
                </th>
                <th className="px-6 py-3 text-gray-600 font-medium text-sm uppercase">
                  Issue
                </th>
                <th className="px-6 py-3 text-gray-600 font-medium text-sm uppercase">
                  Date
                </th>
                <th className="px-6 py-3 text-gray-600 font-medium text-sm uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-gray-600 font-medium text-sm uppercase">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {complaints.length > 0 ? (
                complaints.map((complaint) => (
                  <tr
                    key={complaint._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-gray-500 font-mono">
                      #{complaint._id?.slice(-6)}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {/* FIXED: Handles both direct strings and populated objects */}
                      {complaint.user?.name ||
                        complaint.userName ||
                        "Unknown Citizen"}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      <span className="block font-medium">
                        {complaint.title || "No Title"}
                      </span>
                      <span className="text-xs text-gray-400">
                        {complaint.category || "General"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-sm">
                      {new Date(complaint.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                          complaint.status
                        )}`}
                      >
                        {complaint.status || "pending"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        className="border border-gray-300 rounded px-2 py-1 text-sm bg-white cursor-pointer focus:ring-2 focus:ring-blue-500 outline-none"
                        value={complaint.status || "pending"}
                        onChange={(e) =>
                          handleStatusChange(complaint._id, e.target.value)
                        }
                      >
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-12 text-center text-gray-500">
                    <div className="flex flex-col items-center">
                      <p className="text-lg">No active complaints found.</p>
                      <p className="text-sm text-gray-400">
                        If dashboard shows counts, check if your User Role is
                        set to 'admin' in the database.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

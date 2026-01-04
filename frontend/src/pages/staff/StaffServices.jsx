import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import StaffSidebar from "../../components/layouts/StaffSidebar";

const getStatusColor = (status) => {
  const s = status ? status.toLowerCase() : "";
  switch (s) {
    case "completed":
    case "approved":
      return "bg-green-100 text-green-800";
    case "in progress":
    case "in-progress":
      return "bg-yellow-100 text-yellow-800";
    case "rejected":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function StaffServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await api.get("/services");
      // Check if backend uses 'items' key or returns array directly
      if (res.data && Array.isArray(res.data.items)) {
        setServices(res.data.items);
      } else if (Array.isArray(res.data)) {
        setServices(res.data);
      } else {
        setServices([]);
      }
    } catch (err) {
      console.error("Error fetching services:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      /**
       * FIX: We use an optimistic update here to show the change immediately.
       * If your backend expects different casing (e.g. "pending" instead of "Pending"),
       * ensure newStatus matches that expectation.
       */
      setServices((prev) =>
        prev.map((s) => (s._id === id ? { ...s, status: newStatus } : s))
      );

      // Verify this endpoint matches your backend route (e.g. /services/:id/status)
      await api.patch(`/services/${id}/status`, { status: newStatus });
    } catch (err) {
      console.error("Error updating service status:", err);
      // If the API call fails, we alert the user and refresh to revert the UI
      alert(
        "Failed to update status. Please check your network or permissions."
      );
      fetchServices();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-slate-600 font-medium">Loading requests...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <StaffSidebar />

      <div className="flex-1 p-8 overflow-y-auto h-screen">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Service Requests Management
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
                  Requester
                </th>
                <th className="px-6 py-3 text-gray-600 font-medium text-sm uppercase">
                  Type
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
              {services.length > 0 ? (
                services.map((svc) => (
                  <tr
                    key={svc._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-gray-500 font-mono">
                      #{svc._id?.slice(-6)}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {svc.user?.name || "Unknown"}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {svc.serviceType || svc.type || "Service Request"}
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-sm">
                      {new Date(svc.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                          svc.status
                        )}`}
                      >
                        {svc.status || "Pending"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        className="border border-gray-300 bg-white rounded px-2 py-1 text-sm cursor-pointer"
                        // Ensure we handle case insensitivity for display
                        value={
                          svc.status ? svc.status.toLowerCase() : "pending"
                        }
                        onChange={(e) =>
                          handleStatusChange(svc._id, e.target.value)
                        }
                      >
                        {/* VALUES should be lowercase/kebab-case to match DB standards */}
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="approved">Approved</option>
                        <option value="completed">Completed</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-10 text-center text-gray-500">
                    No service requests found.
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

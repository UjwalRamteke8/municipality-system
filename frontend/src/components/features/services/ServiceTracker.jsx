import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../../../services/api";
import {
  FileText,
  TrendingUp,
  CheckCircle2,
  Clock,
  MapPin,
  Search,
  Loader2,
  Paperclip,
  XCircle,
  AlertCircle,
} from "lucide-react";

const BACKEND_URL = process.env.VITE_API_BASE_URL;

const getImageUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;

  // Remove /api from the URL if it exists to get the root domain
  const rootUrl = BACKEND_URL.replace("/api", "");
  const cleanPath = path.replace(/\\/g, "/"); // Fix Windows backslashes

  return `${rootUrl}/${cleanPath}`;
};

const getStatusStep = (status) => {
  const s = status?.toLowerCase() || "pending";
  if (s === "completed" || s === "resolved") return 2;
  if (s === "in-progress" || s === "approved") return 1;
  return 0;
};

const steps = [
  { id: 0, label: "Registered", desc: "Request logged", icon: FileText },
  { id: 1, label: "Processing", desc: "Work in progress", icon: TrendingUp },
  { id: 2, label: "Resolved", desc: "Closed successfully", icon: CheckCircle2 },
];

export default function ServiceTracker() {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchId, setSearchId] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [serverError, setServerError] = useState("");
  const location = useLocation();

  const fetchById = async (id) => {
    try {
      setLoading(true);
      const res = await api.get(`/services/${encodeURIComponent(id)}`);
      if (res.data?.serviceRequest) {
        setSelectedRequest(res.data.serviceRequest);
        setActiveStep(getStatusStep(res.data.serviceRequest.status));
      }
    } catch (err) {
      console.error("Failed to fetch request by id", err);
      setServerError(
        err.response?.data?.message || "Request not found. Please check the ID."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserRequests();
    // if navigated here with a newRequestId, prefill and auto-load it
    if (location?.state?.newRequestId) {
      const id = location.state.newRequestId;
      if (id) {
        setSearchId(id);
        fetchById(id);
      }
    }
  }, []);

  const fetchUserRequests = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/services`);
      const data = res.data.items || [];
      setRequests(data);
      if (data.length > 0) {
        setSelectedRequest(data[0]);
        setActiveStep(getStatusStep(data[0].status));
      }
    } catch (err) {
      console.error("Failed to fetch requests", err);
    } finally {
      setLoading(false);
    }
  };

  const handleTrackById = async (e) => {
    e.preventDefault();
    if (!searchId.trim()) return;
    setIsSearching(true);
    setServerError("");
    try {
      const res = await api.get(`/services/${encodeURIComponent(searchId)}`);
      if (res.data.serviceRequest) {
        setSelectedRequest(res.data.serviceRequest);
        setActiveStep(getStatusStep(res.data.serviceRequest.status));
      }
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        "Request not found. Please check the ID.";
      setServerError(msg);
      console.error(msg, err);
    } finally {
      setIsSearching(false);
    }
  };

  if (loading && requests.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-10 h-10 text-[#9f1239] animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 border-b border-slate-200 pb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 font-serif mb-2">
              Track Service Requests
            </h1>
            <p className="text-slate-500">
              Monitor status of your municipal complaints and applications.
            </p>
          </div>
          <form onSubmit={handleTrackById} className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Enter Request ID (e.g. REQ-1234)"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="w-full pl-4 pr-12 py-3 rounded-lg border border-slate-300 focus:border-[#9f1239] outline-none"
            />
            <button
              type="submit"
              disabled={isSearching}
              className="absolute right-2 top-2 p-1.5 bg-[#9f1239] text-white rounded-md hover:bg-[#881337]"
            >
              {isSearching ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Search className="w-5 h-5" />
              )}
            </button>
          </form>
          {serverError && (
            <div className="mt-2 text-sm text-red-600 bg-red-50 p-2 rounded">
              {serverError}
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* List Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 max-h-[80vh] overflow-y-auto">
              <h2 className="font-bold text-slate-700 mb-4 px-2">
                Your History
              </h2>
              {requests.length === 0 ? (
                <p className="text-slate-400 text-center py-8">
                  No records found.
                </p>
              ) : (
                requests.map((req) => (
                  <div
                    key={req._id}
                    onClick={() => {
                      setSelectedRequest(req);
                      setActiveStep(getStatusStep(req.status));
                    }}
                    className={`p-4 rounded-lg cursor-pointer transition-all border-l-4 mb-3 ${
                      selectedRequest?._id === req._id
                        ? "bg-red-50 border-[#9f1239] shadow-sm"
                        : "bg-slate-50 border-transparent hover:bg-slate-100"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-xs font-mono font-bold text-slate-500">
                        #{req._id.slice(-6).toUpperCase()}
                      </span>
                      <span
                        className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                          req.status === "completed"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {req.status}
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-800 text-sm truncate">
                      {req.serviceType}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      {new Date(req.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Details View */}
          <div className="lg:col-span-2">
            {selectedRequest ? (
              <div className="space-y-6">
                {/* Status Tracker */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900 font-serif">
                        {selectedRequest.serviceType}
                      </h2>
                      <p className="text-xs text-slate-400 font-mono">
                        Reference ID: {selectedRequest._id}
                      </p>
                    </div>
                  </div>

                  {/* Stepper */}
                  <div className="relative flex justify-between">
                    {/* Connecting Line */}
                    <div className="absolute top-5 left-0 w-full h-1 bg-slate-100 -z-10"></div>
                    <div
                      className="absolute top-5 left-0 h-1 bg-[#9f1239] -z-10 transition-all duration-500"
                      style={{
                        width: `${(activeStep / (steps.length - 1)) * 100}%`,
                      }}
                    ></div>

                    {steps.map((step, idx) => {
                      const isCompleted = activeStep >= idx;
                      const isCurrent = activeStep === idx;
                      const Icon = step.icon;
                      return (
                        <div key={idx} className="flex flex-col items-center">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center border-2 z-10 ${
                              isCompleted
                                ? "bg-[#9f1239] border-[#9f1239] text-white"
                                : "bg-white border-slate-300 text-slate-300"
                            }`}
                          >
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="mt-2 text-center">
                            <p
                              className={`text-xs font-bold ${
                                isCompleted
                                  ? "text-slate-800"
                                  : "text-slate-400"
                              }`}
                            >
                              {step.label}
                            </p>
                            <p className="text-[10px] text-slate-400 hidden sm:block">
                              {step.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Details & Map */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <h3 className="text-sm font-bold uppercase text-slate-400 mb-4 flex items-center gap-2">
                      <FileText className="w-4 h-4" /> Details
                    </h3>
                    <p className="text-sm text-slate-700 leading-relaxed mb-4">
                      {selectedRequest.description}
                    </p>

                    <div className="space-y-3 pt-4 border-t border-slate-100">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-4 h-4 text-[#9f1239] mt-0.5" />
                        <div>
                          <span className="block text-xs text-slate-400 uppercase">
                            Location
                          </span>
                          <span className="text-sm font-medium text-slate-800">
                            {selectedRequest.address}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Clock className="w-4 h-4 text-[#9f1239] mt-0.5" />
                        <div>
                          <span className="block text-xs text-slate-400 uppercase">
                            Filed On
                          </span>
                          <span className="text-sm font-medium text-slate-800">
                            {new Date(
                              selectedRequest.createdAt
                            ).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <h3 className="text-sm font-bold uppercase text-slate-400 mb-4 flex items-center gap-2">
                      <Paperclip className="w-4 h-4" /> Evidence
                    </h3>
                    {selectedRequest.attachments &&
                    selectedRequest.attachments.length > 0 ? (
                      <div className="grid grid-cols-2 gap-2">
                        {selectedRequest.attachments.map((path, idx) => (
                          <div
                            key={idx}
                            className="aspect-square bg-slate-100 rounded-lg overflow-hidden border border-slate-200 cursor-pointer group relative"
                            onClick={() => setPreviewImage(getImageUrl(path))}
                          >
                            <img
                              src={getImageUrl(path)}
                              alt="Evidence"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                              <Search className="text-white w-6 h-6" />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="h-full flex items-center justify-center bg-slate-50 rounded-lg border border-dashed border-slate-200 text-slate-400 text-sm">
                        No Attachments
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center bg-white rounded-xl border border-dashed border-slate-300 p-12 text-slate-400">
                <Search className="w-16 h-16 mb-4 opacity-20" />
                <p>Select a request to view full details</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {previewImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setPreviewImage(null)}
        >
          <button className="absolute top-4 right-4 text-white hover:text-red-400">
            <XCircle className="w-10 h-10" />
          </button>
          <img
            src={previewImage}
            alt="Full View"
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
          />
        </div>
      )}
    </div>
  );
}

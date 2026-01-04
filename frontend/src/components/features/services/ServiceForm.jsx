import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  Upload,
  X,
  MapPin,
  Phone,
  User,
  FileText,
  Loader2,
  Send,
  AlertTriangle,
  Lightbulb,
  Droplets,
  Truck,
} from "lucide-react";
import api from "../../../services/api";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = "http://localhost:5000";

export default function ServiceForm() {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [serverError, setServerError] = useState("");
  const [referenceId, setReferenceId] = useState("");
  const fileRef = useRef();

  const serviceTypes = [
    {
      value: "road",
      label: "Road & Potholes",
      icon: <Truck className="w-6 h-6" />,
      desc: "Report damaged roads",
    },
    {
      value: "water",
      label: "Water Supply",
      icon: <Droplets className="w-6 h-6" />,
      desc: "Leakage or supply issues",
    },
    {
      value: "garbage",
      label: "Garbage Collection",
      icon: <AlertTriangle className="w-6 h-6" />,
      desc: "Missed pickup or dumping",
    },
    {
      value: "lights",
      label: "Street Lights",
      icon: <Lightbulb className="w-6 h-6" />,
      desc: "Non-functional lights",
    },
  ];

  const [form, setForm] = useState({
    type: "",
    description: "",
    location: "",
    phone: "",
    contactName: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.type) e.type = "Please select a service category";
    if (form.description.length < 10)
      e.description = "Please provide more details (min 10 chars)";
    if (!form.location) e.location = "Location is required";
    if (!/^\d{10}$/.test(form.phone))
      e.phone = "Valid 10-digit mobile number required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleFiles = (incoming) => {
    const arr = Array.from(incoming).map((f) => ({
      id: Math.random(),
      name: f.name,
      size: (f.size / 1024 / 1024).toFixed(2) + " MB",
      file: f,
    }));
    setFiles([...files, ...arr]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    if (!validate()) return;

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("serviceType", form.type);
      const fullDescription = `${form.description}\n\n-- Contact Info --\nName: ${form.contactName}\nPhone: ${form.phone}`;
      formData.append("description", fullDescription);
      formData.append("address", form.location);
      formData.append("paymentRequired", false);

      files.forEach((f) => {
        formData.append("attachments", f.file);
      });

      const res = await api.post(`/services`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const created = res.data?.serviceRequest;
      const id = created?._id || "";
      if (id) setReferenceId(id);
      setSuccess(true);
      // navigate to tracker and pass new id so tracker can auto-load it
      setTimeout(
        () => navigate("/services/tracker", { state: { newRequestId: id } }),
        8000
      );
    } catch (err) {
      console.error(err);
      setServerError(
        err.response?.data?.message ||
          err.message ||
          "Failed to submit request."
      );
    } finally {
      setLoading(false);
    }
  };

  if (success)
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50 px-4">
        <div className="bg-white rounded-2xl shadow-xl p-10 text-center max-w-md w-full border border-slate-200">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-10 h-10 text-green-600" />
          </motion.div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2 font-serif">
            Request Submitted
          </h2>
          <p className="text-slate-500 mb-8">
            Your service request has been logged successfully.
          </p>
          {referenceId && (
            <div className="mb-6">
              <p className="text-sm text-slate-600">Reference ID</p>
              <div className="mt-2 flex items-center justify-center gap-2">
                <span className="font-mono font-bold bg-slate-100 px-3 py-2 rounded">
                  {referenceId}
                </span>
                <button
                  onClick={() => navigator.clipboard?.copyText(referenceId)}
                  className="text-sm text-[#9f1239] underline"
                >
                  Copy
                </button>
              </div>
            </div>
          )}
          <button
            onClick={() => navigate("/services/tracker")}
            className="w-full bg-[#9f1239] text-white py-3 rounded-lg font-bold hover:bg-[#881337] transition-colors"
          >
            Track Status
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10 text-center md:text-left border-b border-slate-200 pb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 font-serif mb-2">
            New Service Request
          </h1>
          <p className="text-slate-600">
            Submit a formal request for municipal services or infrastructure
            repairs.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="bg-[#9f1239] px-6 py-4 flex items-center gap-2">
                <FileText className="text-white w-5 h-5" />
                <h3 className="font-bold text-white text-lg">
                  Request Details
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8">
                {/* Service Type */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wide">
                    Select Category
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {serviceTypes.map((s) => (
                      <div
                        key={s.value}
                        onClick={() => {
                          setForm({ ...form, type: s.value });
                          setErrors({ ...errors, type: null });
                        }}
                        className={`cursor-pointer p-4 rounded-xl border-2 transition-all flex items-start gap-4 ${
                          form.type === s.value
                            ? "border-[#9f1239] bg-red-50"
                            : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        <div
                          className={`p-2 rounded-lg ${
                            form.type === s.value
                              ? "bg-[#9f1239] text-white"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {s.icon}
                        </div>
                        <div>
                          <span
                            className={`font-bold block ${
                              form.type === s.value
                                ? "text-[#9f1239]"
                                : "text-slate-700"
                            }`}
                          >
                            {s.label}
                          </span>
                          <span className="text-xs text-slate-500">
                            {s.desc}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  {errors.type && (
                    <p className="text-red-600 text-sm mt-2 flex items-center gap-1">
                      <AlertTriangle size={14} /> {errors.type}
                    </p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">
                    Description of Issue
                  </label>
                  <textarea
                    rows={5}
                    className={`w-full p-4 rounded-lg border-2 outline-none transition-colors resize-none ${
                      errors.description
                        ? "border-red-300 focus:border-red-500"
                        : "border-slate-200 focus:border-[#9f1239]"
                    }`}
                    placeholder="Please describe the location and nature of the problem..."
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                  />
                  {errors.description && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.description}
                    </p>
                  )}
                </div>

                {/* File Upload */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wide">
                    Attachments (Optional)
                  </label>
                  <div
                    className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                      dragActive
                        ? "border-[#9f1239] bg-red-50"
                        : "border-slate-300 hover:bg-slate-50"
                    }`}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragActive(true);
                    }}
                    onDragLeave={() => setDragActive(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setDragActive(false);
                      handleFiles(e.dataTransfer.files);
                    }}
                    onClick={() => fileRef.current?.click()}
                  >
                    <Upload className="w-8 h-8 text-slate-400 mx-auto mb-3" />
                    <p className="font-medium text-slate-600">
                      Click to upload or drag & drop
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      JPG, PNG, PDF (Max 5MB)
                    </p>
                    <input
                      type="file"
                      multiple
                      ref={fileRef}
                      className="hidden"
                      onChange={(e) => handleFiles(e.target.files)}
                    />
                  </div>

                  {files.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {files.map((f) => (
                        <div
                          key={f.id}
                          className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-lg"
                        >
                          <div className="flex items-center gap-3 overflow-hidden">
                            <FileText className="w-5 h-5 text-slate-400" />
                            <div className="truncate">
                              <p className="text-sm font-medium text-slate-700 truncate">
                                {f.name}
                              </p>
                              <p className="text-xs text-slate-400">{f.size}</p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              setFiles(files.filter((i) => i.id !== f.id))
                            }
                            className="text-slate-400 hover:text-red-500"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden sticky top-6">
              <div className="bg-slate-800 px-6 py-4">
                <h3 className="font-bold text-white text-lg flex items-center gap-2">
                  <MapPin className="w-5 h-5" /> Location & Contact
                </h3>
              </div>
              <div className="p-6 space-y-5">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase">
                    Address / Landmark
                  </label>
                  <input
                    className={`w-full mt-1 px-4 py-3 rounded-lg border-2 outline-none ${
                      errors.location
                        ? "border-red-300"
                        : "border-slate-200 focus:border-[#9f1239]"
                    }`}
                    placeholder="e.g. Near City Hospital"
                    value={form.location}
                    onChange={(e) =>
                      setForm({ ...form, location: e.target.value })
                    }
                  />
                  {errors.location && (
                    <p className="text-red-600 text-xs mt-1">
                      {errors.location}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase">
                    Your Name
                  </label>
                  <input
                    className="w-full mt-1 px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-[#9f1239] outline-none"
                    placeholder="Full Name"
                    value={form.contactName}
                    onChange={(e) =>
                      setForm({ ...form, contactName: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase">
                    Mobile Number
                  </label>
                  <input
                    className={`w-full mt-1 px-4 py-3 rounded-lg border-2 outline-none ${
                      errors.phone
                        ? "border-red-300"
                        : "border-slate-200 focus:border-[#9f1239]"
                    }`}
                    placeholder="10-digit number"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                  />
                  {errors.phone && (
                    <p className="text-red-600 text-xs mt-1">{errors.phone}</p>
                  )}
                </div>

                {serverError && (
                  <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                    {serverError}
                  </div>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full mt-2 bg-[#9f1239] hover:bg-[#881337] text-white font-bold py-4 rounded-lg shadow-lg shadow-red-900/20 transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <Loader2 className="animate-spin w-5 h-5" />
                  ) : (
                    <>
                      Submit Request <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
                <p className="text-xs text-center text-slate-400">
                  Official Municipal Service Portal
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

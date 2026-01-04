import { useState } from "react";
import { Camera, MapPin, Upload, X } from "lucide-react";

export default function ComplaintForm({ onSubmit }) {
  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [locationStatus, setLocationStatus] = useState("idle"); // idle, loading, success

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files && files[0]) {
      setForm({ ...form, image: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const getLocation = () => {
    setLocationStatus("loading");
    // Simulating location fetch
    setTimeout(() => setLocationStatus("success"), 1500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.image || !form.title || !form.description) {
      setMsg("Please fill all fields and upload an image.");
      return;
    }
    setLoading(true);
    // Simulating API submit
    setTimeout(() => {
      setLoading(false);
      setMsg("Complaint Registered Successfully! Reference ID: PMC-2024-8892");
      setForm({ title: "", category: "", description: "", image: null });
      setPreview(null);
      setLocationStatus("idle");
    }, 2000);
  };

  return (
    <div className="bg-white shadow-xl shadow-slate-200 rounded-2xl border border-slate-100 overflow-hidden">
      <div className="bg-[#9f1239] px-6 py-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          Register New Complaint
        </h2>
        <p className="text-red-100 text-sm">
          Fill in the details below to report an issue.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
        {msg && (
          <div
            className={`p-4 rounded-lg text-sm font-bold ${
              msg.includes("Success")
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {msg}
          </div>
        )}

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">
            Complaint Title
          </label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="e.g. Garbage piling up at Main St."
            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-[#9f1239] focus:ring-1 focus:ring-[#9f1239] outline-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-[#9f1239] outline-none bg-white"
            >
              <option value="">Select Category</option>
              <option value="water">Water Supply</option>
              <option value="road">Road/Potholes</option>
              <option value="garbage">Garbage Collection</option>
              <option value="electricity">Street Lights</option>
              <option value="drainage">Drainage/Sewage</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Location</label>
            <button
              type="button"
              onClick={getLocation}
              className={`w-full px-4 py-3 rounded-lg border flex items-center justify-center gap-2 font-medium transition-all ${
                locationStatus === "success"
                  ? "bg-green-50 border-green-200 text-green-700"
                  : "bg-slate-50 border-slate-300 text-slate-600 hover:bg-slate-100"
              }`}
            >
              <MapPin className="w-5 h-5" />
              {locationStatus === "idle" && "Auto-detect Location"}
              {locationStatus === "loading" && "Detecting..."}
              {locationStatus === "success" && "Location Captured ✓"}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">
            Detailed Description
          </label>
          <textarea
            name="description"
            rows={4}
            value={form.description}
            onChange={handleChange}
            placeholder="Describe the issue in detail..."
            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-[#9f1239] focus:ring-1 focus:ring-[#9f1239] outline-none resize-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">
            Evidence Photo
          </label>
          <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:bg-slate-50 transition cursor-pointer relative">
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            {preview ? (
              <div className="relative h-48 w-full">
                <img
                  src={preview}
                  alt="Preview"
                  className="h-full w-full object-contain"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setPreview(null);
                    setForm({ ...form, image: null });
                  }}
                  className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full shadow-md z-10 hover:bg-red-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center text-slate-500">
                <div className="bg-slate-100 p-3 rounded-full mb-3">
                  <Camera className="w-8 h-8 text-[#9f1239]" />
                </div>
                <p className="font-medium">Click or Drag to Upload Photo</p>
                <p className="text-xs text-slate-400 mt-1">
                  Supports JPG, PNG (Max 5MB)
                </p>
              </div>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#9f1239] hover:bg-[#881337] text-white font-bold py-4 rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-70 flex items-center justify-center gap-2"
        >
          {loading ? (
            "Submitting..."
          ) : (
            <>
              Submit Complaint <Upload className="w-5 h-5" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}

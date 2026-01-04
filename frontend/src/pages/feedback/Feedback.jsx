import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, CheckCircle, AlertCircle, Send } from "lucide-react";

export default function Feedback() {
  const [formData, setFormData] = useState({
    userFeedback: "",
    firstName: "",
    lastName: "",
    email: "",
    category: "General",
    rating: "5",
  });
  const [status, setStatus] = useState({ type: "", msg: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.userFeedback || !formData.email || !formData.firstName) {
      setStatus({ type: "error", msg: "Please fill in all mandatory fields." });
      return;
    }

    setLoading(true);
    // Simulating API call
    setTimeout(() => {
      setStatus({
        type: "success",
        msg: "Feedback submitted successfully. Thank you!",
      });
      setFormData({
        userFeedback: "",
        firstName: "",
        lastName: "",
        email: "",
        category: "General",
        rating: "5",
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <section className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-slate-900 font-serif">
            Citizen Feedback
          </h1>
          <p className="mt-2 text-slate-600">
            Help us improve municipal services by sharing your experience.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl shadow-slate-200 border border-slate-100 overflow-hidden"
        >
          <div className="bg-[#9f1239] px-6 py-4 flex items-center gap-3">
            <MessageSquare className="text-white w-6 h-6" />
            <h2 className="text-white font-semibold text-lg">Feedback Form</h2>
          </div>

          <div className="p-8">
            <AnimatePresence>
              {status.msg && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
                    status.type === "success"
                      ? "bg-green-50 text-green-800 border border-green-200"
                      : "bg-red-50 text-red-800 border border-red-200"
                  }`}
                >
                  {status.type === "success" ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <AlertCircle className="w-5 h-5" />
                  )}
                  <p className="text-sm font-medium">{status.msg}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-[#9f1239] focus:ring-1 focus:ring-[#9f1239] outline-none transition bg-slate-50 focus:bg-white"
                    placeholder="e.g. Rahul"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">
                    Last Name
                  </label>
                  <input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-[#9f1239] focus:ring-1 focus:ring-[#9f1239] outline-none transition bg-slate-50 focus:bg-white"
                    placeholder="e.g. Patil"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-[#9f1239] focus:ring-1 focus:ring-[#9f1239] outline-none transition bg-slate-50 focus:bg-white"
                  placeholder="rahul@example.com"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">
                    Service Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-[#9f1239] outline-none bg-white"
                  >
                    <option value="General">General Inquiry</option>
                    <option value="Sanitation">Sanitation</option>
                    <option value="Water">Water Supply</option>
                    <option value="Roads">Roads & Traffic</option>
                    <option value="Taxes">Property Tax</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">
                    Rating (1-5)
                  </label>
                  <select
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-[#9f1239] outline-none bg-white"
                  >
                    <option value="5">⭐⭐⭐⭐⭐ (Excellent)</option>
                    <option value="4">⭐⭐⭐⭐ (Good)</option>
                    <option value="3">⭐⭐⭐ (Average)</option>
                    <option value="2">⭐⭐ (Poor)</option>
                    <option value="1">⭐ (Very Poor)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">
                  Your Feedback <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="userFeedback"
                  rows={4}
                  value={formData.userFeedback}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-[#9f1239] focus:ring-1 focus:ring-[#9f1239] outline-none transition bg-slate-50 focus:bg-white resize-none"
                  placeholder="Please describe your experience or suggestion in detail..."
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#9f1239] hover:bg-[#881337] text-white font-bold py-4 rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    "Submitting..."
                  ) : (
                    <>
                      Submit Feedback <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

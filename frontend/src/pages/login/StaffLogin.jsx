import { useState } from "react";
import { motion } from "framer-motion";
import api from "../../lib/api";
import { auth } from "../../firebase/firebaseconfig";
import { signInWithEmailAndPassword } from "firebase/auth";

import {
  Building2,
  Lock,
  ShieldCheck,
  ArrowRight,
  AlertCircle,
  Loader2,
  Eye,
  EyeOff,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom"; // Link is imported but not used for the button anymore

function StaffLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    staff: "general",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const staffs = [
    { id: "general", name: "General Administration" },
    { id: "water", name: "Water Supply Dept" },
    { id: "health", name: "Public Health" },
    { id: "waste", name: "Waste Management" },
    { id: "planning", name: "Town Planning" },
  ];

  // Inside handleLogin function in StaffLogin.jsx
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const idToken = await userCredential.user.getIdToken();

      // Ensure the URL matches the backend route we just fixed

      const { data } = await api.post(
        "/api/auth/verify-staff",
        { department: formData.staff },
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );

      localStorage.setItem("token", idToken);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/dashboard");
    } catch (err) {
      // ... error handling
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background Elements omitted for brevity - keep your existing ones */}

      {/* Left Side: Official Visuals */}
      <motion.div className="hidden lg:flex w-1/2 relative items-center justify-center p-12">
        {/* Keep your existing left side code */}
        <div className="relative z-10 max-w-lg text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            PMC Staff Portal
          </h2>
          {/* ... rest of left side ... */}
        </div>
      </motion.div>

      {/* Right Side: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/20">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white">Staff Login</h1>
              <p className="text-slate-300 mt-2 text-sm">
                Enter your official credentials to access the dashboard
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              {/* Staff Dropdown */}
              <motion.div>
                <label className="block text-sm font-semibold text-white mb-3">
                  Select Department
                </label>
                <div className="relative">
                  <select
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white"
                    value={formData.staff}
                    onChange={(e) =>
                      setFormData({ ...formData, staff: e.target.value })
                    }
                  >
                    {staffs.map((dept) => (
                      <option
                        key={dept.id}
                        value={dept.id}
                        className="bg-slate-900"
                      >
                        {dept.name}
                      </option>
                    ))}
                  </select>
                </div>
              </motion.div>

              {/* Email Input */}
              <motion.div>
                <label className="block text-sm font-semibold text-white mb-3">
                  Official Email
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </motion.div>

              {/* Password Input */}
              <motion.div>
                <label className="block text-sm font-semibold text-white mb-3">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-3 text-slate-400"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </motion.div>

              {error && (
                <div className="text-red-300 bg-red-500/20 p-4 rounded-xl text-sm flex gap-2">
                  <AlertCircle size={18} /> {error}
                </div>
              )}

              {/* SUBMIT BUTTON - REMOVED THE <LINK> WRAPPER HERE */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: !loading ? 1.02 : 1 }}
                whileTap={{ scale: !loading ? 0.98 : 1 }}
                className="w-full bg-gradient-to-r from-[#9f1239] to-rose-700 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 mt-6"
              >
                {loading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" /> Verifying...
                  </>
                ) : (
                  <>
                    Access Dashboard <ArrowRight size={20} />
                  </>
                )}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default StaffLogin;

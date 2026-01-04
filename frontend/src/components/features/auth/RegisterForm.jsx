import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Phone,
  ChevronRight,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Shield,
  Users,
  Building2,
  Eye,
  EyeOff,
} from "lucide-react";
import authService from "../../../services/authService";

// --- Reusable Components ---

const InputField = ({
  label,
  icon: Icon,
  type = "text",
  togglePassword,
  showPassword,
  ...props
}) => (
  <div className="mb-5 w-full">
    {label && (
      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">
        {label}
      </label>
    )}
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-200 group-focus-within:text-indigo-600">
        <Icon className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500" />
      </div>
      <input
        type={type === "password" && showPassword ? "text" : type}
        {...props}
        className="w-full pl-10 pr-10 py-3.5 border border-gray-200 rounded-xl bg-gray-50/50 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all duration-200 shadow-sm"
      />
      {/* Password Toggle Button */}
      {type === "password" && (
        <button
          type="button"
          onClick={togglePassword}
          className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-400 hover:text-indigo-600 transition-colors"
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>
      )}
    </div>
  </div>
);

// --- Main Component ---

function RegisterForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "Male",
    number: "",
    email: "",
    password: "",
    role: "citizen",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRoleChange = (role) => {
    setFormData((prev) => ({ ...prev, role }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password
    ) {
      setErrorMsg("Please fill in all required fields.");
      window.scrollTo(0, 0);
      return;
    }

    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      await authService.register(formData);
      setSuccessMsg("Account created successfully! Redirecting...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setErrorMsg(error.message || "Registration failed. Please try again.");
      window.scrollTo(0, 0);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-blue-50 py-6 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl shadow-indigo-100 overflow-hidden flex flex-col lg:flex-row border border-white/50">
        {/* Left Side: Visual & Branding (Hidden on Mobile) */}
        <div className="hidden lg:flex lg:w-5/12 bg-indigo-600 relative overflow-hidden flex-col justify-between p-12 text-white">
          {/* Background Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-white rounded-full mix-blend-overlay blur-3xl"></div>
            <div className="absolute bottom-[-20%] left-[-10%] w-96 h-96 bg-purple-500 rounded-full mix-blend-overlay blur-3xl"></div>
          </div>

          <div className="relative z-10">
            <div className="bg-white/10 w-12 h-12 rounded-xl flex items-center justify-center backdrop-blur-sm mb-8">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-5xl font-extrabold mb-6 tracking-tight leading-tight">
              Join the <br /> Community.
            </h1>
            <p className="text-indigo-100 text-lg leading-relaxed font-light">
              Connect with your local government, manage services efficiently,
              and be part of the change.
            </p>
          </div>

          <div className="relative z-10">
            <div className="flex items-center space-x-2 text-indigo-200 text-sm">
              <Shield className="w-4 h-4" />
              <span>Secure & Private Registration</span>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full lg:w-7/12 p-6 md:p-12 lg:p-16 relative">
          {/* Mobile Header (Visible only on small screens) */}
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100 mb-4">
              <Building2 className="w-6 h-6 text-indigo-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
            <p className="text-gray-500">Sign up to get started</p>
          </div>

          {/* Desktop Header */}
          <div className="hidden lg:block mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Get Started</h2>
            <p className="text-gray-500 mt-2">
              Enter your details to create your account.
            </p>
          </div>

          {/* Alerts */}
          {errorMsg && (
            <div className="mb-6 bg-red-50 border border-red-100 text-red-700 px-4 py-3 rounded-xl flex items-start gap-3 animate-fade-in-down">
              <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <p className="text-sm font-medium">{errorMsg}</p>
            </div>
          )}
          {successMsg && (
            <div className="mb-6 bg-green-50 border border-green-100 text-green-700 px-4 py-3 rounded-xl flex items-start gap-3 animate-fade-in-down">
              <CheckCircle2 className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <p className="text-sm font-medium">{successMsg}</p>
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-1">
            {/* Name Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5">
              <InputField
                label="First Name"
                icon={User}
                name="firstName"
                placeholder="John"
                value={formData.firstName}
                onChange={handleChange}
              />
              <InputField
                label="Last Name"
                icon={User}
                name="lastName"
                placeholder="Doe"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>

            {/* Email */}
            <InputField
              label="Email Address"
              icon={Mail}
              type="email"
              name="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
            />

            {/* Phone & Password Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5">
              <InputField
                label="Mobile Number"
                icon={Phone}
                type="tel"
                name="number"
                placeholder="+91 98765 43210"
                maxLength="10"
                value={formData.number}
                onChange={handleChange}
              />
              <InputField
                label="Password"
                icon={Lock}
                type="password"
                name="password"
                placeholder="••••••••"
                maxLength="20"
                value={formData.password}
                onChange={handleChange}
                togglePassword={() => setShowPassword(!showPassword)}
                showPassword={showPassword}
              />
            </div>

            {/* Gender Selection */}
            <div className="mb-6">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 ml-1">
                Gender
              </label>
              <div className="flex bg-gray-50 p-1.5 rounded-xl border border-gray-200">
                {["Male", "Female", "Other"].map((g) => (
                  <label
                    key={g}
                    className={`flex-1 relative cursor-pointer py-2.5 text-center text-sm font-semibold rounded-lg transition-all duration-200 ${
                      formData.gender === g
                        ? "bg-white text-indigo-600 shadow-sm ring-1 ring-gray-200"
                        : "text-gray-500 hover:text-gray-700 hover:bg-gray-100/50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="gender"
                      value={g}
                      checked={formData.gender === g}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    {g}
                  </label>
                ))}
              </div>
            </div>

            {/* Role Selection */}
            <div className="mb-8">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 ml-1">
                Select Account Type
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: "citizen", label: "Citizen", icon: Users },
                  { id: "staff", label: "Staff", icon: Shield },
                  { id: "admin", label: "Admin", icon: Lock },
                ].map((roleOption) => {
                  const Icon = roleOption.icon;
                  const isActive = formData.role === roleOption.id;
                  return (
                    <div
                      key={roleOption.id}
                      onClick={() => handleRoleChange(roleOption.id)}
                      className={`cursor-pointer group relative border rounded-2xl p-4 flex flex-col items-center justify-center transition-all duration-300 ${
                        isActive
                          ? "bg-indigo-50 border-indigo-500 text-indigo-700 shadow-md scale-[1.02]"
                          : "bg-white text-gray-500 border-gray-200 hover:border-indigo-200 hover:bg-gray-50"
                      }`}
                    >
                      <Icon
                        className={`w-6 h-6 mb-2 transition-colors ${
                          isActive
                            ? "text-indigo-600"
                            : "text-gray-400 group-hover:text-indigo-400"
                        }`}
                      />
                      <span className="text-xs font-bold tracking-wide">
                        {roleOption.label}
                      </span>
                      {isActive && (
                        <div className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 hover:shadow-indigo-500/50 active:scale-[0.98] transition-all duration-300 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                  <ChevronRight className="w-5 h-5 ml-2" />
                </>
              )}
            </button>

            <p className="mt-8 text-center text-gray-500 text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-indigo-600 font-bold hover:text-indigo-800 transition-colors underline decoration-2 decoration-transparent hover:decoration-indigo-600 underline-offset-4"
              >
                Log in here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;

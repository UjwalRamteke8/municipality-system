import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, Loader2, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase/firebaseconfig";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false); // Separate loading state for Google
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // --- Email/Password Login ---
  const onSubmit = async (data) => {
    setErrorMsg("");
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      saveUserAndRedirect(userCredential.user);
    } catch (err) {
      console.error("Login error:", err);
      setErrorMsg("Invalid email or password. Please try again.");
      setLoading(false);
    }
  };

  // --- Google Login ---
  const handleGoogleLogin = async () => {
    setErrorMsg("");
    setGoogleLoading(true);
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      saveUserAndRedirect(result.user);
    } catch (err) {
      console.error("Google Login Error:", err);
      setErrorMsg("Google sign-in failed. Please try again.");
      setGoogleLoading(false);
    }
  };

  // Helper to save user to local storage
  const saveUserAndRedirect = async (user) => {
    await user.getIdToken();
    localStorage.setItem(
      "user",
      JSON.stringify({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      })
    );
    navigate("/citizen-services");
    // No need to set loading false here as we are navigating away
  };

  return (
    <div className="flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
      >
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 mb-4">
              <LogIn size={24} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
            <p className="text-gray-500 text-sm mt-1">
              Sign in to access your dashboard
            </p>
          </div>

          {/* Google Button - Placed at top for easy access */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading || googleLoading}
            className="w-full mb-6 flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 font-medium py-2.5 rounded-lg hover:bg-gray-50 transition-all duration-200 shadow-sm"
          >
            {googleLoading ? (
              <Loader2 size={20} className="animate-spin text-gray-500" />
            ) : (
              // Standard Google "G" SVG Icon
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            )}
            <span>
              {googleLoading ? "Connecting..." : "Sign in with Google"}
            </span>
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or continue with email
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <AnimatePresence>
              {errorMsg && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-red-50 text-red-600 border border-red-200 px-4 py-3 rounded-lg text-sm flex items-center gap-2"
                >
                  <span className="block w-1.5 h-1.5 rounded-full bg-red-600 flex-shrink-0" />
                  {errorMsg}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Email Field */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-500 transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  placeholder="you@example.com"
                  {...register("email", { required: "Email is required" })}
                  className={`w-full pl-10 pr-4 py-2.5 bg-gray-50 border rounded-lg outline-none transition-all duration-200 focus:bg-white focus:ring-2 ${
                    errors.email
                      ? "border-red-300 focus:ring-red-200"
                      : "border-gray-200 focus:border-indigo-500 focus:ring-indigo-100"
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-500 mt-1 ml-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <a
                  href="#"
                  className="text-xs font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-500 transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className={`w-full pl-10 pr-10 py-2.5 bg-gray-50 border rounded-lg outline-none transition-all duration-200 focus:bg-white focus:ring-2 ${
                    errors.password
                      ? "border-red-300 focus:ring-red-200"
                      : "border-gray-200 focus:border-indigo-500 focus:ring-indigo-100"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-500 mt-1 ml-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading || googleLoading}
              className="w-full bg-indigo-600 text-white py-2.5 rounded-lg shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-indigo-300 transition-all duration-200 font-medium flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                "Sign In"
              )}
            </motion.button>
          </form>
        </div>

        <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Create one
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

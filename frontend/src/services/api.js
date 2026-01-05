import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Track auth initialization
let authStateInitialized = false;
let currentUser = null;

const auth = getAuth();

// Initialize auth state listener
onAuthStateChanged(auth, (user) => {
  authStateInitialized = true;
  currentUser = user;
  console.log("Auth state changed:", user ? user.email : "logged out");
});

// Attach Firebase ID token automatically
api.interceptors.request.use(async (config) => {
  try {
    // Wait for auth to initialize (max 5 seconds)
    let attempts = 0;
    while (!authStateInitialized && attempts < 50) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      attempts++;
    }

    const user = currentUser || auth.currentUser;

    if (user) {
      try {
        // Get fresh ID token from Firebase
        const idToken = await user.getIdToken(true); // true = force refresh
        config.headers.Authorization = `Bearer ${idToken}`;
        // console.log("✅ Authorization token added");
      } catch (tokenError) {
        console.error(
          "❌ Error getting Firebase ID token:",
          tokenError.message
        );
      }
    }
  } catch (error) {
    console.error("Axios interceptor error:", error);
  }

  return config;
});

export default api;

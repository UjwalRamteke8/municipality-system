import axios from "axios";
import { getAuth } from "firebase/auth";

// NOTE: Using 127.0.0.1 is sometimes safer than localhost on Windows to avoid IPv6 lookup issues
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://127.0.0.1:5000";

/**
 * Upload a photo (FormData) to backend.
 * Gets fresh Firebase ID token for authentication.
 */
export const uploadPhoto = async (formData) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    throw new Error("AUTH_REQUIRED: User not authenticated. Please login.");
  }

  // Get fresh ID token from Firebase
  const token = await user.getIdToken(true);
  const res = await axios.post(`${BACKEND_URL}/api/photos/upload`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      // NOTE: Do not set Content-Type here; let browser set multipart boundary
    },
  });

  return res.data; // controller returns { message, photo }
};

/**
 * Fetch all photos (public)
 */
export const fetchAllPhotos = async () => {
  const res = await axios.get(`${BACKEND_URL}/api/photos/all`);
  return res.data; // should be array of photos
};

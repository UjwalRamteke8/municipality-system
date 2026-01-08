// frontend/services/photoService.js
import api from "./api"; // IMPORT your configured api.js instead of raw axios

export const uploadPhoto = async (formData) => {
  // Use the 'api' instance we already configured with interceptors
  // This automatically handles the Firebase Token and the correct Base URL
  const res = await api.post(`/api/photos/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

export const fetchAllPhotos = async () => {
  const res = await api.get(`/api/photos/all`);
  return res.data;
};

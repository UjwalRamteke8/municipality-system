import { useEffect, useMemo, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import {
  Upload,
  MapPin,
  Calendar,
  Image as ImageIcon,
  Loader2,
} from "lucide-react";

// In real app, switch to import.meta.env
const BACKEND_URL = process.env.VITE_API_BASE_URL;

const uploadPhotoRequest = async (formData) => {
  const res = await api.post(`/api/photos/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// Mock Metadata Card for internal use if import fails
const MetadataPreview = ({ data }) => (
  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 text-sm space-y-2 mt-4">
    <h4 className="font-bold text-slate-700 border-b border-slate-200 pb-2 mb-2">
      Metadata
    </h4>
    <div className="flex justify-between">
      <span className="text-slate-500">Label:</span>{" "}
      <span className="font-medium">{data.locationLabel}</span>
    </div>
    <div className="flex justify-between">
      <span className="text-slate-500">Coords:</span>{" "}
      <span className="font-mono text-xs">
        {data.latitude}, {data.longitude}
      </span>
    </div>
    <div className="flex justify-between">
      <span className="text-slate-500">Date:</span>{" "}
      <span>{new Date(data.dateTime).toLocaleDateString()}</span>
    </div>
  </div>
);

const initialState = {
  dateTime: "",
  locationLabel: "",
  latitude: "",
  longitude: "",
};

export default function UploadPhoto() {
  const [formState, setFormState] = useState(initialState);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, [navigate]);

  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setFormState((prev) => ({
          ...prev,
          latitude: coords.latitude.toFixed(6),
          longitude: coords.longitude.toFixed(6),
        }));
      },
      (err) => console.warn("Geo access denied", err)
    );
  }, []);

  useEffect(() => {
    if (!file) return setPreview(null);
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  }, [file]);

  const mutation = useMutation({
    mutationFn: async () => {
      const fd = new FormData();
      fd.append("photo", file);
      fd.append("dateTime", formState.dateTime);
      fd.append("locationLabel", formState.locationLabel);
      fd.append("latitude", formState.latitude);
      fd.append("longitude", formState.longitude);
      return uploadPhotoRequest(fd);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["photos"] });
      navigate("/gallery");
    },
    onError: (err) => {
      setError(
        err.response?.data?.message || "Upload failed. Please try again."
      );
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) return setError("Please select an image.");
    setError("");
    mutation.mutate();
  };

  return (
    <section className="mx-auto max-w-5xl px-4 py-12">
      <div className="mb-8 border-b border-slate-200 pb-4">
        <h1 className="text-3xl font-bold text-slate-900 font-serif">
          Upload Media
        </h1>
        <p className="text-slate-500">
          Contribute geotagged photos to the municipal database.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white p-6 rounded-xl border border-slate-200 shadow-sm"
        >
          {/* File Input */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-700">
              Photo Evidence
            </label>
            <div className="relative border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:bg-slate-50 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  setFile(e.target.files?.[0]);
                  setError("");
                }}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="flex flex-col items-center gap-2">
                <div className="bg-indigo-50 p-3 rounded-full text-indigo-600">
                  <Upload className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium text-indigo-600">
                  Click to Upload
                </span>
                <span className="text-xs text-slate-400">
                  Supports JPG, PNG
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-700">
              Date & Time
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <input
                type="datetime-local"
                value={formState.dateTime}
                onChange={(e) =>
                  setFormState({ ...formState, dateTime: e.target.value })
                }
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 focus:border-[#9f1239] outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-700">
              Location Label
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="e.g. Central Park Entrance"
                value={formState.locationLabel}
                onChange={(e) =>
                  setFormState({ ...formState, locationLabel: e.target.value })
                }
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 focus:border-[#9f1239] outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                Latitude
              </label>
              <input
                type="number"
                step="any"
                value={formState.latitude}
                onChange={(e) =>
                  setFormState({ ...formState, latitude: e.target.value })
                }
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-[#9f1239] outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                Longitude
              </label>
              <input
                type="number"
                step="any"
                value={formState.longitude}
                onChange={(e) =>
                  setFormState({ ...formState, longitude: e.target.value })
                }
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-[#9f1239] outline-none text-sm"
              />
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-50 text-red-700 text-sm rounded border border-red-200">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full bg-[#9f1239] text-white font-bold py-3 rounded-lg hover:bg-[#881337] transition-colors flex justify-center items-center gap-2"
          >
            {mutation.isPending ? (
              <Loader2 className="animate-spin w-5 h-5" />
            ) : (
              "Upload to Archive"
            )}
          </button>
        </form>

        {/* Preview Panel */}
        <div className="space-y-4">
          <h3 className="font-bold text-slate-700">Preview</h3>
          {preview ? (
            <div className="space-y-4">
              <img
                src={preview}
                alt="Upload Preview"
                className="w-full h-64 object-cover rounded-xl shadow-md border border-slate-200"
              />
              <MetadataPreview data={formState} />
            </div>
          ) : (
            <div className="h-64 bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center text-slate-400">
              <ImageIcon className="w-12 h-12 mb-2 opacity-20" />
              <span>Image preview will appear here</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import GalleryGrid from "../components/PhotoGallery/GalleryGrid";
import Lightbox from "../components/PhotoGallery/Lightbox";
import MetadataCard from "../components/PhotoGallery/MetadataCard";
import { fetchAllPhotos } from "../services/photoService";
import { Image, Upload, RefreshCcw } from "lucide-react";

export default function GalleryPage() {
  const [activePhoto, setActivePhoto] = useState(null);

  const {
    data: photos = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["photos"],
    queryFn: fetchAllPhotos,
  });

  const showEmptyState = !isLoading && photos.length === 0;

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      {/* Header */}
      <div className="flex flex-col gap-6 pb-8 sm:flex-row sm:items-end sm:justify-between border-b border-slate-200 mb-8">
        <div>
          <p className="text-xs uppercase tracking-wide text-[#9f1239] font-bold mb-1">
            Official Archives
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 font-serif">
            City Media Gallery
          </h1>
          <p className="mt-2 text-slate-600 max-w-lg">
            Documenting infrastructure development, cultural events, and citizen
            initiatives.
          </p>
        </div>

        <Link
          to="/gallery/upload"
          className="shrink-0 inline-flex items-center justify-center rounded-lg bg-[#9f1239] px-6 py-3 font-bold text-white shadow-lg shadow-red-900/20 transition duration-300 hover:bg-[#881337] gap-2"
        >
          <Upload className="w-4 h-4" /> Upload Photo
        </Link>
      </div>

      {isError && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center">
          <p className="text-red-800 font-bold mb-2">Unable to load gallery</p>
          <button
            onClick={() => refetch()}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#9f1239] hover:underline"
          >
            <RefreshCcw className="w-3 h-3" /> Try Again
          </button>
        </div>
      )}

      {showEmptyState && (
        <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-16 text-center">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-slate-200">
            <Image className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-xl font-bold text-slate-700">Gallery is Empty</h3>
          <p className="text-slate-500 mb-6">
            Be the first to contribute to the city archives.
          </p>
          <Link
            to="/gallery/upload"
            className="inline-flex items-center justify-center rounded-lg bg-slate-800 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-slate-700"
          >
            Upload Now
          </Link>
        </div>
      )}

      {!showEmptyState && (
        <div className="space-y-8">
          <GalleryGrid
            photos={photos}
            onSelect={setActivePhoto}
            selectedPhotoId={activePhoto?.id}
            isLoading={isLoading}
          />

          {activePhoto && (
            <div className="mt-6">
              <MetadataCard photo={activePhoto} />
            </div>
          )}
        </div>
      )}

      <Lightbox photo={activePhoto} onClose={() => setActivePhoto(null)} />
    </section>
  );
}

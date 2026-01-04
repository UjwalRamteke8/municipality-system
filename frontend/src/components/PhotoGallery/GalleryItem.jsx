import { motion } from "framer-motion";

export default function GalleryItem({ photo, onSelect, selected }) {
  return (
    <motion.button
      type="button"
      onClick={() => onSelect(photo)}
      className="group relative w-full overflow-hidden rounded-2xl bg-slate-900 shadow-lg focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.985 }}
    >
      <img
        src={photo.imageUrl} // 🔥 Firestore: imageUrl
        alt={photo.description || "Photo"}
        loading="lazy"
        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-90" />
      <div className="absolute inset-0 flex flex-col justify-end p-4 text-left text-white">
        <p className="text-sm uppercase tracking-wide text-white/70">
          {photo.fullName || "Unknown user"}
        </p>
        <h4 className="text-lg font-semibold">
          {photo.description?.slice(0, 28) || "No description"}
        </h4>

        <div className="mt-2 flex items-center gap-2 text-xs text-white/80">
          {photo.latitude && photo.longitude && (
            <span>
              {photo.latitude.toFixed(3)}, {photo.longitude.toFixed(3)}
            </span>
          )}
          <span className="rounded-full bg-white/20 px-2 py-0.5 text-[11px] uppercase tracking-wide">
            {photo.status || "Pending"}
          </span>
        </div>
      </div>

      {selected && (
        <div className="absolute inset-0 border-4 border-indigo-400/80 rounded-2xl pointer-events-none" />
      )}
    </motion.button>
  );
}

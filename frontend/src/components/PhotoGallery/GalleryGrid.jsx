import { AnimatePresence, motion } from "framer-motion";
import GalleryItem from "./GalleryItem";

export default function GalleryGrid({
  photos = [],
  onSelect,
  selectedPhotoId,
  isLoading,
}) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={`skeleton-${index}`}
            className="h-72 animate-pulse rounded-3xl bg-slate-200 dark:bg-slate-800"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <AnimatePresence>
        {photos.map((photo) => (
          <motion.div
            key={photo.id} // 🔥 Firestore uses id not _id
            layout
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <GalleryItem
              photo={photo}
              onSelect={onSelect}
              selected={selectedPhotoId === photo.id} // 🔥 updated
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

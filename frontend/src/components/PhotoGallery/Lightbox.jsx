import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import MetadataCard from "./MetadataCard";

export default function Lightbox({ photo, onClose }) {
  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {photo ? (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative flex w-full max-w-6xl flex-col gap-6 rounded-3xl bg-white p-6 shadow-2xl dark:bg-slate-900 md:flex-row"
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ type: "spring", stiffness: 140, damping: 18 }}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full bg-black/70 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-white shadow-md transition hover:bg-black"
            >
              Close
            </button>

            <div className="flex-1 overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800">
              <img
                src={photo.imageUrl} // 🔥 Firestore field
                alt="Selected photo"
                className="max-h-[70vh] w-full object-contain"
              />
            </div>

            <div className="w-full max-w-md">
              <MetadataCard photo={photo} />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body
  );
}

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquareText, X, Minus, Sparkles } from "lucide-react";
import ChatWindow from "../../components/features/chat/ChatWindow";

export default function ChatbotPopup() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-[999]">
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 20 }}
            whileHover={{ y: -5 }}
            onClick={() => setIsOpen(true)}
            className="relative flex items-center gap-3 bg-slate-900 text-white pl-5 pr-6 py-4 rounded-2xl shadow-2xl shadow-slate-400 group border border-slate-700"
          >
            <div className="relative">
              <MessageSquareText className="w-6 h-6 text-rose-400" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-slate-900 animate-pulse" />
            </div>
            <span className="font-bold text-sm tracking-wide">
              Civic AI Assistant
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="w-[90vw] md:w-[420px] h-[70vh] md:h-[600px] bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden border border-slate-200 flex flex-col"
          >
            {/* AI Header */}
            <div className="bg-slate-900 p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#9f1239] rounded-xl flex items-center justify-center shadow-lg shadow-rose-900/20">
                  <Sparkles className="text-white w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-base tracking-tight">
                    Civic Assistant
                  </h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                      AI Powered Service
                    </p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-all"
              >
                <Minus size={20} />
              </button>
            </div>

            {/* Chat Content */}
            <div className="flex-1 bg-slate-50 relative overflow-hidden">
              <ChatWindow className="h-full" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

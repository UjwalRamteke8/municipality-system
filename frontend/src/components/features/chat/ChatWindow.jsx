import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Loader2, Sparkles } from "lucide-react";
import api from "../../../services/api";

export default function ChatWindow() {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      content: "Namaskar! I'm your PMC Civic AI. How can I assist you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      // FIX: Changed 'prompt' to 'message' to match your backend controller/route
      const { data } = await api.post("/api/ai/chat", {
        message: input,
      });

      setMessages((prev) => [...prev, { role: "bot", content: data.reply }]);
    } catch (err) {
      console.error("Chat Error:", err.response?.data || err.message);
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content:
            "The Civic AI is momentarily unavailable. Please try again in a few seconds.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };
  return (
    <div className="flex flex-col h-full bg-slate-50 font-sans">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`flex gap-2 max-w-[85%] ${
                msg.role === "user" ? "flex-row-reverse" : ""
              }`}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  msg.role === "user" ? "bg-slate-800" : "bg-[#9f1239]"
                }`}
              >
                {msg.role === "user" ? (
                  <User size={14} className="text-white" />
                ) : (
                  <Sparkles size={14} className="text-white" />
                )}
              </div>
              <div
                className={`p-3 rounded-2xl text-sm ${
                  msg.role === "user"
                    ? "bg-[#9f1239] text-white rounded-tr-none"
                    : "bg-white text-slate-700 border border-slate-200 rounded-tl-none shadow-sm"
                }`}
              >
                {msg.content}
              </div>
            </div>
          </motion.div>
        ))}
        {isTyping && (
          <div className="flex gap-2 items-center text-slate-400 text-xs pl-2">
            <Loader2 size={12} className="animate-spin" /> Assistant is
            typing...
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      <form
        onSubmit={sendMessage}
        className="p-4 bg-white border-t border-slate-200 flex gap-2"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question..."
          className="flex-1 bg-slate-100 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-[#9f1239]"
        />
        <button
          type="submit"
          className="bg-[#9f1239] text-white p-2 rounded-xl hover:bg-rose-900 transition-all"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
}

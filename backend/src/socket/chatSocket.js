// backend/src/sockets/chatSocket.js
/**
 * Usage:
 *  import { initializeChat } from "./sockets/chatSocket.js";
 *  initializeChat(io);
 */

import ChatMessage from "../../models/ChatMessage.js";

/**
 * Initialize chat socket handlers
 * Emits & listens:
 * - 'joinRoom' { room }
 * - 'leaveRoom' { room }
 * - 'sendMessage' { room, message, to, from }
 * - emits 'newMessage' { message }
 */
export const initializeChat = (io) => {
  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("joinRoom", (room) => {
      socket.join(room);
      console.log(`${socket.id} joined ${room}`);
    });

    socket.on("leaveRoom", (room) => {
      socket.leave(room);
      console.log(`${socket.id} left ${room}`);
    });

    socket.on("sendMessage", async (payload) => {
      /**
       * payload: { room, from, to, text, meta }
       */
      try {
        const saved = await ChatMessage.create({
          room: payload.room,
          from: payload.from,
          to: payload.to,
          text: payload.text,
          meta: payload.meta || {},
        });

        // Emit to the room
        io.to(payload.room).emit("newMessage", saved);
      } catch (err) {
        console.error("socket sendMessage error:", err);
        socket.emit("error", { message: "Failed to send message." });
      }
    });

    socket.on("typing", ({ room, userId }) => {
      socket.to(room).emit("typing", { userId });
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });
};

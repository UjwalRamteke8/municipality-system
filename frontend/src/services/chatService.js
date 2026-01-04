import {
  ref,
  push,
  onValue,
  query,
  orderByChild,
  limitToLast,
  set,
  remove,
} from "firebase/database";
import { rtdb } from "../firebase/firebaseconfig";

const chatService = {
  /**
   * Send a message to a chat room
   */
  async sendMessage(chatRoomId, messageData) {
    try {
      const messagesRef = ref(rtdb, `chat/${chatRoomId}/messages`);
      const newMessageRef = push(messagesRef);

      const message = {
        userId: messageData.userId,
        userName: messageData.userName,
        text: messageData.text,
        timestamp: new Date().toISOString(),
        read: false,
      };

      await set(newMessageRef, message);
      return { id: newMessageRef.key, ...message };
    } catch (error) {
      console.error("Send message error:", error);
      throw error;
    }
  },

  /**
   * Get all messages for a chat room (one-time fetch)
   */
  async getMessages(chatRoomId, limit = 50) {
    try {
      const messagesRef = query(
        ref(rtdb, `chat/${chatRoomId}/messages`),
        orderByChild("timestamp"),
        limitToLast(limit)
      );

      return new Promise((resolve, reject) => {
        onValue(
          messagesRef,
          (snapshot) => {
            if (snapshot.exists()) {
              const messages = [];
              snapshot.forEach((childSnapshot) => {
                messages.push({
                  id: childSnapshot.key,
                  ...childSnapshot.val(),
                });
              });
              resolve(messages);
            } else {
              resolve([]);
            }
          },
          reject,
          { onlyOnce: true }
        );
      });
    } catch (error) {
      console.error("Get messages error:", error);
      throw error;
    }
  },

  /**
   * Listen for real-time messages in a chat room
   */
  onMessagesChange(chatRoomId, callback) {
    try {
      const messagesRef = ref(rtdb, `chat/${chatRoomId}/messages`);

      const unsubscribe = onValue(messagesRef, (snapshot) => {
        if (snapshot.exists()) {
          const messages = [];
          snapshot.forEach((childSnapshot) => {
            messages.push({
              id: childSnapshot.key,
              ...childSnapshot.val(),
            });
          });
          // Sort by timestamp
          messages.sort(
            (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
          );
          callback(messages);
        } else {
          callback([]);
        }
      });

      return unsubscribe;
    } catch (error) {
      console.error("On messages change error:", error);
      throw error;
    }
  },

  /**
   * Delete a message
   */
  async deleteMessage(chatRoomId, messageId) {
    try {
      const messageRef = ref(rtdb, `chat/${chatRoomId}/messages/${messageId}`);
      await remove(messageRef);
      return { success: true };
    } catch (error) {
      console.error("Delete message error:", error);
      throw error;
    }
  },

  /**
   * Mark message as read
   */
  async markAsRead(chatRoomId, messageId) {
    try {
      const messageRef = ref(
        rtdb,
        `chat/${chatRoomId}/messages/${messageId}/read`
      );
      await set(messageRef, true);
      return { success: true };
    } catch (error) {
      console.error("Mark as read error:", error);
      throw error;
    }
  },
};

export default chatService;

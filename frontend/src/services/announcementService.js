import {
  collection,
  addDoc,
  query,
  getDocs,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { db, storage } from "../firebase/firebaseconfig";

const announcementService = {
  async getAnnouncements() {
    try {
      const q = query(
        collection(db, "announcements"),
        orderBy("createdAt", "desc")
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error("Get announcements error:", error);
      throw error;
    }
  },

  async getAnnouncement(id) {
    try {
      const docRef = doc(db, "announcements", id);
      const snapshot = await getDoc(docRef);
      if (!snapshot.exists()) {
        throw new Error("Announcement not found");
      }
      return {
        id: snapshot.id,
        ...snapshot.data(),
      };
    } catch (error) {
      console.error("Get announcement error:", error);
      throw error;
    }
  },

  async createAnnouncement(data, userId, imageFile = null) {
    try {
      let imageUrl = "";

      // Upload image if provided
      if (imageFile) {
        const storageRef = ref(
          storage,
          `announcements/${userId}/${Date.now()}_${imageFile.name}`
        );
        await uploadBytes(storageRef, imageFile);
        imageUrl = await getDownloadURL(storageRef);
      }

      // Create announcement document
      const announcementData = {
        title: data.title,
        description: data.description,
        category: data.category || "general",
        imageUrl,
        userId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const docRef = await addDoc(
        collection(db, "announcements"),
        announcementData
      );

      return { id: docRef.id, ...announcementData };
    } catch (error) {
      console.error("Create announcement error:", error);
      throw error;
    }
  },

  async updateAnnouncement(announcementId, data, imageFile = null) {
    try {
      let imageUrl = data.imageUrl;

      // Upload new image if provided
      if (imageFile) {
        const storageRef = ref(
          storage,
          `announcements/${data.userId}/${Date.now()}_${imageFile.name}`
        );
        await uploadBytes(storageRef, imageFile);
        imageUrl = await getDownloadURL(storageRef);
      }

      const docRef = doc(db, "announcements", announcementId);
      await updateDoc(docRef, {
        title: data.title,
        description: data.description,
        category: data.category,
        imageUrl,
        updatedAt: new Date().toISOString(),
      });

      return { id: announcementId, ...data, imageUrl };
    } catch (error) {
      console.error("Update announcement error:", error);
      throw error;
    }
  },

  async deleteAnnouncement(announcementId, imageUrl) {
    try {
      // Delete image from storage if exists
      if (imageUrl) {
        try {
          const storageRef = ref(storage, imageUrl);
          await deleteObject(storageRef);
        } catch (storageError) {
          console.warn("Failed to delete image from storage:", storageError);
        }
      }

      // Delete announcement document
      await deleteDoc(doc(db, "announcements", announcementId));
      return { success: true };
    } catch (error) {
      console.error("Delete announcement error:", error);
      throw error;
    }
  },

  onAnnouncementsChange(callback) {
    const q = query(
      collection(db, "announcements"),
      orderBy("createdAt", "desc")
    );

    return onSnapshot(q, (snapshot) => {
      const announcements = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(announcements);
    });
  },
};

export default announcementService;

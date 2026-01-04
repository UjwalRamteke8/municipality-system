import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase/firebaseconfig";

const complaintService = {
  async createComplaint(data, userId, imageFile = null) {
    try {
      let imageUrl = null;

      // Upload image if provided
      if (imageFile) {
        const storageRef = ref(
          storage,
          `complaints/${userId}/${Date.now()}_${imageFile.name}`
        );
        await uploadBytes(storageRef, imageFile);
        imageUrl = await getDownloadURL(storageRef);
      }

      // Create complaint document
      const complaintData = {
        title: data.title,
        category: data.category,
        description: data.description,
        location: data.location || {},
        imageUrl,
        userId,
        status: "pending",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const docRef = await addDoc(collection(db, "complaints"), complaintData);

      return { id: docRef.id, ...complaintData };
    } catch (error) {
      console.error("Create complaint error:", error);
      throw error;
    }
  },

  async getComplaintsByUser(userId) {
    try {
      const q = query(
        collection(db, "complaints"),
        where("userId", "==", userId),
        orderBy("createdAt", "desc")
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error("Get complaints by user error:", error);
      throw error;
    }
  },

  async getAllComplaints(limit = 50) {
    try {
      const q = query(
        collection(db, "complaints"),
        orderBy("createdAt", "desc")
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error("Get all complaints error:", error);
      throw error;
    }
  },

  async updateComplaintStatus(complaintId, status, remark = "") {
    try {
      const complaintRef = doc(db, "complaints", complaintId);
      await updateDoc(complaintRef, {
        status,
        remark: remark || "",
        updatedAt: new Date().toISOString(),
      });
      return { id: complaintId, status, remark };
    } catch (error) {
      console.error("Update complaint status error:", error);
      throw error;
    }
  },
  async uploadComplaint({ user, file, description, location }) {
    // Upload photo to storage
    const storageRef = ref(
      storage,
      `complaints/${user.uid}/${Date.now()}-${file.name}`
    );
    await uploadBytes(storageRef, file);
    const imageUrl = await getDownloadURL(storageRef);

    // Save complaint data in Firestore
    await addDoc(collection(db, "complaints"), {
      uid: user.uid,
      fullName: user.fullName,
      description,
      imageUrl,
      status: "Pending",
      latitude: location?.lat,
      longitude: location?.lng,
      createdAt: serverTimestamp(),
    });
  },

  onComplaintsChange(userId, callback) {
    const q = query(
      collection(db, "complaints"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );

    return onSnapshot(q, (snapshot) => {
      const complaints = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(complaints);
    });
  },
};

export default complaintService;

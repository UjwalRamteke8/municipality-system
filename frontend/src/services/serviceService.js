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

const serviceService = {
  async createServiceRequest(data, userId, attachments = []) {
    try {
      const attachmentUrls = [];

      // Upload attachments if provided
      for (const file of attachments) {
        const storageRef = ref(
          storage,
          `services/${userId}/${Date.now()}_${file.name}`
        );
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        attachmentUrls.push(url);
      }

      // Create service request document
      const serviceData = {
        serviceType: data.serviceType,
        description: data.description,
        address: data.address,
        attachmentUrls,
        paymentRequired: data.paymentRequired || false,
        userId,
        status: "pending",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const docRef = await addDoc(
        collection(db, "serviceRequests"),
        serviceData
      );

      return { id: docRef.id, ...serviceData };
    } catch (error) {
      console.error("Create service request error:", error);
      throw error;
    }
  },

  async getServiceRequestsByUser(userId) {
    try {
      const q = query(
        collection(db, "serviceRequests"),
        where("userId", "==", userId),
        orderBy("createdAt", "desc")
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error("Get service requests by user error:", error);
      throw error;
    }
  },

  async getAllServiceRequests() {
    try {
      const q = query(
        collection(db, "serviceRequests"),
        orderBy("createdAt", "desc")
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error("Get all service requests error:", error);
      throw error;
    }
  },

  async updateServiceStatus(serviceId, status, remark = "") {
    try {
      const serviceRef = doc(db, "serviceRequests", serviceId);
      await updateDoc(serviceRef, {
        status,
        remark: remark || "",
        updatedAt: new Date().toISOString(),
      });
      return { id: serviceId, status, remark };
    } catch (error) {
      console.error("Update service status error:", error);
      throw error;
    }
  },

  onServiceRequestsChange(userId, callback) {
    const q = query(
      collection(db, "serviceRequests"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );

    return onSnapshot(q, (snapshot) => {
      const services = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(services);
    });
  },
};

export default serviceService;

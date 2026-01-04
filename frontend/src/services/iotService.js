import {
  ref,
  onValue,
  query,
  orderByChild,
  limitToLast,
  get,
  child,
} from "firebase/database";
import { rtdb } from "../firebase/firebaseconfig";

const iotService = {
  /**
   * Get all sensor data (one-time fetch)
   */
  async getSensors(limit = 50) {
    try {
      const sensorsRef = query(
        ref(rtdb, "sensors/live"),
        orderByChild("timestamp"),
        limitToLast(limit)
      );

      return new Promise((resolve, reject) => {
        onValue(
          sensorsRef,
          (snapshot) => {
            if (snapshot.exists()) {
              const sensors = [];
              snapshot.forEach((childSnapshot) => {
                sensors.push({
                  id: childSnapshot.key,
                  ...childSnapshot.val(),
                });
              });
              // Sort by timestamp (oldest to newest)
              sensors.sort(
                (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
              );
              resolve(sensors);
            } else {
              resolve([]);
            }
          },
          reject,
          { onlyOnce: true }
        );
      });
    } catch (error) {
      console.error("Get sensors error:", error);
      throw error;
    }
  },

  /**
   * Get sensor data by sensor ID (one-time fetch)
   */
  async getSensorById(sensorId, limit = 50) {
    try {
      const sensorRef = query(
        ref(rtdb, `sensors/live/${sensorId}`),
        orderByChild("timestamp"),
        limitToLast(limit)
      );

      return new Promise((resolve, reject) => {
        onValue(
          sensorRef,
          (snapshot) => {
            if (snapshot.exists()) {
              const data = [];
              snapshot.forEach((childSnapshot) => {
                data.push({
                  id: childSnapshot.key,
                  ...childSnapshot.val(),
                });
              });
              // Sort by timestamp (oldest to newest)
              data.sort(
                (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
              );
              resolve(data);
            } else {
              resolve([]);
            }
          },
          reject,
          { onlyOnce: true }
        );
      });
    } catch (error) {
      console.error("Get sensor by ID error:", error);
      throw error;
    }
  },

  /**
   * Listen for real-time sensor data updates
   */
  onSensorDataChange(sensorId, callback) {
    try {
      let sensorRef;

      if (sensorId) {
        sensorRef = ref(rtdb, `sensors/live/${sensorId}`);
      } else {
        sensorRef = ref(rtdb, "sensors/live");
      }

      const unsubscribe = onValue(sensorRef, (snapshot) => {
        if (snapshot.exists()) {
          if (sensorId) {
            // Single sensor - snapshot.val() is the data
            const data = snapshot.val();
            if (Array.isArray(data)) {
              callback(data);
            } else {
              callback([
                {
                  id: sensorId,
                  ...data,
                },
              ]);
            }
          } else {
            // All sensors
            const sensors = [];
            snapshot.forEach((childSnapshot) => {
              sensors.push({
                id: childSnapshot.key,
                ...childSnapshot.val(),
              });
            });
            // Sort by timestamp
            sensors.sort(
              (a, b) => new Date(a.timestamp || 0) - new Date(b.timestamp || 0)
            );
            callback(sensors);
          }
        } else {
          callback([]);
        }
      });

      return unsubscribe;
    } catch (error) {
      console.error("On sensor data change error:", error);
      throw error;
    }
  },

  /**
   * Get latest sensor reading
   */
  async getLatestSensorData(sensorId) {
    try {
      const snapshot = await get(child(ref(rtdb), `sensors/live/${sensorId}`));
      if (snapshot.exists()) {
        return {
          id: sensorId,
          ...snapshot.val(),
        };
      } else {
        return null;
      }
    } catch (error) {
      console.error("Get latest sensor data error:", error);
      throw error;
    }
  },
};

export default iotService;

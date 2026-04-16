import { useState, useEffect } from "react";
import ComplaintForm from "../../components/features/complaints/ComplaintForm";
import ComplaintList from "../../components/features/complaints/ComplaintList";
import api from "../../services/api"; // Added the API import!

export default function ComplaintsPage() {
  const [complaints, setComplaints] = useState([]);

  // Fetch the user's real complaints from the database when the page loads
  useEffect(() => {
    const fetchMyComplaints = async () => {
      try {
        const { data } = await api.get("/complaints");
        if (data.complaints) {
          setComplaints(data.complaints);
        }
      } catch (error) {
        console.error("Failed to load complaints:", error);
      }
    };
    fetchMyComplaints();
  }, []);

  const handleSubmit = async (formData) => {
    try {
      // 1. Send the data to your real backend
      const { data } = await api.post("/complaints", formData);

      // 2. Add the real, newly created complaint (with its MongoDB _id) to the screen
      setComplaints([data.complaint, ...complaints]);

      // Optional: Add a success alert here if you want!
      console.log("Successfully saved to database!");
    } catch (error) {
      console.error("Error submitting complaint:", error);
      alert("Failed to submit the complaint. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Complaints</h1>
        <div className="grid md:grid-cols-2 gap-6">
          <ComplaintForm onSubmit={handleSubmit} />
          <div>
            <h2 className="text-xl font-semibold mb-4">Your Complaints</h2>
            <ComplaintList complaints={complaints} />
          </div>
        </div>
      </div>
    </div>
  );
}

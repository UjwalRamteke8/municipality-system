import { useState } from "react";
import ComplaintForm from "../../components/features/complaints/ComplaintForm";
import ComplaintList from "../../components/features/complaints/ComplaintList";

export default function ComplaintsPage() {
  const [complaints, setComplaints] = useState([]);

  const handleSubmit = (formData) => {
    // Here you would typically send to API
    const newComplaint = {
      id: Date.now(),
      ...formData,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    setComplaints([...complaints, newComplaint]);
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

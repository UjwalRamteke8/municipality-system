import { Clock, MapPin, CheckCircle, XCircle, AlertCircle } from "lucide-react";

export default function ComplaintList({ complaints = [] }) {
  // Mock Data for visualization if empty
  const displayData = complaints.length
    ? complaints
    : [
        {
          _id: "PMC-2024-001",
          title: "Broken Street Light",
          status: "Pending",
          category: "Electricity",
          createdAt: new Date(),
          description: "Street light pole #44 is not working since 3 days.",
        },
        {
          _id: "PMC-2024-002",
          title: "Pothole on Main Road",
          status: "Resolved",
          category: "Road",
          createdAt: new Date(Date.now() - 86400000),
          description: "Large pothole causing traffic jam.",
          image:
            "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=400",
        },
      ];

  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case "resolved":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold border border-green-200">
            <CheckCircle className="w-3 h-3" /> Resolved
          </span>
        );
      case "rejected":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold border border-red-200">
            <XCircle className="w-3 h-3" /> Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-bold border border-yellow-200">
            <Clock className="w-3 h-3" /> Pending
          </span>
        );
    }
  };

  if (!displayData.length)
    return (
      <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-300">
        <AlertCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
        <p className="text-slate-500 font-medium">
          No complaints registered yet.
        </p>
      </div>
    );

  return (
    <div className="space-y-4 mt-6">
      <h3 className="text-lg font-bold text-slate-800 border-b pb-2 mb-4">
        Recent Complaints
      </h3>
      {displayData.map((c) => (
        <div
          key={c._id || c.id}
          className="bg-white hover:bg-slate-50 transition-colors p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-5"
        >
          {c.image ? (
            <img
              src={c.image}
              alt="Evidence"
              className="w-full sm:w-32 h-32 object-cover rounded-lg border border-slate-200"
            />
          ) : (
            <div className="w-full sm:w-32 h-32 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 border border-slate-200">
              <span className="text-xs">No Image</span>
            </div>
          )}

          <div className="flex-grow">
            <div className="flex justify-between items-start mb-2">
              <div>
                <span className="text-xs font-mono text-slate-400 block mb-1">
                  #{c._id}
                </span>
                <h3 className="text-lg font-bold text-slate-800 leading-tight">
                  {c.title}
                </h3>
              </div>
              {getStatusBadge(c.status)}
            </div>

            <p className="text-slate-600 text-sm mb-3 line-clamp-2">
              {c.description}
            </p>

            <div className="flex items-center gap-4 text-xs text-slate-500 font-medium border-t border-slate-100 pt-3">
              <span className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded">
                <AlertCircle className="w-3 h-3" /> {c.category}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />{" "}
                {new Date(c.createdAt).toLocaleDateString()}
              </span>
              {c.location && (
                <span className="flex items-center gap-1 text-[#9f1239]">
                  <MapPin className="w-3 h-3" /> Location Tagged
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

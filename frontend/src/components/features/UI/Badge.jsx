export default function Badge({ variant = "pending", children }) {
  const colors = {
    pending: "bg-yellow-500",
    "in-progress": "bg-blue-500",
    completed: "bg-green-600",
    rejected: "bg-red-600",
  };

  return (
    <span
      className={`px-3 py-1 text-white text-sm rounded-full ${colors[variant]}`}
    >
      {children}
    </span>
  );
}

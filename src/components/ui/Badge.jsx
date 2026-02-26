const colors = {
  pending:   "bg-yellow-100 text-yellow-800",
  accepted:  "bg-blue-100 text-blue-800",
  pickedUp:  "bg-purple-100 text-purple-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const labels = {
  pending:   "Pending",
  accepted:  "Accepted",
  pickedUp:  "Picked Up",
  completed: "Completed",
  cancelled: "Cancelled",
};

const Badge = ({ status }) => (
  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${colors[status] || "bg-gray-100 text-gray-700"}`}>
    {labels[status] || status}
  </span>
);

export default Badge;

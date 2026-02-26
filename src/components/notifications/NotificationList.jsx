import useNotifications from "../../hooks/useNotifications";

const timeAgo = (iso) => {
  const diff = Math.floor((Date.now() - new Date(iso)) / 1000);
  if (diff < 60)    return `${diff}s ago`;
  if (diff < 3600)  return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
};

const NotificationList = ({ onClose }) => {
  const { list, markAll, markOne } = useNotifications();

  return (
    <div className="absolute right-0 top-10 w-80 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
      <div className="flex justify-between items-center px-4 py-3 border-b">
        <span className="font-semibold text-gray-800 text-sm">Notifications</span>
        <button onClick={markAll} className="text-xs text-primary hover:underline">
          Mark all read
        </button>
      </div>
      <ul className="max-h-72 overflow-y-auto divide-y divide-gray-50">
        {list.length === 0 && (
          <li className="px-4 py-6 text-center text-sm text-gray-400">Nothing here</li>
        )}
        {list.map((n) => (
          <li
            key={n._id}
            onClick={() => { markOne(n._id); onClose(); }}
            className={`px-4 py-3 cursor-pointer hover:bg-gray-50 ${!n.isRead ? "bg-green-50" : ""}`}
          >
            <p className="text-sm text-gray-700">{n.message}</p>
            <p className="text-xs text-gray-400 mt-0.5">{timeAgo(n.createdAt)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationList;

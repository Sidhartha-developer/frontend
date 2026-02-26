import { useEffect }         from "react";
import UserLayout            from "../../components/layout/UserLayout";
import Button                from "../../components/ui/Button";
import useNotifications      from "../../hooks/useNotifications";

const timeAgo = (iso) => {
  const diff = Math.floor((Date.now() - new Date(iso)) / 1000);
  if (diff < 60)    return `${diff}s ago`;
  if (diff < 3600)  return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
};

const UserNotifications = () => {
  const { list, unreadCount, markAll } = useNotifications();

  return (
    <UserLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Notifications</h1>
          {unreadCount > 0 && <p className="text-sm text-gray-500">{unreadCount} unread</p>}
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" onClick={markAll}>Mark all read</Button>
        )}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {list.length === 0 ? (
          <div className="py-16 text-center text-gray-400">No notifications yet.</div>
        ) : (
          <ul className="divide-y divide-gray-50">
            {list.map((n) => (
              <li key={n._id} className={`px-5 py-4 ${!n.isRead ? "bg-green-50" : ""}`}>
                <p className="text-sm text-gray-800">{n.message}</p>
                <p className="text-xs text-gray-400 mt-1">{timeAgo(n.createdAt)}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </UserLayout>
  );
};

export default UserNotifications;

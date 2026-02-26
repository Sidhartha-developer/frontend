import { useState }       from "react";
import useNotifications   from "../../hooks/useNotifications";
import NotificationList   from "./NotificationList";

const NotificationBell = () => {
  const [open, setOpen]  = useState(false);
  const { unreadCount }  = useNotifications();

  return (
    <div className="relative z-[1100]">
      <button
        onClick={() => setOpen((p) => !p)}
        className="relative p-2 text-gray-600 hover:text-primary"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>
      {open && <NotificationList onClose={() => setOpen(false)} />}
    </div>
  );
};

export default NotificationBell;

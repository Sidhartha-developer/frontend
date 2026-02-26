import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNotifications, markAllRead, markOneRead } from "../store/notificationSlice";
import { getNotificationsApi, markAllReadApi, markOneReadApi } from "../api/notification.api";

const useNotifications = () => {
  const dispatch = useDispatch();
  const { list, unreadCount }   = useSelector((s) => s.notifications);
  const { isAuthenticated }     = useSelector((s) => s.auth);

  const fetch = async () => {
    try {
      const res = await getNotificationsApi();
      dispatch(setNotifications(res.data));
    } catch {
      // fail silently — notifications aren't critical
    }
  };

  useEffect(() => {
    if (!isAuthenticated) return;
    fetch();
    const timer = setInterval(fetch, 30000);
    return () => clearInterval(timer);
  }, [isAuthenticated]);

  const markAll = async () => {
    try {
      await markAllReadApi();
      dispatch(markAllRead());
    } catch (err) {
      console.error("Failed to mark all read:", err.message);
    }
  };

  const markOne = async (id) => {
    try {
      await markOneReadApi(id);
      dispatch(markOneRead(id));
    } catch (err) {
      console.error("Failed to mark notification read:", err.message);
    }
  };

  return { list, unreadCount, markAll, markOne };
};

export default useNotifications;

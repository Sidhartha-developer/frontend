import instance from "./axiosInstance";

// GET /notifications  — returns last 50, with unreadCount
export const getNotificationsApi = async () => {
  try {
    console.log("➡️ Fetching notifications...");

    const res = await instance.get("/notifications");

    console.log("✅ Notifications loaded, unread:", res.data?.data?.unreadCount);
    return res.data;
  } catch (error) {
    console.error("❌ Fetch notifications failed:", error.response?.data || error.message);
    throw error;
  }
};

// PATCH /notifications/read-all
export const markAllReadApi = async () => {
  try {
    console.log("➡️ Marking all notifications read...");

    const res = await instance.patch("/notifications/read-all");

    console.log("✅ All notifications marked read");
    return res.data;
  } catch (error) {
    console.error("❌ Mark all read failed:", error.response?.data || error.message);
    throw error;
  }
};

// PATCH /notifications/:id/read
export const markOneReadApi = async (id) => {
  try {
    console.log("➡️ Marking notification read:", id);

    const res = await instance.patch(`/notifications/${id}/read`);

    console.log("✅ Notification marked read");
    return res.data;
  } catch (error) {
    console.error("❌ Mark one read failed:", error.response?.data || error.message);
    throw error;
  }
};

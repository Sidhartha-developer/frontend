import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    list:        [],
    unreadCount: 0,
  },
  reducers: {
    setNotifications(state, action) {
      state.list        = action.payload.notifications;
      state.unreadCount = action.payload.unreadCount;
    },
    markAllRead(state) {
      state.list        = state.list.map((n) => ({ ...n, isRead: true }));
      state.unreadCount = 0;
    },
    markOneRead(state, action) {
      const n = state.list.find((n) => n._id === action.payload);
      if (n && !n.isRead) {
        n.isRead          = true;
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
    },
    clearNotifications(state) {
      state.list        = [];
      state.unreadCount = 0;
    },
  },
});

export const { setNotifications, markAllRead, markOneRead, clearNotifications } =
  notificationSlice.actions;

export default notificationSlice.reducer;

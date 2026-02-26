import { configureStore } from "@reduxjs/toolkit";
import authReducer         from "./authSlice";
import requestReducer      from "./requestSlice";
import categoryReducer     from "./categorySlice";
import notificationReducer from "./notificationSlice";

const store = configureStore({
  reducer: {
    auth:          authReducer,
    requests:      requestReducer,
    categories:    categoryReducer,
    notifications: notificationReducer,
  },
  devTools: import.meta.env.DEV,
});

export default store;

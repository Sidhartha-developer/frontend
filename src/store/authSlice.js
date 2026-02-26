import { createSlice } from "@reduxjs/toolkit";

// restore session if user refreshes page
const token = localStorage.getItem("token");
const user  = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user,
    token,
    role:            user?.role || null,
    isAuthenticated: !!token,
    loading:         false,
    error:           null,
  },
  reducers: {
    setLoading(state) {
      state.loading = true;
      state.error   = null;
    },
    // called after successful login or register
    setCredentials(state, action) {
      const { user, token } = action.payload;
      state.user            = user;
      state.token           = token;
      state.role            = user.role;
      state.isAuthenticated = true;
      state.loading         = false;
      state.error           = null;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    },
    setError(state, action) {
      state.loading = false;
      state.error   = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
    logout(state) {
      state.user            = null;
      state.token           = null;
      state.role            = null;
      state.isAuthenticated = false;
      state.loading         = false;
      state.error           = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const { setLoading, setCredentials, setError, clearError, logout } = authSlice.actions;
export default authSlice.reducer;

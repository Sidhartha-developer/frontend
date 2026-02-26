import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    list:    [],
    loading: false,
    error:   null,
  },
  reducers: {
    setLoading(state) {
      state.loading = true;
      state.error   = null;
    },
    setCategories(state, action) {
      state.list    = action.payload;
      state.loading = false;
    },
    addCategory(state, action) {
      state.list.push(action.payload);
    },
    updateCategory(state, action) {
      const i = state.list.findIndex((c) => c._id === action.payload._id);
      if (i !== -1) state.list[i] = action.payload;
    },
    // soft delete — backend sets isActive: false, we just remove from local list
    removeCategory(state, action) {
      state.list = state.list.filter((c) => c._id !== action.payload);
    },
    setError(state, action) {
      state.loading = false;
      state.error   = action.payload;
    },
  },
});

export const { setLoading, setCategories, addCategory, updateCategory, removeCategory, setError } =
  categorySlice.actions;

export default categorySlice.reducer;

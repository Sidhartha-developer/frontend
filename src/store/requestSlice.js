import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "requests",
  initialState: {
    list:     [],
    selected: null,
    total:    0,
    loading:  false,
    error:    null,
  },
  reducers: {
    setLoading(state) {
      state.loading = true;
      state.error   = null;
    },
    setRequests(state, action) {
      state.list    = action.payload.requests;
      state.total   = action.payload.total ?? action.payload.requests.length;
      state.loading = false;
    },
    setSelected(state, action) {
      state.selected = action.payload;
      state.loading  = false;
    },
    clearSelected(state) {
      state.selected = null;
    },
    // prepend new request to list (after create)
    prependRequest(state, action) {
      state.list.unshift(action.payload);
    },
    // update status in list + selected if same id
    patchStatus(state, action) {
      const { id, status } = action.payload;
      const req = state.list.find((r) => r._id === id);
      if (req) req.status = status;
      if (state.selected?._id === id) state.selected.status = status;
    },
    setError(state, action) {
      state.loading = false;
      state.error   = action.payload;
    },
  },
});

export const {
  setLoading,
  setRequests,
  setSelected,
  clearSelected,
  prependRequest,
  patchStatus,
  setError,
} = requestSlice.actions;

export default requestSlice.reducer;

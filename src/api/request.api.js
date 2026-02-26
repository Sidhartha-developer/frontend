import instance from "./axiosInstance";

// POST /requests  — user only, multipart/form-data with images[] (max 5)
// body: { categoryId, pickupAddress, lat?, lng?, description?, preferredDate?, estimatedWeight? }
export const createRequestApi = async (formData) => {
  try {
    console.log("➡️ Creating scrap request...");

    const res = await instance.post("/requests", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    console.log("✅ Request created:", res.data?.data?.request?._id);
    return res.data;
  } catch (error) {
    console.error("❌ Create request failed:", error.response?.data || error.message);
    throw error;
  }
};

// GET /requests?status=&categoryId=&page=&limit=  — admin only
export const getAllRequestsApi = async (params = {}) => {
  try {
    console.log("➡️ Fetching all requests (admin)...");
    console.log("Params:", params);

    const res = await instance.get("/requests", { params });

    console.log("✅ Requests fetched:", res.data?.data?.total, "total");
    return res.data;
  } catch (error) {
    console.error("❌ Fetch all requests failed:", error.response?.data || error.message);
    throw error;
  }
};

// GET /requests/my?status=  — user only
export const getMyRequestsApi = async (params = {}) => {
  try {
    console.log("➡️ Fetching my requests...");

    const res = await instance.get("/requests/my", { params });

    console.log("✅ My requests:", res.data?.data?.requests?.length);
    return res.data;
  } catch (error) {
    console.error("❌ Fetch my requests failed:", error.response?.data || error.message);
    throw error;
  }
};

// GET /requests/vendor-feed?status=  — vendor only
// status can be single value ("pending") or comma-separated ("accepted,pickedUp")
export const getVendorFeedApi = async (params = {}) => {
  try {
    console.log("➡️ Fetching vendor feed...");

    const res = await instance.get("/requests/vendor-feed", { params });

    console.log("✅ Vendor feed loaded:", res.data?.data?.requests?.length, "requests");
    return res.data;
  } catch (error) {
    console.error("❌ Fetch vendor feed failed:", error.response?.data || error.message);
    throw error;
  }
};

// GET /requests/:id  — any authenticated user
export const getRequestByIdApi = async (id) => {
  try {
    console.log("➡️ Fetching request:", id);

    const res = await instance.get(`/requests/${id}`);

    console.log("✅ Request fetched, status:", res.data?.data?.request?.status);
    return res.data;
  } catch (error) {
    console.error("❌ Fetch request failed:", error.response?.data || error.message);
    throw error;
  }
};

// PATCH /requests/:id/accept  — vendor only, changes pending -> accepted
export const acceptRequestApi = async (id) => {
  try {
    console.log("➡️ Accepting request:", id);

    const res = await instance.patch(`/requests/${id}/accept`);

    console.log("✅ Request accepted");
    return res.data;
  } catch (error) {
    console.error("❌ Accept request failed:", error.response?.data || error.message);
    throw error;
  }
};

// PATCH /requests/:id/reject  — vendor only, returns accepted -> pending
export const rejectRequestApi = async (id) => {
  try {
    console.log("➡️ Rejecting request:", id);

    const res = await instance.patch(`/requests/${id}/reject`);

    console.log("✅ Request returned to pending");
    return res.data;
  } catch (error) {
    console.error("❌ Reject request failed:", error.response?.data || error.message);
    throw error;
  }
};

// PATCH /requests/:id/status  — vendor only, body: { status: "pickedUp"|"completed" }
export const updateRequestStatusApi = async (id, status) => {
  try {
    console.log("➡️ Updating request status:", id, "→", status);

    const res = await instance.patch(`/requests/${id}/status`, { status });

    console.log("✅ Status updated to:", status);
    return res.data;
  } catch (error) {
    console.error("❌ Update status failed:", error.response?.data || error.message);
    throw error;
  }
};

// PATCH /requests/:id/cancel  — user only, only works on pending requests
export const cancelRequestApi = async (id) => {
  try {
    console.log("➡️ Cancelling request:", id);

    const res = await instance.patch(`/requests/${id}/cancel`);

    console.log("✅ Request cancelled");
    return res.data;
  } catch (error) {
    console.error("❌ Cancel request failed:", error.response?.data || error.message);
    throw error;
  }
};

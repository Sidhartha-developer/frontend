import instance from "./axiosInstance";

// GET /vendors/nearby?lat=&lng=
export const getNearbyVendors = async (lat, lng) => {
  try {
    console.log("➡️ Fetching nearby vendors...");
    const res = await instance.get("/vendors/nearby", {
      params: { lat, lng },
    });
    console.log("✅ Nearby vendors fetched:", res.data?.data?.vendors?.length || 0);
    return res.data;
  } catch (error) {
    console.error("❌ Fetch nearby vendors failed:", error.response?.data || error.message);
    throw error;
  }
};

// GET /vendors?approvalStatus=&status=&search=&page=&limit=
export const getAllVendorsApi = async (params = {}) => {
  try {
    console.log("➡️ Fetching vendors...");
    console.log("Params:", params);

    const res = await instance.get("/vendors", { params });

    console.log("✅ Vendors fetched:", res.data?.data?.total, "total");
    return res.data;
  } catch (error) {
    console.error("❌ Fetch vendors failed:", error.response?.data || error.message);
    throw error;
  }
};

// GET /vendors/:id
export const getVendorByIdApi = async (id) => {
  try {
    console.log("➡️ Fetching vendor:", id);

    const res = await instance.get(`/vendors/${id}`);

    console.log("✅ Vendor fetched:", res.data?.data?.vendor?.name);
    return res.data;
  } catch (error) {
    console.error("❌ Fetch vendor failed:", error.response?.data || error.message);
    throw error;
  }
};

// GET /vendors/me  — vendor only (from JWT token)
export const getMyVendorProfileApi = async () => {
  try {
    console.log("➡️ Fetching my vendor profile...");

    const res = await instance.get("/vendors/me");

    console.log("✅ My vendor profile fetched:", res.data?.data?.vendor?.name);
    return res.data;
  } catch (error) {
    console.error("❌ Fetch my profile failed:", error.response?.data || error.message);
    throw error;
  }
};

// PATCH /vendors/:id/approve  — admin only
export const approveVendorApi = async (id) => {
  try {
    console.log("➡️ Approving vendor:", id);

    const res = await instance.patch(`/vendors/${id}/approve`);

    console.log("✅ Vendor approved");
    return res.data;
  } catch (error) {
    console.error("❌ Approve vendor failed:", error.response?.data || error.message);
    throw error;
  }
};

// PATCH /vendors/:id/reject  — admin only
export const rejectVendorApi = async (id) => {
  try {
    console.log("➡️ Rejecting vendor:", id);

    const res = await instance.patch(`/vendors/${id}/reject`);

    console.log("✅ Vendor rejected");
    return res.data;
  } catch (error) {
    console.error("❌ Reject vendor failed:", error.response?.data || error.message);
    throw error;
  }
};

// PATCH /vendors/:id/block  — admin only, toggles active <-> blocked
export const blockVendorApi = async (id) => {
  try {
    console.log("➡️ Toggling block for vendor:", id);

    const res = await instance.patch(`/vendors/${id}/block`);

    console.log("✅ Vendor status now:", res.data?.data?.status);
    return res.data;
  } catch (error) {
    console.error("❌ Block vendor failed:", error.response?.data || error.message);
    throw error;
  }
};

// PATCH /vendors/:id  — vendor self-update: { name?, phone?, address?, lat?, lng? }
export const updateVendorApi = async (id, payload) => {
  try {
    console.log("➡️ Updating vendor profile:", id);
    console.log("Payload:", payload);

    const res = await instance.patch(`/vendors/${id}`, payload);

    console.log("✅ Vendor profile updated");
    return res.data;
  } catch (error) {
    console.error("❌ Update vendor failed:", error.response?.data || error.message);
    throw error;
  }
};

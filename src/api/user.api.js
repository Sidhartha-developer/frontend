import instance from "./axiosInstance";

// GET /users?status=&search=&page=&limit=
export const getAllUsersApi = async (params = {}) => {
  try {
    console.log("➡️ Fetching users...");
    console.log("Params:", params);

    const res = await instance.get("/users", { params });

    console.log("✅ Users fetched:", res.data?.data?.total, "total");
    return res.data;
  } catch (error) {
    console.error("❌ Fetch users failed:", error.response?.data || error.message);
    throw error;
  }
};

// GET /users/:id
export const getUserByIdApi = async (id) => {
  try {
    console.log("➡️ Fetching user:", id);

    const res = await instance.get(`/users/${id}`);

    console.log("✅ User fetched:", res.data?.data?.user?.name);
    return res.data;
  } catch (error) {
    console.error("❌ Fetch user failed:", error.response?.data || error.message);
    throw error;
  }
};

// GET /users/me  — user only (from JWT token)
export const getMyUserProfileApi = async () => {
  try {
    console.log("➡️ Fetching my user profile...");

    const res = await instance.get("/users/me");

    console.log("✅ My user profile fetched:", res.data?.data?.user?.name);
    return res.data;
  } catch (error) {
    console.error("❌ Fetch my profile failed:", error.response?.data || error.message);
    throw error;
  }
};

// PATCH /users/:id  — body: { name?, phone?, address? }
export const updateUserApi = async (id, payload) => {
  try {
    console.log("➡️ Updating user:", id);
    console.log("Payload:", payload);

    const res = await instance.patch(`/users/${id}`, payload);

    console.log("✅ User updated");
    return res.data;
  } catch (error) {
    console.error("❌ Update user failed:", error.response?.data || error.message);
    throw error;
  }
};

// PATCH /users/me  — user only (from JWT token), body: { name?, phone?, address? }
export const updateMyUserProfileApi = async (payload) => {
  try {
    console.log("➡️ Updating my profile...");
    console.log("Payload:", payload);

    const res = await instance.patch("/users/me", payload);

    console.log("✅ My profile updated");
    return res.data;
  } catch (error) {
    console.error("❌ Update my profile failed:", error.response?.data || error.message);
    throw error;
  }
};

// PATCH /users/:id/block  — toggles active <-> blocked
export const blockUserApi = async (id) => {
  try {
    console.log("➡️ Toggling block status for user:", id);

    const res = await instance.patch(`/users/${id}/block`);

    console.log("✅ User status now:", res.data?.data?.status);
    return res.data;
  } catch (error) {
    console.error("❌ Block user failed:", error.response?.data || error.message);
    throw error;
  }
};

// DELETE /users/:id
export const deleteUserApi = async (id) => {
  try {
    console.log("➡️ Deleting user:", id);

    const res = await instance.delete(`/users/${id}`);

    console.log("✅ User deleted");
    return res.data;
  } catch (error) {
    console.error("❌ Delete user failed:", error.response?.data || error.message);
    throw error;
  }
};

import instance from "./axiosInstance";

// GET /admin/dashboard  — returns counts: totalUsers, totalVendors, pendingVendors, totalRequests, pendingRequests, completedRequests, totalCategories
export const getDashboardStatsApi = async () => {
  try {
    console.log("➡️ Fetching dashboard stats...");

    const res = await instance.get("/admin/dashboard");

    console.log("✅ Stats loaded:", res.data?.data);
    return res.data;
  } catch (error) {
    console.error("❌ Fetch stats failed:", error.response?.data || error.message);
    throw error;
  }
};

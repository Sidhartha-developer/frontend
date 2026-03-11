import api from "./axiosInstance";

export const getPlans = async () => {
  try {
    console.log("➡️ Fetching vendor plans...");

    const res = await api.get("/payment/plans");

    console.log("✅ Plans fetched:", res.data?.data?.plans?.length || 0);
    return res.data;
  } catch (error) {
    console.error("❌ Fetch plans failed:", error.response?.data || error.message);
    throw error;
  }
};

export const createOrder = async (data) => {
  try {
    console.log("➡️ Creating payment order...");
    console.log("Payload:", data);

    const res = await api.post("/payment/create-order", data);

    console.log("✅ Order created:", res.data?.data?.order?.id);
    return res.data;
  } catch (error) {
    console.error("❌ Create order failed:", error.response?.data || error.message);
    throw error;
  }
};

export const verifyPayment = async (data) => {
  try {
    console.log("➡️ Verifying payment...");
    console.log("Payload:", data);

    const res = await api.post("/payment/verify-payment", data);

    console.log("✅ Payment verified:", res.data?.data?.subscription?.paymentId);
    return res.data;
  } catch (error) {
    console.error("❌ Verify payment failed:", error.response?.data || error.message);
    throw error;
  }
};

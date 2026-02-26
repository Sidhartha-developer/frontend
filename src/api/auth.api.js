import instance from "./axiosInstance";

// POST /auth/register
export const registerUserApi = async (payload) => {
  try {
    console.log("➡️ Registering user...");
    console.log("Payload:", payload);

    const res = await instance.post("/auth/register", payload);

    console.log("✅ User registered:", res.data?.data?.user?.email);
    return res.data;
  } catch (error) {
    console.error("❌ Register failed:", error.response?.data || error.message);
    throw error;
  }
};

// POST /auth/login  — body: { email, password, role: "user"|"vendor"|"admin" }
export const loginApi = async (payload) => {
  try {
    console.log("➡️ Logging in as:", payload.role);

    const res = await instance.post("/auth/login", payload);

    console.log("✅ Login success, role:", res.data?.data?.user?.role);
    return res.data;
  } catch (error) {
    console.error("❌ Login failed:", error.response?.data || error.message);
    throw error;
  }
};

// POST /auth/vendor/register  — multipart/form-data with idProof file
export const registerVendorApi = async (formData) => {
  try {
    console.log("➡️ Submitting vendor registration...");

    const res = await instance.post("/auth/vendor/register", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    console.log("✅ Vendor registration submitted, awaiting approval");
    return res.data;
  } catch (error) {
    console.error("❌ Vendor register failed:", error.response?.data || error.message);
    throw error;
  }
};

// POST /auth/forgot-password  — body: { email, role? }
export const forgotPasswordApi = async (payload) => {
  try {
    console.log("➡️ Requesting password reset...");

    const res = await instance.post("/auth/forgot-password", payload);

    console.log("✅ Reset email sent (if email exists)");
    return res.data;
  } catch (error) {
    console.error("❌ Forgot password failed:", error.response?.data || error.message);
    throw error;
  }
};

// POST /auth/reset-password/:token  — body: { password }
export const resetPasswordApi = async (token, payload) => {
  try {
    console.log("➡️ Resetting password...");

    const res = await instance.post(`/auth/reset-password/${token}`, payload);

    console.log("✅ Password reset successful");
    return res.data;
  } catch (error) {
    console.error("❌ Reset password failed:", error.response?.data || error.message);
    throw error;
  }
};

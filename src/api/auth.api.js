import instance from "./axiosInstance";

export const registerUserApi = async (payload) => {
  const res = await instance.post("/auth/register", payload);
  return res.data;
};

export const loginApi = async (payload) => {
  const res = await instance.post("/auth/login", payload);
  return res.data;
};

export const registerVendorApi = async (formData) => {
  const res = await instance.post("/auth/vendor/register", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const forgotPasswordApi = async (payload) => {
  const res = await instance.post("/auth/forgot-password", payload);
  return res.data;
};

export const resetPasswordApi = async (token, payload) => {
  const res = await instance.post(`/auth/reset-password/${token}`, payload);
  return res.data;
};

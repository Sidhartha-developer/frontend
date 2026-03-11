import api from "./axiosInstance";

export const getPlans = async () => {
  const res = await api.get("/payment/plans");
  return res.data;
};

export const createOrder = async (data) => {
  const res = await api.post("/payment/create-order", data);
  return res.data;
};

export const verifyPayment = async (data) => {
  const res = await api.post("/payment/verify-payment", data);
  return res.data;
};

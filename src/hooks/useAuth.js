import { useDispatch, useSelector } from "react-redux";
import { useNavigate }              from "react-router-dom";
import { setLoading, setCredentials, setError, logout, clearError } from "../store/authSlice";
import { clearNotifications }                                        from "../store/notificationSlice";
import { loginApi, registerUserApi, registerVendorApi }             from "../api/auth.api";

const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token, role, isAuthenticated, loading, error } = useSelector((s) => s.auth);

  const login = async (payload) => {
    dispatch(setLoading());
    try {
      const res = await loginApi(payload);
      dispatch(setCredentials(res.data));

      const r = res.data.user.role;
      if (r === "admin")  navigate("/admin/dashboard",  { replace: true });
      if (r === "vendor") navigate("/vendor/dashboard", { replace: true });
      if (r === "user")   navigate("/user/dashboard",   { replace: true });

      return { success: true };
    } catch (err) {
      // show exactly what the backend sent — never silent
      const msg = err.response?.data?.message || "Login failed. Please try again.";
      dispatch(setError(msg));
      return { success: false, message: msg };
    }
  };

  const register = async (payload) => {
    dispatch(setLoading());
    try {
      const res = await registerUserApi(payload);
      dispatch(setCredentials(res.data));
      navigate("/user/dashboard", { replace: true });
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.message || "Registration failed.";
      dispatch(setError(msg));
      return { success: false, message: msg };
    }
  };

  const registerVendor = async (formData) => {
    dispatch(setLoading());
    try {
      await registerVendorApi(formData);
      dispatch(clearError());
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.message || "Vendor registration failed.";
      dispatch(setError(msg));
      return { success: false, message: msg };
    }
  };

  const logoutUser = () => {
    dispatch(logout());
    dispatch(clearNotifications());
    navigate("/login", { replace: true });
  };

  return { user, token, role, isAuthenticated, loading, error, login, register, registerVendor, logoutUser };
};

export default useAuth;
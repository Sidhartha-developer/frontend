import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { resetPasswordApi } from "../../api/auth.api";
import Navbar  from "../../components/layout/Navbar";
import Button  from "../../components/ui/Button";
import Alert   from "../../components/ui/Alert";

const ResetPasswordPage = () => {
  const { token }    = useParams();
  const navigate     = useNavigate();

  const [form, setForm]       = useState({ password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password.length < 6) {
      return setError("Password must be at least 6 characters");
    }

    if (form.password !== form.confirmPassword) {
      return setError("Passwords do not match");
    }

    setLoading(true);
    try {
      await resetPasswordApi(token, { password: form.password });
      setSuccess("Password reset successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2500);
    } catch (err) {
      setError(err.response?.data?.message || "Link is invalid or has expired");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 w-full max-w-md p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-1">Reset Password</h2>
          <p className="text-sm text-gray-500 mb-6">Enter your new password below</p>

          {error   && <div className="mb-4"><Alert type="error"   message={error}   onClose={() => setError("")}   /></div>}
          {success && <div className="mb-4"><Alert type="success" message={success} /></div>}

          {!success && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Min 6 characters"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Repeat your password"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <Button type="submit" loading={loading} className="w-full">
                Reset Password
              </Button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default ResetPasswordPage;
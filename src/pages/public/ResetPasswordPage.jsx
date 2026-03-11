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
  <div className="min-h-screen grid md:grid-cols-2">

    {/* LEFT PANEL */}
    <div className="hidden md:flex flex-col justify-between bg-gradient-to-b from-[#1f5f3b] to-[#0f2f1f] text-white p-12">

      <div>

        <div className="flex items-center gap-3 mb-12">
          <img src="/assets/logo.png" className="w-8 h-8" />
          <span className="font-heading text-3xl">ScrapZone</span>
        </div>

        <h2 className="font-heading text-4xl leading-snug mb-4">
          Create a New Password
        </h2>

        <p className="text-green-200 mb-10 max-w-md">
          Choose a strong password to secure your ScrapZone account and
          continue managing scrap pickups and vendor services.
        </p>

        <div className="space-y-4 text-green-200">

          <div className="flex gap-3">
            <span className="text-[#E5C447]">✔</span>
            Secure password reset process
          </div>

          <div className="flex gap-3">
            <span className="text-[#E5C447]">✔</span>
            Protect your vendor and user accounts
          </div>

          <div className="flex gap-3">
            <span className="text-[#E5C447]">✔</span>
            Continue managing pickups and requests
          </div>

        </div>

      </div>

      <p className="text-green-300 text-sm">
        © 2026 ScrapZone
      </p>

    </div>


    {/* RIGHT FORM PANEL */}
    <div className="bg-gray-50 flex items-center justify-center px-6 py-12">

      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-gray-100">

        <h2 className="font-heading text-3xl text-gray-800 mb-1">
          Reset Password
        </h2>

        <p className="text-gray-500 text-sm mb-6">
          Enter your new password below
        </p>

        {error && (
          <div className="mb-4">
            <Alert
              type="error"
              message={error}
              onClose={() => setError("")}
            />
          </div>
        )}

        {success && (
          <div className="mb-4">
            <Alert
              type="success"
              message={success}
            />
          </div>
        )}

        {!success && (
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* PASSWORD */}
            <div>

              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>

              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Minimum 6 characters"
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20"
              />

            </div>


            {/* CONFIRM PASSWORD */}
            <div>

              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>

              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Repeat password"
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20"
              />

            </div>


            {/* BUTTON */}
            <Button
              type="submit"
              loading={loading}
              className="w-full justify-center"
            >
              Reset Password
            </Button>

          </form>
        )}

      </div>
    </div>

  </div>
);
};

export default ResetPasswordPage;
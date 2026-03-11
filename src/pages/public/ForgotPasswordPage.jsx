import { useState } from "react";
import { Link }      from "react-router-dom";
import { forgotPasswordApi } from "../../api/auth.api";
import Navbar from "../../components/layout/Navbar";
import Button from "../../components/ui/Button";
import Alert  from "../../components/ui/Alert";

const ForgotPasswordPage = () => {
  const [email,   setEmail]   = useState("");
  const [role,    setRole]    = useState("user");
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");
  const [sent,    setSent]    = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return setError("Email is required");

    setLoading(true);
    try {
      await forgotPasswordApi({ email, role });
      setSent(true);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
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
          Reset Your Password
        </h2>

        <p className="text-green-200 mb-10 max-w-md">
          Enter your registered email address and we'll send you a secure link
          to reset your password.
        </p>

        <div className="space-y-4 text-green-200">

          <div className="flex gap-3">
            <span className="text-[#E5C447]">✔</span>
            Secure password reset
          </div>

          <div className="flex gap-3">
            <span className="text-[#E5C447]">✔</span>
            Instant reset email delivery
          </div>

          <div className="flex gap-3">
            <span className="text-[#E5C447]">✔</span>
            Works for users and vendors
          </div>

        </div>

      </div>

      <p className="text-green-300 text-sm">
        © 2026 ScrapZone
      </p>

    </div>


    {/* RIGHT PANEL */}
    <div className="bg-gray-50 flex items-center justify-center px-6 py-12">

      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-gray-100">

        <h2 className="font-heading text-3xl text-gray-800 mb-1">
          Forgot Password
        </h2>

        <p className="text-gray-500 text-sm mb-6">
          Enter your email and we'll send you a reset link
        </p>

        {sent ? (
          <Alert
            type="success"
            message="If that email exists, a reset link has been sent. Check your inbox."
          />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">

            {error && (
              <Alert
                type="error"
                message={error}
                onClose={() => setError("")}
              />
            )}

            {/* ROLE TABS */}
            <div className="flex gap-2">

              {["user", "vendor"].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium border transition ${
                    role === r
                      ? "bg-primary text-white border-primary"
                      : "text-gray-500 border-gray-200 hover:border-primary hover:text-primary"
                  }`}
                >
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </button>
              ))}

            </div>

            {/* EMAIL */}
            <div>

              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                placeholder="your@email.com"
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20"
              />

            </div>

            {/* BUTTON */}
            <Button
              type="submit"
              loading={loading}
              className="w-full justify-center"
            >
              Send Reset Link
            </Button>

            <p className="text-center text-sm text-gray-500">

              Remember your password?{" "}

              <Link
                to="/login"
                className="text-primary font-semibold hover:underline"
              >
                Back to Login
              </Link>

            </p>

          </form>
        )}

      </div>
    </div>

  </div>
);
};

export default ForgotPasswordPage;
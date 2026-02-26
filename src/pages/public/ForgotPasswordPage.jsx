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
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 w-full max-w-md p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-1">Forgot Password</h2>
          <p className="text-sm text-gray-500 mb-6">
            Enter your email and we'll send you a reset link
          </p>

          {sent ? (
            <Alert
              type="success"
              message="If that email exists, a reset link has been sent. Check your inbox."
            />
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <Alert type="error" message={error} onClose={() => setError("")} />}

              {/* role tabs */}
              <div className="flex gap-2 mb-2">
                {["user", "vendor"].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-colors ${
                      role === r
                        ? "bg-primary text-white border-primary"
                        : "text-gray-500 border-gray-200 hover:border-primary hover:text-primary"
                    }`}
                  >
                    {r.charAt(0).toUpperCase() + r.slice(1)}
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(""); }}
                  placeholder="your@email.com"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <Button type="submit" loading={loading} className="w-full">
                Send Reset Link
              </Button>

              <p className="text-center text-sm text-gray-500">
                Remember it?{" "}
                <Link to="/login" className="text-primary hover:underline font-medium">
                  Back to Login
                </Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordPage;
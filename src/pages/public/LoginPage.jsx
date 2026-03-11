import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, loading, isAuthenticated, role } = useAuth();

  const [form, setForm] = useState({ email: "", password: "", role: "user" });
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) return;
    if (role === "admin") navigate("/admin/dashboard", { replace: true });
    if (role === "vendor") navigate("/vendor/dashboard", { replace: true });
    if (role === "user") navigate("/user/dashboard", { replace: true });
  }, [isAuthenticated, role, navigate]);

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setErrors((p) => ({ ...p, [e.target.name]: "", general: "" }));
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const e = {};
    if (!form.email.trim()) e.email = "Email is required";
    if (!form.password.trim()) e.password = "Password is required";
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }

    const res = await login(form);
    if (!res.success) setErrors({ general: res.message });
  };

  const field = (name) =>
    `w-full border rounded-lg px-4 py-3 text-sm outline-none transition bg-white ${
      errors[name]
        ? "border-red-300 focus:ring-2 focus:ring-red-100"
        : "border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary"
    }`;

  return (
    <div className="min-h-screen grid md:grid-cols-2">

      {/* LEFT PANEL */}
      <div className="hidden md:flex flex-col justify-between bg-gradient-to-b from-[#1f5f3b] to-[#0f2f1f] text-white p-12">

        <div>

          {/* logo */}
          <div className="flex items-center gap-3 mb-12">
            <img src="/assets/logo.png" className="w-8 h-8" />
            <span className="font-heading text-3xl">ScrapZone</span>
          </div>

          <h2 className="font-heading text-4xl leading-snug mb-4">
            Welcome Back to ScrapZone
          </h2>

          <p className="text-green-200 mb-10 max-w-md">
            Sign in to manage your scrap pickups, track requests and connect
            with trusted local vendors.
          </p>

          <div className="space-y-4 text-green-200">

            <div className="flex gap-3">
              <span className="text-[#E5C447]">✔</span>
              Schedule doorstep pickups instantly
            </div>

            <div className="flex gap-3">
              <span className="text-[#E5C447]">✔</span>
              Verified vendors for every request
            </div>

            <div className="flex gap-3">
              <span className="text-[#E5C447]">✔</span>
              Promoting eco-friendly recycling
            </div>

          </div>
        </div>

        <p className="text-green-300 text-sm">
          © 2026 ScrapZone
        </p>
      </div>


      {/* RIGHT FORM */}
      <div className="bg-gray-50 flex items-center justify-center px-6 py-12">

        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-gray-100">

          <button
            onClick={() => navigate(-1)}
            className="text-gray-500 text-sm mb-6"
          >
            ← Back
          </button>

          <div className="mb-7">
            <h2 className="font-heading text-3xl text-gray-800">
              Sign in
            </h2>
            <p className="text-gray-500 text-sm">
              Welcome back! Enter your credentials.
            </p>
          </div>

          {/* ROLE TABS */}
          <div className="flex gap-1 p-1 bg-gray-100 rounded-lg mb-6">
            {["user", "vendor", "admin"].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => {
                  setForm((p) => ({ ...p, role: r }));
                  setErrors({});
                }}
                className={`flex-1 py-2 rounded-md text-sm font-medium capitalize ${
                  form.role === r
                    ? "bg-white shadow text-gray-900"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          {/* GENERAL ERROR */}
          {errors.general && (
            <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-4 text-sm text-red-600">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* EMAIL */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Email
              </label>

              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={field("email")}
              />

              {errors.email && (
                <p className="text-xs text-red-500 mt-1">{errors.email}</p>
              )}
            </div>

            {/* PASSWORD */}
            <div>

              <div className="flex justify-between mb-1">
                <label className="text-sm font-medium text-gray-700">
                  Password
                </label>

                <Link
                  to="/forgot-password"
                  className="text-xs text-primary font-medium hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="relative">
                <input
                  name="password"
                  type={show ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`${field("password")} pr-10`}
                />

                <button
                  type="button"
                  onClick={() => setShow((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  👁
                </button>
              </div>

              {errors.password && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.password}
                </p>
              )}
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1f5f3b] text-white py-3 rounded-lg font-semibold hover:bg-[#184d30] transition flex items-center justify-center gap-2"
            >
              {loading ? "Signing in..." : `Sign in as ${form.role}`}
            </button>
          </form>

          {form.role !== "admin" && (
            <p className="text-sm text-center text-gray-400 mt-6">
              No account?{" "}
              <Link
                to={form.role === "vendor" ? "/become-vendor" : "/register"}
                className="text-primary font-semibold hover:underline"
              >
                Register as {form.role}
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
import { useEffect, useState } from "react";
import { Link, useNavigate }   from "react-router-dom";
import useAuth                 from "../../hooks/useAuth";
import Navbar                  from "../../components/layout/Navbar";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, loading, isAuthenticated, role } = useAuth();

  const [form,   setForm]   = useState({ email: "", password: "", role: "user" });
  const [errors, setErrors] = useState({});
  const [show,   setShow]   = useState(false);

  // already logged in → redirect
  useEffect(() => {
    if (!isAuthenticated) return;
    if (role === "admin")  navigate("/admin/dashboard",  { replace: true });
    if (role === "vendor") navigate("/vendor/dashboard", { replace: true });
    if (role === "user")   navigate("/user/dashboard",   { replace: true });
  }, [isAuthenticated, role, navigate]);

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setErrors((p) => ({ ...p, [e.target.name]: "", general: "" }));
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const e = {};
    if (!form.email.trim())    e.email    = "Email is required";
    if (!form.password.trim()) e.password = "Password is required";
    if (Object.keys(e).length) { setErrors(e); return; }

    const res = await login(form);
    if (!res.success) setErrors({ general: res.message });
  };

  const field = (name) =>
    `w-full border rounded-xl px-3.5 py-2.5 text-sm outline-none transition-all bg-white ${
      errors[name]
        ? "border-red-300 focus:ring-2 focus:ring-red-100"
        : "border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary"
    }`;

  return (
    <>
  <button onClick={() => navigate(-1)} className="absolute top-6 left-6 text-black font-semibold">
    ← Go Back
  </button>

      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 font-sans">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">

            <div className="mb-7">
              <h2 className="text-xl font-bold text-gray-900">Welcome back</h2>
              <p className="text-sm text-gray-400 mt-1">Sign in to continue</p>
            </div>

            {/* role tabs */}
            <div className="flex gap-1 p-1 bg-gray-50 rounded-xl border border-gray-100 mb-6">
              {["user", "vendor", "admin"].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => { setForm((p) => ({ ...p, role: r })); setErrors({}); }}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                    form.role === r
                      ? "bg-white text-gray-900 shadow-sm border border-gray-200"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            {/* general error from backend */}
            {errors.general && (
              <div className="flex items-start gap-2.5 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-5">
                <svg className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm text-red-700 flex-1">{errors.general}</p>
                <button onClick={() => setErrors({})} className="text-red-300 hover:text-red-500 ml-auto">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={field("email")}
                />
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-sm font-medium text-gray-700">Password</label>
                  <Link to="/forgot-password" className="text-xs text-primary hover:underline font-medium">
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
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {show ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 4.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.password}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-primary-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-1"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Signing in...
                  </>
                ) : (
                  `Sign in as ${form.role}`
                )}
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
    </>
  );
};

export default LoginPage;
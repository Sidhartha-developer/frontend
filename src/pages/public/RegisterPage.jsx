import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, loading } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setErrors((p) => ({ ...p, [e.target.name]: "", general: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = {};

    if (!form.name.trim()) err.name = "Full name is required";

    if (!form.email.trim()) err.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      err.email = "Please enter a valid email address";

    if (form.phone && !/^[0-9]{10}$/.test(form.phone))
      err.phone = "Phone must be exactly 10 digits";

    if (!form.password) err.password = "Password is required";
    else if (form.password.length < 6) err.password = "Minimum 6 characters";

    if (!form.confirmPassword)
      err.confirmPassword = "Please confirm your password";
    else if (form.password !== form.confirmPassword)
      err.confirmPassword = "Passwords do not match";

    if (Object.keys(err).length) {
      setErrors(err);
      return;
    }

    const { confirmPassword, ...payload } = form;
    const res = await register(payload);
    if (!res.success) setErrors({ general: res.message });
  };

  const fieldClass = (name) =>
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

          <div className="flex items-center gap-3 mb-12">
            <img src="/assets/logo.png" className="w-8 h-8" />
            <span className="font-heading text-3xl">ScrapZone</span>
          </div>

          <h2 className="font-heading text-4xl leading-snug mb-4">
            Join ScrapZone Today
          </h2>

          <p className="text-green-200 mb-10 max-w-md">
            Create your free account and start scheduling doorstep scrap pickups
            with verified local vendors.
          </p>

          <div className="space-y-4 text-green-200">

            <div className="flex gap-3">
              <span className="text-[#E5C447]">✔</span>
              Easy doorstep pickup scheduling
            </div>

            <div className="flex gap-3">
              <span className="text-[#E5C447]">✔</span>
              Trusted & verified vendor network
            </div>

            <div className="flex gap-3">
              <span className="text-[#E5C447]">✔</span>
              Contribute to eco-friendly recycling
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
              Create account
            </h2>
            <p className="text-gray-500 text-sm">
              Sign up to request scrap pickups.
            </p>
          </div>

          {errors.general && (
            <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-4 text-sm text-red-600">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* NAME */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Full Name
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
                className={fieldClass("name")}
              />
              {errors.name && (
                <p className="text-xs text-red-500 mt-1">{errors.name}</p>
              )}
            </div>

            {/* EMAIL */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Email
              </label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={fieldClass("email")}
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">{errors.email}</p>
              )}
            </div>

            {/* PHONE */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Phone <span className="text-gray-400">(optional)</span>
              </label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="9876543210"
                className={fieldClass("phone")}
              />
              {errors.phone && (
                <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
              )}
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Password
              </label>

              <div className="relative">
                <input
                  name="password"
                  type={showPass ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Min 6 characters"
                  className={`${fieldClass("password")} pr-10`}
                />

                <button
                  type="button"
                  onClick={() => setShowPass((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  👁
                </button>
              </div>

              {errors.password && (
                <p className="text-xs text-red-500 mt-1">{errors.password}</p>
              )}
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Confirm Password
              </label>

              <div className="relative">
                <input
                  name="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Repeat password"
                  className={`${fieldClass("confirmPassword")} pr-10`}
                />

                <button
                  type="button"
                  onClick={() => setShowConfirm((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  👁
                </button>
              </div>

              {errors.confirmPassword && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1f5f3b] text-white py-3 rounded-lg font-semibold hover:bg-[#184d30] transition"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>

          </form>

          <div className="mt-6 text-center text-sm text-gray-400 space-y-2">

            <p>
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary font-semibold hover:underline"
              >
                Sign in
              </Link>
            </p>

            <p>
              Want to join as a vendor?{" "}
              <Link
                to="/become-vendor"
                className="text-primary font-semibold hover:underline"
              >
                Apply here
              </Link>
            </p>

          </div>

        </div>

      </div>
    </div>
  );
};

export default RegisterPage;
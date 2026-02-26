import { useState }   from "react";
import { Link, useNavigate }   from "react-router-dom";
import useAuth         from "../../hooks/useAuth";
import Navbar          from "../../components/layout/Navbar";

const RegisterPage = () => {
    const navigate = useNavigate();

  const { register, loading } = useAuth();

  const [form, setForm] = useState({
    name: "", email: "", phone: "", password: "", confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showPass,    setShowPass]    = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setErrors((p) => ({ ...p, [e.target.name]: "", general: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = {};

    if (!form.name.trim())
      err.name = "Full name is required";

    if (!form.email.trim())
      err.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      err.email = "Please enter a valid email address";

    if (form.phone && !/^[0-9]{10}$/.test(form.phone))
      err.phone = "Phone must be exactly 10 digits";

    if (!form.password)
      err.password = "Password is required";
    else if (form.password.length < 6)
      err.password = "Minimum 6 characters";

    if (!form.confirmPassword)
      err.confirmPassword = "Please confirm your password";
    else if (form.password !== form.confirmPassword)
      err.confirmPassword = "Passwords do not match";

    if (Object.keys(err).length) { setErrors(err); return; }

    const { confirmPassword, ...payload } = form;
    const res = await register(payload);
    if (!res.success) setErrors({ general: res.message });
  };

  const fieldClass = (name) =>
    `w-full border rounded-xl px-3.5 py-2.5 text-sm outline-none transition-all bg-white ${
      errors[name]
        ? "border-red-300 focus:ring-2 focus:ring-red-100"
        : "border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary"
    }`;

  const FieldError = ({ name }) =>
    errors[name] ? (
      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
        <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        {errors[name]}
      </p>
    ) : null;

  const EyeIcon = ({ open }) => open ? (
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
  );

  return (
    <>
      {/* <Navbar /> */}
        <button onClick={() => navigate(-1)} className="absolute top-6 left-6 text-black font-semibold">
    ← Go Back
  </button>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10 font-sans">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">

            <div className="mb-7">
              <h2 className="text-xl font-bold text-gray-900">Create account</h2>
              <p className="text-sm text-gray-400 mt-1">Sign up to request scrap pickups</p>
            </div>

            {errors.general && (
              <div className="flex items-start gap-2.5 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-5">
                <svg className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm text-red-700 flex-1">{errors.general}</p>
                <button onClick={() => setErrors({})} className="text-red-300 hover:text-red-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                <input
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={fieldClass("name")}
                />
                <FieldError name="name" />
              </div>

              {/* email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={fieldClass("email")}
                />
                <FieldError name="email" />
              </div>

              {/* phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Phone
                  <span className="text-gray-400 font-normal ml-1">(optional)</span>
                </label>
                <input
                  name="phone"
                  type="text"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="9876543210"
                  maxLength={10}
                  className={fieldClass("phone")}
                />
                <FieldError name="phone" />
              </div>

              {/* password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                <div className="relative">
                  <input
                    name="password"
                    type={showPass ? "text" : "password"}
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Min 6 characters"
                    className={`${fieldClass("password")} pr-10`}
                  />
                  <button type="button" onClick={() => setShowPass((p) => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    <EyeIcon open={showPass} />
                  </button>
                </div>
                <FieldError name="password" />
              </div>

              {/* confirm password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm Password</label>
                <div className="relative">
                  <input
                    name="confirmPassword"
                    type={showConfirm ? "text" : "password"}
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="Repeat your password"
                    className={`${fieldClass("confirmPassword")} pr-10`}
                  />
                  <button type="button" onClick={() => setShowConfirm((p) => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    <EyeIcon open={showConfirm} />
                  </button>
                </div>
                <FieldError name="confirmPassword" />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-primary-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-1"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Creating account...
                  </>
                ) : "Create Account"}
              </button>
            </form>

            <div className="mt-6 space-y-2 text-center">
              <p className="text-sm text-gray-400">
                Already have an account?{" "}
                <Link to="/login" className="text-primary font-semibold hover:underline">Sign in</Link>
              </p>
              <p className="text-sm text-gray-400">
                Want to join as a vendor?{" "}
                <Link to="/become-vendor" className="text-primary font-semibold hover:underline">Apply here</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
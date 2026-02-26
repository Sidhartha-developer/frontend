import { useState }  from "react";
import { Link, useNavigate }   from "react-router-dom";
import useAuth       from "../../hooks/useAuth";
import Alert         from "../../components/ui/Alert";
import Button        from "../../components/ui/Button";
import Navbar        from "../../components/layout/Navbar";

const BecomeVendorPage = () => {
    const navigate = useNavigate();

  const { registerVendor, loading } = useAuth();

  const [form, setForm]       = useState({ name: "", email: "", password: "", phone: "", address: "", lat: "", lng: "" });
  const [idProof, setIdProof] = useState(null);
  const [error, setError]     = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password || !form.phone || !form.address) {
      setError("All fields are required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(form.phone)) {
      setError("Phone number must be exactly 10 digits");
      return;
    }

    if (form.lat && isNaN(Number(form.lat))) {
      setError("Latitude must be a valid number");
      return;
    }

    if (form.lng && isNaN(Number(form.lng))) {
      setError("Longitude must be a valid number");
      return;
    }

    if (!idProof) {
      setError("ID proof is required");
      return;
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    if (!allowedTypes.includes(idProof.type)) {
      setError("ID proof must be an image file (JPG, PNG, or WEBP)");
      return;
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (idProof.size > maxSize) {
      setError("ID proof image must be smaller than 5MB");
      return;
    }

    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => { if (v) fd.append(k, v); });
    fd.append("idProof", idProof);

    const res = await registerVendor(fd);
    if (res.success) {
      setSuccess("Application submitted! Admin will review and approve your account.");
      setForm({ name: "", email: "", password: "", phone: "", address: "", lat: "", lng: "" });
      setIdProof(null);
    } else {
      setError(res.message);
    }
  };

  return (
    <>
      {/* <Navbar /> */}
  <button onClick={() => navigate(-1)} className="absolute top-6 left-6 text-black font-semibold">
    ← Go Back
  </button>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 w-full max-w-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">Become a Vendor</h2>
          <p className="text-sm text-gray-500 mb-6">Submit your details and we'll review your application</p>

          {error   && <Alert type="error"   message={error}   onClose={() => setError("")} />}
          {success && <Alert type="success" message={success} />}

          {!success && (
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              {[
                { name: "name",     label: "Business Name", type: "text",     placeholder: "Your name or business" },
                { name: "email",    label: "Email",         type: "email",    placeholder: "you@example.com"       },
                { name: "password", label: "Password",      type: "password", placeholder: "Min 6 chars"           },
                { name: "phone",    label: "Phone",         type: "text",     placeholder: "9876543210"            },
                { name: "address",  label: "Service Area",  type: "text",     placeholder: "Your service area"     },
              ].map((f) => (
                <div key={f.name}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {f.label} <span className="text-red-500">*</span>
                  </label>
                  <input
                    name={f.name}
                    type={f.type}
                    value={form[f.name]}
                    onChange={handleChange}
                    placeholder={f.placeholder}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>
              ))}

              <div className="grid grid-cols-2 gap-3">
                {["lat", "lng"].map((f) => (
                  <div key={f}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {f === "lat" ? "Latitude" : "Longitude"} (optional)
                    </label>
                    <input
                      name={f}
                      type="text"
                      value={form[f]}
                      onChange={handleChange}
                      placeholder={f === "lat" ? "e.g. 12.9716" : "e.g. 77.5946"}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ID Proof <span className="text-red-500">*</span>
                  <span className="text-gray-400 font-normal ml-1">(JPG, PNG, WEBP · max 5MB)</span>
                </label>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/jpg,image/webp"
                  onChange={(e) => { setIdProof(e.target.files[0]); setError(""); }}
                  className="w-full text-sm text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-primary file:text-white file:text-sm"
                />
              </div>

              <Button type="submit" loading={loading} className="w-full justify-center">
                Submit Application
              </Button>
            </form>
          )}

          <p className="text-sm text-center text-gray-500 mt-6">
            Already approved?{" "}
            <Link to="/login" className="text-primary font-medium hover:underline">Login here</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default BecomeVendorPage;
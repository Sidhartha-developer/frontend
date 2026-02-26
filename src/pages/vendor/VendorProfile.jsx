import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import VendorLayout from "../../components/layout/VendorLayout";
import Button from "../../components/ui/Button";
import Alert from "../../components/ui/Alert";
import { getMyVendorProfileApi, updateVendorApi } from "../../api/vendor.api";

const initialForm = {
  name: "",
  phone: "",
  address: "",
  lat: "",
  lng: "",
};

const VendorProfile = () => {
  const { user } = useSelector((s) => s.auth);

  const [form, setForm] = useState(initialForm);
  const [snapshot, setSnapshot] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [alert, setAlert] = useState({ type: "", message: "" });

  const loadProfile = async () => {
    if (!user?.id) {
      setFetching(false);
      return;
    }

    setFetching(true);
    try {
      const res = await getMyVendorProfileApi();
      const v = res.data?.vendor || {};

      const next = {
        name: v.name || user?.name || "",
        phone: v.phone || "",
        address: v.address || "",
        lat: v.location?.lat != null ? String(v.location.lat) : "",
        lng: v.location?.lng != null ? String(v.location.lng) : "",
      };

      setForm(next);
      setSnapshot(next);
    } catch {
      setAlert({ type: "error", message: "Failed to load profile details" });
      setForm((prev) => ({ ...prev, name: user?.name || prev.name }));
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, [user?.id]);

  const hasChanges = useMemo(() => JSON.stringify(form) !== JSON.stringify(snapshot), [form, snapshot]);

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    if (alert.message) setAlert({ type: "", message: "" });
  };

  const handleReset = () => {
    setForm(snapshot);
    setAlert({ type: "", message: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      setAlert({ type: "error", message: "Business name is required" });
      return;
    }
    if (form.lat && Number.isNaN(Number(form.lat))) {
      setAlert({ type: "error", message: "Latitude must be a valid number" });
      return;
    }
    if (form.lng && Number.isNaN(Number(form.lng))) {
      setAlert({ type: "error", message: "Longitude must be a valid number" });
      return;
    }

    setLoading(true);
    try {
      await updateVendorApi(user.id, form);
      setSnapshot(form);
      setAlert({ type: "success", message: "Profile updated successfully" });
    } catch (err) {
      setAlert({ type: "error", message: err.response?.data?.message || "Update failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <VendorLayout>
      <div className="mb-7">
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Vendor Profile</h1>
        <p className="text-sm text-slate-500">Manage your business information, service area, and location settings.</p>
      </div>

      <div className="grid xl:grid-cols-3 gap-5">
        <section className="xl:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6">
          {alert.message && (
            <div className="mb-4">
              <Alert type={alert.type} message={alert.message} onClose={() => setAlert({ type: "", message: "" })} />
            </div>
          )}

          {fetching ? (
            <div className="py-10 text-sm text-slate-500">Loading profile...</div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500 mb-3">Business Details</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Business Name</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your business or service name"
                      className="w-full border border-slate-300 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="Primary contact number"
                      className="w-full border border-slate-300 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Service Area</label>
                    <input
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      placeholder="Area, city, or locality"
                      className="w-full border border-slate-300 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500 mb-3">Location Coordinates</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Latitude</label>
                    <input
                      name="lat"
                      value={form.lat}
                      onChange={handleChange}
                      placeholder="e.g. 12.9716"
                      className="w-full border border-slate-300 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Longitude</label>
                    <input
                      name="lng"
                      value={form.lng}
                      onChange={handleChange}
                      placeholder="e.g. 77.5946"
                      className="w-full border border-slate-300 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <Button type="submit" loading={loading} disabled={!hasChanges} className="min-w-36 justify-center">
                  Save Changes
                </Button>
                <Button type="button" variant="secondary" onClick={handleReset} disabled={!hasChanges || loading}>
                  Discard
                </Button>
              </div>
            </form>
          )}
        </section>

        <aside className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 h-fit">
          <h3 className="text-sm font-semibold text-slate-900 mb-4">Profile Summary</h3>

          <div className="space-y-3 text-sm">
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
              <p className="text-xs text-slate-500">Account Role</p>
              <p className="font-medium text-slate-800 capitalize">{user?.role || "vendor"}</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
              <p className="text-xs text-slate-500">Business Name</p>
              <p className="font-medium text-slate-800">{form.name || "Not set"}</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
              <p className="text-xs text-slate-500">Contact</p>
              <p className="font-medium text-slate-800">{form.phone || "Not set"}</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
              <p className="text-xs text-slate-500">Service Area</p>
              <p className="font-medium text-slate-800">{form.address || "Not set"}</p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-500 leading-5">
            Keep your profile updated so users can identify your service region and contact details quickly.
          </div>
        </aside>
      </div>
    </VendorLayout>
  );
};

export default VendorProfile;

import { useEffect, useState } from "react";
import { useSelector }  from "react-redux";
import UserLayout       from "../../components/layout/UserLayout";
import Button           from "../../components/ui/Button";
import Alert            from "../../components/ui/Alert";
import { getMyUserProfileApi, updateMyUserProfileApi } from "../../api/user.api";

const UserProfile = () => {
  const { user }  = useSelector((s) => s.auth);

  const [form, setForm] = useState({ name: user?.name || "", phone: "", address: "" });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [alert, setAlert] = useState({ type: "", message: "" });

  useEffect(() => {
    const loadProfile = async () => {
      setFetching(true);
      try {
        const res = await getMyUserProfileApi();
        const me = res.data?.user || {};
        setForm({
          name: me.name || user?.name || "",
          phone: me.phone || "",
          address: me.address || "",
        });
      } catch {
        setAlert({ type: "error", message: "Failed to load profile details" });
      } finally {
        setFetching(false);
      }
    };

    loadProfile();
  }, [user?.name]);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateMyUserProfileApi(form);
      setAlert({ type: "success", message: "Profile updated" });
    } catch (err) {
      setAlert({ type: "error", message: err.response?.data?.message || "Update failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserLayout>
      <h1 className="text-xl font-bold text-gray-800 mb-6">Profile</h1>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm max-w-lg p-6">
        <div className="flex items-center gap-4 mb-6 pb-4 border-b">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
            {user?.name?.[0]?.toUpperCase()}
          </div>
          <div>
            <p className="font-semibold text-gray-800">{user?.name}</p>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>
        </div>

        {alert.message && (
          <Alert type={alert.type} message={alert.message} onClose={() => setAlert({ type: "", message: "" })} />
        )}
        {fetching ? (
          <div className="py-8 text-sm text-gray-500">Loading profile...</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            {[
              { name: "name",    label: "Full Name" },
              { name: "phone",   label: "Phone"     },
              { name: "address", label: "Address"   },
            ].map((f) => (
              <div key={f.name}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
                <input
                  name={f.name}
                  value={form[f.name]}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
            ))}
            <Button type="submit" loading={loading}>Save Changes</Button>
          </form>
        )}
      </div>
    </UserLayout>
  );
};

export default UserProfile;

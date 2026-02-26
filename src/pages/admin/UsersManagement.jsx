import { useEffect, useState } from "react";
import AdminLayout             from "../../components/layout/AdminLayout";
import Loader                  from "../../components/ui/Loader";
import Alert                   from "../../components/ui/Alert";
import ConfirmDialog           from "../../components/ui/ConfirmDialog";
import { Ban, RotateCcw, Trash2, Search } from "lucide-react";
import { getAllUsersApi, blockUserApi, deleteUserApi } from "../../api/user.api";

const UsersManagement = () => {
  const [users,   setUsers]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [search,  setSearch]  = useState("");
  const [alert,   setAlert]   = useState({ type: "", message: "" });
  const [busy,    setBusy]    = useState({});
  const [confirm, setConfirm] = useState({ open: false, id: null, action: "" });

  const fmt = (iso) => new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

  const load = (s = search) => {
    setLoading(true);
    const params = s ? { search: s } : {};
    getAllUsersApi(params)
      .then((res) => setUsers(res.data.users))
      .catch(() => setAlert({ type: "error", message: "Failed to load users" }))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openConfirm = (id, action) => setConfirm({ open: true, id, action });

  const handleConfirm = async () => {
    const { id, action } = confirm;
    setBusy((p) => ({ ...p, [id]: action }));
    setConfirm({ open: false, id: null, action: "" });
    try {
      if (action === "block")  await blockUserApi(id);
      if (action === "delete") await deleteUserApi(id);
      setAlert({ type: "success", message: action === "delete" ? "User deleted" : "Status toggled" });
      load();
    } catch (err) {
      setAlert({ type: "error", message: err.response?.data?.message || "Action failed" });
    } finally {
      setBusy((p) => ({ ...p, [id]: null }));
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-xl font-bold text-gray-800 mb-6">Users</h1>

      {alert.message && (
        <Alert type={alert.type} message={alert.message} onClose={() => setAlert({ type: "", message: "" })} className="mb-4" />
      )}

      <div className="flex gap-3 mb-5">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && load(search)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-64 outline-none focus:ring-2 focus:ring-primary/30"
        />
        <button
          onClick={() => load(search)}
          className="inline-flex items-center gap-2 text-sm bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark"
        >
          <Search size={15} />
          Search
        </button>
      </div>

      {loading ? <Loader /> : (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          {users.length === 0 ? (
            <p className="text-center py-12 text-gray-400">No users found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[920px] text-sm">
                <thead className="bg-gray-50 text-gray-500 text-left">
                  <tr>
                    <th className="px-5 py-3 font-medium">Name</th>
                    <th className="px-5 py-3 font-medium">Email</th>
                    <th className="px-5 py-3 font-medium">Phone</th>
                    <th className="px-5 py-3 font-medium">Joined</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                    <th className="px-5 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {users.map((u) => (
                    <tr key={u._id} className="hover:bg-gray-50">
                      <td className="px-5 py-3 font-medium text-gray-800">{u.name}</td>
                      <td className="px-5 py-3 text-gray-500">{u.email}</td>
                      <td className="px-5 py-3 text-gray-500">{u.phone || "—"}</td>
                      <td className="px-5 py-3 text-gray-400">{fmt(u.createdAt)}</td>
                      <td className="px-5 py-3">
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                          u.status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                        }`}>
                          {u.status}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => openConfirm(u._id, "block")}
                            disabled={!!busy[u._id]}
                            className="inline-flex items-center gap-1 rounded-md border border-blue-200 px-2 py-1 text-xs text-blue-700 hover:bg-blue-50 disabled:opacity-40"
                          >
                            {u.status === "active" ? <Ban size={14} /> : <RotateCcw size={14} />}
                            {u.status === "active" ? "Block" : "Unblock"}
                          </button>
                          <button
                            onClick={() => openConfirm(u._id, "delete")}
                            disabled={!!busy[u._id]}
                            className="inline-flex items-center gap-1 rounded-md border border-red-200 px-2 py-1 text-xs text-red-600 hover:bg-red-50 disabled:opacity-40"
                          >
                            <Trash2 size={14} />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      <ConfirmDialog
        isOpen={confirm.open}
        onClose={() => setConfirm({ open: false, id: null, action: "" })}
        onConfirm={handleConfirm}
        title={confirm.action === "delete" ? "Delete User" : "Toggle Block"}
        message={
          confirm.action === "delete"
            ? "This permanently deletes the user. Are you sure?"
            : "This will toggle the user's block status."
        }
      />
    </AdminLayout>
  );
};

export default UsersManagement;

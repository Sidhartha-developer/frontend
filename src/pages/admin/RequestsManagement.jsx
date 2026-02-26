import { useEffect, useState } from "react";
import AdminLayout             from "../../components/layout/AdminLayout";
import Loader                  from "../../components/ui/Loader";
import Badge                   from "../../components/ui/Badge";
import Alert                   from "../../components/ui/Alert";
import { getAllRequestsApi }    from "../../api/request.api";

const statuses = ["all", "pending", "accepted", "pickedUp", "completed", "cancelled"];

const RequestsManagement = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [filter, setFilter]     = useState("all");
  const [search, setSearch]     = useState("");
  const [alert, setAlert]       = useState({ type: "", message: "" });

  const fmt = (iso) => new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

  const load = () => {
    setLoading(true);
    const params = filter !== "all" ? { status: filter } : {};
    getAllRequestsApi(params)
      .then((res) => setRequests(res.data.requests))
      .catch(() => setAlert({ type: "error", message: "Failed to load" }))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, [filter]);

  const filtered = search
    ? requests.filter(
        (r) =>
          r.categoryId?.name?.toLowerCase().includes(search.toLowerCase()) ||
          r.userId?.name?.toLowerCase().includes(search.toLowerCase())
      )
    : requests;

  return (
    <AdminLayout>
      <h1 className="text-xl font-bold text-gray-800 mb-6">Requests</h1>

      {alert.message && (
        <Alert type={alert.type} message={alert.message} onClose={() => setAlert({ type: "", message: "" })} className="mb-4" />
      )}

      <div className="flex flex-wrap gap-3 mb-5">
        <input
          type="text"
          placeholder="Search user or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-60 outline-none focus:ring-2 focus:ring-primary/30"
        />
        <div className="flex gap-2 flex-wrap">
          {statuses.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize ${
                filter === s ? "bg-primary text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {loading ? <Loader /> : (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-x-auto">
          {filtered.length === 0 ? (
            <p className="text-center py-12 text-gray-400">No requests found.</p>
          ) : (
            <table className="w-full min-w-[980px] text-sm">
              <thead className="bg-gray-50 text-gray-500 text-left">
                <tr>
                  <th className="px-5 py-3 font-medium">Category</th>
                  <th className="px-5 py-3 font-medium">User</th>
                  <th className="px-5 py-3 font-medium">Vendor</th>
                  <th className="px-5 py-3 font-medium">Address</th>
                  <th className="px-5 py-3 font-medium">Date</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((r) => (
                  <tr key={r._id} className="hover:bg-gray-50">
                    <td className="px-5 py-3 font-medium text-gray-800">{r.categoryId?.name || "—"}</td>
                    <td className="px-5 py-3 text-gray-600">{r.userId?.name || "—"}</td>
                    <td className="px-5 py-3 text-gray-500">{r.vendorId?.name || <span className="text-gray-300">Unassigned</span>}</td>
                    <td className="px-5 py-3 text-gray-500 max-w-xs truncate">{r.pickupAddress}</td>
                    <td className="px-5 py-3 text-gray-400">{fmt(r.createdAt)}</td>
                    <td className="px-5 py-3"><Badge status={r.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </AdminLayout>
  );
};

export default RequestsManagement;

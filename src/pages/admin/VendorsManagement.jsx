import { useEffect, useState } from "react";
import AdminLayout             from "../../components/layout/AdminLayout";
import Loader                  from "../../components/ui/Loader";
import Alert                   from "../../components/ui/Alert";
import Modal                   from "../../components/ui/Modal";
import { CheckCircle2, XCircle, Ban, RotateCcw, Eye } from "lucide-react";
import { getAllVendorsApi, approveVendorApi, rejectVendorApi, blockVendorApi } from "../../api/vendor.api";

const tabs = ["all", "pending", "approved", "rejected"];

const VendorsManagement = () => {
  const [vendors, setVendors]   = useState([]);
  const [loading, setLoading]   = useState(true);
  const [filter,  setFilter]    = useState("all");
  const [alert,   setAlert]     = useState({ type: "", message: "" });
  const [busy,    setBusy]      = useState({});
  const [idProof, setIdProof]   = useState("");

  const fmt = (iso) => new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

  const load = () => {
    setLoading(true);
    const params = filter !== "all" ? { approvalStatus: filter } : {};
    getAllVendorsApi(params)
      .then((res) => setVendors(res.data.vendors))
      .catch(() => setAlert({ type: "error", message: "Failed to load vendors" }))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, [filter]);

  const act = async (id, action) => {
    setBusy((p) => ({ ...p, [id]: action }));
    try {
      if (action === "approve") await approveVendorApi(id);
      if (action === "reject")  await rejectVendorApi(id);
      if (action === "block")   await blockVendorApi(id);
      setAlert({ type: "success", message: `Vendor ${action}d` });
      load();
    } catch (err) {
      setAlert({ type: "error", message: err.response?.data?.message || "Action failed" });
    } finally {
      setBusy((p) => ({ ...p, [id]: null }));
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-xl font-bold text-gray-800 mb-6">Vendors</h1>

      {alert.message && (
        <Alert type={alert.type} message={alert.message} onClose={() => setAlert({ type: "", message: "" })} className="mb-4" />
      )}

      <div className="flex gap-2 mb-5">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize ${
              filter === t ? "bg-primary text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {loading ? <Loader /> : (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-x-auto">
          {vendors.length === 0 ? (
            <p className="text-center py-12 text-gray-400">No vendors found.</p>
          ) : (
            <table className="w-full min-w-[1100px] text-sm">
              <thead className="bg-gray-50 text-gray-500 text-left">
                <tr>
                  <th className="px-5 py-3 font-medium">Name</th>
                  <th className="px-5 py-3 font-medium">Email</th>
                  <th className="px-5 py-3 font-medium">Phone</th>
                  <th className="px-5 py-3 font-medium">Plan</th>
                  <th className="px-5 py-3 font-medium">Payment</th>
                  <th className="px-5 py-3 font-medium">Joined</th>
                  <th className="px-5 py-3 font-medium">Approval</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">ID</th>
                  <th className="px-5 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {vendors.map((v) => (
                  <tr key={v._id} className="hover:bg-gray-50">
                    <td className="px-5 py-3 font-medium text-gray-800">{v.name}</td>
                    <td className="px-5 py-3 text-gray-500">{v.email}</td>
                    <td className="px-5 py-3 text-gray-500">{v.phone}</td>
                    <td className="px-5 py-3 text-gray-500">
                      {v.currentPlan ? (
                        <div>
                          <p className="font-medium text-gray-700">{v.currentPlan.name}</p>
                          <p className="text-xs text-gray-400">Rs. {v.currentPlan.price} / {v.currentPlan.durationInDays} days</p>
                        </div>
                      ) : (
                        <span className="text-gray-300">—</span>
                      )}
                    </td>
                    <td className="px-5 py-3">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full capitalize ${
                        v.paymentStatus === "paid" ? "bg-green-100 text-green-700"
                        : v.paymentStatus === "failed" ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                      }`}>
                        {v.paymentStatus}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-gray-400">{fmt(v.createdAt)}</td>
                    <td className="px-5 py-3">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full capitalize ${
                        v.approvalStatus === "approved" ? "bg-green-100 text-green-700"
                        : v.approvalStatus === "rejected" ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                      }`}>
                        {v.approvalStatus}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        v.status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}>
                        {v.status}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      {v.idProofUrl
                        ? (
                          <button
                            onClick={() => setIdProof(v.idProofUrl)}
                            className="inline-flex items-center gap-1 rounded-md border border-gray-200 px-2 py-1 text-xs text-gray-700 hover:bg-gray-50"
                          >
                            <Eye size={14} />
                            View
                          </button>
                        )
                        : <span className="text-gray-300">—</span>
                      }
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex gap-2 flex-wrap">
                        {v.approvalStatus === "pending" && (
                          <>
                            <button
                              onClick={() => act(v._id, "approve")}
                              disabled={!!busy[v._id]}
                              className="inline-flex items-center gap-1 rounded-md border border-green-200 px-2 py-1 text-xs text-green-700 hover:bg-green-50 disabled:opacity-40"
                            >
                              <CheckCircle2 size={14} />
                              {busy[v._id] === "approve" ? "..." : "Approve"}
                            </button>
                            <button
                              onClick={() => act(v._id, "reject")}
                              disabled={!!busy[v._id]}
                              className="inline-flex items-center gap-1 rounded-md border border-red-200 px-2 py-1 text-xs text-red-600 hover:bg-red-50 disabled:opacity-40"
                            >
                              <XCircle size={14} />
                              {busy[v._id] === "reject" ? "..." : "Reject"}
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => act(v._id, "block")}
                          disabled={!!busy[v._id]}
                          className="inline-flex items-center gap-1 rounded-md border border-blue-200 px-2 py-1 text-xs text-blue-700 hover:bg-blue-50 disabled:opacity-40"
                        >
                          {v.status === "active" ? <Ban size={14} /> : <RotateCcw size={14} />}
                          {busy[v._id] === "block" ? "..." : v.status === "active" ? "Block" : "Unblock"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      <Modal isOpen={!!idProof} onClose={() => setIdProof("")} title="ID Proof">
        <img src={idProof} alt="ID" className="w-full rounded-lg border border-gray-200" />
      </Modal>
    </AdminLayout>
  );
};

export default VendorsManagement;

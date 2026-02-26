import { useEffect, useState } from "react";
import { Link }                from "react-router-dom";
import { useSelector }         from "react-redux";
import { Eye, SquarePen }      from "lucide-react";
import VendorLayout            from "../../components/layout/VendorLayout";
import Loader                  from "../../components/ui/Loader";
import Badge                   from "../../components/ui/Badge";
import { getVendorFeedApi }    from "../../api/request.api";

const statusFilters = ["all", "accepted", "pickedUp", "completed", "cancelled"];
const statusLabels = {
  all: "All",
  accepted: "Accepted",
  pickedUp: "Picked Up",
  completed: "Completed",
  cancelled: "Cancelled",
};

const MyJobs = () => {
  const { user } = useSelector((s) => s.auth);
  const [all, setAll] = useState([]);
  const [status, setStatus] = useState("all");
  const [loading, setLoading] = useState(true);

  const fmt = (iso) => new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

  useEffect(() => {
    getVendorFeedApi()
      .then((res) => setAll(res.data.requests))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const myJobs = all.filter(
    (r) => r.vendorId === user?.id || r.vendorId?._id === user?.id
  );
  const visibleJobs = myJobs.filter((r) => status === "all" || r.status === status);

  const counts = myJobs.reduce((acc, r) => {
    acc[r.status] = (acc[r.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <VendorLayout>
      <div className="mb-6 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">My Jobs</h1>
          <p className="text-sm text-slate-500">Track requests currently assigned to you.</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white px-4 py-2">
          <p className="text-xs uppercase tracking-[0.1em] text-slate-500 font-semibold">Total Assigned</p>
          <p className="text-lg font-bold text-slate-900">{myJobs.length}</p>
        </div>
      </div>

      <div className="mb-5 flex flex-wrap gap-2">
        {statusFilters.map((s) => (
          <button
            key={s}
            onClick={() => setStatus(s)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition ${
              status === s ? "bg-slate-900 text-white" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            {statusLabels[s]}
            {s !== "all" ? ` (${counts[s] || 0})` : ""}
          </button>
        ))}
      </div>

      {loading ? <Loader /> : (
        myJobs.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200/80 py-16 text-center text-slate-400">
            No jobs yet.{" "}
            <Link to="/vendor/requests" className="text-primary hover:underline">Browse requests</Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
            <table className="w-full text-sm hidden md:table">
              <thead className="bg-slate-50 text-slate-500 text-left">
                <tr>
                  <th className="px-5 py-3 font-medium">Category</th>
                  <th className="px-5 py-3 font-medium">User</th>
                  <th className="px-5 py-3 font-medium">Date</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {visibleJobs.map((r) => (
                  <tr key={r._id} className="hover:bg-slate-50">
                    <td className="px-5 py-3 font-medium text-slate-800">{r.categoryId?.name}</td>
                    <td className="px-5 py-3 text-slate-600">{r.userId?.name}</td>
                    <td className="px-5 py-3 text-slate-500">{fmt(r.createdAt)}</td>
                    <td className="px-5 py-3"><Badge status={r.status} /></td>
                    <td className="px-5 py-3">
                      <Link
                        to={`/vendor/requests/${r._id}`}
                        className="inline-flex items-center gap-1 text-primary hover:underline text-xs"
                      >
                        {r.status === "accepted" || r.status === "pickedUp" ? <SquarePen size={13} /> : <Eye size={13} />}
                        {r.status === "accepted" || r.status === "pickedUp" ? "Update" : "View"}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="md:hidden divide-y divide-slate-100">
              {visibleJobs.map((r) => (
                <div key={r._id} className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-slate-900">{r.categoryId?.name}</p>
                    <Badge status={r.status} />
                  </div>
                  <p className="text-sm text-slate-600">{r.userId?.name}</p>
                  <p className="text-xs text-slate-400 mt-1">{fmt(r.createdAt)}</p>
                  <Link
                    to={`/vendor/requests/${r._id}`}
                    className="inline-flex items-center gap-1 mt-3 text-xs text-primary font-medium hover:underline"
                  >
                    {r.status === "accepted" || r.status === "pickedUp" ? <SquarePen size={13} /> : <Eye size={13} />}
                    {r.status === "accepted" || r.status === "pickedUp" ? "Update Job" : "View Job"}
                  </Link>
                </div>
              ))}
            </div>

            {visibleJobs.length === 0 && (
              <div className="py-12 text-center text-sm text-slate-400">No jobs in this status.</div>
            )}
          </div>
        )
      )}
    </VendorLayout>
  );
};

export default MyJobs;

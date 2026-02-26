import { useEffect, useState } from "react";
import { Link }                from "react-router-dom";
import { useSelector }         from "react-redux";
import VendorLayout            from "../../components/layout/VendorLayout";
import Loader                  from "../../components/ui/Loader";
import Badge                   from "../../components/ui/Badge";
import { getVendorFeedApi }    from "../../api/request.api";

const VendorDashboard = () => {
  const { user } = useSelector((s) => s.auth);
  const [requests, setRequests] = useState([]);
  const [myActiveCount, setMyActiveCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [loading, setLoading]   = useState(true);

  const fmt = (iso) => new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

  useEffect(() => {
    Promise.all([
      getVendorFeedApi({ status: "pending" }),
      getVendorFeedApi({ status: "accepted,pickedUp,completed" }),
    ])
      .then(([pendingRes, jobsRes]) => {
        const pending = pendingRes.data.requests || [];
        const jobs = jobsRes.data.requests || [];
        const mine = jobs.filter((r) => r.vendorId === user?.id || r.vendorId?._id === user?.id);

        setRequests(pending);
        setMyActiveCount(mine.filter((r) => r.status === "accepted" || r.status === "pickedUp").length);
        setCompletedCount(mine.filter((r) => r.status === "completed").length);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [user?.id]);

  return (
    <VendorLayout>
      <div className="mb-7">
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Dashboard</h1>
        <p className="text-sm text-slate-500">Welcome back, {user?.name}. Here is your request activity snapshot.</p>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-8">
        <div className="rounded-2xl border border-amber-200/70 bg-gradient-to-br from-amber-50 to-white p-5">
          <p className="text-xs uppercase tracking-[0.14em] text-amber-700 font-semibold">Open Feed</p>
          <p className="text-3xl font-bold text-slate-900 mt-2">{requests.length}</p>
          <p className="text-sm text-slate-600 mt-1">Pending requests ready to accept</p>
        </div>
        <div className="rounded-2xl border border-blue-200/70 bg-gradient-to-br from-blue-50 to-white p-5">
          <p className="text-xs uppercase tracking-[0.14em] text-blue-700 font-semibold">In Progress</p>
          <p className="text-3xl font-bold text-slate-900 mt-2">{myActiveCount}</p>
          <p className="text-sm text-slate-600 mt-1">Accepted and picked up jobs assigned to you</p>
        </div>
        <div className="rounded-2xl border border-emerald-200/70 bg-gradient-to-br from-emerald-50 to-white p-5 sm:col-span-2 xl:col-span-1">
          <p className="text-xs uppercase tracking-[0.14em] text-emerald-700 font-semibold">Completed</p>
          <p className="text-3xl font-bold text-slate-900 mt-2">{completedCount}</p>
          <p className="text-sm text-slate-600 mt-1">Jobs completed by your account</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex flex-wrap gap-3 items-center justify-between">
          <h2 className="font-semibold text-slate-900">Latest Open Requests</h2>
          <div className="flex items-center gap-3">
            <Link to="/vendor/my-jobs" className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500 hover:text-slate-800">
              My Jobs
            </Link>
            <Link
              to="/vendor/requests"
              className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-slate-700"
            >
              View All
            </Link>
          </div>
        </div>

        {loading ? <Loader /> : (
          requests.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-sm">No open requests near you right now.</div>
          ) : (
            <ul className="divide-y divide-slate-100">
              {requests.slice(0, 5).map((r) => (
                <li key={r._id} className="px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-semibold text-slate-900">{r.categoryId?.name}</p>
                      <Badge status={r.status} />
                    </div>
                    <p className="text-sm text-slate-600">{r.pickupAddress}</p>
                    <p className="text-xs text-slate-400 mt-1">{fmt(r.createdAt)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/vendor/requests/${r._id}`}
                      className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
                    >
                      View
                    </Link>
                    <Link
                      to={`/vendor/requests/${r._id}`}
                      className="rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-white hover:bg-primary-dark"
                    >
                      Accept
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          )
        )}
      </div>
    </VendorLayout>
  );
};

export default VendorDashboard;

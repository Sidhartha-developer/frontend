import { useEffect, useState } from "react";
import { Link }                from "react-router-dom";
import VendorLayout            from "../../components/layout/VendorLayout";
import Loader                  from "../../components/ui/Loader";
import Badge                   from "../../components/ui/Badge";
import { getVendorFeedApi }    from "../../api/request.api";

const AvailableRequests = () => {
  const [requests, setRequests] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading]   = useState(true);

  const fmt = (iso) => new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

  useEffect(() => {
    getVendorFeedApi({ status: "pending" })
      .then((res) => setRequests(res.data.requests))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = requests.filter((r) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    const category = r.categoryId?.name?.toLowerCase() || "";
    const address = r.pickupAddress?.toLowerCase() || "";
    const user = r.userId?.name?.toLowerCase() || "";
    return category.includes(q) || address.includes(q) || user.includes(q);
  });

  return (
    <VendorLayout>
      <div className="mb-6 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Available Requests</h1>
          <p className="text-sm text-slate-500">Browse and accept nearby pending requests.</p>
        </div>

        <div className="w-full lg:w-80">
          <label className="block text-xs uppercase tracking-[0.12em] text-slate-500 font-semibold mb-1.5">Search</label>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Category, address, user..."
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
      </div>

      {loading ? <Loader /> : (
        filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200/80 py-16 text-center text-slate-400">
            No open requests available right now.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((r) => (
              <div
                key={r._id}
                className="group bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-slate-300 p-5 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="font-semibold text-slate-900">{r.categoryId?.name}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{fmt(r.createdAt)}</p>
                  </div>
                  <Badge status={r.status} />
                </div>

                <div className="space-y-1.5 text-sm mb-5">
                  <p className="text-slate-600">{r.pickupAddress}</p>
                  <p className="text-xs text-slate-500">User: <span className="font-medium">{r.userId?.name || "N/A"}</span></p>
                  {r.estimatedWeight ? (
                    <p className="text-xs text-slate-500">Estimated weight: <span className="font-medium">{r.estimatedWeight} kg</span></p>
                  ) : (
                    <p className="text-xs text-slate-400">Estimated weight not provided</p>
                  )}
                </div>

                <div className="flex gap-2">
                  <Link
                    to={`/vendor/requests/${r._id}`}
                    className="flex-1 text-center rounded-lg border border-slate-200 text-slate-700 text-sm py-2 font-medium hover:bg-slate-50"
                  >
                    View
                  </Link>
                  <Link
                    to={`/vendor/requests/${r._id}`}
                    className="flex-1 text-center rounded-lg bg-primary text-white text-sm py-2 font-medium hover:bg-primary-dark"
                  >
                    Accept
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </VendorLayout>
  );
};

export default AvailableRequests;

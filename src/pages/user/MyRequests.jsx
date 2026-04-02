import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Eye } from "lucide-react";
import UserLayout from "../../components/layout/UserLayout";
import Loader from "../../components/ui/Loader";
import Badge from "../../components/ui/Badge";
import { getMyRequestsApi } from "../../api/request.api";

const statuses = ["all", "pending", "accepted", "pickedUp", "completed", "cancelled"];

const MyRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const fmt = (iso) =>
    new Date(iso).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  useEffect(() => {
    setLoading(true);
    const params = filter !== "all" ? { status: filter } : {};
    getMyRequestsApi(params)
      .then((res) => setRequests(res.data.requests))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [filter]);

  return (
    <UserLayout>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-800">My Requests</h1>
        <Link
          to="/user/create-request"
          className="inline-flex items-center gap-1.5 bg-primary text-white text-sm px-4 py-2 rounded-lg font-medium hover:bg-primary-dark"
        >
          <Plus size={15} />
          New Request
        </Link>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap mb-5">
        {statuses.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize ${
              filter === s
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {loading ? (
        <Loader />
      ) : requests.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 py-14 text-center text-gray-400">
          No requests found.
        </div>
      ) : (
        <>
          {/* 📱 MOBILE VIEW (CARDS) */}
          <div className="md:hidden space-y-3">
            {requests.map((r) => (
              <div
                key={r._id}
                className="bg-white border rounded-xl p-4 shadow-sm"
              >
                {/* Categories */}
                <div className="flex flex-wrap gap-1 mb-2">
                  {r.categoryIds?.length ? (
                    r.categoryIds.map((c) => (
                      <span
                        key={c._id}
                        className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full"
                      >
                        {c.name}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-400 text-xs">—</span>
                  )}
                </div>

                {/* Date */}
                <p className="text-xs text-gray-400 mb-1">
                  {fmt(r.createdAt)}
                </p>

                {/* Optional extra info */}
                {(r.scrapType || r.estimatedWeight) && (
                  <p className="text-xs text-gray-500 mb-2">
                    {r.scrapType?.replace("_", " ")}{" "}
                    {r.estimatedWeight && `• ${r.estimatedWeight}kg`}
                  </p>
                )}

                {/* Status + Action */}
                <div className="flex items-center justify-between mt-2">
                  <Badge status={r.status} />

                  <Link
                    to={`/user/requests/${r._id}`}
                    className="text-xs text-primary font-medium flex items-center gap-1"
                  >
                    <Eye size={14} />
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* 💻 DESKTOP VIEW (TABLE) */}
          <div className="hidden md:block bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-500 text-left">
                  <tr>
                    <th className="px-5 py-3 font-medium">Category</th>
                    <th className="px-5 py-3 font-medium">Date</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                    <th className="px-5 py-3 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {requests.map((r) => (
                    <tr key={r._id} className="hover:bg-gray-50">
                      {/* Categories */}
                      <td className="px-5 py-3">
                        <div className="flex flex-wrap gap-1">
                          {r.categoryIds?.length ? (
                            r.categoryIds.map((c) => (
                              <span
                                key={c._id}
                                className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full"
                              >
                                {c.name}
                              </span>
                            ))
                          ) : (
                            "—"
                          )}
                        </div>
                      </td>

                      {/* Date */}
                      <td className="px-5 py-3 text-gray-500">
                        {fmt(r.createdAt)}
                      </td>

                      {/* Status */}
                      <td className="px-5 py-3">
                        <Badge status={r.status} />
                      </td>

                      {/* Action */}
                      <td className="px-5 py-3">
                        <Link
                          to={`/user/requests/${r._id}`}
                          className="inline-flex items-center gap-1 rounded-md border border-primary/30 px-2 py-1 text-primary hover:bg-primary/5 text-xs"
                        >
                          <Eye size={13} />
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </UserLayout>
  );
};

export default MyRequests;
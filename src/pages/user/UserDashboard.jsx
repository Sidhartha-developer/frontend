import { useEffect, useState } from "react";
import { Link }                from "react-router-dom";
import { useSelector }         from "react-redux";
import { Plus, Eye }           from "lucide-react";
import UserLayout              from "../../components/layout/UserLayout";
import Loader                  from "../../components/ui/Loader";
import Badge                   from "../../components/ui/Badge";
import { getMyRequestsApi }    from "../../api/request.api";

const UserDashboard = () => {
  const { user }           = useSelector((s) => s.auth);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    getMyRequestsApi()
      .then((res) => setRequests(res.data.requests))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const count = (status) => requests.filter((r) => r.status === status).length;

  const fmt = (iso) => new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

  return (
    <UserLayout>
      <h1 className="text-xl font-bold text-gray-800 mb-1">Dashboard</h1>
      <p className="text-sm text-gray-500 mb-6">Welcome back, {user?.name}</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total",     value: requests.length,      bg: "bg-gray-50"   },
          { label: "Pending",   value: count("pending"),      bg: "bg-yellow-50" },
          { label: "Accepted",  value: count("accepted"),     bg: "bg-blue-50"   },
          { label: "Completed", value: count("completed"),    bg: "bg-green-50"  },
        ].map((s) => (
          <div key={s.label} className={`${s.bg} rounded-xl p-4 border border-gray-100`}>
            <p className="text-2xl font-bold text-gray-800">{s.value}</p>
            <p className="text-sm text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <h2 className="font-semibold text-gray-800">Recent Requests</h2>
          <Link
            to="/user/create-request"
            className="inline-flex items-center gap-1.5 text-sm text-primary font-medium hover:underline"
          >
            <Plus size={15} />
            New Request
          </Link>
        </div>

        {loading ? <Loader /> : (
          requests.length === 0 ? (
            <div className="py-12 text-center text-gray-400">
              <p>No requests yet.</p>
              <Link to="/user/create-request" className="inline-flex items-center gap-1.5 text-primary text-sm mt-2 hover:underline">
                <Plus size={15} />
                Create your first request
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-gray-50">
              {requests.slice(0, 5).map((r) => (
                <li key={r._id} className="flex items-center justify-between px-5 py-3">
                  <div>
                    <p className="text-sm font-medium text-gray-800">{r.categoryId?.name || "Scrap"}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{fmt(r.createdAt)}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge status={r.status} />
                    <Link to={`/user/requests/${r._id}`} className="inline-flex items-center gap-1 text-xs text-primary hover:underline">
                      <Eye size={13} />
                      View
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          )
        )}
      </div>
    </UserLayout>
  );
};

export default UserDashboard;

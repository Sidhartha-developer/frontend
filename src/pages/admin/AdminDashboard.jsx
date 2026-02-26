import { useEffect, useState }  from "react";
import AdminLayout              from "../../components/layout/AdminLayout";
import Loader                   from "../../components/ui/Loader";
import { getDashboardStatsApi } from "../../api/admin.api";
import {
  Users,
  Truck,
  UserCheck,
  ClipboardList,
  Clock3,
  CircleCheckBig,
  Shapes,
} from "lucide-react";

const AdminDashboard = () => {
  const [stats,   setStats]   = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardStatsApi()
      .then((res) => setStats(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const cards = stats ? [
    { label: "Total Users", value: stats.totalUsers, bg: "bg-blue-50", text: "text-blue-700", Icon: Users },
    { label: "Active Vendors", value: stats.totalVendors, bg: "bg-green-50", text: "text-green-700", Icon: Truck },
    { label: "Pending Vendors", value: stats.pendingVendors, bg: "bg-yellow-50", text: "text-yellow-700", Icon: UserCheck },
    { label: "Total Requests", value: stats.totalRequests, bg: "bg-purple-50", text: "text-purple-700", Icon: ClipboardList },
    { label: "Pending Requests", value: stats.pendingRequests, bg: "bg-orange-50", text: "text-orange-700", Icon: Clock3 },
    { label: "Completed Requests", value: stats.completedRequests, bg: "bg-teal-50", text: "text-teal-700", Icon: CircleCheckBig },
    { label: "Categories", value: stats.totalCategories, bg: "bg-gray-50", text: "text-gray-700", Icon: Shapes },
  ] : [];

  return (
    <AdminLayout>
      <h1 className="text-xl font-bold text-gray-800 mb-6">Dashboard</h1>

      {loading ? <Loader /> : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {cards.map((c) => (
            <div key={c.label} className={`${c.bg} rounded-xl p-5 border border-gray-100`}>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className={`text-3xl font-bold ${c.text}`}>{c.value}</p>
                  <p className="text-sm text-gray-500 mt-1">{c.label}</p>
                </div>
                <c.Icon className={`w-5 h-5 ${c.text}`} />
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminDashboard;

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserLayout               from "../../components/layout/UserLayout";
import Loader                   from "../../components/ui/Loader";
import Badge                    from "../../components/ui/Badge";
import Button                   from "../../components/ui/Button";
import Alert                    from "../../components/ui/Alert";
import { getRequestByIdApi, cancelRequestApi } from "../../api/request.api";

const steps = ["pending", "accepted", "pickedUp", "completed"];

const RequestDetails = () => {
  const { id }   = useParams();
  const navigate = useNavigate();

  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [busy,    setBusy]    = useState(false);
  const [error,   setError]   = useState("");

  const fmt = (iso) => new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

  useEffect(() => {
    getRequestByIdApi(id)
      .then((res) => setRequest(res.data.request))
      .catch((err) => {
  console.log("ERROR:", err.response?.data || err);
  setError(err.response?.data?.message || "Failed to load request");
})
      .finally(() => setLoading(false));
  }, [id]);

  const handleCancel = async () => {
    setBusy(true);
    try {
      await cancelRequestApi(id);
      navigate("/user/requests");
    } catch (err) {
      setError(err.response?.data?.message || "Cancel failed");
      setBusy(false);
    }
  };

  if (loading) return <UserLayout><Loader /></UserLayout>;

  if (!request) return (
    <UserLayout>
      <Alert type="error" message={error || "Request not found"} />
    </UserLayout>
  );

  const stepIndex = steps.indexOf(request.status);

  return (
    <UserLayout>
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-gray-600 text-sm">← Back</button>
        <h1 className="text-xl font-bold text-gray-800">Request Details</h1>
      </div>

      {error && <Alert type="error" message={error} onClose={() => setError("")} className="mb-4" />}

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-5">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
<div className="flex items-center justify-between mb-4">
  <div className="flex flex-wrap gap-2">
    {request.categoryIds?.map((c) => (
      <span
        key={c._id}
        className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full"
      >
        {c.name}
      </span>
    ))}
  </div>

  <Badge status={request.status} />
</div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-gray-400 text-xs">Pickup Address</p>
                <p className="text-gray-700 mt-0.5">{request.pickupAddress}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs">Created</p>
                <p className="text-gray-700 mt-0.5">{fmt(request.createdAt)}</p>
              </div>
              {request.preferredDate && (
                <div>
                  <p className="text-gray-400 text-xs">Preferred Date</p>
                  <p className="text-gray-700 mt-0.5">{fmt(request.preferredDate)}</p>
                </div>
              )}
              {request.estimatedWeight && (
                <div>
                  <p className="text-gray-400 text-xs">Est. Weight</p>
                  <p className="text-gray-700 mt-0.5">{request.estimatedWeight} kg</p>
                </div>
              )}
            </div>
            {request.description && (
              <div className="mt-3">
                <p className="text-gray-400 text-xs">Notes</p>
                <p className="text-sm text-gray-700 mt-0.5">{request.description}</p>
              </div>
            )}
          </div>
          {request.scrapType && (
  <div>
    <p className="text-gray-400 text-xs">Scrap Type</p>
    <p className="text-gray-700 mt-0.5 capitalize">
      {request.scrapType.replace("_", " ")}
    </p>
  </div>
)}

{request.vehicleType && (
  <div>
    <p className="text-gray-400 text-xs">Vehicle</p>
    <p className="text-gray-700 mt-0.5">
      🚚 {request.vehicleType.replace("_", " ")}
    </p>
  </div>
)}

          {request.images?.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <p className="font-medium text-gray-800 mb-3">Images</p>
              <div className="flex gap-3 flex-wrap">
                {request.images.map((img, i) => (
                  <img key={i} src={img.url} alt="scrap" className="w-24 h-24 object-cover rounded-lg border border-gray-200" />
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-5">
          {/* progress tracker */}
          {request.status !== "cancelled" && (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <p className="font-medium text-gray-800 mb-4">Progress</p>
              <ol className="space-y-3">
                {steps.map((s, i) => (
                  <li key={s} className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      i <= stepIndex ? "bg-primary text-white" : "bg-gray-100 text-gray-400"
                    }`}>
                      {i < stepIndex ? "✓" : i + 1}
                    </span>
                    <span className={`text-sm capitalize ${i <= stepIndex ? "text-gray-800 font-medium" : "text-gray-400"}`}>
                      {s}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {request.vendorId && (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <p className="font-medium text-gray-800 mb-2">Assigned Vendor</p>
              <p className="text-sm text-gray-700">{request.vendorId.name}</p>
              <p className="text-sm text-gray-500">{request.vendorId.phone}</p>
            </div>
          )}

          {request.status === "pending" && (
            <Button variant="danger" onClick={handleCancel} loading={busy} className="w-full justify-center">
              Cancel Request
            </Button>
          )}
        </div>
      </div>
    </UserLayout>
  );
};

export default RequestDetails;

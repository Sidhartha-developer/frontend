import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import VendorLayout from "../../components/layout/VendorLayout";
import Loader from "../../components/ui/Loader";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import Alert from "../../components/ui/Alert";
import {
  getRequestByIdApi,
  acceptRequestApi,
  rejectRequestApi,
  updateRequestStatusApi,
} from "../../api/request.api";

const VendorRequestDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((s) => s.auth);

  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  const fmt = (iso) =>
    new Date(iso).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const load = () => {
    setLoading(true);
    getRequestByIdApi(id)
      .then((res) => setRequest(res.data.request))
      .catch(() => setError("Failed to load request"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, [id]);

  const isMyRequest = request?.vendorId?._id === user?.id || request?.vendorId === user?.id;

  const handle = async (action) => {
    setBusy(true);
    setError("");
    try {
      if (action === "accept") await acceptRequestApi(id);
      if (action === "reject") await rejectRequestApi(id);
      if (action === "pickedUp") await updateRequestStatusApi(id, "pickedUp");
      if (action === "completed") await updateRequestStatusApi(id, "completed");
      setInfo("Status updated successfully");
      load();
    } catch (err) {
      setError(err.response?.data?.message || "Action failed");
    } finally {
      setBusy(false);
    }
  };

  if (loading)
    return (
      <VendorLayout>
        <Loader />
      </VendorLayout>
    );

  if (!request)
    return (
      <VendorLayout>
        <Alert type="error" message={error || "Request not found"} />
      </VendorLayout>
    );

  return (
    <VendorLayout>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-slate-500 hover:text-slate-700 text-sm">
            Back
          </button>
          <h1 className="text-2xl font-bold text-slate-900">Request Detail</h1>
        </div>
        <Badge status={request.status} />
      </div>

      {error && <Alert type="error" message={error} onClose={() => setError("")} className="mb-4" />}
      {info && <Alert type="success" message={info} onClose={() => setInfo("")} className="mb-4" />}

      <div className="grid xl:grid-cols-3 gap-5">
        <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6">
          <h2 className="font-semibold text-slate-900 text-lg mb-5">{request.categoryId?.name}</h2>

          <div className="grid sm:grid-cols-2 gap-4 text-sm mb-5">
            <div>
              <p className="text-slate-400 text-xs mb-0.5">Pickup Address</p>
              <p className="text-slate-700">{request.pickupAddress}</p>
            </div>
            <div>
              <p className="text-slate-400 text-xs mb-0.5">User</p>
              <p className="text-slate-700">{request.userId?.name}</p>
              <p className="text-slate-500 text-xs">{request.userId?.phone || "Phone not available"}</p>
            </div>
            <div>
              <p className="text-slate-400 text-xs mb-0.5">Requested On</p>
              <p className="text-slate-700">{fmt(request.createdAt)}</p>
            </div>
            <div>
              <p className="text-slate-400 text-xs mb-0.5">Estimated Weight</p>
              <p className="text-slate-700">{request.estimatedWeight ? `${request.estimatedWeight} kg` : "Not provided"}</p>
            </div>
          </div>

          {request.description && (
            <div className="mb-5">
              <p className="text-slate-400 text-xs mb-0.5">Notes</p>
              <p className="text-sm text-slate-700 leading-6">{request.description}</p>
            </div>
          )}

          {request.location?.lat && request.location?.lng && (
            <div className="mb-5">
              <p className="text-slate-400 text-xs mb-1">Coordinates</p>
              <p className="text-sm text-slate-700">
                {request.location.lat}, {request.location.lng}
              </p>
            </div>
          )}

          {request.images?.length > 0 && (
            <div>
              <p className="text-slate-400 text-xs mb-2">Images</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {request.images.map((img, i) => (
                  <a
                    key={i}
                    href={img.url}
                    target="_blank"
                    rel="noreferrer"
                    className="block rounded-xl border border-slate-200 overflow-hidden hover:opacity-90"
                  >
                    <img src={img.url} alt="scrap" className="w-full h-24 object-cover" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 h-fit">
          <h3 className="text-sm font-semibold text-slate-900 mb-4">Actions</h3>

          <div className="space-y-2">
            {request.status === "pending" && (
              <Button onClick={() => handle("accept")} loading={busy} className="w-full justify-center">
                Accept Request
              </Button>
            )}
            {request.status === "accepted" && isMyRequest && (
              <>
                <Button onClick={() => handle("pickedUp")} loading={busy} className="w-full justify-center">
                  Mark Picked Up
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => handle("reject")}
                  loading={busy}
                  className="w-full justify-center"
                >
                  Return to Pending
                </Button>
              </>
            )}
            {request.status === "pickedUp" && isMyRequest && (
              <Button onClick={() => handle("completed")} loading={busy} className="w-full justify-center">
                Mark Completed
              </Button>
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-500 space-y-1">
            <p>
              Status: <span className="font-medium text-slate-700">{request.status}</span>
            </p>
            <p>
              Assigned vendor: <span className="font-medium text-slate-700">{request.vendorId?.name || "Unassigned"}</span>
            </p>
            {request.status === "pending" && <p>Accept this request to move it into your jobs list.</p>}
            {(request.status === "accepted" || request.status === "pickedUp") && isMyRequest && (
              <p>Use actions above to update job progress.</p>
            )}
            {(request.status === "accepted" || request.status === "pickedUp") && !isMyRequest && (
              <p className="text-amber-700 font-medium">Assigned to another vendor.</p>
            )}
            {request.status === "completed" && <p className="text-emerald-700 font-medium">This request is completed.</p>}
            {request.status === "cancelled" && <p className="text-rose-700 font-medium">This request was cancelled.</p>}
          </div>
        </div>
      </div>
    </VendorLayout>
  );
};

export default VendorRequestDetail;

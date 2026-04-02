import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, BadgeCheck, IndianRupee } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import Alert from "../../components/ui/Alert";
import Button from "../../components/ui/Button";
import { createOrder, getPlans, verifyPayment } from "../../api/payment.api";

const highlights = [
  "Consistent daily pickup requests",
  "Admin-verified vendor status",
  "Contribute to eco-friendly recycling",
  "Expand your service area over time",
];

const BecomeVendorPage = () => {
  const navigate = useNavigate();
  const { registerVendor, loading } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    lat: "",
    lng: "",
  });
  const [idProof, setIdProof] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [plans, setPlans] = useState([]);
  const [selectedPlanId, setSelectedPlanId] = useState("");
  const [plansLoading, setPlansLoading] = useState(true);
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [scrapTypes, setScrapTypes] = useState([]);
  const [idPreview, setIdPreview] = useState("");

  const selectedPlan = plans.find((plan) => plan._id === selectedPlanId) || plans[0] || null;

  useEffect(() => {
    getPlans()
      .then((res) => {
        const fetchedPlans = res.data?.plans || [];
        setError("");
        setPlans(fetchedPlans);
        if (fetchedPlans[0]) {
          setSelectedPlanId(fetchedPlans[0]._id);
        }
      })
      .catch((err) => {
        setError(err.response?.data?.message || err.message || "Failed to load subscription plans");
      })
      .finally(() => setPlansLoading(false));
  }, []);

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.password || !form.phone || !form.address) {
      setError("All fields are required");
      return;
    }

    if (!idProof) {
      setError("ID proof is required");
      return;
    }

    if (!selectedPlanId) {
      setError("Please select a subscription plan");
      return;
    }

    if (!vehicleTypes.length) {
  setError("Select at least one vehicle type");
  return;
}

if (!scrapTypes.length) {
  setError("Select at least one scrap type");
  return;
}

    if (!window.Razorpay) {
      setError("Razorpay checkout is unavailable right now. Please refresh and try again.");
      return;
    }

    try {
      const orderRes = await createOrder({
        planId: selectedPlanId,
        name: form.name,
        email: form.email,
      });

      const order = orderRes.data?.order;
      const subscriptionId = orderRes.data?.subscriptionId;
      const plan = orderRes.data?.plan;
      const keyId = orderRes.data?.keyId;

      if (!order || !subscriptionId || !plan || !keyId) {
        setError("Unable to initialize payment");
        return;
      }

      const options = {
        key: keyId,
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        name: "Scrap Collection",
        description: `${plan.name} vendor subscription`,
        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phone,
        },
        handler: async (response) => {
          try {
            const verifyData = await verifyPayment({
              subscriptionId,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (!verifyData.success) {
              setError("Payment verification failed");
              return;
            }

            const fd = new FormData();
            Object.entries(form).forEach(([key, value]) => {
              if (value) {
                fd.append(key, value);
              }
            });
            vehicleTypes.forEach(v => fd.append("vehicleTypes", v));
scrapTypes.forEach(s => fd.append("scrapTypes", s));
            fd.append("idProof", idProof);
            fd.append("planId", selectedPlanId);
            fd.append("subscriptionId", verifyData.data?.subscription?.id);
            fd.append("paymentId", response.razorpay_payment_id);
            fd.append("paymentOrderId", response.razorpay_order_id);
            fd.append("paymentSignature", response.razorpay_signature);

            const res = await registerVendor(fd);

            if (res.success) {
              setSuccess(`Payment successful for ${plan.name}. Vendor application submitted for admin approval.`);
              setForm({
                name: "",
                email: "",
                password: "",
                phone: "",
                address: "",
                lat: "",
                lng: "",
              });
              setIdProof(null);
              if (plans[0]) {
                setSelectedPlanId(plans[0]._id);
              }
            } else {
              setError(res.message);
            }
          } catch (err) {
            console.error(err);
            setError("Payment verification failed");
          }
        },
        modal: {
          ondismiss: () => setError("Payment was cancelled"),
        },
        theme: {
          color: "#0F2B5B",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Payment initialization failed");
    }
  };

  return (
    <div className="grid min-h-screen md:grid-cols-2">
      <div className="hidden flex-col justify-between bg-gradient-to-b from-[#1f5f3b] to-[#0f2f1f] p-12 text-white md:flex">
        <div>
          <div className="mb-12 flex items-center gap-3">
            <img src="/assets/logo.png" alt="ScrapZone logo" className="h-8 w-8" />
            <span className="font-heading text-3xl">ScrapZone</span>
          </div>

          <h2 className="mb-4 font-heading text-4xl leading-snug">
            Grow Your Scrap Business with Us
          </h2>

          <p className="mb-10 max-w-md text-green-200">
            Join our verified vendor network and get consistent pickup leads, optimise your
            routes, and increase earnings.
          </p>

          <div className="space-y-4 text-green-200">
            {highlights.map((item) => (
              <div key={item} className="flex gap-3">
                <BadgeCheck className="h-5 w-5 text-[#E5C447]" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <p className="text-sm text-green-300">© 2026 ScrapZone</p>
      </div>

      <div className="flex items-center justify-center bg-gray-50 px-6 py-12">
        <div className="w-full max-w-lg rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
          <button
            onClick={() => navigate(-1)}
            className="mb-6 inline-flex items-center gap-2 text-sm text-gray-500"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>

          <h2 className="mb-1 font-heading text-3xl text-gray-800">Vendor Registration</h2>
          <p className="mb-6 text-sm text-gray-500">Choose a plan and submit your vendor details</p>

          {error && <Alert type="error" message={error} onClose={() => setError("")} />}
          {success && <Alert type="success" message={success} />}

          {!success && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Subscription Plan</label>

                {plansLoading ? (
                  <div className="rounded-lg border px-4 py-3 text-sm text-gray-500">Loading plans...</div>
                ) : plans.length === 0 ? (
                  <div className="rounded-lg border px-4 py-3 text-sm text-red-500">No active plans available</div>
                ) : (
                  <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
                    <div className="flex justify-between gap-4">
                      <div>
                        <p className="text-lg font-semibold">{selectedPlan?.name}</p>
                        <p className="text-sm text-gray-600">{selectedPlan?.description}</p>
                      </div>

                      <div className="text-right">
                        <p className="inline-flex items-center gap-1 text-2xl font-bold">
                          <IndianRupee className="h-5 w-5" />
                          {selectedPlan?.price}
                        </p>
                        <p className="text-sm text-gray-500">{selectedPlan?.durationInDays} days</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Business Name</label>
                  <input
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your business name"
                    className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    name="phone"
                    type="text"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="9876543210"
                    className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Password</label>
                  <input
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Min 6 characters"
                    className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Service Area</label>
                <input
                  name="address"
                  type="text"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Your service area"
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Latitude (optional)</label>
                  <input
                    name="lat"
                    type="text"
                    value={form.lat}
                    onChange={handleChange}
                    placeholder="12.9716"
                    className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Longitude (optional)</label>
                  <input
                    name="lng"
                    type="text"
                    value={form.lng}
                    onChange={handleChange}
                    placeholder="77.5946"
                    className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              <div>
  <label className="mb-2 block text-sm font-medium text-gray-700">
    Vehicle Types <span className="text-red-500">*</span>
  </label>

  <div className="grid grid-cols-3 gap-3">
    {[
      { label: "2W", value: "2_wheeler", icon: "🛵" },
      { label: "3W", value: "3_wheeler", icon: "🛺" },
      { label: "4W", value: "4_wheeler", icon: "🚚" },
    ].map((item) => {
      const selected = vehicleTypes.includes(item.value);

      return (
        <div
          key={item.value}
          onClick={() => {
            if (selected) {
              setVehicleTypes(vehicleTypes.filter(v => v !== item.value));
            } else {
              setVehicleTypes([...vehicleTypes, item.value]);
            }
          }}
          className={`cursor-pointer border rounded-lg p-3 text-center ${
            selected
              ? "border-primary bg-primary/10"
              : "border-gray-300"
          }`}
        >
          <div>{item.icon}</div>
          <div className="text-xs">{item.label}</div>
        </div>
      );
    })}
  </div>
</div>

<div>
  <label className="mb-2 block text-sm font-medium text-gray-700">
    Scrap Types <span className="text-red-500">*</span>
  </label>

  <div className="grid grid-cols-2 gap-3">
    {[
      { label: "Household", value: "household", icon: "🏠" },
      { label: "Shop", value: "shop", icon: "🏪" },
      { label: "Small Ind", value: "small_industry", icon: "🏭" },
      { label: "Large Ind", value: "large_industry", icon: "🏢" },
    ].map((item) => {
      const selected = scrapTypes.includes(item.value);

      return (
        <div
          key={item.value}
          onClick={() => {
            if (selected) {
              setScrapTypes(scrapTypes.filter(s => s !== item.value));
            } else {
              setScrapTypes([...scrapTypes, item.value]);
            }
          }}
          className={`cursor-pointer border rounded-lg p-3 flex items-center gap-2 ${
            selected
              ? "border-primary bg-primary/10"
              : "border-gray-300"
          }`}
        >
          <span>{item.icon}</span>
          <span className="text-sm">{item.label}</span>
        </div>
      );
    })}
  </div>
</div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">ID Proof</label>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/jpg,image/webp"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) {
                      setIdProof(file);
                      setIdPreview(URL.createObjectURL(file));
                    }
                    setError("");
                  }}
                  className="w-full text-sm text-gray-500 file:mr-3 file:rounded-lg file:border-0 file:bg-primary file:px-4 file:py-2 file:text-white"
                />
              </div>
              {idPreview && (
  <div className="mt-3">
    <p className="text-xs text-gray-500 mb-1">Preview:</p>

    <img
      src={idPreview}
      alt="ID Preview"
      className="w-32 h-20 object-cover rounded-lg border"
    />
  </div>
)}

              <Button
                type="submit"
                loading={loading || plansLoading}
                disabled={plansLoading || plans.length === 0}
                className="w-full justify-center"
              >
                Pay & Register as Vendor
              </Button>
            </form>
          )}

          <p className="mt-6 text-center text-sm text-gray-500">
            Already approved?{" "}
            <Link to="/login" className="font-semibold text-primary hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BecomeVendorPage;

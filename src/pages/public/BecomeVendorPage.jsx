import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Alert from "../../components/ui/Alert";
import Button from "../../components/ui/Button";
import { createOrder, getPlans, verifyPayment } from "../../api/payment.api";

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
    lng: ""
  });

  const [idProof, setIdProof] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [plans, setPlans] = useState([]);
  const [selectedPlanId, setSelectedPlanId] = useState("");
  const [plansLoading, setPlansLoading] = useState(true);
  const [plansLoadFailed, setPlansLoadFailed] = useState(false);

  const selectedPlan = plans.find((plan) => plan._id === selectedPlanId) || plans[0] || null;

  useEffect(() => {
    getPlans()
      .then((res) => {
        const fetchedPlans = res.data?.plans || [];
        setError("");
        setPlansLoadFailed(false);
        setPlans(fetchedPlans);
        if (fetchedPlans[0]) setSelectedPlanId(fetchedPlans[0]._id);
      })
      .catch((err) => {
        setPlansLoadFailed(true);
        setError(err.response?.data?.message || err.message || "Failed to load subscription plans");
      })
      .finally(() => setPlansLoading(false));
  }, []);

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
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

    try {
      const orderRes = await createOrder({
        planId: selectedPlanId,
        name: form.name,
        email: form.email
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
          contact: form.phone
        },
        handler: async function (response) {
          try {
            const verifyData = await verifyPayment({
              subscriptionId,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            });

            if (!verifyData.success) {
              setError("Payment verification failed");
              return;
            }

            const fd = new FormData();

            Object.entries(form).forEach(([k, v]) => {
              if (v) fd.append(k, v);
            });

            fd.append("idProof", idProof);
            fd.append("planId", selectedPlanId);
            fd.append("subscriptionId", verifyData.data?.subscription?.id);
            fd.append("paymentId", response.razorpay_payment_id);
            fd.append("paymentOrderId", response.razorpay_order_id);
            fd.append("paymentSignature", response.razorpay_signature);

            const res = await registerVendor(fd);

            if (res.success) {
              setSuccess(
                `Payment successful for ${plan.name}. Vendor application submitted for admin approval.`
              );

              setForm({
                name: "",
                email: "",
                password: "",
                phone: "",
                address: "",
                lat: "",
                lng: ""
              });

              setIdProof(null);
              if (plans[0]) setSelectedPlanId(plans[0]._id);
            } else {
              setError(res.message);
            }
          } catch (err) {
            console.error(err);
            setError("Payment verification failed");
          }
        },
        modal: {
          ondismiss: () => setError("Payment was cancelled")
        },
        theme: {
          color: "#0F2B5B"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Payment initialization failed");
    }
  };

return (
  <div className="min-h-screen grid md:grid-cols-2">

    {/* LEFT PANEL */}
    <div className="hidden md:flex flex-col justify-between bg-gradient-to-b from-[#1f5f3b] to-[#0f2f1f] text-white p-12">

      <div>

        <div className="flex items-center gap-3 mb-12">
          <img src="/assets/logo.png" className="w-8 h-8" />
          <span className="font-heading text-3xl">ScrapZone</span>
        </div>

        <h2 className="font-heading text-4xl leading-snug mb-4">
          Grow Your Scrap Business with Us
        </h2>

        <p className="text-green-200 mb-10 max-w-md">
          Join our verified vendor network and get consistent pickup leads,
          optimise your routes, and increase earnings.
        </p>

        <div className="space-y-4 text-green-200">

          <div className="flex gap-3">
            <span className="text-[#E5C447]">✔</span>
            Consistent daily pickup requests
          </div>

          <div className="flex gap-3">
            <span className="text-[#E5C447]">✔</span>
            Admin-verified vendor status
          </div>

          <div className="flex gap-3">
            <span className="text-[#E5C447]">✔</span>
            Contribute to eco-friendly recycling
          </div>

          <div className="flex gap-3">
            <span className="text-[#E5C447]">✔</span>
            Expand your service area over time
          </div>

        </div>
      </div>

      <p className="text-green-300 text-sm">
        © 2026 ScrapZone
      </p>

    </div>


    {/* RIGHT FORM */}
    <div className="bg-gray-50 flex items-center justify-center px-6 py-12">

      <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-sm border border-gray-100">

        <button
          onClick={() => navigate(-1)}
          className="text-gray-500 text-sm mb-6"
        >
          ← Back
        </button>

        <h2 className="font-heading text-3xl text-gray-800 mb-1">
          Vendor Registration
        </h2>

        <p className="text-gray-500 text-sm mb-6">
          Choose a plan and submit your vendor details
        </p>

        {error && (
          <Alert type="error" message={error} onClose={() => setError("")} />
        )}

        {success && (
          <Alert type="success" message={success} />
        )}

        {!success && (
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* PLAN */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subscription Plan
              </label>

              {plansLoading ? (
                <div className="border rounded-lg px-4 py-3 text-sm text-gray-500">
                  Loading plans...
                </div>
              ) : plans.length === 0 ? (
                <div className="border rounded-lg px-4 py-3 text-sm text-red-500">
                  No active plans available
                </div>
              ) : (
                <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">

                  <div className="flex justify-between">

                    <div>
                      <p className="text-lg font-semibold">
                        {selectedPlan?.name}
                      </p>

                      <p className="text-sm text-gray-600">
                        {selectedPlan?.description}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-2xl font-bold">
                        ₹{selectedPlan?.price}
                      </p>

                      <p className="text-sm text-gray-500">
                        {selectedPlan?.durationInDays} days
                      </p>
                    </div>

                  </div>

                </div>
              )}
            </div>


{/* FORM FIELDS */}

<div className="grid md:grid-cols-2 gap-4">

  {/* BUSINESS NAME */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Business Name
    </label>

    <input
      name="name"
      type="text"
      value={form.name}
      onChange={handleChange}
      placeholder="Your business name"
      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20"
    />
  </div>


  {/* EMAIL */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Email
    </label>

    <input
      name="email"
      type="email"
      value={form.email}
      onChange={handleChange}
      placeholder="you@example.com"
      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20"
    />
  </div>


  {/* PHONE */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Phone
    </label>

    <input
      name="phone"
      type="text"
      value={form.phone}
      onChange={handleChange}
      placeholder="9876543210"
      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20"
    />
  </div>


  {/* PASSWORD */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Password
    </label>

    <input
      name="password"
      type="password"
      value={form.password}
      onChange={handleChange}
      placeholder="Min 6 characters"
      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20"
    />
  </div>

</div>


{/* SERVICE AREA FULL WIDTH */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Service Area
  </label>

  <input
    name="address"
    type="text"
    value={form.address}
    onChange={handleChange}
    placeholder="Your service area"
    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20"
  />
</div>


{/* LAT LNG */}
<div className="grid md:grid-cols-2 gap-4">

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Latitude (optional)
    </label>

    <input
      name="lat"
      type="text"
      value={form.lat}
      onChange={handleChange}
      placeholder="12.9716"
      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20"
    />
  </div>


  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Longitude (optional)
    </label>

    <input
      name="lng"
      type="text"
      value={form.lng}
      onChange={handleChange}
      placeholder="77.5946"
      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20"
    />
  </div>

</div>

            {/* FILE */}
            <div>

              <label className="block text-sm font-medium text-gray-700 mb-1">
                ID Proof
              </label>

              <input
                type="file"
                accept="image/jpeg,image/png,image/jpg,image/webp"
                onChange={(e) => {
                  setIdProof(e.target.files[0]);
                  setError("");
                }}
                className="w-full text-sm text-gray-500 file:mr-3 file:px-4 file:py-2 file:bg-primary file:text-white file:border-0 file:rounded-lg"
              />

            </div>


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

        <p className="text-sm text-center text-gray-500 mt-6">

          Already approved?{" "}

          <Link
            to="/login"
            className="text-primary font-semibold hover:underline"
          >
            Login here
          </Link>

        </p>

      </div>
    </div>
  </div>
);
};

export default BecomeVendorPage;

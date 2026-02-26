import { useEffect, useState } from "react";
import { useNavigate }         from "react-router-dom";
import UserLayout              from "../../components/layout/UserLayout";
import Button                  from "../../components/ui/Button";
import Loader                  from "../../components/ui/Loader";
import { getAllCategoriesApi }  from "../../api/category.api";
import { createRequestApi }    from "../../api/request.api";

const CreateRequest = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [catLoading, setCatLoading] = useState(true);
  const [images,     setImages]     = useState([]);
  const [loading,    setLoading]    = useState(false);
  const [errors,     setErrors]     = useState({});

  const [form, setForm] = useState({
    categoryId:      "",
    pickupAddress:   "",
    description:     "",
    preferredDate:   "",
    estimatedWeight: "",
    lat:             "",
    lng:             "",
  });

  useEffect(() => {
    getAllCategoriesApi()
      .then((res) => setCategories(res.data.categories))
      .catch(() => setErrors({ general: "Failed to load categories" }))
      .finally(() => setCatLoading(false));
  }, []);

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setErrors((p) => ({ ...p, [e.target.name]: "", general: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = {};

    // category
    if (!form.categoryId)
      err.categoryId = "Please select a category";

    // pickup address
    if (!form.pickupAddress.trim())
      err.pickupAddress = "Pickup address is required";

    // preferred date — required, cannot be in the past
    if (!form.preferredDate) {
      err.preferredDate = "Preferred date is required";
    } else {
      const today = new Date().toISOString().split("T")[0];
      if (form.preferredDate < today)
        err.preferredDate = "Date cannot be in the past";
    }

    // estimated weight — required, must be > 0
    if (!form.estimatedWeight) {
      err.estimatedWeight = "Estimated weight is required";
    } else if (isNaN(Number(form.estimatedWeight)) || Number(form.estimatedWeight) <= 0) {
      err.estimatedWeight = "Weight must be a positive number";
    }

    // lat/lng — must be valid numbers and must come in pairs
    if (form.lat && isNaN(Number(form.lat)))
      err.lat = "Latitude must be a valid number";

    if (form.lng && isNaN(Number(form.lng)))
      err.lng = "Longitude must be a valid number";

    if ((form.lat && !form.lng) || (!form.lat && form.lng))
      err.lat = "Both latitude and longitude are required together";

    if (Object.keys(err).length) { setErrors(err); return; }

    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => { if (v) fd.append(k, v); });
    images.forEach((img) => fd.append("images", img));

    setLoading(true);
    try {
      await createRequestApi(fd);
      navigate("/user/requests");
    } catch (err) {
      setErrors({ general: err.response?.data?.message || "Failed to create request" });
    } finally {
      setLoading(false);
    }
  };

  const fieldClass = (name) =>
    `w-full border rounded-lg px-3 py-2 text-sm outline-none transition-all ${
      errors[name]
        ? "border-red-300 focus:ring-2 focus:ring-red-100"
        : "border-gray-300 focus:ring-2 focus:ring-primary/30"
    }`;

  const FieldError = ({ name }) =>
    errors[name] ? (
      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
        <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        {errors[name]}
      </p>
    ) : null;

  if (catLoading) return <UserLayout><Loader /></UserLayout>;

  return (
    <UserLayout>
      <h1 className="text-xl font-bold text-gray-800 mb-6">Create Scrap Request</h1>

      {/* general backend error */}
      {errors.general && (
        <div className="flex items-start gap-2.5 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-5">
          <svg className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm text-red-700 flex-1">{errors.general}</p>
          <button onClick={() => setErrors({})} className="text-red-300 hover:text-red-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm max-w-2xl p-6">
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              name="categoryId"
              value={form.categoryId}
              onChange={handleChange}
              className={fieldClass("categoryId")}
            >
              <option value="">Select a category</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>{c.name}</option>
              ))}
            </select>
            <FieldError name="categoryId" />
          </div>

          {/* pickup address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pickup Address <span className="text-red-500">*</span>
            </label>
            <textarea
              name="pickupAddress"
              value={form.pickupAddress}
              onChange={handleChange}
              rows={3}
              placeholder="Enter your full pickup address"
              className={`${fieldClass("pickupAddress")} resize-none`}
            />
            <FieldError name="pickupAddress" />
          </div>

          {/* description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={2}
              placeholder="Any extra details about the scrap"
              className={`${fieldClass("description")} resize-none`}
            />
          </div>

          {/* preferred date + estimated weight */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Date <span className="text-red-500">*</span>
              </label>
              <input
                name="preferredDate"
                type="date"
                value={form.preferredDate}
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]}
                className={fieldClass("preferredDate")}
              />
              <FieldError name="preferredDate" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Est. Weight (kg) <span className="text-red-500">*</span>
              </label>
              <input
                name="estimatedWeight"
                type="number"
                value={form.estimatedWeight}
                onChange={handleChange}
                placeholder="e.g. 10"
                min="1"
                className={fieldClass("estimatedWeight")}
              />
              <FieldError name="estimatedWeight" />
            </div>
          </div>

          {/* lat + lng */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Latitude (optional)</label>
              <input
                name="lat"
                type="text"
                value={form.lat}
                onChange={handleChange}
                placeholder="e.g. 12.9716"
                className={fieldClass("lat")}
              />
              <FieldError name="lat" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Longitude (optional)</label>
              <input
                name="lng"
                type="text"
                value={form.lng}
                onChange={handleChange}
                placeholder="e.g. 77.5946"
                className={fieldClass("lng")}
              />
              <FieldError name="lng" />
            </div>
          </div>

          {/* images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Images <span className="text-gray-400 font-normal">(max 5 · JPG, PNG, WEBP · max 5MB each)</span>
            </label>
            <input
              type="file"
              accept="image/jpeg,image/png,image/jpg,image/webp"
              multiple
              onChange={(e) => {
                const files = Array.from(e.target.files);
                if (files.length > 5) {
                  setErrors((p) => ({ ...p, images: "Maximum 5 images allowed" }));
                  return;
                }
                const oversized = files.some((f) => f.size > 5 * 1024 * 1024);
                if (oversized) {
                  setErrors((p) => ({ ...p, images: "Each image must be smaller than 5MB" }));
                  return;
                }
                setImages(files);
                setErrors((p) => ({ ...p, images: "" }));
              }}
              className="w-full text-sm text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-primary file:text-white file:text-sm"
            />
            <FieldError name="images" />
            {images.length > 0 && (
              <p className="text-xs text-gray-400 mt-1">{images.length} file{images.length > 1 ? "s" : ""} selected</p>
            )}
          </div>

          <Button type="submit" loading={loading} className="w-full justify-center">
            Submit Request
          </Button>
        </form>
      </div>
    </UserLayout>
  );
};

export default CreateRequest;
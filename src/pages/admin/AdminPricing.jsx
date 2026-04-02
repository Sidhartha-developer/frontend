import { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import axios from "axios";
import instance from "../../api/axiosInstance";
import { getAllCategoriesApi } from "../../api/category.api";

const AdminPricing = () => {
  const [categories, setCategories] = useState([]);
  const [prices, setPrices] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [catRes, priceRes] = await Promise.all([
        getAllCategoriesApi(),
        axios.get("/prices"),
      ]);

      const cats = catRes?.data?.categories || [];

      const priceList =
        priceRes.data?.data?.prices ||
        priceRes.data?.prices ||
        [];

      const priceMap = {};
      priceList.forEach((p) => {
        if (p.categoryId?._id) {
          priceMap[p.categoryId._id] = p.pricePerKg;
        }
      });

      setCategories(cats);
      setPrices(priceMap);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (catId) => {
    setEditingId(catId);
    setInputValue(prices[catId] ?? 10);
  };

  const savePrice = async (catId) => {
    try {
      await instance.post(
        "/prices",
        {
          categoryId: catId,
          pricePerKg: Number(inputValue),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setPrices((prev) => ({
        ...prev,
        [catId]: Number(inputValue),
      }));

      setEditingId(null);
    } catch (err) {
      console.error(err);
    }
  };

  const deletePrice = async (catId) => {
    try {
      await instance.delete(`/prices/${catId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setPrices((prev) => {
        const updated = { ...prev };
        delete updated[catId];
        return updated;
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-xl font-bold mb-6">Scrap Pricing</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr className="text-left text-gray-500">
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Price (₹/kg)</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {categories.map((cat) => (
                <tr key={cat._id} className="border-t hover:bg-gray-50">
                  {/* Category */}
                  <td className="px-6 py-4 font-medium">
                    {cat.name}
                  </td>

                  {/* Price */}
                  <td className="px-6 py-4">
                    {editingId === cat._id ? (
                      <input
                        type="number"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="border px-3 py-1 rounded w-28"
                      />
                    ) : (
                      <span>
                        ₹{prices[cat._id] ?? 10}
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 flex gap-2">
                    {editingId === cat._id ? (
                      <>
                        <button
                          onClick={() => savePrice(cat._id)}
                          className="bg-green-500 text-white px-3 py-1 rounded text-xs"
                        >
                          Save
                        </button>

                        <button
                          onClick={() => setEditingId(null)}
                          className="bg-gray-300 px-3 py-1 rounded text-xs"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => startEdit(cat._id)}
                          className="bg-blue-500 text-white px-3 py-1 rounded text-xs"
                        >
                          Edit
                        </button>

                        {/* <button
                          onClick={() => deletePrice(cat._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded text-xs"
                        >
                          Delete
                        </button> */}
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminPricing;
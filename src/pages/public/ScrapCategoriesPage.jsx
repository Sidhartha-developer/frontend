import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { getAllCategoriesApi } from "../../api/category.api";

function ScrapCategoriesPage() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // ⭐ Fetch categories from dashboard
  useEffect(() => {
    getAllCategoriesApi()
      .then((res) => setCategories(res.data.categories || []))
      .catch(() => setCategories([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="w-full overflow-hidden">
      {/* Navbar */}
      <Navbar />

      {/* HERO */}
      <section className="relative h-[65vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-green-100"></div>

        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
          <img
            src="/assets/categories.png"
            alt="categories illustration"
            className="w-[1000px] max-w-[90%] object-contain"
          />
        </div>

        <motion.div
          className="relative text-center space-y-4 mt-20 px-6 max-w-2xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="text-green-600 font-semibold uppercase tracking-wide text-sm">
            Categories
          </span>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Scrap Categories We Collect
          </h1>

          <p className="text-gray-600 max-w-xl mx-auto">
            Discover recyclable material types accepted by our vendor network
            for responsible processing and reuse.
          </p>
        </motion.div>
      </section>

      {/* ⭐ GRID (DYNAMIC NOW) */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">

          {loading ? (
            <p className="col-span-3 text-center text-gray-400">
              Loading categories...
            </p>
          ) : categories.length === 0 ? (
            <p className="col-span-3 text-center text-gray-400">
              No categories available
            </p>
          ) : (
            categories.map((cat, i) => (
              <motion.div
                key={cat._id || i}
                className="bg-gray-50 p-8 rounded-xl border border-gray-100 text-center space-y-4 shadow-sm hover:shadow-md transition"
                whileHover={{ y: -8 }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                {/* icon */}
                <div className="w-14 h-14 mx-auto rounded-full bg-green-100 flex items-center justify-center text-2xl">
                  {cat.iconUrl ? (
                    <img
                      src={cat.iconUrl}
                      alt={cat.name}
                      className="w-7 h-7 object-contain"
                    />
                  ) : (
                    "♻️"
                  )}
                </div>

                <h3 className="text-xl font-semibold">{cat.name}</h3>
                <p className="text-gray-500">
                  {cat.description || "Recyclable material category"}
                </p>
              </motion.div>
            ))
          )}

        </div>
      </section>

      {/* INFO */}
      <motion.section
        className="py-28 bg-gray-50 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-3xl mx-auto px-6 space-y-4">
          <h2 className="text-4xl font-bold">
            Not Sure About Your Scrap Type?
          </h2>

          <p className="text-gray-500">
            During pickup, vendors help identify and categorize materials,
            ensuring accurate pricing and environmentally responsible recycling.
          </p>
        </div>
      </motion.section>

      {/* CTA */}
      <motion.section
        className="py-28 bg-white text-center border-t border-gray-100"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="space-y-6 px-6">
          <h2 className="text-4xl font-bold">
            Ready to Schedule a Pickup?
          </h2>

          <p className="text-gray-500 max-w-xl mx-auto">
            Create your account and submit your first scrap pickup request in
            just a few steps.
          </p>

          <motion.button
            onClick={() => navigate("/register")}
            className="bg-green-500 text-white px-8 py-3 rounded-md font-semibold shadow-sm hover:bg-green-600"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Create Pickup Request →
          </motion.button>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}

export default ScrapCategoriesPage;
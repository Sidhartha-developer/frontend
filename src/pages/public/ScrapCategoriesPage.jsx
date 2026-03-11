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

  useEffect(() => {
    getAllCategoriesApi()
      .then((res) => setCategories(res.data.categories || []))
      .catch(() => setCategories([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="w-full overflow-hidden">

      <Navbar />

{/* HERO */}
<section className="relative bg-gradient-to-b from-[#1f5f3b] to-[#0f2f1f] py-40 text-center overflow-hidden">

  {/* soft glow background */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute left-1/4 top-10 w-[500px] h-[500px] bg-green-400/10 blur-3xl rounded-full"></div>
    <div className="absolute right-1/4 bottom-10 w-[400px] h-[400px] bg-green-500/10 blur-3xl rounded-full"></div>
  </div>

  <motion.div
    className="relative max-w-3xl mx-auto px-6 space-y-6"
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
  >

    {/* label */}
    <span className="inline-block text-xs uppercase tracking-widest font-semibold text-green-200 border border-green-400/30 px-4 py-1 rounded-full">
      Categories
    </span>

    {/* heading */}
    <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
      Scrap <span className="text-[#E5C447]">Categories</span>
      <br />
      We Collect
    </h1>

    {/* description */}
    <p className="text-green-100 text-lg max-w-xl mx-auto">
      Discover recyclable material types accepted by our vendor network
      for responsible processing and reuse.
    </p>

  </motion.div>

</section>


      {/* CATEGORY GRID */}
      <section className="py-28 bg-white">

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">

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
                className="bg-green-50 p-10 rounded-xl text-center space-y-4 shadow-sm hover:shadow-lg transition"
                whileHover={{ y: -8 }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >

                <div className="w-16 h-16 mx-auto rounded-full bg-primary text-white flex items-center justify-center text-2xl">

                  {cat.iconUrl ? (
                    <img
                      src={cat.iconUrl}
                      alt={cat.name}
                      className="w-8 h-8 object-contain"
                    />
                  ) : (
                    "♻️"
                  )}

                </div>

                <h3 className="font-heading text-3xl text-gray-800">
                  {cat.name}
                </h3>

                <p className="text-gray-500 text-sm">
                  {cat.description || "Recyclable material category"}
                </p>

              </motion.div>

            ))
          )}

        </div>

      </section>


      {/* INFO SECTION */}
      <motion.section
        className="py-28 bg-green-50 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >

        <div className="max-w-3xl mx-auto px-6 space-y-5">

          <h2 className="font-heading text-6xl text-primary">
            Not Sure About
            <br />
            Your Scrap Type?
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

          <h2 className="font-heading text-6xl text-primary">
            Ready to Schedule
            <br />
            a Pickup?
          </h2>

          <p className="text-gray-500 max-w-xl mx-auto">
            Create your account and submit your first scrap pickup request
            in just a few steps.
          </p>

          <motion.button
            onClick={() => navigate("/register")}
            className="bg-[#F4B400] text-gray-900 px-10 py-4 rounded-md font-semibold shadow-md hover:bg-yellow-500 transition"
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
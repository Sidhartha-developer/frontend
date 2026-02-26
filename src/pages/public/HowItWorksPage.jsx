import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

function HowItWorksPage() {
  const navigate = useNavigate();

  return (
    <div className="w-full overflow-hidden">
        {/* Navbar */}
  <Navbar />

      {/* HERO */}
<section className="relative h-[65vh] flex items-center justify-center overflow-hidden">

  {/* gradient base */}
  <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-green-100"></div>

  {/* illustration background */}
  <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
    <img
      src="/assets/steps.png"   // your generated image
      alt="workflow illustration"
      className="w-[1000px] max-w-[90%] object-contain"
    />
  </div>

  {/* content */}
  <motion.div
    className="relative text-center space-y-4 mt-20 px-6 max-w-2xl"
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
  >
    <span className="text-green-600 font-semibold uppercase tracking-wide text-sm">
      Process
    </span>

    <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
      How Scrap Collection Works
    </h1>

    <p className="text-gray-600 max-w-xl mx-auto">
      A transparent digital workflow connecting households, vendors, and
      administrators to ensure efficient scrap pickup and recycling.
    </p>
  </motion.div>

</section>

      {/* STEPS */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10 text-center">

          {[
            [
              "1",
              "Register & Login",
              "Create your account as a user or vendor and securely access the platform dashboard.",
            ],
            [
              "2",
              "Submit Scrap Request",
              "Provide scrap category, pickup address, and optional images to create a detailed request.",
            ],
            [
              "3",
              "Vendor Notification",
              "Nearby approved vendors receive instant notifications and review request details.",
            ],
            [
              "4",
              "Pickup & Completion",
              "Vendor accepts the request, collects scrap, and updates job status for transparent tracking.",
            ],
          ].map((step, i) => (
            <motion.div
              key={i}
              className="space-y-4"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
            >
              <div className="w-14 h-14 rounded-full bg-green-500 text-white flex items-center justify-center text-xl font-bold mx-auto shadow-sm">
                {step[0]}
              </div>

              <h3 className="font-semibold">{step[1]}</h3>
              <p className="text-gray-500">{step[2]}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* USER VS VENDOR */}
      <section className="py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10">

          {[
            {
              title: "User Experience",
              points: [
                "Create pickup requests with category and images",
                "Track real-time request status updates",
                "Receive notifications and vendor confirmations",
              ],
            },
            {
              title: "Vendor Experience",
              points: [
                "View nearby scrap requests instantly",
                "Accept or reject requests based on availability",
                "Manage jobs and update completion status",
              ],
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm space-y-4"
              whileHover={{ y: -8 }}
              initial={{ opacity: 0, x: i === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold">{item.title}</h3>

              {item.points.map((p, j) => (
                <div key={j} className="flex gap-3">
                  <span className="text-green-500">✔</span>
                  <p>{p}</p>
                </div>
              ))}
            </motion.div>
          ))}
        </div>
      </section>

      {/* PLATFORM VALUE */}
      <motion.section
        className="py-28 bg-white text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-3xl mx-auto px-6 space-y-4">
          <h2 className="text-4xl font-bold">
            A Unified Scrap Management Ecosystem
          </h2>

          <p className="text-gray-500">
            The platform integrates user requests, vendor workflows, and admin
            oversight into a single digital ecosystem — ensuring transparency,
            efficiency, and scalable recycling impact.
          </p>
        </div>
      </motion.section>

      {/* CTA */}
      <motion.section
        className="py-28 bg-gray-50 text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="space-y-6 px-6">
          <h2 className="text-4xl font-bold">
            Start Your First Scrap Request
          </h2>

          <motion.button
            onClick={() => navigate("/register")}
            className="bg-green-500 text-white px-8 py-3 rounded-md font-semibold shadow-sm hover:bg-green-600"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Create Account →
          </motion.button>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}

export default HowItWorksPage;
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

function HowItWorksPage() {
  const navigate = useNavigate();

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
      Process
    </span>

    {/* heading */}
    <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-white">
      How Scrap <span className="text-[#E5C447]">Collection</span> Works
    </h1>

    {/* description */}
    <p className="text-green-100 text-lg max-w-xl mx-auto">
      A transparent digital workflow connecting households, vendors, and
      administrators to ensure efficient scrap pickup and recycling.
    </p>

  </motion.div>

</section>


      {/* STEPS */}
      <section className="py-28 bg-white">

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 text-center">

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

              <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold mx-auto shadow-md">
                {step[0]}
              </div>

              <h3 className="font-heading text-3xl text-gray-800">
                {step[1]}
              </h3>

              <p className="text-gray-500 text-sm">
                {step[2]}
              </p>

            </motion.div>

          ))}

        </div>

      </section>


      {/* USER VS VENDOR */}
      <section className="py-28 bg-green-50">

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12">

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
              className="bg-white p-10 rounded-xl shadow-sm space-y-5"
              whileHover={{ y: -8 }}
              initial={{ opacity: 0, x: i === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >

              <h3 className="font-heading text-4xl text-primary">
                {item.title}
              </h3>

              {item.points.map((p, j) => (

                <div key={j} className="flex gap-3 items-start">

                  <span className="text-primary font-bold">✔</span>

                  <p className="text-gray-600 text-sm">
                    {p}
                  </p>

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

        <div className="max-w-3xl mx-auto px-6 space-y-5">

          <h2 className="font-heading text-6xl text-primary">
            A Unified Scrap
            <br />
            Management Ecosystem
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
        className="py-28 bg-green-50 text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >

        <div className="space-y-6 px-6">

          <h2 className="font-heading text-6xl text-primary">
            Start Your First
            <br />
            Scrap Request
          </h2>

          <motion.button
            onClick={() => navigate("/register")}
            className="bg-[#F4B400] text-gray-900 px-10 py-4 rounded-md font-semibold shadow-md hover:bg-yellow-500 transition"
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
import { motion } from "framer-motion";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

function ContactPage() {
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
      src="/assets/contact.png"   // ← your generated contact image
      alt="contact illustration"
      className="w-[900px] max-w-[90%] object-contain"
    />
  </div>

  {/* content */}
  <motion.div
    className="relative text-center space-y-4 mt-20 px-6 max-w-2xl"
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
  >
    <span className="text-green-600 font-semibold uppercase tracking-wide text-sm">
      Contact
    </span>

    <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
      Let’s Connect
    </h1>

    <p className="text-gray-600 max-w-xl mx-auto">
      Reach out for support, partnership inquiries, or platform guidance —
      our team is happy to help.
    </p>
  </motion.div>

</section>

      {/* CONTACT + FORM */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">

          {/* LEFT INFO */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold">
              Get in Touch
            </h2>

            <p className="text-gray-500">
              Whether you’re a household user, vendor partner, or organization,
              we’re here to assist you with onboarding, support, and platform
              queries.
            </p>

            {/* info cards */}
            <div className="space-y-6">

              {[
                ["📍", "Address", "Hyderabad, Telangana"],
                ["📞", "Phone", "+91 98765 43210"],
                ["✉️", "Email", "info@scrapzone.com"],
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-xl">
                    {item[0]}
                  </div>

                  <div>
                    <h4 className="font-semibold">{item[1]}</h4>
                    <p className="text-gray-500">{item[2]}</p>
                  </div>
                </div>
              ))}

            </div>
          </motion.div>

          {/* RIGHT FORM */}
          <motion.div
            className="bg-gray-50 p-8 rounded-xl border border-gray-100 shadow-sm"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-6">
              Send a Message
            </h3>

            {/* WEB3 FORMS */}
            <form
              action="https://api.web3forms.com/submit"
              method="POST"
              className="space-y-5"
            >
              {/* 🔑 ACCESS KEY */}
              <input
                type="hidden"
                name="access_key"
                value="b99296cc-f7e4-4419-86fa-d76e7d329955"
              />

              <input
                name="name"
                placeholder="Your Name"
                required
                className="w-full px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              <input
                name="email"
                type="email"
                placeholder="Email Address"
                required
                className="w-full px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              <input
                name="subject"
                placeholder="Subject"
                className="w-full px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              <textarea
                name="message"
                placeholder="Your Message"
                rows="5"
                required
                className="w-full px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
              ></textarea>

              <motion.button
                type="submit"
                className="bg-green-500 text-white w-full py-3 rounded-md font-semibold hover:bg-green-600"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>

        </div>
      </section>

      {/* MAP */}
      <motion.section
        className="py-20 bg-gray-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3618.188067659278!2d78.37644087493584!3d17.434228133461012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93bd18410b0f%3A0x8d7e3fea891858ce!2sT-Hub!5e1!3m2!1sen!2sin!4v1771922924204!5m2!1sen!2sin"
              className="w-full h-[450px] border-0"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}

export default ContactPage;

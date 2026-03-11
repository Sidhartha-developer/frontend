import { motion } from "framer-motion";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

function ContactPage() {
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
      Contact
    </span>

    {/* heading */}
    <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-white">
      Let’s <span className="text-[#E5C447]">Connect</span>
    </h1>

    {/* description */}
    <p className="text-green-100 text-lg max-w-xl mx-auto">
      Reach out for support, partnership inquiries, or platform guidance —
      our team is happy to help.
    </p>

  </motion.div>

</section>


      {/* CONTACT SECTION */}
      <section className="py-28 bg-white">

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-start">

          {/* LEFT INFO */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >

            <h2 className="font-heading text-5xl text-primary">
              Get in Touch
            </h2>

            <p className="text-gray-500 max-w-md">
              Whether you’re a household user, vendor partner, or organization,
              we’re here to assist you with onboarding, support, and platform queries.
            </p>

            <div className="space-y-6">

              {[
                ["📍", "Address", "Hyderabad, Telangana"],
                ["📞", "Phone", "+91 98765 43210"],
                ["✉️", "Email", "info@scrapzone.com"],
              ].map((item, i) => (

                <div
                  key={i}
                  className="flex gap-4 items-start hover:translate-x-1 transition"
                >

                  <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center text-xl">
                    {item[0]}
                  </div>

                  <div>
                    <h4 className="font-heading text-2xl text-gray-800">
                      {item[1]}
                    </h4>

                    <p className="text-gray-500">
                      {item[2]}
                    </p>
                  </div>

                </div>

              ))}

            </div>

          </motion.div>


          {/* FORM */}
          <motion.div
            className="bg-green-50 p-10 rounded-xl shadow-sm border border-green-100"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >

            <h3 className="font-heading text-4xl text-primary mb-6">
              Send a Message
            </h3>

            <form
              action="https://api.web3forms.com/submit"
              method="POST"
              className="space-y-5"
            >

              <input
                type="hidden"
                name="access_key"
                value="b99296cc-f7e4-4419-86fa-d76e7d329955"
              />

              <input
                name="name"
                placeholder="Your Name"
                required
                className="w-full px-5 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              />

              <input
                name="email"
                type="email"
                placeholder="Email Address"
                required
                className="w-full px-5 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              />

              <input
                name="subject"
                placeholder="Subject"
                className="w-full px-5 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              />

              <textarea
                name="message"
                placeholder="Your Message"
                rows="5"
                required
                className="w-full px-5 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              ></textarea>

              <motion.button
                type="submit"
                className="bg-[#F4B400] text-gray-900 w-full py-3 rounded-md font-semibold shadow-md hover:bg-yellow-500 transition"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message →
              </motion.button>

            </form>

          </motion.div>

        </div>

      </section>


      {/* MAP */}
      <motion.section
        className="py-28 bg-green-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >

        <div className="max-w-7xl mx-auto px-6">

          <div className="rounded-xl overflow-hidden border border-green-100 shadow-sm">

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
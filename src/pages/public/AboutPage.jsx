import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

function CountUp({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;

          let start = 0;
          const duration = 1500;
          const increment = target / (duration / 16);

          const counter = setInterval(() => {
            start += increment;

            if (start >= target) {
              setCount(target);
              clearInterval(counter);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.4 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

function AboutPage() {
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
      src="/assets/about.png"   // ← your generated image
      alt="about background"
      className="w-[900px] max-w-full object-contain"
    />
  </div>

  {/* Content */}
  <motion.div
    className="relative text-center space-y-4 mt-20 px-6 max-w-2xl"
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
  >
    <span className="text-green-600 font-semibold uppercase tracking-wide text-sm">
      About Us
    </span>

    <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
      Building a Smarter Scrap Ecosystem
    </h1>

    <p className="text-gray-600">
      Empowering households and vendors through technology-driven scrap
      collection and sustainable recycling workflows.
    </p>
  </motion.div>

</section>

      {/* INTRO */}
      <motion.section
        className="py-28 bg-white"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-4xl font-bold">
            Connecting Communities Through Responsible Recycling
          </h2>

          <p className="text-gray-500 leading-relaxed">
            Our platform bridges the gap between households seeking convenient
            scrap disposal and vendors looking for consistent opportunities.
            Through digital coordination, transparent pricing, and verified
            partnerships, we transform everyday waste management into a
            seamless, sustainable experience.
          </p>
        </div>
      </motion.section>

      {/* MISSION VISION */}
      <section className="py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">

          {[
            {
              title: "Our Mission",
              text: "Deliver convenient scrap collection while enabling responsible recycling practices across communities.",
              icon: "🎯",
            },
            {
              title: "Our Vision",
              text: "Build the most trusted digital ecosystem for scrap management and circular economy growth.",
              icon: "🌍",
            },
            {
              title: "Our Values",
              text: "Transparency, sustainability, operational excellence, and community empowerment.",
              icon: "⭐",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm text-center space-y-4 hover:shadow-md transition"
              whileHover={{ y: -8 }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="w-14 h-14 mx-auto rounded-full bg-green-100 flex items-center justify-center text-2xl">
                {item.icon}
              </div>

              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-gray-500">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <motion.section
        className="py-28 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-6">

          {[
            ["12K+", "Pickups Completed"],
            ["850+", "Verified Vendors"],
            ["95T", "Scrap Recycled"],
            ["25+", "Cities Served"],
          ].map((s, i) => (
            <motion.div
              key={i}
              className="bg-gray-50 p-8 rounded-xl border border-gray-100 text-center hover:shadow-md transition"
              whileHover={{ y: -6 }}
            >
              <h3 className="text-4xl font-bold text-green-600">
  {i === 0 && <CountUp target={12000} suffix="+" />}
  {i === 1 && <CountUp target={850} suffix="+" />}
  {i === 2 && <CountUp target={95} suffix="T" />}
  {i === 3 && <CountUp target={25} suffix="+" />}
</h3>
              <p className="text-gray-600 mt-2">{s[1]}</p>
            </motion.div>
          ))}
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
            Join the Recycling Transformation
          </h2>

          <p className="text-gray-500 max-w-xl mx-auto">
            Whether you're a household or vendor, become part of a growing
            ecosystem dedicated to smarter waste management and sustainability.
          </p>

          <motion.button
            onClick={() => navigate("/register")}
            className="bg-green-500 text-white px-8 py-3 rounded-md font-semibold shadow-sm hover:bg-green-600"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started →
          </motion.button>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}

export default AboutPage;
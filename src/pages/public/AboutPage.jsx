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

      <Navbar />

{/* HERO */}
<section className="relative bg-gradient-to-b from-[#1f5f3b] to-[#0f2f1f] py-40 flex items-center justify-center text-center overflow-hidden">

  {/* soft glow background */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute left-1/4 top-10 w-[500px] h-[500px] bg-green-400/10 blur-3xl rounded-full"></div>
    <div className="absolute right-1/4 bottom-10 w-[400px] h-[400px] bg-green-500/10 blur-3xl rounded-full"></div>
  </div>

  {/* Content */}
  <motion.div
    className="relative max-w-3xl mx-auto px-6 space-y-6"
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
  >

    {/* label */}
    <span className="inline-block text-xs uppercase tracking-widest font-semibold text-green-200 border border-green-400/30 px-4 py-1 rounded-full">
      About Us
    </span>

    {/* heading */}
    <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
      Building a <span className="text-[#E5C447]">Smarter</span>
      <br />
      Scrap Ecosystem
    </h1>

    {/* description */}
    <p className="text-green-100 text-lg max-w-xl mx-auto">
      Empowering households and vendors through technology-driven scrap
      collection and sustainable recycling workflows.
    </p>

  </motion.div>

</section>


      {/* INTRO */}
<motion.section
  className="py-32 bg-gradient-to-b from-[#eef7f1] to-white"
  initial={{ opacity: 0, y: 60 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
>

  <div className="max-w-3xl mx-auto text-center mb-16 px-6 space-y-4">

    <span className="inline-block text-xs uppercase tracking-widest font-semibold text-green-700 border border-green-300 px-4 py-1 rounded-full">
      Our Platform
    </span>

    <h2 className="font-heading text-5xl md:text-6xl text-gray-800">
      Connecting Communities
      <br />
      Through <span className="text-[#E5C447]">Responsible Recycling</span>
    </h2>

    <p className="text-gray-600 text-lg">
      Our platform bridges the gap between households seeking convenient
      scrap disposal and vendors looking for consistent opportunities.
    </p>

  </div>

</motion.section>


      {/* MISSION / VISION */}
<section className="relative py-32 bg-[#f3faf5] overflow-hidden">

  <div className="absolute right-0 top-0 w-[400px] h-[400px] bg-green-200/40 blur-3xl rounded-full"></div>

  <div className="max-w-3xl mx-auto text-center mb-16 px-6 space-y-4">

  <span className="inline-block text-xs uppercase tracking-widest font-semibold text-green-700 border border-green-300 px-4 py-1 rounded-full">
    Our Principles
  </span>

  <h2 className="font-heading text-5xl md:text-6xl text-gray-800">
    The Values That
    <span className="text-[#E5C447]"> Drive Us</span>
  </h2>

  <p className="text-gray-600 text-lg">
    Our mission, vision, and core values guide every decision we make
    in building a sustainable recycling ecosystem.
  </p>

</div>

  <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">

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
        className="bg-white/80 backdrop-blur-md border border-green-100 p-10 rounded-2xl text-center space-y-4 shadow-lg hover:shadow-xl transition"
        whileHover={{ y: -8 }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >

        <div className="w-16 h-16 mx-auto rounded-full bg-[#E5C447]/20 flex items-center justify-center text-3xl">
          {item.icon}
        </div>

        <h3 className="font-heading text-3xl text-gray-800">
          {item.title}
        </h3>

        <p className="text-gray-600 text-sm">
          {item.text}
        </p>

      </motion.div>

    ))}

  </div>

</section>

      {/* STATS */}
<motion.section
  className="relative py-32 bg-gradient-to-b from-white to-[#eef7f1]"
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
>

  <div className="max-w-3xl mx-auto text-center mb-16 px-6 space-y-4">

  <span className="inline-block text-xs uppercase tracking-widest font-semibold text-green-700 border border-green-300 px-4 py-1 rounded-full">
    Impact
  </span>

  <h2 className="font-heading text-5xl md:text-6xl text-gray-800">
    Growing a
    <span className="text-[#E5C447]"> Sustainable Future</span>
  </h2>

  <p className="text-gray-600 text-lg">
    Our platform continues to expand its impact by connecting
    communities, empowering vendors, and reducing waste.
  </p>

</div>

  <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-8">

    {[
      { value: 12000, suffix: "+", label: "Pickups Completed" },
      { value: 850, suffix: "+", label: "Verified Vendors" },
      { value: 95, suffix: "T", label: "Scrap Recycled" },
      { value: 25, suffix: "+", label: "Cities Served" },
    ].map((stat, i) => (

      <motion.div
        key={i}
        className="bg-white border border-green-100 p-10 rounded-xl text-center shadow-md hover:shadow-xl transition"
        whileHover={{ y: -6 }}
      >

        <h3 className="font-heading text-5xl text-green-700">
          <CountUp target={stat.value} suffix={stat.suffix} />
        </h3>

        <p className="text-gray-600 mt-3 text-sm">
          {stat.label}
        </p>

      </motion.div>

    ))}

  </div>

</motion.section>


      {/* CTA */}
<motion.section
  className="relative py-32 bg-gradient-to-b from-[#eef7f1] to-white text-center overflow-hidden"
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
>

  <div className="absolute left-1/3 top-10 w-[500px] h-[500px] bg-green-200/40 blur-3xl rounded-full"></div>
  

  <div className="relative space-y-6 px-6 max-w-2xl mx-auto">

    <span className="text-xs uppercase tracking-widest font-semibold text-green-700 border border-green-300 px-4 py-1 rounded-full">
      Get Started
    </span>

    <h2 className="font-heading text-5xl md:text-6xl text-gray-800">
      Join the Recycling
      <br />
      <span className="text-[#E5C447]">Transformation</span>
    </h2>

    <p className="text-gray-600">
      Whether you're a household or vendor, become part of a growing
      ecosystem dedicated to smarter waste management and sustainability.
    </p>

    <motion.button
      onClick={() => navigate("/register")}
      className="bg-[#E5C447] text-gray-900 px-10 py-4 rounded-md font-semibold shadow-lg hover:bg-yellow-300 transition"
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
import { useState } from "react";
import { Link }             from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar               from "../../components/layout/Navbar";
import StatCounter from "../../components/StatCounter";
import Footer from "../../components/layout/Footer";


function HomePage() {

  const [activeBlog, setActiveBlog] = useState(null);

  const blogData = [
  {
    title: "How to Segregate Household Scrap Efficiently",
    category: "Household Tips",
    image:
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=1974&auto=format&fit=crop",
    content:
      "Proper scrap segregation begins with identifying categories such as paper, plastic, metal, and electronic waste. Maintaining dedicated containers at home can simplify sorting and improve recycling efficiency. Regular segregation reduces contamination and helps vendors process materials more effectively. Additionally, educating household members about recycling habits can significantly improve waste management outcomes. By adopting simple daily practices, households can contribute to environmental sustainability while keeping living spaces organized."
  },
  {
    title: "Benefits of Recycling Metal and Electronic Waste",
    category: "Sustainability",
    image:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1974&auto=format&fit=crop",
    content:
      "Metal and electronic waste contain valuable materials that can be recovered through recycling. Responsible recycling reduces mining demand, conserves energy, and prevents hazardous substances from entering landfills. E-waste recycling also protects ecosystems from toxic leakage while supporting circular economy practices. Communities that actively recycle metals and electronics play a key role in resource preservation and climate impact reduction."
  },
  {
    title: "Turning Scrap into Opportunity for Vendors",
    category: "Vendor Stories",
    image:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=1974&auto=format&fit=crop",
    content:
      "Digital scrap collection platforms are transforming local vendor ecosystems by providing consistent demand visibility. Vendors can optimize routes, reduce idle time, and access verified pickup requests. This improves income stability and operational efficiency. By leveraging technology-driven marketplaces, vendors gain growth opportunities while delivering convenient recycling services to communities."
  }
];

  return (
    <div className="w-full overflow-hidden">
      <Navbar/>

{/* ================= HERO ================= */}
<section className="relative min-h-screen overflow-hidden">

  {/* Background video */}
  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
    <video
      autoPlay
      muted
      loop
      playsInline
      className="w-full h-full object-cover object-center"
    >
      <source src="/assets/hero.mp4" type="video/mp4" />
    </video>
  </div>

  {/* Overlay */}
  <div className="absolute inset-0 z-10 bg-gradient-to-r from-white/95 via-white/80 to-transparent pointer-events-none"></div>

  {/* Hero content */}
  <div className="relative z-20 pointer-events-auto max-w-7xl mx-auto px-6 pt-40 pb-16 grid md:grid-cols-2 items-center gap-10">

    {/* LEFT CONTENT */}
    <motion.div
      className="text-gray-900 space-y-7"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.2 } }
      }}
    >

      <motion.span
        className="text-green-600 font-semibold tracking-wide uppercase text-sm"
        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
      >
        Smart Scrap Collection Platform
      </motion.span>

      <motion.h1
        className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight"
        variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
      >
        Schedule Scrap Pickup <br /> From Your Doorstep
      </motion.h1>
      

      <motion.p
        className="text-gray-600 max-w-xl text-base md:text-lg pb-5"
        variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
      >
        Transform unused household scrap into value through seamless pickup
        requests, trusted local vendors, and eco-friendly recycling practices.

      </motion.p>

      

<Link to="/login">
  <motion.button
    className="bg-green-500 px-7 py-3.5 rounded-md font-semibold text-white shadow-md hover:bg-green-600"
    variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.96 }}
  >
    Book Pickup →
  </motion.button>
</Link>

    </motion.div>

  </div>
</section>

{/* ================= FEATURES ================= */}
<motion.section
  className="py-28 bg-white"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={{
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  }}
>

  <div className="max-w-7xl mx-auto px-6">

    {/* Section intro */}
    <div className="text-center max-w-2xl mx-auto mb-16">
      <span className="text-green-600 font-semibold uppercase text-sm tracking-wide">
        Platform Benefits
      </span>
      <h2 className="text-4xl font-bold mt-3">
        A Smarter Way to Manage Scrap Collection
      </h2>
      <p className="text-gray-500 mt-4">
        Our platform simplifies scrap disposal through technology-driven pickup,
        transparent pricing, and environmentally responsible recycling.
      </p>
    </div>

    {/* Cards */}
    <div className="grid md:grid-cols-3 gap-8">

      {/* Card 1 */}
      <motion.div
        className="bg-gray-50 p-8 rounded-xl border border-gray-100 space-y-4 text-center hover:shadow-md transition"
        variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }}
        whileHover={{ y: -8 }}
      >
        <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto text-2xl">
          🚛
        </div>
        <h3 className="text-xl font-semibold">Doorstep Pickup</h3>
        <p className="text-gray-500">
          Schedule convenient scrap pickups from your home with a few simple
          steps — no hassle, no delays.
        </p>
      </motion.div>

      {/* Card 2 */}
      <motion.div
        className="bg-gray-50 p-8 rounded-xl border border-gray-100 space-y-4 text-center hover:shadow-md transition"
        variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }}
        whileHover={{ y: -8 }}
      >
        <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto text-2xl">
          💰
        </div>
        <h3 className="text-xl font-semibold">Competitive Pricing</h3>
        <p className="text-gray-500">
          Connect with verified local vendors and receive fair, transparent
          pricing for your recyclable materials.
        </p>
      </motion.div>

      {/* Card 3 */}
      <motion.div
        className="bg-gray-50 p-8 rounded-xl border border-gray-100 space-y-4 text-center hover:shadow-md transition"
        variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }}
        whileHover={{ y: -8 }}
      >
        <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto text-2xl">
          ♻️
        </div>
        <h3 className="text-xl font-semibold">Eco-Friendly Recycling</h3>
        <p className="text-gray-500">
          Ensure responsible disposal and recycling practices that contribute to
          a cleaner and more sustainable environment.
        </p>
      </motion.div>

    </div>

  </div>

</motion.section>

{/* ================= ABOUT ================= */}
<motion.section
  className="py-28 bg-gray-50"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
>
  <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

    {/* LEFT IMAGE */}
    <motion.div
      className="relative"
      variants={{
        hidden: { opacity: 0, x: -60 },
        visible: { opacity: 1, x: 0 },
      }}
      transition={{ duration: 0.8 }}
    >
      <img
        src="https://images.unsplash.com/photo-1492724441997-5dc865305da7?q=80&w=1974&auto=format&fit=crop"
        className="rounded-xl shadow-lg"
      />

      {/* soft overlay for depth */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/10 to-transparent"></div>

      {/* play circle */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-xl shadow-md">
          ▶
        </div>
      </div>
    </motion.div>

    {/* RIGHT CONTENT */}
    <motion.div
      className="space-y-7"
      variants={{
        hidden: { opacity: 0, x: 60 },
        visible: { opacity: 1, x: 0 },
      }}
      transition={{ duration: 0.8 }}
    >

      <span className="text-green-600 font-semibold uppercase text-sm tracking-wide">
        About Our Platform
      </span>

      <h2 className="text-4xl font-bold leading-snug">
        Bridging Communities and Recycling Through Technology
      </h2>

      <p className="text-gray-600 max-w-lg">
        ScrapZone connects households with local scrap vendors through a
        streamlined digital experience, enabling convenient pickups, transparent
        transactions, and responsible recycling practices that benefit both
        communities and the environment.
      </p>

      {/* bullet points */}
      <div className="space-y-4">

        <div className="flex gap-3 items-start">
          <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-sm mt-1">
            ✓
          </div>
          <p className="text-gray-700">
            Effortless doorstep scrap pickup scheduling
          </p>
        </div>

        <div className="flex gap-3 items-start">
          <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-sm mt-1">
            ✓
          </div>
          <p className="text-gray-700">
            Verified vendor ecosystem ensuring trust and reliability
          </p>
        </div>

        <div className="flex gap-3 items-start">
          <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-sm mt-1">
            ✓
          </div>
          <p className="text-gray-700">
            Promoting sustainable waste management and recycling impact
          </p>
        </div>

      </div>

<Link to="/about" >
      <motion.button
        className="bg-green-500 text-white px-7 py-3 rounded-md font-semibold shadow-sm hover:bg-green-600"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Learn More →
      </motion.button>
</Link>

    </motion.div>

  </div>
</motion.section>

{/* ================= SERVICES =================  */}
<motion.section
  className="pt-28 pb-36 bg-gray-50"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={{
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } }
  }}
>

  {/* Section intro */}
  <div className="max-w-7xl mx-auto px-6 text-center space-y-4">
    <span className="text-green-600 font-semibold uppercase tracking-wide text-sm">
      Services
    </span>

    <h2 className="text-4xl font-bold text-gray-900">
      Designed to Simplify Scrap Management
    </h2>

    <p className="text-gray-600 max-w-2xl mx-auto">
      Our integrated services streamline the entire scrap lifecycle — from
      pickup scheduling and vendor matching to responsible recycling outcomes.
    </p>
  </div>

  {/* Cards */}
  <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8 mt-16">

    {/* Card 1 */}
    <motion.div
      className="bg-white text-gray-800 p-8 rounded-xl border border-gray-100 shadow-sm space-y-4 hover:shadow-md transition"
      variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }}
      whileHover={{ y: -8 }}
    >
      <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-2xl">
        🚛
      </div>
      <h3 className="text-xl font-semibold">Smart Pickup Scheduling</h3>
      <p className="text-gray-500">
        Book convenient scrap pickups aligned with your schedule and location
        preferences.
      </p>

      <Link to="/how-it-works" className="text-green-600 font-semibold hover:underline">
        Learn More →
      </Link>
    </motion.div>

    {/* Card 2 */}
    <motion.div
      className="bg-white text-gray-800 p-8 rounded-xl border border-gray-100 shadow-sm space-y-4 hover:shadow-md transition"
      variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }}
      whileHover={{ y: -8 }}
    >
      <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-2xl">
        🤝
      </div>
      <h3 className="text-xl font-semibold">Vendor Matching Network</h3>
      <p className="text-gray-500">
        Connect with trusted vendors near you for transparent pricing and
        seamless transactions.
      </p>

      <Link to="/how-it-works" className="text-green-600 font-semibold hover:underline">
        Learn More →
      </Link>
    </motion.div>

    {/* Card 3 */}
    <motion.div
      className="bg-white text-gray-800 p-8 rounded-xl border border-gray-100 shadow-sm space-y-4 hover:shadow-md transition"
      variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }}
      whileHover={{ y: -8 }}
    >
      <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-2xl">
        ♻️
      </div>
      <h3 className="text-xl font-semibold">Responsible Recycling</h3>
      <p className="text-gray-500">
        Ensure collected materials are processed sustainably through verified
        recycling workflows.
      </p>

      <Link to="/how-it-works" className="text-green-600 font-semibold hover:underline">
        Learn More →
      </Link>
    </motion.div>

  </div>

</motion.section>

{/* ================= STATS =================  */}
<motion.section
  className="py-28 bg-white"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={{
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } }
  }}
>

  <div className="max-w-7xl mx-auto px-6">

    {/* Section intro */}
    <div className="text-center max-w-2xl mx-auto mb-16">
      <span className="text-green-600 font-semibold uppercase tracking-wide text-sm">
        Impact & Growth
      </span>
      <h2 className="text-4xl font-bold mt-3">
        Driving Measurable Recycling Impact
      </h2>
      <p className="text-gray-500 mt-4">
        Our platform continues to expand reach, empower vendors, and contribute
        to sustainable waste management outcomes across communities.
      </p>
    </div>

    {/* Stats grid */}
    <div className="grid md:grid-cols-4 gap-6">

      {/* Stat 1 */}
      <motion.div
        className="bg-gray-50 p-8 rounded-xl border border-gray-100 text-center hover:shadow-md transition"
        variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
        whileHover={{ y: -6 }}
      >
        <h3 className="text-4xl font-extrabold text-green-600">
          <StatCounter end={12480} suffix="+" />
        </h3>
        <p className="text-gray-600 mt-2">Pickup Requests Completed</p>
      </motion.div>

      {/* Stat 2 */}
      <motion.div
        className="bg-gray-50 p-8 rounded-xl border border-gray-100 text-center hover:shadow-md transition"
        variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
        whileHover={{ y: -6 }}
      >
        <h3 className="text-4xl font-extrabold text-green-600">
          <StatCounter end={872} suffix="+" />
        </h3>
        <p className="text-gray-600 mt-2">Verified Scrap Vendors</p>
      </motion.div>

      {/* Stat 3 */}
      <motion.div
        className="bg-gray-50 p-8 rounded-xl border border-gray-100 text-center hover:shadow-md transition"
        variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
        whileHover={{ y: -6 }}
      >
        <h3 className="text-4xl font-extrabold text-green-600">
          <StatCounter end={96} suffix="T" />
        </h3>
        <p className="text-gray-600 mt-2">Material Recycled</p>
      </motion.div>

      {/* Stat 4 */}
      <motion.div
        className="bg-gray-50 p-8 rounded-xl border border-gray-100 text-center hover:shadow-md transition"
        variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
        whileHover={{ y: -6 }}
      >
        <h3 className="text-4xl font-extrabold text-green-600">
          <StatCounter end={27} suffix="+" />
        </h3>
        <p className="text-gray-600 mt-2">Cities with Active Coverage</p>
      </motion.div>

    </div>

  </div>

</motion.section>


{/* ================= FAQ ================= */}
<motion.section
  className="py-28 bg-gray-50"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
>
  <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

    {/* LEFT ACCORDION */}
    <motion.div
      className="space-y-6"
      variants={{ hidden: { opacity: 0, x: -60 }, visible: { opacity: 1, x: 0 } }}
      transition={{ duration: 0.8 }}
    >

      {/* Intro */}
      <div className="space-y-3">
        <span className="text-green-600 font-semibold uppercase tracking-wide text-sm">
          FAQ
        </span>

        <h2 className="text-4xl font-bold">
          Common Questions, Clear Answers
        </h2>

        <p className="text-gray-500 max-w-md">
          Everything you need to know about scheduling pickups, vendor
          verification, and recycling workflows.
        </p>
      </div>

      {/* Item 1 */}
      <details className="bg-white p-5 rounded-xl border border-gray-100 hover:shadow-sm transition">
        <summary className="font-semibold cursor-pointer text-gray-900">
          How do I request scrap pickup?
        </summary>
        <p className="mt-3 text-gray-500">
          Create an account, submit a pickup request with scrap details, and
          nearby vendors will respond with availability.
        </p>
      </details>

      {/* Item 2 */}
      <details className="bg-white p-5 rounded-xl border border-gray-100 hover:shadow-sm transition">
        <summary className="font-semibold cursor-pointer text-gray-900">
          Are vendors verified before joining?
        </summary>
        <p className="mt-3 text-gray-500">
          Yes. Every vendor undergoes a verification and approval process to
          ensure service quality and reliability.
        </p>
      </details>

      {/* Item 3 */}
      <details className="bg-white p-5 rounded-xl border border-gray-100 hover:shadow-sm transition">
        <summary className="font-semibold cursor-pointer text-gray-900">
          What types of scrap materials are accepted?
        </summary>
        <p className="mt-3 text-gray-500">
          Paper, plastic, metal, electronic waste, and most recyclable household
          materials are supported.
        </p>
      </details>

      {/* Item 4 */}
      <details className="bg-white p-5 rounded-xl border border-gray-100 hover:shadow-sm transition">
        <summary className="font-semibold cursor-pointer text-gray-900">
          Can I track my pickup request status?
        </summary>
        <p className="mt-3 text-gray-500">
          Yes. You can monitor request progress and vendor updates directly from
          your user dashboard.
        </p>
      </details>

    </motion.div>

    {/* RIGHT IMAGE */}
    <motion.div
      className="relative"
      variants={{ hidden: { opacity: 0, x: 60 }, visible: { opacity: 1, x: 0 } }}
      transition={{ duration: 0.8 }}
    >
      <img
        src="https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1974&auto=format&fit=crop"
        className="rounded-xl shadow-lg"
      />

      {/* depth overlay */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/10 to-transparent"></div>
    </motion.div>

  </div>
</motion.section>


{/* ================= TESTIMONIALS ================= */}
<motion.section
  className="py-28 bg-gray-50"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={{
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } }
  }}
>

  {/* Heading */}
  <div className="text-center max-w-2xl mx-auto px-6 space-y-3 mb-16">
    <span className="text-green-600 font-semibold uppercase tracking-wide text-sm">
      Testimonials
    </span>

    <h2 className="text-4xl font-bold">
      Real Stories from Our Community
    </h2>

    <p className="text-gray-500">
      Households and vendors sharing how smart scrap pickup is improving their
      daily routines and business growth.
    </p>
  </div>

  {/* Cards */}
  <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">

    {/* Card 1 */}
    <motion.div
      className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm space-y-4 hover:shadow-md transition"
      variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
      whileHover={{ y: -6 }}
    >
      <div className="text-green-500">★★★★★</div>
      <p className="text-gray-600">
        We usually store newspapers and plastic bottles for months before calling
        local scrap collectors. With this platform, I scheduled a pickup in minutes
        and received fair pricing the same day. It saved time and cleared space at home.
      </p>
      <div className="flex items-center gap-3">
        <div>
          <h4 className="font-semibold">Priya Sharma</h4>
          <span className="text-sm text-gray-500">Apartment Resident • Hyderabad</span>
        </div>
      </div>
    </motion.div>

    {/* Card 2 */}
    <motion.div
      className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm space-y-4 hover:shadow-md transition"
      variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
      whileHover={{ y: -6 }}
    >
      <div className="text-green-500">★★★★★</div>
      <p className="text-gray-600">
        As a small scrap vendor, finding consistent pickup leads was difficult.
        After joining this platform, I started receiving nearby requests daily,
        helping me optimize routes and increase monthly earnings.
      </p>
      <div className="flex items-center gap-3">

        <div>
          <h4 className="font-semibold">Rahul Verma</h4>
          <span className="text-sm text-gray-500">Scrap Vendor • Secunderabad</span>
        </div>
      </div>
    </motion.div>

    {/* Card 3 */}
    <motion.div
      className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm space-y-4 hover:shadow-md transition"
      variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
      whileHover={{ y: -6 }}
    >
      <div className="text-green-500">★★★★★</div>
      <p className="text-gray-600">
        I appreciate that the platform encourages responsible recycling rather than
        landfill disposal. Our community used it during a society cleanup drive,
        and coordinating pickups became surprisingly smooth.
      </p>
      <div className="flex items-center gap-3">
        <div>
          <h4 className="font-semibold">Ananya Iyer</h4>
          <span className="text-sm text-gray-500">Community Volunteer • Gachibowli</span>
        </div>
      </div>
    </motion.div>

  </div>

</motion.section>

{/* ================= CTA =================  */}
<motion.section
  className="relative py-32 bg-white text-center overflow-hidden border-t border-gray-100"
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
>

  {/* soft glow background */}
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    <div className="w-[600px] h-[600px] bg-green-500/10 rounded-full blur-3xl"></div>
  </div>

  <div className="relative max-w-3xl mx-auto px-6 space-y-6">

    <span className="uppercase tracking-wide text-green-600 text-sm font-semibold">
      Vendor Opportunity
    </span>

    <h2 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
      Expand Your Scrap Business with New Opportunities
    </h2>

    <p className="text-gray-600 text-lg">
      Join a growing network of verified vendors, receive consistent pickup
      requests, and scale your operations through our platform.
    </p>

    <Link to="/become-vendor">
      <motion.button
        className="bg-green-500 text-white px-8 py-3 rounded-md font-semibold shadow-md hover:bg-green-600"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Register as Vendor →
      </motion.button>
    </Link>

  </div>

</motion.section>

{/* ================= BLOG ================= */}
<motion.section
  className="py-28 bg-white"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={{
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } }
  }}
>

  {/* Heading */}
  <div className="text-center max-w-2xl mx-auto px-6 space-y-3 mb-16">
    <span className="text-green-600 font-semibold uppercase tracking-wide text-sm">
      Insights & Resources
    </span>

    <h2 className="text-4xl font-bold">
      Knowledge for Smarter Recycling Decisions
    </h2>

    <p className="text-gray-500">
      Practical guides, industry insights, and community stories that inspire
      sustainable scrap management.
    </p>
  </div>

  {/* Blog cards */}
  <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">

    {/* Card 1 */}
    <motion.div
      className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition"
      variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
      whileHover={{ y: -6 }}
    >
      <div className="overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=1974&auto=format&fit=crop"
          className="h-56 w-full object-cover hover:scale-105 transition duration-500"
        />
      </div>
      <div className="p-6 space-y-3">
        <span className="text-xs font-semibold text-green-600 uppercase">
          Household Tips
        </span>
        <h3 className="text-xl font-semibold">
          How to Segregate Household Scrap Efficiently
        </h3>
        <p className="text-gray-500">
          Simple practices to organize recyclable materials at home for smoother
          disposal and reuse.
        </p>
<button
  onClick={() => setActiveBlog(blogData[0])}
  className="text-green-600 font-semibold hover:underline"
>
  Read More →
</button>
      </div>
    </motion.div>

    {/* Card 2 */}
    <motion.div
      className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition"
      variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
      whileHover={{ y: -6 }}
    >
      <div className="overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1974&auto=format&fit=crop"
          className="h-56 w-full object-cover hover:scale-105 transition duration-500"
        />
      </div>
      <div className="p-6 space-y-3">
        <span className="text-xs font-semibold text-green-600 uppercase">
          Sustainability
        </span>
        <h3 className="text-xl font-semibold">
          Benefits of Recycling Metal and Electronic Waste
        </h3>
        <p className="text-gray-500">
          Understand how responsible recycling preserves resources and reduces
          environmental impact.
        </p>
<button
  onClick={() => setActiveBlog(blogData[1])}
  className="text-green-600 font-semibold hover:underline"
>
  Read More →
</button>
      </div>
    </motion.div>

    {/* Card 3 */}
    <motion.div
      className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition"
      variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
      whileHover={{ y: -6 }}
    >
      <div className="overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=1974&auto=format&fit=crop"
          className="h-56 w-full object-cover hover:scale-105 transition duration-500"
        />
      </div>
      <div className="p-6 space-y-3">
        <span className="text-xs font-semibold text-green-600 uppercase">
          Vendor Stories
        </span>
        <h3 className="text-xl font-semibold">
          Turning Scrap into Opportunity for Vendors
        </h3>
        <p className="text-gray-500">
          Discover how digital scrap ecosystems are empowering local vendor
          communities.
        </p>
<button
  onClick={() => setActiveBlog(blogData[2])}
  className="text-green-600 font-semibold hover:underline"
>
  Read More →
</button>
      </div>
    </motion.div>

  </div>

  <AnimatePresence>
  {activeBlog && (
    <motion.div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setActiveBlog(null)}
    >
      {/* modal card */}
      <motion.div
        className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-xl"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* image */}
        <img
          src={activeBlog.image}
          className="w-full h-56 object-cover"
        />

        {/* content */}
        <div className="p-6 overflow-y-auto max-h-[55vh] space-y-4">
          <h3 className="text-2xl font-bold">{activeBlog.title}</h3>
          <p className="text-gray-600 leading-relaxed">
            {activeBlog.content}
          </p>
        </div>

        {/* footer */}
        <div className="p-4 border-t flex justify-end">
          <button
            onClick={() => setActiveBlog(null)}
            className="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

</motion.section>

{/* ================= NEWSLETTER ================= */}
<motion.section
  className="relative py-28 bg-gray-50 text-center overflow-hidden border-t border-gray-100"
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
>

  {/* soft glow */}
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    <div className="w-[500px] h-[500px] bg-green-500/10 rounded-full blur-3xl"></div>
  </div>

  <div className="relative max-w-2xl mx-auto px-6 space-y-6">

    <span className="uppercase text-green-600 text-sm font-semibold tracking-wide">
      Newsletter
    </span>

    <h2 className="text-4xl font-bold text-gray-900">
      Stay Connected with Sustainable Updates
    </h2>

    <p className="text-gray-500">
      Receive recycling insights, platform news, and community stories that help
      you make smarter environmental choices.
    </p>

    {/* input */}
    <div className="flex flex-col md:flex-row gap-3 justify-center mt-6">

      <input
        placeholder="Enter your email address"
        className="px-5 py-3 rounded-md bg-white border border-gray-200 text-gray-900 w-full md:w-96 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
      />

      <motion.button
        className="bg-green-500 text-white px-7 py-3 rounded-md font-semibold shadow-md hover:bg-green-600"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Subscribe
      </motion.button>

    </div>

  </div>

</motion.section>

      {/* ================= FOOTER ================= */}
      <Footer />

    </div>
  );
}

export default HomePage;
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
<section className="relative bg-[#4C8F3A] min-h-screen overflow-hidden flex flex-col justify-center">

  {/* CITY BACKGROUND */}
  <img
    src="/assets/hero-city.png"
    alt=""
    className="absolute inset-0 w-full h-full object-contain opacity-20 pointer-events-none"
  />

  {/* CONTENT */}
  <div className="max-w-7xl mx-auto px-6 w-full relative z-10">

    <motion.div
      className="max-w-xl text-white text-center md:text-left pt-24 md:pt-0"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >

      <h1 className="text-6xl sm:text-7xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
        Reliable <br />
        & Affordable <br />
        Waste Services
      </h1>

      <Link to="/login">
        <motion.button
          className="bg-[#E5C447] text-black px-8 py-4 font-semibold shadow-lg hover:bg-yellow-400 transition"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Request a Pickup
        </motion.button>
      </Link>

    </motion.div>

  </div>

  {/* TRUCK + WORKERS IMAGE */}
<motion.img
  src="/assets/hero-illustration.png"
  alt=""
  className="
    mx-auto mt-12
    w-[560px] sm:w-[560px]
    md:absolute md:bottom-0 md:left-1/2 md:-translate-x-1/2
    md:w-[650px] lg:w-[750px]
    pointer-events-none
  "
  initial={{ opacity: 0, y: 120 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}

  /* FLOATING ANIMATION */
  whileInView={{ y: [0, -10, 0] }}
  viewport={{ once: false }}
/>

  {/* YELLOW GROUND */}
  <div className="absolute bottom-0 left-0 w-full h-[80px] bg-[#E5C447]" />

</section>

{/* ================= FEATURES ================= */}
<motion.section
className="py-24 bg-white font-body"
initial="hidden"
whileInView="visible"
viewport={{ once: true }}
variants={{
hidden: {},
visible: { transition: { staggerChildren: 0.2 } },
}}

>

  <div className="max-w-7xl mx-auto px-6">

```
{/* Section Header */}
<div className="text-center max-w-2xl mx-auto mb-16">

  <span className="text-primary font-semibold uppercase tracking-widest text-sm">
    Platform Benefits
  </span>

  <h2 className="font-heading text-5xl tracking-wider text-gray-800 mt-3">
    A Smarter Way to Manage Scrap Collection
  </h2>

  <p className="text-gray-500 mt-4 leading-relaxed">
    Our technology-driven platform simplifies scrap disposal with
    scheduled pickups, transparent vendor pricing, and sustainable recycling.
  </p>

</div>


{/* Cards */}
<div className="grid md:grid-cols-3 gap-10">

  {/* Card 1 */}
  <motion.div
    className="bg-white rounded-lg overflow-hidden shadow-sm group
    hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
    variants={{
      hidden: { opacity: 0, y: 60 },
      visible: { opacity: 1, y: 0 },
    }}
  >

    <div className="overflow-hidden">
      <img
        src="/assets/doorstep.png"
        alt="Doorstep Pickup"
        className="w-full h-64 object-cover group-hover:scale-110 transition duration-500"
      />
    </div>

    <div className="p-7 text-center">

      <h3 className="font-heading text-3xl tracking-wide text-gray-800">
        Doorstep Pickup
      </h3>

      <span className="text-primary text-sm font-semibold block mt-1">
        Easy Scheduling
      </span>

      <p className="text-gray-500 mt-3 text-sm leading-relaxed">
        Schedule scrap collection directly from your home with just
        a few clicks, making disposal simple and convenient.
      </p>

    </div>

  </motion.div>


  {/* Card 2 */}
  <motion.div
    className="bg-white rounded-lg overflow-hidden shadow-sm group
    hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
    variants={{
      hidden: { opacity: 0, y: 60 },
      visible: { opacity: 1, y: 0 },
    }}
  >

    <div className="overflow-hidden">
      <img
        src="/assets/fair.png"
        alt="Fair Pricing"
        className="w-full h-64 object-cover group-hover:scale-110 transition duration-500"
      />
    </div>

    <div className="p-7 text-center">

      <h3 className="font-heading text-3xl tracking-wide text-gray-800">
        Fair Pricing
      </h3>

      <span className="text-primary text-sm font-semibold block mt-1">
        Transparent Rates
      </span>

      <p className="text-gray-500 mt-3 text-sm leading-relaxed">
        Get competitive prices for recyclable materials through verified
        local vendors with full pricing transparency.
      </p>

    </div>

  </motion.div>


  {/* Card 3 */}
  <motion.div
    className="bg-white rounded-lg overflow-hidden shadow-sm group
    hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
    variants={{
      hidden: { opacity: 0, y: 60 },
      visible: { opacity: 1, y: 0 },
    }}
  >

    <div className="overflow-hidden">
      <img
        src="/assets/eco.png"
        alt="Eco Friendly"
        className="w-full h-64 object-cover group-hover:scale-110 transition duration-500"
      />
    </div>

    <div className="p-7 text-center">

      <h3 className="font-heading text-3xl tracking-wide text-gray-800">
        Eco-Friendly Recycling
      </h3>

      <span className="text-primary text-sm font-semibold block mt-1">
        Sustainable Impact
      </span>

      <p className="text-gray-500 mt-3 text-sm leading-relaxed">
        Ensure responsible waste processing through sustainable recycling
        practices that help protect the environment.
      </p>

    </div>

  </motion.div>

</div>
```

  </div>
</motion.section>


{/* ================= ABOUT ================= */}
<motion.section
  className="py-28 bg-[#f5f5f5]"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
>
  <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

    {/* LEFT IMAGE AREA */}
    <motion.div
      className="relative"
      variants={{
        hidden: { opacity: 0, x: -60 },
        visible: { opacity: 1, x: 0 },
      }}
      transition={{ duration: 0.8 }}
    >

      {/* Oval background shape */}
      {/* <div className="absolute -left-28 top-24 w-[420px] h-[300px] bg-[#e6e2db] rounded-full z-0"></div> */}

      {/* Main Image */}
      <img
        src="public/assets/welcome.png"
        alt="Waste Workers"
        className="relative z-10 "
      />

      {/* Green circle icon */}
      {/* <div className="absolute left-[-35px] top-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-primary flex items-center justify-center text-white text-3xl shadow-lg z-20">
        ♻️
      </div> */}

    </motion.div>


    {/* RIGHT CONTENT */}
    <motion.div
      className="space-y-6"
      variants={{
        hidden: { opacity: 0, x: 60 },
        visible: { opacity: 1, x: 0 },
      }}
      transition={{ duration: 0.8 }}
    >

      <span className="text-primary font-semibold uppercase tracking-widest text-sm">
        Welcome to Waste Pickup Company
      </span>

      <h2 className="font-heading text-6xl tracking-wide text-gray-800 leading-tight">
        We've Been Working Since 1987 In This Field
      </h2>

      <p className="text-primary text-lg">
        Aenean sed sapien venenatis, blandit nulla in, lacinia risus.
        Suspendisse potenti.
      </p>

      <p className="text-gray-500 max-w-xl">
        There are many variations of passages of ipsum available, but the
        majority have suffered alteration in some form, by injected humour,
        or randomised words.
      </p>


      {/* Features */}
      <div className="flex gap-12 pt-6">

        {/* Feature 1 */}
        <div className="flex items-start gap-4">

          <div className="w-14 h-14 rounded-full bg-yellow-400 flex items-center justify-center font-bold text-lg">
            01
          </div>

          <div>
            <h4 className="font-heading text-3xl text-gray-800 leading-snug">
              Going Above <br /> and Beyond
            </h4>
          </div>

        </div>


        {/* Feature 2 */}
        <div className="flex items-start gap-4">

          <div className="w-14 h-14 rounded-full bg-yellow-400 flex items-center justify-center font-bold text-lg">
            02
          </div>

          <div>
            <h4 className="font-heading text-3xl text-gray-800 leading-snug">
              Committed to <br /> People First
            </h4>
          </div>

        </div>

      </div>

    </motion.div>

  </div>
</motion.section>


{/* ================= SERVICES ================= */}
<motion.section
  className="pt-28 pb-36 bg-[#f5f5f5]"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={{
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } }
  }}
>

{/* Section Intro */}

<div className="max-w-7xl mx-auto px-6 text-center space-y-4">

  <span className="text-primary font-semibold uppercase tracking-widest text-sm">
    Our Platform Services
  </span>

  <h2 className="font-heading text-6xl tracking-wide text-gray-800">
    Smart Scrap Management Solutions
  </h2>

  <p className="text-gray-600 max-w-2xl mx-auto">
    ScrapZone simplifies scrap collection and recycling through a digital
    platform connecting households with trusted local vendors.
  </p>

</div>


{/* Cards */}

<div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10 mt-20">

{[
  {
    icon: "🚛",
    title: "Scrap Pickup Requests",
    text: "Schedule doorstep scrap pickups quickly through our platform and connect with verified local vendors.",
    image: "/assets/service1.jpg"
  },
  {
    icon: "🤝",
    title: "Vendor Network",
    text: "Join a growing network of verified scrap vendors and receive consistent pickup opportunities.",
    image: "/assets/service2.jpg"
  },
  {
    icon: "📦",
    title: "Scrap Categories",
    text: "Manage and identify recyclable materials across multiple categories for accurate collection.",
    image: "/assets/service3.jpg"
  },
  {
    icon: "🌱",
    title: "Sustainable Recycling",
    text: "Encouraging responsible recycling practices that reduce waste and promote environmental sustainability.",
    image: "/assets/service4.jpg"
  }
].map((card, index) => (

<motion.div
  key={index}
  className={`group relative overflow-hidden h-[320px] flex flex-col 
  ${index % 2 === 1 ? "md:mt-16" : ""}`}
  variants={{ hidden: { opacity: 0, y: 60 }, visible: { opacity: 1, y: 0 } }}
>

{/* Image Background */}
<div
  className="
  absolute inset-0 bg-cover bg-center
  md:translate-y-[-100%] md:group-hover:translate-y-0
  transition duration-500
  "
  style={{ backgroundImage: `url(${card.image})` }}
/>

{/* Overlay */}
<div className="absolute inset-0 bg-primary/80 md:opacity-0 md:group-hover:opacity-100 opacity-100 transition duration-500"></div>


{/* Content */}
<div className="relative z-10 text-center px-8 pt-10">

  <div className="text-4xl mb-6 text-white md:text-gray-800 md:group-hover:text-white transition">
    {card.icon}
  </div>

  <h3 className="font-heading text-4xl text-white md:text-gray-800 md:group-hover:text-white transition">
    {card.title}
  </h3>

  <div className="w-8 h-[2px] bg-yellow-400 mx-auto my-4"></div>

  <p className="text-white/90 md:text-gray-600 md:group-hover:text-white/90 text-sm leading-relaxed">
    {card.text}
  </p>

</div>


{/* Read More */}
<div
  className="
  absolute bottom-0 left-0 w-full bg-yellow-400 py-4
  md:translate-x-[-100%] md:group-hover:translate-x-0
  transition duration-500 text-center
  "
>
  <Link
    to="/how-it-works"
    className="font-semibold flex justify-center items-center gap-2"
  >
    Learn More →
  </Link>
</div>

</motion.div>

))}

</div>

</motion.section>

{/* ================= WHY CHOOSE US ================= */}
<motion.section
  className="py-28 bg-[#f3f0ea]"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
>
  <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

    {/* LEFT CONTENT */}
    <motion.div
      variants={{
        hidden: { opacity: 0, x: -60 },
        visible: { opacity: 1, x: 0 }
      }}
      transition={{ duration: 0.8 }}
      className="space-y-8"
    >

      <span className="text-primary font-semibold uppercase tracking-widest text-sm">
        Why Choose Us
      </span>

      <h2 className="font-heading text-6xl text-gray-800 leading-tight tracking-wide">
        We Make Sure Your Waste Goes
        <br />
        To the Right Place
      </h2>

      <p className="text-gray-600 max-w-lg leading-relaxed">
        Our platform ensures responsible waste management by connecting
        communities with verified vendors and sustainable recycling processes.
      </p>

    </motion.div>



    {/* RIGHT STATS */}
    <motion.div
      variants={{
        hidden: { opacity: 0, x: 60 },
        visible: { opacity: 1, x: 0 }
      }}
      transition={{ duration: 0.8 }}
      className="space-y-6"
    >

      {/* Stat 1 */}
      <div className="flex items-center bg-white shadow-sm">

        <div className="w-28 h-28 bg-yellow-400 flex items-center justify-center text-3xl">
          ♻️
        </div>

        <div className="px-8">
          <h3 className="font-heading text-5xl text-primary">
            <StatCounter end={4850} suffix="+" />
          </h3>
          <p className="text-gray-600">
            Waste Picked & Disposed
          </p>
        </div>

      </div>


      {/* Stat 2 */}
      <div className="flex items-center bg-white shadow-sm">

        <div className="w-28 h-28 bg-yellow-400 flex items-center justify-center text-3xl">
          ⭐
        </div>

        <div className="px-8">
          <h3 className="font-heading text-5xl text-primary">
            <StatCounter end={99.9} suffix="%" />
          </h3>
          <p className="text-gray-600">
            Our Company is Successful
          </p>
        </div>

      </div>


      {/* Stat 3 */}
      <div className="flex items-center bg-white shadow-sm">

        <div className="w-28 h-28 bg-yellow-400 flex items-center justify-center text-3xl">
          😊
        </div>

        <div className="px-8">
          <h3 className="font-heading text-5xl text-primary">
            <StatCounter end={20060} suffix="+" />
          </h3>
          <p className="text-gray-600">
            Satisfied & Happy People
          </p>
        </div>

      </div>

    </motion.div>

  </div>
</motion.section>

{/* ================= WORKING PROCESS ================= */}
<motion.section
  className="py-28 bg-white text-center"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
>
  <div className="max-w-7xl mx-auto px-6">

    <span className="text-primary font-semibold uppercase tracking-widest text-sm">
      4 Simple Steps
    </span>

    <h2 className="font-heading text-6xl tracking-wide mt-3 mb-16 text-gray-800">
      Our Working Process
    </h2>

    <div className="grid md:grid-cols-4 gap-16 items-start relative">

      {[
        [
          "01",
          "Register & Login",
          "Create your account as a user or vendor and securely access the platform dashboard.",
          "/public/assets/hover.png",
          "👤"
        ],
        [
          "02",
          "Submit Scrap Request",
          "Provide scrap category, pickup address, and optional images to create a detailed request.",
          "/assets/hover.png",
          "📝"
        ],
        [
          "03",
          "Vendor Notification",
          "Nearby approved vendors receive instant notifications and review request details.",
          "/assets/hover.png",
          "🔔"
        ],
        [
          "04",
          "Pickup & Completion",
          "Vendor accepts the request, collects scrap, and updates job status for transparent tracking.",
          "/assets/hover.png",
          "🚛"
        ],
      ].map((step, i) => (

        <motion.div
          key={i}
          className="space-y-6 group cursor-pointer relative"
          whileHover={{ y: -8 }}
          onClick={() => navigate("/how-it-works")}
        >

          {/* Circle */}
          <div className="relative w-44 h-44 mx-auto rounded-full flex items-center justify-center text-white text-4xl bg-[#2f2f2f] transition-all duration-500 group-hover:bg-green-600">

            {/* hover background image */}
            <img
              src={step[3]}
              className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-30 transition duration-500"
            />

            {/* icon */}
            <div className="relative z-10">
              {step[4]}
            </div>

            {/* number badge */}
            <div className="absolute top-2 right-2 w-12 h-12 rounded-full bg-green-600 text-white text-sm flex items-center justify-center transition duration-300 group-hover:bg-yellow-400 group-hover:text-black">
              {step[0]}
            </div>

          </div>

          <h3 className="font-heading text-4xl text-gray-800">
            {step[1]}
          </h3>

          <p className="text-gray-500 text-sm max-w-xs mx-auto leading-relaxed">
            {step[2]}
          </p>

          {/* arrows between steps */}
          {i !== 3 && (
            <div className="hidden md:block absolute top-20 -right-12 text-gray-300 text-3xl">
              →
            </div>
          )}

        </motion.div>

      ))}

    </div>

  </div>
</motion.section>

{/* ================= FAQ ================= */}
<motion.section
  className="py-28 bg-[#f5f5f5]"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
>
  <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">

    {/* LEFT ACCORDION */}
    <motion.div
      className="space-y-8"
      variants={{ hidden: { opacity: 0, x: -60 }, visible: { opacity: 1, x: 0 } }}
      transition={{ duration: 0.8 }}
    >

      {/* Heading */}
      <div className="space-y-4">

        <span className="text-primary font-semibold uppercase tracking-widest text-sm">
          FAQ
        </span>

        <h2 className="font-heading text-6xl tracking-wide text-gray-800 leading-tight">
          Common Questions
          <br />
          Clear Answers
        </h2>

        <p className="text-gray-500 max-w-md">
          Everything you need to know about scheduling scrap pickups,
          vendor verification, and recycling workflows.
        </p>

      </div>


      {/* Accordion Items */}
      <div className="space-y-4">

        <details className="group bg-white rounded-xl border border-gray-100 p-6 transition hover:shadow-md">
          <summary className="flex justify-between items-center cursor-pointer font-semibold text-gray-800 list-none">
            How do I request scrap pickup?
            <span className="text-primary text-xl group-open:rotate-45 transition">+</span>
          </summary>

          <p className="mt-4 text-gray-500">
            Create an account, submit a pickup request with scrap details,
            and nearby vendors will respond with availability.
          </p>
        </details>


        <details className="group bg-white rounded-xl border border-gray-100 p-6 transition hover:shadow-md">
          <summary className="flex justify-between items-center cursor-pointer font-semibold text-gray-800 list-none">
            Are vendors verified before joining?
            <span className="text-primary text-xl group-open:rotate-45 transition">+</span>
          </summary>

          <p className="mt-4 text-gray-500">
            Yes. Every vendor undergoes a verification and approval process
            to ensure service quality and reliability.
          </p>
        </details>


        <details className="group bg-white rounded-xl border border-gray-100 p-6 transition hover:shadow-md">
          <summary className="flex justify-between items-center cursor-pointer font-semibold text-gray-800 list-none">
            What types of scrap materials are accepted?
            <span className="text-primary text-xl group-open:rotate-45 transition">+</span>
          </summary>

          <p className="mt-4 text-gray-500">
            Paper, plastic, metal, electronic waste, and most recyclable
            household materials are supported.
          </p>
        </details>


        <details className="group bg-white rounded-xl border border-gray-100 p-6 transition hover:shadow-md">
          <summary className="flex justify-between items-center cursor-pointer font-semibold text-gray-800 list-none">
            Can I track my pickup request status?
            <span className="text-primary text-xl group-open:rotate-45 transition">+</span>
          </summary>

          <p className="mt-4 text-gray-500">
            Yes. You can monitor request progress and vendor updates
            directly from your user dashboard.
          </p>
        </details>

      </div>

    </motion.div>


    {/* RIGHT IMAGE */}
    <motion.div
      className="relative"
      variants={{ hidden: { opacity: 0, x: 60 }, visible: { opacity: 1, x: 0 } }}
      transition={{ duration: 0.8 }}
    >

      <img
        src="/assets/faq.png"
        alt="Customer support"
        className="h-full w-full"
      />

    </motion.div>

  </div>
</motion.section>

{/* ================= TESTIMONIALS ================= */}
<motion.section
  className="py-28 "
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
>
  <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

    {/* LEFT CONTENT */}
    <motion.div
      className="space-y-6"
      variants={{
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0 }
      }}
      transition={{ duration: 0.7 }}
    >

      <span className="text-primary font-semibold uppercase tracking-widest text-sm">
        What Our Customers Are Talking
      </span>

      <h2 className="font-heading text-6xl text-gray-800 tracking-wide leading-tight">
        Honest Reviews from People Who Used Our Service
      </h2>

      {/* Quote */}
      <div className="text-6xl text-yellow-400 leading-none">“</div>

      <p className="text-gray-600 text-lg max-w-xl">
        Scheduling scrap pickups used to take days of calling local collectors.
        With this platform I simply created a request and a vendor confirmed it
        within hours. The process was smooth and transparent, and it helped us
        clear unnecessary scrap from our apartment quickly.
      </p>

      {/* Person */}
      {/* <div className="flex items-center gap-4 pt-4">

        <img
          src="/assets/testimonial.png"
          alt="Priya Sharma"
          className="w-14 h-14 rounded-full object-cover"
        />

        <div>
          <h4 className="font-heading text-3xl text-gray-800">
            Priya Sharma
          </h4>
          <span className="text-sm text-gray-500">
            Apartment Resident • Hyderabad
          </span>
        </div>

      </div> */}

    </motion.div>


    {/* RIGHT IMAGE */}
    <motion.div
      variants={{
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0 }
      }}
      transition={{ duration: 0.7 }}
      className="relative h-full w-full"
    >

      <img
        src="/assets/testimonial.png"
        alt="Customer"
        // className="rounded-xl shadow-lg"
      />

    </motion.div>

  </div>
</motion.section>

{/* ================= CTA ================= */}
<motion.section
  className="relative py-32 bg-[#f3f0ea] text-center overflow-hidden"
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
>

  {/* soft background glow */}
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    <div className="w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl"></div>
  </div>

  <div className="relative max-w-3xl mx-auto px-6 space-y-8">

    <span className="uppercase tracking-widest text-primary text-sm font-semibold">
      Vendor Opportunity
    </span>

    <h2 className="font-heading text-6xl text-gray-800 tracking-wide leading-tight">
      Expand Your Scrap Business
      <br />
      With New Opportunities
    </h2>

    <p className="text-gray-600 text-lg max-w-xl mx-auto">
      Join a growing network of verified vendors, receive consistent pickup
      requests, and scale your operations through our digital platform.
    </p>

    <Link to="/become-vendor">
      <motion.button
        className="bg-yellow-400 text-gray-900 px-10 py-4 rounded-md font-semibold shadow-md hover:bg-yellow-300 transition"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Register as Vendor →
      </motion.button>
    </Link>

  </div>

</motion.section>

{/* ================= BLOG ================= */}
  <div className="text-center max-w-2xl mx-auto px-6 space-y-4 mb-16">

    <span className="text-primary font-semibold uppercase tracking-widest text-sm">
      Insights & Resources
    </span>

    <h2 className="font-heading text-6xl tracking-wide text-gray-800 leading-tight">
      Knowledge for Smarter
      <br />
      Recycling Decisions
    </h2>

    <p className="text-gray-500">
      Practical guides, industry insights, and community stories
      that inspire sustainable scrap management.
    </p>

  </div>


  {/* Blog cards */}
  <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">

    {/* Card 1 */}
    <motion.div
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition group"
      variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
      whileHover={{ y: -8 }}
    >

      <div className="overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=1974&auto=format&fit=crop"
          className="h-56 w-full object-cover group-hover:scale-110 transition duration-500"
        />
      </div>

      <div className="p-6 space-y-3">

        <span className="text-xs font-semibold text-primary uppercase">
          Household Tips
        </span>

        <h3 className="font-heading text-3xl text-gray-800 leading-snug">
          How to Segregate Household Scrap Efficiently
        </h3>

        <p className="text-gray-500 text-sm">
          Simple practices to organize recyclable materials at home
          for smoother disposal and reuse.
        </p>

        <button
          onClick={() => setActiveBlog(blogData[0])}
          className="text-yellow-500 font-semibold hover:underline"
        >
          Read More →
        </button>

      </div>

    </motion.div>


    {/* Card 2 */}
    <motion.div
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition group"
      variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
      whileHover={{ y: -8 }}
    >

      <div className="overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1974&auto=format&fit=crop"
          className="h-56 w-full object-cover group-hover:scale-110 transition duration-500"
        />
      </div>

      <div className="p-6 space-y-3">

        <span className="text-xs font-semibold text-primary uppercase">
          Sustainability
        </span>

        <h3 className="font-heading text-3xl text-gray-800 leading-snug">
          Benefits of Recycling Metal and Electronic Waste
        </h3>

        <p className="text-gray-500 text-sm">
          Understand how responsible recycling preserves resources
          and reduces environmental impact.
        </p>

        <button
          onClick={() => setActiveBlog(blogData[1])}
          className="text-yellow-500 font-semibold hover:underline"
        >
          Read More →
        </button>

      </div>

    </motion.div>


    {/* Card 3 */}
    <motion.div
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition group"
      variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
      whileHover={{ y: -8 }}
    >

      <div className="overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=1974&auto=format&fit=crop"
          className="h-56 w-full object-cover group-hover:scale-110 transition duration-500"
        />
      </div>

      <div className="p-6 space-y-3">

        <span className="text-xs font-semibold text-primary uppercase">
          Vendor Stories
        </span>

        <h3 className="font-heading text-3xl text-gray-800 leading-snug">
          Turning Scrap into Opportunity for Vendors
        </h3>

        <p className="text-gray-500 text-sm">
          Discover how digital scrap ecosystems are empowering
          local vendor communities.
        </p>

        <button
          onClick={() => setActiveBlog(blogData[2])}
          className="text-yellow-500 font-semibold hover:underline"
        >
          Read More →
        </button>

      </div>

    </motion.div>

  </div>

{/* ================= NEWSLETTER ================= */}
<motion.section
  className="relative py-28 bg-[#f3f0ea] text-center overflow-hidden"
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
>

  {/* soft glow */}
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    <div className="w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl"></div>
  </div>

  <div className="relative max-w-2xl mx-auto px-6 space-y-8">

    <span className="uppercase text-primary text-sm font-semibold tracking-widest">
      Newsletter
    </span>

    <h2 className="font-heading text-6xl tracking-wide text-gray-800 leading-tight">
      Stay Connected with
      <br />
      Sustainable Updates
    </h2>

    <p className="text-gray-500 max-w-lg mx-auto">
      Receive recycling insights, platform news, and community stories
      that help you make smarter environmental choices.
    </p>


    {/* input */}
    <div className="flex flex-col md:flex-row gap-4 justify-center mt-6">

      <input
        placeholder="Enter your email address"
        className="px-6 py-4 rounded-md bg-white border border-gray-200 text-gray-800 w-full md:w-96 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
      />

      <motion.button
        className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-md font-semibold shadow-md hover:bg-yellow-300 transition"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Subscribe →
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
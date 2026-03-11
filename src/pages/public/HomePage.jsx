import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bell,
  ClipboardList,
  Globe,
  Leaf,
  Package,
  Recycle,
  Star,
  Truck,
  UserPlus,
  Users,
} from "lucide-react";
import Navbar from "../../components/layout/Navbar";
import StatCounter from "../../components/StatCounter";
import Footer from "../../components/layout/Footer";

const blogData = [
  {
    title: "How to Segregate Household Scrap Efficiently",
    category: "Household Tips",
    image:
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=1974&auto=format&fit=crop",
    content:
      "Proper scrap segregation begins with identifying categories such as paper, plastic, metal, and electronic waste. Maintaining dedicated containers at home can simplify sorting and improve recycling efficiency. Regular segregation reduces contamination and helps vendors process materials more effectively.",
  },
  {
    title: "Benefits of Recycling Metal and Electronic Waste",
    category: "Sustainability",
    image:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1974&auto=format&fit=crop",
    content:
      "Metal and electronic waste contain valuable materials that can be recovered through recycling. Responsible recycling reduces mining demand, conserves energy, and prevents hazardous substances from entering landfills.",
  },
  {
    title: "Turning Scrap into Opportunity for Vendors",
    category: "Vendor Stories",
    image:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=1974&auto=format&fit=crop",
    content:
      "Digital scrap collection platforms are transforming local vendor ecosystems by providing consistent demand visibility. Vendors can optimize routes, reduce idle time, and access verified pickup requests.",
  },
];

const serviceCards = [
  {
    icon: Truck,
    title: "Scrap Pickup Requests",
    text: "Schedule doorstep scrap pickups quickly through our platform and connect with verified local vendors.",
    image: "/assets/doorstep.png",
  },
  {
    icon: Users,
    title: "Vendor Network",
    text: "Join a growing network of verified scrap vendors and receive consistent pickup opportunities.",
    image: "/assets/fair.png",
  },
  {
    icon: Package,
    title: "Scrap Categories",
    text: "Manage and identify recyclable materials across multiple categories for accurate collection.",
    image: "/assets/categories.png",
  },
  {
    icon: Leaf,
    title: "Sustainable Recycling",
    text: "Encouraging responsible recycling practices that reduce waste and promote environmental sustainability.",
    image: "/assets/eco.png",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Register & Login",
    text: "Create your account as a user or vendor and securely access the platform dashboard.",
    icon: UserPlus,
  },
  {
    number: "02",
    title: "Submit Scrap Request",
    text: "Provide scrap category, pickup address, and optional images to create a detailed request.",
    icon: ClipboardList,
  },
  {
    number: "03",
    title: "Vendor Notification",
    text: "Nearby approved vendors receive instant notifications and review request details.",
    icon: Bell,
  },
  {
    number: "04",
    title: "Pickup & Completion",
    text: "Vendor accepts the request, collects scrap, and updates job status for transparent tracking.",
    icon: Truck,
  },
];

const socialProof = [
  {
    icon: Recycle,
    value: <StatCounter end={4850} suffix="+" />,
    label: "Waste Picked & Disposed",
  },
  {
    icon: Star,
    value: <StatCounter end={99.9} suffix="%" />,
    label: "Service Success Rate",
  },
  {
    icon: Users,
    value: <StatCounter end={20060} suffix="+" />,
    label: "Satisfied Community Members",
  },
];

function HomePage() {
  const navigate = useNavigate();
  const [activeBlog, setActiveBlog] = useState(null);

  return (
    <div className="w-full overflow-hidden bg-white">
      <Navbar />

      <section className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-[#4C8F3A]">
        <img
          src="/assets/hero-city.png"
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full object-contain opacity-20"
        />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
          <motion.div
            className="max-w-xl pt-24 text-center text-white md:pt-0 md:text-left"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="mb-8 text-6xl font-bold leading-tight sm:text-7xl md:text-6xl lg:text-7xl">
              Reliable
              <br />
              & Affordable
              <br />
              Waste Services
            </h1>

            <Link to="/login">
              <motion.button
                className="bg-[#E5C447] px-8 py-4 font-semibold text-black shadow-lg transition hover:bg-yellow-400"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Request a Pickup
              </motion.button>
            </Link>
          </motion.div>
        </div>

        <motion.img
          src="/assets/hero-illustration.png"
          alt=""
          className="pointer-events-none mx-auto mt-12 w-[560px] sm:w-[560px] md:absolute md:bottom-0 md:left-1/2 md:w-[650px] md:-translate-x-1/2 lg:w-[750px]"
          initial={{ opacity: 0, y: 120 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          whileInView={{ y: [0, -10, 0] }}
          viewport={{ once: false }}
        />

        <div className="absolute bottom-0 left-0 h-[80px] w-full bg-[#E5C447]" />
      </section>

      <motion.section
        className="bg-white py-24 font-body"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.2 } } }}
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">
              Platform Benefits
            </span>
            <h2 className="mt-3 font-heading text-5xl tracking-wider text-gray-800">
              A Smarter Way to Manage Scrap Collection
            </h2>
            <p className="mt-4 leading-relaxed text-gray-500">
              Our technology-driven platform simplifies scrap disposal with scheduled pickups,
              transparent vendor pricing, and sustainable recycling.
            </p>
          </div>

          <div className="grid gap-10 md:grid-cols-3">
            {[
              {
                image: "/assets/doorstep.png",
                title: "Doorstep Pickup",
                tag: "Easy Scheduling",
                text: "Schedule scrap collection directly from your home with just a few clicks.",
              },
              {
                image: "/assets/fair.png",
                title: "Fair Pricing",
                tag: "Transparent Rates",
                text: "Get competitive prices for recyclable materials through verified local vendors.",
              },
              {
                image: "/assets/eco.png",
                title: "Eco-Friendly Recycling",
                tag: "Sustainable Impact",
                text: "Ensure responsible waste processing through sustainable recycling practices.",
              },
            ].map((card) => (
              <motion.div
                key={card.title}
                className="group overflow-hidden rounded-lg bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                variants={{ hidden: { opacity: 0, y: 60 }, visible: { opacity: 1, y: 0 } }}
              >
                <div className="overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="h-64 w-full object-cover transition duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-7 text-center">
                  <h3 className="font-heading text-3xl tracking-wide text-gray-800">{card.title}</h3>
                  <span className="mt-1 block text-sm font-semibold text-primary">{card.tag}</span>
                  <p className="mt-3 text-sm leading-relaxed text-gray-500">{card.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        className="bg-[#f5f5f5] py-28"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 md:grid-cols-2">
          <motion.div
            className="relative"
            variants={{ hidden: { opacity: 0, x: -60 }, visible: { opacity: 1, x: 0 } }}
            transition={{ duration: 0.8 }}
          >
            <img src="/assets/welcome.png" alt="Waste workers" className="relative z-10" />
          </motion.div>

          <motion.div
            className="space-y-6"
            variants={{ hidden: { opacity: 0, x: 60 }, visible: { opacity: 1, x: 0 } }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">
              Welcome to ScrapZone
            </span>
            <h2 className="font-heading text-6xl leading-tight tracking-wide text-gray-800">
              Better Pickup Logistics for Homes and Vendors
            </h2>
            <p className="text-lg text-primary">
              We simplify collection, reduce waste, and make verified recycling more accessible.
            </p>
            <p className="max-w-xl text-gray-500">
              ScrapZone helps households clear recyclable waste efficiently while helping vendors
              access a stable flow of verified pickup jobs.
            </p>

            <div className="flex flex-col gap-6 pt-6 sm:flex-row sm:gap-12">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-yellow-400 font-bold text-lg">
                  01
                </div>
                <div>
                  <h4 className="font-heading text-3xl leading-snug text-gray-800">
                    Going Above
                    <br />
                    and Beyond
                  </h4>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-yellow-400 font-bold text-lg">
                  02
                </div>
                <div>
                  <h4 className="font-heading text-3xl leading-snug text-gray-800">
                    Committed to
                    <br />
                    People First
                  </h4>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        className="bg-[#f5f5f5] pb-36 pt-28"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.2 } } }}
      >
        <div className="mx-auto max-w-7xl px-6 text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            Our Platform Services
          </span>
          <h2 className="font-heading text-6xl tracking-wide text-gray-800">
            Smart Scrap Management Solutions
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            ScrapZone simplifies scrap collection and recycling through a digital platform
            connecting households with trusted local vendors.
          </p>
        </div>

        <div className="mx-auto mt-20 grid max-w-7xl gap-10 px-6 md:grid-cols-4">
          {serviceCards.map((card, index) => (
            <motion.div
              key={card.title}
              className={`group relative flex h-[320px] flex-col overflow-hidden ${
                index % 2 === 1 ? "md:mt-16" : ""
              }`}
              variants={{ hidden: { opacity: 0, y: 60 }, visible: { opacity: 1, y: 0 } }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition duration-500 md:-translate-y-full md:group-hover:translate-y-0"
                style={{ backgroundImage: `url(${card.image})` }}
              />
              <div className="absolute inset-0 bg-primary/80 opacity-100 transition duration-500 md:opacity-0 md:group-hover:opacity-100" />

              <div className="relative z-10 px-8 pt-10 text-center">
                <div className="mb-6 flex justify-center text-white transition md:text-gray-800 md:group-hover:text-white">
                  <card.icon className="h-10 w-10" strokeWidth={1.8} />
                </div>
                <h3 className="font-heading text-4xl text-white transition md:text-gray-800 md:group-hover:text-white">
                  {card.title}
                </h3>
                <div className="mx-auto my-4 h-[2px] w-8 bg-yellow-400" />
                <p className="text-sm leading-relaxed text-white/90 md:text-gray-600 md:group-hover:text-white/90">
                  {card.text}
                </p>
              </div>

              <div className="absolute bottom-0 left-0 w-full bg-yellow-400 py-4 text-center transition duration-500 md:-translate-x-full md:group-hover:translate-x-0">
                <Link to="/how-it-works" className="flex items-center justify-center gap-2 font-semibold">
                  Learn More <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        className="bg-[#f3f0ea] py-28"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 md:grid-cols-2">
          <motion.div
            variants={{ hidden: { opacity: 0, x: -60 }, visible: { opacity: 1, x: 0 } }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">
              Why Choose Us
            </span>
            <h2 className="font-heading text-6xl leading-tight tracking-wide text-gray-800">
              We Make Sure Your Waste Goes
              <br />
              To the Right Place
            </h2>
            <p className="max-w-lg leading-relaxed text-gray-600">
              Our platform ensures responsible waste management by connecting communities
              with verified vendors and sustainable recycling processes.
            </p>
          </motion.div>

          <motion.div
            variants={{ hidden: { opacity: 0, x: 60 }, visible: { opacity: 1, x: 0 } }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {socialProof.map((item) => (
              <div key={item.label} className="flex items-center bg-white shadow-sm">
                <div className="flex h-28 w-28 items-center justify-center bg-yellow-400">
                  <item.icon className="h-10 w-10 text-primary" strokeWidth={1.8} />
                </div>
                <div className="px-8">
                  <h3 className="font-heading text-5xl text-primary">{item.value}</h3>
                  <p className="text-gray-600">{item.label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        className="bg-white py-28 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="mx-auto max-w-7xl px-6">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            4 Simple Steps
          </span>
          <h2 className="mt-3 mb-16 font-heading text-6xl tracking-wide text-gray-800">
            Our Working Process
          </h2>

          <div className="relative grid items-start gap-16 md:grid-cols-4">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.number}
                className="group relative cursor-pointer space-y-6"
                whileHover={{ y: -8 }}
                onClick={() => navigate("/how-it-works")}
              >
                <div className="relative mx-auto flex h-44 w-44 items-center justify-center rounded-full bg-[#2f2f2f] text-white transition-all duration-500 group-hover:bg-green-600">
                  <img
                    src="/assets/hover.png"
                    alt=""
                    className="absolute inset-0 h-full w-full rounded-full object-cover opacity-0 transition duration-500 group-hover:opacity-30"
                  />
                  <div className="relative z-10">
                    <step.icon className="h-12 w-12" strokeWidth={1.8} />
                  </div>
                  <div className="absolute right-2 top-2 flex h-12 w-12 items-center justify-center rounded-full bg-green-600 text-sm text-white transition duration-300 group-hover:bg-yellow-400 group-hover:text-black">
                    {step.number}
                  </div>
                </div>

                <h3 className="font-heading text-4xl text-gray-800">{step.title}</h3>
                <p className="mx-auto max-w-xs text-sm leading-relaxed text-gray-500">{step.text}</p>

                {i !== processSteps.length - 1 && (
                  <div className="absolute top-20 -right-12 hidden text-gray-300 md:block">
                    <ArrowRight className="h-8 w-8" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        className="bg-[#f5f5f5] py-28"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="mx-auto grid max-w-7xl items-center gap-20 px-6 md:grid-cols-2">
          <motion.div
            className="space-y-8"
            variants={{ hidden: { opacity: 0, x: -60 }, visible: { opacity: 1, x: 0 } }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-4">
              <span className="text-sm font-semibold uppercase tracking-widest text-primary">FAQ</span>
              <h2 className="font-heading text-6xl leading-tight tracking-wide text-gray-800">
                Common Questions
                <br />
                Clear Answers
              </h2>
              <p className="max-w-md text-gray-500">
                Everything you need to know about scheduling scrap pickups, vendor
                verification, and recycling workflows.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  q: "How do I request scrap pickup?",
                  a: "Create an account, submit a pickup request with scrap details, and nearby vendors will respond with availability.",
                },
                {
                  q: "Are vendors verified before joining?",
                  a: "Yes. Every vendor undergoes a verification and approval process to ensure service quality and reliability.",
                },
                {
                  q: "What types of scrap materials are accepted?",
                  a: "Paper, plastic, metal, electronic waste, and most recyclable household materials are supported.",
                },
                {
                  q: "Can I track my pickup request status?",
                  a: "Yes. You can monitor request progress and vendor updates directly from your user dashboard.",
                },
              ].map((item) => (
                <details key={item.q} className="group rounded-xl border border-gray-100 bg-white p-6 transition hover:shadow-md">
                  <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-gray-800">
                    {item.q}
                    <span className="text-xl text-primary transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-4 text-gray-500">{item.a}</p>
                </details>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="relative"
            variants={{ hidden: { opacity: 0, x: 60 }, visible: { opacity: 1, x: 0 } }}
            transition={{ duration: 0.8 }}
          >
            <img src="/assets/faq.png" alt="Customer support" className="h-full w-full" />
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        className="py-28"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 md:grid-cols-2">
          <motion.div
            className="space-y-6"
            variants={{ hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0 } }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">
              What Our Customers Are Talking
            </span>
            <h2 className="font-heading text-6xl leading-tight tracking-wide text-gray-800">
              Honest Reviews from People Who Used Our Service
            </h2>
            <div className="text-6xl leading-none text-yellow-400">"</div>
            <p className="max-w-xl text-lg text-gray-600">
              Scheduling scrap pickups used to take days of calling local collectors. With this
              platform I simply created a request and a vendor confirmed it within hours.
            </p>
          </motion.div>

          <motion.div
            variants={{ hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0 } }}
            transition={{ duration: 0.7 }}
            className="relative h-full w-full"
          >
            <img src="/assets/testimonial.png" alt="Customer" />
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        className="relative overflow-hidden bg-[#f3f0ea] py-32 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-[600px] w-[600px] rounded-full bg-primary/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-3xl space-y-8 px-6">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            Vendor Opportunity
          </span>
          <h2 className="font-heading text-6xl leading-tight tracking-wide text-gray-800">
            Expand Your Scrap Business
            <br />
            With New Opportunities
          </h2>
          <p className="mx-auto max-w-xl text-lg text-gray-600">
            Join a growing network of verified vendors, receive consistent pickup requests,
            and scale your operations through our digital platform.
          </p>

          <Link to="/become-vendor">
            <motion.button
              className="inline-flex items-center gap-2 rounded-md bg-yellow-400 px-10 py-4 font-semibold text-gray-900 shadow-md transition hover:bg-yellow-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Register as Vendor <ArrowRight className="h-4 w-4" />
            </motion.button>
          </Link>
        </div>
      </motion.section>

      <section className="px-6 py-24">
        <div className="mx-auto mb-16 max-w-2xl space-y-4 text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            Insights & Resources
          </span>
          <h2 className="font-heading text-6xl leading-tight tracking-wide text-gray-800">
            Knowledge for Smarter
            <br />
            Recycling Decisions
          </h2>
          <p className="text-gray-500">
            Practical guides, industry insights, and community stories that inspire
            sustainable scrap management.
          </p>
        </div>

        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">
          {blogData.map((blog) => (
            <motion.div
              key={blog.title}
              className="group overflow-hidden rounded-xl bg-white shadow-sm transition hover:shadow-lg"
              whileHover={{ y: -8 }}
            >
              <div className="overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="h-56 w-full object-cover transition duration-500 group-hover:scale-110"
                />
              </div>

              <div className="space-y-3 p-6">
                <span className="text-xs font-semibold uppercase text-primary">{blog.category}</span>
                <h3 className="font-heading text-3xl leading-snug text-gray-800">{blog.title}</h3>
                <p className="text-sm text-gray-500">{blog.content}</p>
                <button
                  onClick={() => setActiveBlog(blog)}
                  className="inline-flex items-center gap-2 font-semibold text-yellow-500 hover:underline"
                >
                  Read More <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <motion.section
        className="relative overflow-hidden bg-[#f3f0ea] py-28 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-[500px] w-[500px] rounded-full bg-primary/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-2xl space-y-8 px-6">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            Newsletter
          </span>
          <h2 className="font-heading text-6xl leading-tight tracking-wide text-gray-800">
            Stay Connected with
            <br />
            Sustainable Updates
          </h2>
          <p className="mx-auto max-w-lg text-gray-500">
            Receive recycling insights, platform news, and community stories that help
            you make smarter environmental choices.
          </p>

          <div className="mt-6 flex flex-col justify-center gap-4 md:flex-row">
            <input
              placeholder="Enter your email address"
              className="w-full rounded-md border border-gray-200 bg-white px-6 py-4 text-gray-800 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary md:w-96"
            />
            <motion.button
              className="inline-flex items-center justify-center gap-2 rounded-md bg-yellow-400 px-8 py-4 font-semibold text-gray-900 shadow-md transition hover:bg-yellow-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Subscribe <ArrowRight className="h-4 w-4" />
            </motion.button>
          </div>
        </div>
      </motion.section>

      {activeBlog && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 px-6"
          onClick={() => setActiveBlog(null)}
        >
          <div
            className="max-h-[90vh] w-full max-w-3xl overflow-auto rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={activeBlog.image}
              alt={activeBlog.title}
              className="mb-6 h-72 w-full rounded-xl object-cover"
            />
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary">
              <Globe className="h-4 w-4" />
              {activeBlog.category}
            </div>
            <h3 className="mb-4 font-heading text-4xl text-gray-800">{activeBlog.title}</h3>
            <p className="leading-relaxed text-gray-600">{activeBlog.content}</p>
            <button
              onClick={() => setActiveBlog(null)}
              className="mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 font-semibold text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default HomePage;

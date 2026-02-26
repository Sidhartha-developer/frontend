import { Link } from "react-router-dom";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-green-50/60 text-gray-900 pt-20 pb-10 border-t border-green-100 overflow-hidden">

      {/* Logo watermark */}
      <img
        src="/assets/logo.png"
        alt=""
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] opacity-55 blur-sm pointer-events-none select-none"
      />

      <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">

        {/* Brand */}
        <div className="space-y-4">
            <div className="flex">
            <img
              src="/assets/logo.png"
              alt="ScrapCollect Logo"
              className="w-7 h-7 object-contain"
            />
          <h3 className="text-2xl font-bold">ScrapZone</h3>
          </div>

          <p className="text-gray-600 max-w-xs">
            Simplifying scrap collection through smart technology and trusted
            vendor networks to create sustainable environmental impact.
          </p>

          <div className="flex gap-4 text-lg">
            {/* {["🌐", "📘", "🐦", "📸"].map((icon, i) => (
              <span
                key={i}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-gray-200 hover:bg-green-500 hover:text-white transition cursor-pointer"
              >
                {icon}
              </span>
            ))} */}
          </div>
        </div>

        {/* Links */}
        <div className="space-y-3">
          <h4 className="font-semibold">Quick Links</h4>

          <Link className="block text-gray-600 hover:text-gray-900" to="/">Home</Link>
          <Link className="block text-gray-600 hover:text-gray-900" to="/about">About</Link>
          <Link className="block text-gray-600 hover:text-gray-900" to="/how-it-works">How It Works</Link>
          <Link className="block text-gray-600 hover:text-gray-900" to="/scrap-categories">Categories</Link>
        </div>

        {/* Support */}
        <div className="space-y-3">
          <h4 className="font-semibold">Support</h4>

          <Link className="block text-gray-600 hover:text-gray-900" to="/contact">Contact</Link>
          <Link className="block text-gray-600 hover:text-gray-900" to="/privacy">Privacy Policy</Link>
          <Link className="block text-gray-600 hover:text-gray-900" to="/terms">Terms & Conditions</Link>
          <Link className="block text-gray-600 hover:text-gray-900" to="/faq">FAQ</Link>
        </div>

        {/* Contact */}
        <div className="space-y-3">
          <h4 className="font-semibold">Contact</h4>
          <p className="text-gray-600">info@scrapzone.com</p>
          <p className="text-gray-600">+91 98765 43210</p>
          <p className="text-gray-600">Hyderabad, India</p>
        </div>

      </div>

      <div className="border-t border-green-100 mt-16 pt-6 text-center text-gray-500 text-sm relative">
        © {year} ScrapZone. All rights reserved.
      </div>

    </footer>
  );
}

export default Footer;
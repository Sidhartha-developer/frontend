import { Link } from "react-router-dom";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-[#0f2f1f] text-white pt-24 pb-10 overflow-hidden">

      {/* watermark logo */}
      <img
        src="/assets/logo.png"
        alt=""
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] opacity-5 pointer-events-none select-none"
      />

      <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">

        {/* Brand */}
        <div className="space-y-5">

          <div className="flex items-center gap-2">
            <img
              src="/assets/logo.png"
              alt="ScrapZone Logo"
              className="w-8 h-8 object-contain"
            />

            <h3 className="font-heading text-4xl text-white">
              ScrapZone
            </h3>
          </div>

          <p className="text-green-200 max-w-xs">
            Simplifying scrap collection through smart technology and trusted
            vendor networks to create sustainable environmental impact.
          </p>

          {/* Social icons */}
          <div className="flex gap-3 pt-2">

            {["🌐","📘","🐦","📸"].map((icon,i)=>(
              <span
                key={i}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1f5f3b] hover:bg-[#E5C447] hover:text-black transition cursor-pointer"
              >
                {icon}
              </span>
            ))}

          </div>

        </div>


        {/* Quick Links */}
        <div className="space-y-4">

          <h4 className="font-heading text-3xl text-white">
            Quick Links
          </h4>

          <Link className="block text-green-200 hover:text-[#E5C447] transition" to="/">Home</Link>
          <Link className="block text-green-200 hover:text-[#E5C447] transition" to="/about">About</Link>
          <Link className="block text-green-200 hover:text-[#E5C447] transition" to="/how-it-works">How It Works</Link>
          <Link className="block text-green-200 hover:text-[#E5C447] transition" to="/categories">Categories</Link>

        </div>


        {/* Support */}
        <div className="space-y-4">

          <h4 className="font-heading text-3xl text-white">
            Support
          </h4>

          <Link className="block text-green-200 hover:text-[#E5C447] transition" to="/contact">Contact</Link>
          <Link className="block text-green-200 hover:text-[#E5C447] transition" to="/privacy">Privacy Policy</Link>
          <Link className="block text-green-200 hover:text-[#E5C447] transition" to="/terms">Terms & Conditions</Link>
          <Link className="block text-green-200 hover:text-[#E5C447] transition" to="/faq">FAQ</Link>

        </div>


        {/* Contact */}
        <div className="space-y-4">

          <h4 className="font-heading text-3xl text-white">
            Contact
          </h4>

          <p className="text-green-200">info@scrapzone.com</p>
          <p className="text-green-200">+91 98765 43210</p>
          <p className="text-green-200">Hyderabad, India</p>

        </div>

      </div>


      {/* bottom bar */}
      <div className="border-t border-green-900 mt-16 pt-6 text-center text-green-300 text-sm relative">
        © {year} ScrapZone. All rights reserved.
      </div>

    </footer>
  );
}

export default Footer;
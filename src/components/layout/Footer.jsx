import { Link } from "react-router-dom";
import { Facebook, Globe, Instagram, Twitter } from "lucide-react";

const socialIcons = [Globe, Facebook, Twitter, Instagram];

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-[#0f2f1f] pb-10 pt-24 text-white">
      <img
        src="/assets/logo.png"
        alt=""
        className="pointer-events-none absolute left-1/2 top-1/2 w-[420px] -translate-x-1/2 -translate-y-1/2 select-none opacity-5"
      />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-4">
        <div className="space-y-5">
          <div className="flex items-center gap-2">
            <img src="/assets/logo.png" alt="ScrapZone Logo" className="h-8 w-8 object-contain" />
            <h3 className="font-heading text-4xl text-white">ScrapZone</h3>
          </div>

          <p className="max-w-xs text-green-200">
            Simplifying scrap collection through smart technology and trusted vendor
            networks to create sustainable environmental impact.
          </p>

          <div className="flex gap-3 pt-2">
            {socialIcons.map((Icon, index) => (
              <span
                key={index}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#1f5f3b] transition hover:bg-[#E5C447] hover:text-black"
              >
                <Icon className="h-4 w-4" />
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-heading text-3xl text-white">Quick Links</h4>
          <Link className="block text-green-200 transition hover:text-[#E5C447]" to="/">Home</Link>
          <Link className="block text-green-200 transition hover:text-[#E5C447]" to="/about">About</Link>
          <Link className="block text-green-200 transition hover:text-[#E5C447]" to="/how-it-works">How It Works</Link>
          <Link className="block text-green-200 transition hover:text-[#E5C447]" to="/categories">Categories</Link>
        </div>

        <div className="space-y-4">
          <h4 className="font-heading text-3xl text-white">Support</h4>
          <Link className="block text-green-200 transition hover:text-[#E5C447]" to="/contact">Contact</Link>
          <Link className="block text-green-200 transition hover:text-[#E5C447]" to="/privacy">Privacy Policy</Link>
          <Link className="block text-green-200 transition hover:text-[#E5C447]" to="/terms">Terms & Conditions</Link>
          <Link className="block text-green-200 transition hover:text-[#E5C447]" to="/faq">FAQ</Link>
        </div>

        <div className="space-y-4">
          <h4 className="font-heading text-3xl text-white">Contact</h4>
          <p className="text-green-200">info@scrapzone.com</p>
          <p className="text-green-200">+91 98765 43210</p>
          <p className="text-green-200">Hyderabad, India</p>
        </div>
      </div>

      <div className="relative mt-16 border-t border-green-900 pt-6 text-center text-sm text-green-300">
        © {year} ScrapZone. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;

import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/categories", label: "Scrap Categories" },
  // { to: "/become-vendor", label: "Become Vendor" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const { isAuthenticated, role } = useSelector((s) => s.auth);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const dashPath =
    role === "admin"
      ? "/admin/dashboard"
      : role === "vendor"
      ? "/vendor/dashboard"
      : "/user/dashboard";

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md bg-white/90 border-b border-gray-200 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/assets/logo.png"
            alt="ScrapZone Logo"
            className="w-9 h-9 object-contain"
          />

          <span
            className={`font-heading text-4xl tracking-wide ${
              scrolled ? "text-primary" : "text-white"
            }`}
          >
            ScrapZone
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-2 font-heading text-lg">

          {navLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `px-4 py-2 rounded-md transition-all ${
                  isActive
                    ? "bg-yellow-400 text-gray-900"
                    : scrolled
                    ? "text-primary hover:text-primary"
                    : "text-white hover:text-yellow-300"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}

        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">

          {isAuthenticated ? (
            <Link
              to={dashPath}
              className="bg-yellow-400 text-gray-900 px-6 py-2.5 rounded-md text-sm font-semibold hover:bg-yellow-300 transition"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className={`hidden sm:block px-4 py-2 text-sm font-medium transition ${
                  scrolled ? "text-primary" : "text-white"
                }`}
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-primary text-white px-6 py-2.5 rounded-md text-sm font-semibold hover:bg-primary-dark transition"
              >
                Register
              </Link>
            </>
          )}

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setMenuOpen((p) => !p)}
            className={`md:hidden p-2 rounded-lg ${
              scrolled ? "text-primary" : "text-white"
            }`}
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            )}
          </button>

        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden bg-[#E5C447] px-6 py-4 space-y-2">

          {navLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-md font-heading ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-gray-900 hover:bg-yellow-300"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}

          {!isAuthenticated && (
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-3 rounded-md text-gray-900 hover:bg-yellow-300"
            >
              Login
            </Link>
          )}

        </div>
      )}
    </nav>
  );
};

export default Navbar;
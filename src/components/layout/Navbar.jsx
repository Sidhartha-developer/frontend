import { useState, useEffect }        from "react";
import { Link, NavLink }   from "react-router-dom";
import { useSelector }     from "react-redux";

const navLinks = [
  { to: "/",              label: "Home"          },
  { to: "/about",         label: "About Us"      },
  { to: "/how-it-works",  label: "How It Works"  },
  { to: "/categories",    label: "Scrap Categories"    },
  { to: "/become-vendor", label: "Become Vendor" },
  { to: "/contact",       label: "contact" },
];


const Navbar = () => {
  const { isAuthenticated, role } = useSelector((s) => s.auth);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [scrolled, setScrolled] = useState(false);

useEffect(() => {
  const handleScroll = () => setScrolled(window.scrollY > 20);
  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  const dashPath =
    role === "admin"  ? "/admin/dashboard"  :
    role === "vendor" ? "/vendor/dashboard" :
    "/user/dashboard";

  return (
    <nav
  className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 font-sans ${
    scrolled
      ? "backdrop-blur-md bg-white/70 border-b border-gray-200 shadow-sm"
      : "bg-transparent"
  }`}
>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

        {/* logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg  flex items-center justify-center">
            <img
              src="/assets/logo.png"
              alt="ScrapZone Logo"
              className="w-7 h-7 object-contain"
            />
          </div>
          <span className="text-sm font-bold text-gray-900">Scrap Zone</span>
        </Link>

        {/* desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "text-primary bg-primary/5"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        {/* right side */}
        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <Link
              to={dashPath}
              className="bg-primary text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-primary-dark transition-colors"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="hidden sm:block px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-primary text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-primary-dark transition-colors"
              >
                Register
              </Link>
            </>
          )}

          {/* mobile hamburger */}
          <button
            onClick={() => setMenuOpen((p) => !p)}
            className="md:hidden ml-1 p-2 rounded-lg text-gray-500 hover:bg-gray-50"
          >
            {menuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-1">
          {navLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? "text-primary bg-primary/5"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
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
              className="block px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50"
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

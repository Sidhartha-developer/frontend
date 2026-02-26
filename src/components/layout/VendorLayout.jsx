import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import useAuth from "../../hooks/useAuth";
import NotificationBell from "../notifications/NotificationBell";

const links = [
  {
    to: "/vendor/dashboard",
    label: "Dashboard",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    to: "/vendor/requests",
    label: "Available Requests",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
  },
  {
    to: "/vendor/my-jobs",
    label: "My Jobs",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    to: "/vendor/profile",
    label: "Profile",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
];

const VendorLayout = ({ children }) => {
  const { user } = useSelector((s) => s.auth);
  const { logoutUser } = useAuth();

  // user initials for avatar
  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "VD";

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">

      {/* ── Sidebar ── */}
      <aside className="hidden lg:flex w-64 flex-col bg-white border-r border-gray-100 fixed inset-y-0 left-0 z-40">

        {/* logo */}
        <div className="flex items-center gap-2.5 px-6 h-16 border-b border-gray-100">
          <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900 leading-none">ScrapCollect</p>
            <p className="text-[10px] text-gray-400 mt-0.5">Vendor Portal</p>
          </div>
        </div>

        {/* avatar */}
        <div className="px-4 pt-5 pb-4">
          <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-3.5 py-3 border border-gray-100">
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-bold">{initials}</span>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">{user?.name || "Vendor"}</p>
              <p className="text-[11px] text-gray-400 truncate">{user?.email || ""}</p>
            </div>
          </div>
        </div>

        {/* nav */}
        <nav className="flex-1 px-3 space-y-0.5">
          <p className="px-3 pb-2 text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
            Navigation
          </p>
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className={isActive ? "text-white" : "text-gray-400"}>
                    {l.icon}
                  </span>
                  {l.label}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* logout */}
        <div className="p-4 border-t border-gray-100">
          <button
            onClick={logoutUser}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </aside>

      {/* ── Main content ── */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">

        {/* topbar */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-100 h-16 flex items-center justify-between px-4 sm:px-6">

          {/* mobile logo */}
          <div className="flex items-center gap-2 lg:hidden">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <span className="text-sm font-bold text-gray-900">ScrapCollect</span>
          </div>

          {/* right side */}
          <div className="flex items-center gap-2 ml-auto">
            <NotificationBell />
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-white text-xs font-bold">{initials}</span>
            </div>
            <button
              onClick={logoutUser}
              className="lg:hidden ml-1 px-3 py-1.5 rounded-lg text-xs font-medium text-red-500 border border-red-100 hover:bg-red-50"
            >
              Logout
            </button>
          </div>
        </header>

        {/* mobile bottom nav */}
        <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-gray-100 flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `flex-1 flex flex-col items-center justify-center py-2.5 text-[10px] font-medium gap-1 transition-colors ${
                  isActive ? "text-primary" : "text-gray-400 hover:text-gray-600"
                }`
              }
            >
              {l.icon}
              {l.label.split(" ")[0]}
            </NavLink>
          ))}
        </nav>

        {/* page content */}
        <main className="flex-1 p-4 sm:p-6 pb-24 lg:pb-6">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default VendorLayout;
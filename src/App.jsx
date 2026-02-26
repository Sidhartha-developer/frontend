import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector }             from "react-redux";

// public
import HomePage            from "./pages/public/HomePage";
import LoginPage           from "./pages/public/LoginPage";
import RegisterPage        from "./pages/public/RegisterPage";
import ForgotPasswordPage  from "./pages/public/ForgotPasswordPage";
import ResetPasswordPage   from "./pages/public/ResetPasswordPage";
import BecomeVendorPage    from "./pages/public/BecomeVendorPage";
import HowItWorksPage      from "./pages/public/HowItWorksPage";
import ScrapCategoriesPage from "./pages/public/ScrapCategoriesPage";
import AboutPage           from "./pages/public/AboutPage";
import ContactPage         from "./pages/public/ContactPage";

// user
import UserDashboard     from "./pages/user/UserDashboard";
import CreateRequest     from "./pages/user/CreateRequest";
import MyRequests        from "./pages/user/MyRequests";
import RequestDetails    from "./pages/user/RequestDetails";
import UserNotifications from "./pages/user/UserNotifications";
import UserProfile       from "./pages/user/UserProfile";
import NearbyVendorsPage from "./pages/user/NearbyVendorsPage";

// vendor
import VendorDashboard     from "./pages/vendor/VendorDashboard";
import AvailableRequests   from "./pages/vendor/AvailableRequests";
import VendorRequestDetail from "./pages/vendor/VendorRequestDetail";
import MyJobs              from "./pages/vendor/MyJobs";
import VendorProfile       from "./pages/vendor/VendorProfile";

// admin
import AdminDashboard       from "./pages/admin/AdminDashboard";
import UsersManagement      from "./pages/admin/UsersManagement";
import VendorsManagement    from "./pages/admin/VendorsManagement";
import CategoriesManagement from "./pages/admin/CategoriesManagement";
import RequestsManagement   from "./pages/admin/RequestsManagement";

// reads role from redux — no separate file needed
const Guard = ({ children, role }) => {
  const { isAuthenticated, role: userRole } = useSelector((s) => s.auth);
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (role && userRole !== role) return <Navigate to="/" replace />;
  return children;
};

const App = () => (
  <Routes>
    {/* public routes */}
    <Route path="/"              element={<HomePage />} />
    <Route path="/about"         element={<AboutPage />} />
    <Route path="/how-it-works"  element={<HowItWorksPage />} />
    <Route path="/categories"    element={<ScrapCategoriesPage />} />
    <Route path="/become-vendor" element={<BecomeVendorPage />} />
    <Route path="/contact"       element={<ContactPage />} />
    <Route path="/login"         element={<LoginPage />} />
    <Route path="/register"      element={<RegisterPage />} />
    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
    <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

    {/* user routes */}
    <Route path="/user/dashboard"      element={<Guard role="user"><UserDashboard /></Guard>} />
    <Route path="/user/create-request" element={<Guard role="user"><CreateRequest /></Guard>} />
    <Route path="/user/requests"       element={<Guard role="user"><MyRequests /></Guard>} />
    <Route path="/user/requests/:id"   element={<Guard role="user"><RequestDetails /></Guard>} />
    <Route path="/user/nearby-vendors" element={<Guard role="user"><NearbyVendorsPage /></Guard>} />
    <Route path="/user/notifications"  element={<Guard role="user"><UserNotifications /></Guard>} />
    <Route path="/user/profile"        element={<Guard role="user"><UserProfile /></Guard>} />

    {/* vendor routes */}
    <Route path="/vendor/dashboard"    element={<Guard role="vendor"><VendorDashboard /></Guard>} />
    <Route path="/vendor/requests"     element={<Guard role="vendor"><AvailableRequests /></Guard>} />
    <Route path="/vendor/requests/:id" element={<Guard role="vendor"><VendorRequestDetail /></Guard>} />
    <Route path="/vendor/my-jobs"      element={<Guard role="vendor"><MyJobs /></Guard>} />
    <Route path="/vendor/profile"      element={<Guard role="vendor"><VendorProfile /></Guard>} />

    {/* admin routes */}
    <Route path="/admin/dashboard"   element={<Guard role="admin"><AdminDashboard /></Guard>} />
    <Route path="/admin/users"       element={<Guard role="admin"><UsersManagement /></Guard>} />
    <Route path="/admin/vendors"     element={<Guard role="admin"><VendorsManagement /></Guard>} />
    <Route path="/admin/categories"  element={<Guard role="admin"><CategoriesManagement /></Guard>} />
    <Route path="/admin/requests"    element={<Guard role="admin"><RequestsManagement /></Guard>} />

    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default App;

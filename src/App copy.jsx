import { Routes, Route } from "react-router-dom";
import Home from "./pages/external/Home";
import Navbar from "./components/layout/nav/Navbar";
import "./styles/App.css";
import About from "./pages/external/About";
import Footer from "./components/layout/Footer";
import Services from "./pages/external/Services";
import Contact from "./pages/external/Contact";
import ScrollToTop from "./components/ScrollToTop";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import UserDashboard from "./pages/user/Dashboard";
import CreatePublicEvent from "./pages/events/CreatePublicEvent";
import PublicEventList from "./pages/events/PublicEventList";
import PaginatedPublicEventList from "./pages/events/PaginatedEventList";
import EventDetail from "./pages/events/EventDetail";
import PaymentComponent from "./pages/events/PaymentComponent";
import FreeTicketComponent from "./pages/events/FreeTicketComponent";
import SuccessPage from "./pages/events/SuccessPage";
import PrivateRoutes from "./pages/auth/PrivateRoutes";
import { Toaster } from "react-hot-toast";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";
import ClanDetail from "./pages/clan/ClanDetail";
import ClanSubscription from "./pages/clan/ClanSubscription";
import Verify from "./pages/clan/Verify";
// import { ResetPassword, ForgotPassword } from "./pages/auth/PasswordReset";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Page404 from "./pages/external/404Page";
import { useRouteVisibility } from "./components/hooks/RouteVisibility";
import MessagesDashboard from "./components/dashboard/messages/index";
import NotificationDashboard from "./components/dashboard/notifications/index";
import EmergencyDashboard from "./components/dashboard/emergency/index";
import ProfileSettings from "./components/dashboard/settings/index";
import EstateDashboard from "./components/dashboard/analytics/index";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminLayout from "./components/layout/AdminLayout";
import AdminPrivateRoute from "./components/utils/AdminPrivateRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CreateEstate from "./pages/clan/CreateClan";

// QueryClient Configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});
function App() {
  const { shouldShowNav, shouldShowFooter, is404 } = useRouteVisibility();

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Toaster position="top-right" />
        <SpeedInsights />
        <Analytics />
        <ScrollToTop />
        {shouldShowNav && !is404 && <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/events" element={<PublicEventList />} />
          <Route path="/list" element={<PaginatedPublicEventList />} />
          <Route path="/public-event/:slug" element={<EventDetail />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route
            path="/public-event/payment/:eventId"
            element={<PaymentComponent />}
          />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/payments/:clanId" element={<ClanSubscription />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/settings" element={<ProfileSettings />} />
          <Route path="*" element={<Page404 />} />

          {/* Admin Routes */}
          <Route path="/dashboard" element={<AdminPrivateRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="admin" element={<EstateDashboard />} />
              <Route path="estates" element={<AdminDashboard />} />
              <Route path="emergencies" element={<EmergencyDashboard />} />
              <Route path="messages" element={<MessagesDashboard />} />
              <Route path="notifications" element={<NotificationDashboard />} />
              <Route path="clan/detail/:clanId" element={<ClanDetail />} />
              <Route path="clan/create" element={<CreateEstate />} />
              <Route path="settings" element={<ProfileSettings />} />
            </Route>
          </Route>

          <Route path="/dash" element={<AdminPrivateRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="admin" element={<EstateDashboard />} />
              <Route path="estates" element={<AdminDashboard />} />
              <Route path="emergencies" element={<EmergencyDashboard />} />
              <Route path="messages" element={<MessagesDashboard />} />
              <Route path="notifications" element={<NotificationDashboard />} />
              <Route path="clan/detail/:clanId" element={<ClanDetail />} />
              <Route path="clan/create" element={<CreateEstate />} />
              <Route path="settings" element={<ProfileSettings />} />
            </Route>
          </Route>

          {/* Private Routes */}
          <Route path="/" element={<PrivateRoutes />}>
            <Route path="dashboard/user" element={<UserDashboard />} />
            <Route
              path="free-event/payment/:eventId"
              element={<FreeTicketComponent />}
            />
            <Route path="event" element={<CreatePublicEvent />} />

            <Route path="clan/detail/:clanId" element={<ClanDetail />} />
          </Route>
        </Routes>
        {shouldShowFooter && !is404 && <Footer />}
      </QueryClientProvider>
    </div>
  );
}

export default App;

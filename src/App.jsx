import { Routes, Route } from "react-router-dom";
import "./styles/App.css";

import ScrollToTop from "./components/ScrollToTop";
// import Login from "./pages/auth/Login";
// import Register from "./pages/auth/Register";

import { Toaster } from "react-hot-toast";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Navbar from "./screen/Navbar";
import Home from "./screen/Home/index";
import Main from "./screen/Main";
import Login from "./pages/auth/Login";
import AdminPrivateRoute from "./components/utils/AdminPrivateRoute";
import AdminLayout from "./components/layout/AdminLayout";
import EstateDashboard from "./components/dashboard/analytics/index";
import IncomeList from "./screen/IncomeList";
const apiUrl = import.meta.env.VITE_API_URL;
const publicKey = import.meta.env.VITE_PUBLIC_KEY;

console.log(apiUrl, publicKey);

// QueryClient Configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});
function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Toaster position="top-right" />
        <SpeedInsights />
        <Analytics />
        <ScrollToTop />

        {/* {shouldShowNav && !is404 && <Navbar />} */}

        <Routes>
          <Route path="/" element={<Login />} />
          {/* <Route path="/dashboard" element={<Home />} /> */}
          {/* <Route path="/main" element={<Main />} /> */}
          {/* <Route path="/login" element={<Login />} /> */}

          <Route path="/dashboard" element={<AdminPrivateRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="home" element={<Home />} />
              <Route path="main" element={<Main />} />

              {/* <Route path="estates" element={<AdminDashboard />} />
              <Route path="errands" element={<Errands />} />
              <Route path="estates" element={<SuperAdminDashboard />} />
              <Route path="emergencies" element={<EmergencyDashboard />} />
              <Route path="messages" element={<MessagesDashboard />} />
              <Route path="notifications" element={<NotificationDashboard />} />
              <Route path="market-place" element={<SuperAdminMarketPlace />} />
              <Route path="annoucement" element={<Annoucement />} />
              <Route path="physical" element={<PhysicalDeviceClanScreen />} />

              <Route path="clan/detail/:clanId" element={<ClanDetail />} />
              <Route path="clan/create" element={<CreateEstate />} />
              <Route path="settings" element={<ProfileSettings />} /> */}
            </Route>
          </Route>

          {/* <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} /> */}
        </Routes>

        {/* {shouldShowFooter && !is404 && <Footer />} */}
      </QueryClientProvider>
    </div>
  );
}

export default App;

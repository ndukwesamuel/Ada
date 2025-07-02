import { Routes, Route } from "react-router-dom";
import "./styles/App.css";

import ScrollToTop from "./components/ScrollToTop";
// import Login from "./pages/auth/Login";
// import Register from "./pages/auth/Register";

import { Toaster } from "react-hot-toast";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// import Navbar from "./screen/Navbar";
import Home from "./screen/Home/index";
import Main from "./screen/Main";
import Login from "./pages/auth/Login";
import AdminPrivateRoute from "./components/utils/AdminPrivateRoute";
import AdminLayout from "./screen/tracker/AdminLayout";
// import AdminLayout from "./components/layout/AdminLayout";
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

import { useState } from "react";
import { Outlet } from "react-router-dom";
// import Header from "./nav/Header";
// import Sidebar from "./nav/SideNav";
// import { MdOutlineDashboard } from "react-icons/md";
import {
  IoStatsChart,
  // IoMailUnreadSharp,
  // IoNotificationsSharp,
} from "react-icons/io5";
import { IoMdAlert } from "react-icons/io";
import { FaBuildingColumns } from "react-icons/fa6";
import { BsShop } from "react-icons/bs";
import { FaHistory } from "react-icons/fa";
import { FaHouseChimneyUser } from "react-icons/fa6";
import { MessageSquare } from "lucide-react";
// import { FaHistory } from "react-icons/fa6";

// import Header from "./nav/Header";
import Header from "./layout/nav/Header";
import Sidebar from "./layout/nav/SideNav";

const adminNavData = [
  { path: "/estate-admin", label: "Estates", icon: FaBuildingColumns },
  { path: "/estate-admin/user", label: "Dashboard", icon: IoStatsChart },
  { path: "/estate-admin/payments", label: "Payments", icon: IoMdAlert },
  {
    path: "/estate-admin/household",
    label: "Household",
    icon: FaHouseChimneyUser,
  },
  {
    path: "/estate-admin/market-place",
    label: "Market Place",
    icon: BsShop,
  },
  // {
  //   path: "/estate-admin/forum",
  //   label: "Forum",
  //   icon: MessageSquare,
  // },
  {
    path: "/estate-admin/visitors-history",
    label: "Visitors History",
    icon: FaHistory,
  },
];

const EstateAdminLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Toggle function for sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[24rem_1fr] grid-rows-[auto_1fr] h-screen hide-scrollbar">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-10 bg-black bg-opacity-50 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
      <Sidebar
        navData={adminNavData}
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } lg:block absolute lg:relative z-20`}
      />

      <Header toggleSidebar={toggleSidebar} />

      <div className="col-span-1 lg:col-start-2 lg:py-4 overflow-scroll hide-scrollbar p-4 border border-r-2">
        <Outlet />
      </div>
    </div>
  );
};

export default EstateAdminLayout;

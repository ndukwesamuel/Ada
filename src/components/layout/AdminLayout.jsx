import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./nav/Header";
import Sidebar from "./nav/SideNav";
// import { MdOutlineDashboard } from "react-icons/md";
import {
  IoStatsChart,
  IoMailUnreadSharp,
  IoNotificationsSharp,
} from "react-icons/io5";
import { IoMdAlert } from "react-icons/io";
import { FaBuildingColumns } from "react-icons/fa6";
import { BsShop } from "react-icons/bs";
import { MessageSquare } from "lucide-react";
import { FaRunning } from "react-icons/fa";
const adminNavData = [
  { path: "/dashboard/home", label: "Dashboard", icon: IoStatsChart },
  { path: "/dashboard/main", label: "Main", icon: FaBuildingColumns },
  // { path: "/dashboard/errands", label: "Errands", icon: FaRunning },
  // {
  //   path: "/dashboard/emergencies",
  //   label: "Emergencies",
  //   icon: IoMdAlert,
  // },
  // {
  //   path: "/dashboard/messages",
  //   label: "Messages",
  //   icon: IoMailUnreadSharp,
  // },
  // {
  //   path: "/dashboard/notifications",
  //   label: "Notifications",
  //   icon: IoNotificationsSharp,
  // },
  // {
  //   path: "/dashboard/market-place",
  //   label: "Market Place",
  //   icon: BsShop,
  // },

  // {
  //   path: "/dashboard/annoucement",
  //   label: "Annoucement",
  //   icon: MessageSquare,
  // },
  // {
  //   path: "/dashboard/forum",
  //   label: "Forum",
  //   icon: MessageSquare,
  // },
];

const AdminLayout = () => {
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

export default AdminLayout;

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

const adminNavData = [
  { path: "/estate-admin", label: "Estates", icon: FaBuildingColumns },

  { path: "/dashboard/admin", label: "Dashboard game", icon: IoStatsChart },
  // { path: "/dashboard/estates", label: "Estates", icon: FaBuildingColumns },
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

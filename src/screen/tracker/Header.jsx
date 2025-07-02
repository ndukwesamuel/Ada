import { useState } from "react";
import { CgMenuGridO } from "react-icons/cg";

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
import MainNav from "./MainNav";
import UserAvatar from "./UserAvatar";

// Define your navigation data here, similar to how it was in AdminLayout
const adminNavData = [
  { path: "/dashboard/home", label: "Dashboard", icon: IoStatsChart },
  { path: "/dashboard/main", label: "Main", icon: FaBuildingColumns },
  //   { path: "/dashboard/errands", label: "Errands", icon: FaRunning },
  //   {
  //     path: "/dashboard/emergencies",
  //     label: "Emergencies",
  //     icon: IoMdAlert,
  //   },
  //   {
  //     path: "/dashboard/messages",
  //     label: "Messages",
  //     icon: IoMailUnreadSharp,
  //   },
  //   {
  //     path: "/dashboard/notifications",
  //     label: "Notifications",
  //     icon: IoNotificationsSharp,
  //   },
  //   {
  //     path: "/dashboard/market-place",
  //     label: "Market Place",
  //     icon: BsShop,
  //   },
  //   {
  //     path: "/dashboard/announcement", // Corrected typo
  //     label: "Announcement",
  //     icon: MessageSquare,
  //   },
  //   {
  //     path: "/dashboard/forum",
  //     label: "Forum",
  //     icon: MessageSquare,
  //   },
];

const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="hidden lg:flex flex-grow justify-center">
          <MainNav data={adminNavData} />
        </div>

        {/* User Avatar and Mobile Menu Icon */}
        <div className="flex items-center gap-4">
          <div className="lg:hidden">
            <CgMenuGridO
              className="text-green-500 text-3xl cursor-pointer"
              onClick={toggleMobileMenu}
            />
          </div>
        </div>
      </div>

      {/* Mobile Navigation (conditionally rendered) */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white py-4 shadow-inner">
          <MainNav
            data={adminNavData}
            isMobile={true}
            toggleMobileMenu={toggleMobileMenu}
          />
        </div>
      )}
    </div>
  );
};

// PropTypes validation (removed toggleSidebar as it's not directly passed now)
Header.propTypes = {};

export default Header;

import { NavLink, useNavigate } from "react-router-dom";
import { HiOutlineArrowLeftOnRectangle, HiOutlineCog } from "react-icons/hi2";
import { useAuth } from "../../../contexts/Auth";

/**
 * MainNav component that renders a navigation menu with dynamic links and a bottom section
 * for settings and logout actions. It is now adaptable for horizontal (desktop) and
 * vertical (mobile) layouts using Tailwind CSS.
 *
 * @param {Object} props - The props for the component.
 * @param {Array} props.data - An array of objects representing the navigation items.
 * Each object should have `path` (string), `icon` (React component), and `label` (string).
 * @param {boolean} [props.isMobile=false] - A boolean indicating if the component is rendered in a mobile context.
 * @param {Function} [props.toggleMobileMenu] - Function to close the mobile menu after a click.
 * @returns {JSX.Element} The rendered navigation menu component.
 */

function MainNav({ data = [], isMobile = false, toggleMobileMenu }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  // Handle logout and redirect
  const handleLogout = () => {
    logout();
    navigate("/"); // Redirect to the home page
    if (isMobile && toggleMobileMenu) {
      toggleMobileMenu(); // Close mobile menu on logout
    }
  };

  const handleNavLinkClick = () => {
    if (isMobile && toggleMobileMenu) {
      toggleMobileMenu(); // Close mobile menu when a nav link is clicked
    }
  };

  return (
    <nav
      className={`flex ${isMobile ? "flex-col" : "flex-row"} ${
        isMobile ? "gap-2" : "gap-6"
      } h-full`}
    >
      <ul
        className={`flex ${isMobile ? "flex-col" : "flex-row"} ${
          isMobile ? "gap-2" : "gap-6"
        } items-center`}
      >
        {data.length > 0 ? (
          data.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.path}
                aria-label={item.label}
                title={item.label}
                onClick={handleNavLinkClick}
                className={({ isActive }) =>
                  `flex items-center gap-2 py-2 px-4 rounded-lg transition-all duration-300
                   ${
                     isActive
                       ? "bg-green-600 text-white"
                       : "text-gray-700 hover:bg-green-100 hover:text-green-700"
                   }`
                }
              >
                <item.icon className="w-6 h-6" />
                <span className="text-sm md:text-base font-medium">
                  {item.label}
                </span>
              </NavLink>
            </li>
          ))
        ) : (
          <p className="text-gray-500 text-sm">
            No navigation items available.
          </p>
        )}
      </ul>

      <ul
        className={`flex ${isMobile ? "flex-col" : "flex-row"} ${
          isMobile ? "gap-2" : "gap-6"
        } items-center ${isMobile ? "mt-4 border-t pt-4" : ""}`}
      >
        {/* You can re-introduce settings here if needed */}
        {/* <li>
          <NavLink
            to="/dashboard/settings"
            aria-label="Settings"
            title="Settings"
            onClick={handleNavLinkClick}
            className={({ isActive }) =>
              `flex items-center gap-2 py-2 px-4 rounded-lg transition-all duration-300
               ${
                 isActive
                   ? "bg-green-600 text-white"
                   : "text-gray-700 hover:bg-green-100 hover:text-green-700"
               }`
            }
          >
            <HiOutlineCog className="w-6 h-6" />
            <span className="text-sm md:text-base font-medium">Settings</span>
          </NavLink>
        </li> */}
        <li>
          <button
            onClick={handleLogout}
            aria-label="Logout"
            title="Logout"
            className="flex items-center gap-2 py-2 px-4 rounded-lg transition-all duration-300
                       text-gray-700 hover:bg-red-100 hover:text-red-700"
          >
            <HiOutlineArrowLeftOnRectangle className="w-6 h-6" />
            <span className="text-sm md:text-base font-medium">Logout</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default MainNav;

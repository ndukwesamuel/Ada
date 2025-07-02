import PropTypes from "prop-types";
import SearchInput from "@/components/utils/SearchInput";
import UserAvatar from "@/components/utils/UserAvatar";
import { CgMenuGridO } from "react-icons/cg";

/**
 * Header component that displays the top navigation bar with a hamburger menu for mobile view,
 * a search input field, and a user avatar.
 * The hamburger menu toggles the sidebar visibility.
 *
 * @component
 * @example
 * const toggleSidebar = () => { console.log('Sidebar toggled'); };
 * return <Header toggleSidebar={toggleSidebar} />;
 *
 * @param {Object} props - The props for the component.
 * @param {Function} props.toggleSidebar - Function to toggle the sidebar visibility.
 *
 * @returns {JSX.Element} The rendered header component.
 */

const Header = ({ toggleSidebar }) => {
  return (
    <div className="w-full px-4 py-6 border-b flex justify-between">
      {/* Hamburger menu icon for mobile */}
      <div className="w-full flex lg:hidden gap-4 items-center justify-between">
        <h1 className="md:hidden font-bold text-2xl text-green-500">
          Pause Point
        </h1>
        <CgMenuGridO
          className="text-tremor-content-emphasis text-3xl text-green-500 cursor-pointer"
          onClick={toggleSidebar}
        />
      </div>
      {/* <SearchInput /> */}
      <UserAvatar />
    </div>
  );
};

// PropTypes validation
Header.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
};

export default Header;

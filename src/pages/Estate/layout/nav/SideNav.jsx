const Sidebar = ({ navData, className }) => {
  return (
    <div
      className={`bg-white py-8 px-10 flex flex-col gap-12 row-span-full ${className}`}
    >
      <div className="flex items-center justify-center">
        <h1 className=" lg:block text-green-600 font-bold text-3xl">Admin</h1>
      </div>
      <MainNav data={navData} />
    </div>
  );
};

export default Sidebar;

import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { HiOutlineArrowLeftOnRectangle, HiOutlineCog } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { mainlogout } from "@/redux/AuthSlice";
// import { useAuth } from "../../../../contexts/Auth"

// useAuth

/**
 * MainNav component that renders a vertical navigation menu with dynamic links and a bottom section
 * for settings and logout actions.
 *
 * @param {Object} props - The props for the component.
 * @param {Array} props.data - An array of objects representing the navigation items.
 * Each object should have `path` (string), `icon` (React component), and `label` (string).
 * @returns {JSX.Element} The rendered navigation menu component.
 */

// function MainNav({ data = [] }) {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   // Handle logout and redirect
//   const handleLogout = () => {
//     dispatch(mainlogout()); // Dispatch your Redux action

//     navigate("/"); // Redirect to the home page
//   };

//   return (
//     <nav className="h-full flex flex-col justify-between">
//       <NavList>
//         {data.length > 0 ? (
//           data.map((item, index) => (
//             <li key={index}>
//               <StyledNavLink
//                 to={item.path}
//                 aria-label={item.label}
//                 title={item.label}
//               >
//                 <item.icon />
//                 <span>{item.label}</span>
//               </StyledNavLink>
//             </li>
//           ))
//         ) : (
//           <p>No navigation items available.</p>
//         )}
//       </NavList>

//       <BottomNavList>
//         <li>
//           <StyledNavLink
//             to="/dashboard/settings"
//             aria-label="Settings"
//             title="Settings"
//           >
//             <HiOutlineCog />
//             <span>Settings</span>
//           </StyledNavLink>
//         </li>
//         <li>
//           {/* Logout Button */}
//           <LogoutButton
//             onClick={handleLogout}
//             aria-label="Logout"
//             title="Logout"
//           >
//             <HiOutlineArrowLeftOnRectangle />
//             <span className="text-[1rem] text-black">Logout</span>
//           </LogoutButton>
//         </li>
//       </BottomNavList>
//     </nav>
//   );
// }

// Styled Components

// In your MainNav component, update the StyledNavLink usage:
function MainNav({ data = [] }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handle logout and redirect
  const handleLogout = () => {
    dispatch(mainlogout()); // Dispatch your Redux action
    navigate("/"); // Redirect to the home page
  };

  return (
    <nav className="h-full flex flex-col justify-between">
      <NavList>
        {data.length > 0 ? (
          data.map((item, index) => (
            <li key={index}>
              <StyledNavLink
                to={item.path}
                aria-label={item.label}
                title={item.label}
                end // Add the end prop here
              >
                <item.icon />
                <span>{item.label}</span>
              </StyledNavLink>
            </li>
          ))
        ) : (
          <p>No navigation items available.</p>
        )}
      </NavList>

      <BottomNavList>
        {/* <li>
          <StyledNavLink
            to="/dashboard/settings"
            aria-label="Settings"
            title="Settings"
            end // Add the end prop here
          >
            <HiOutlineCog />
            <span>Settings</span>
          </StyledNavLink>
        </li> */}
        <li>
          {/* Logout Button */}
          <LogoutButton
            onClick={handleLogout}
            aria-label="Logout"
            title="Logout"
          >
            <HiOutlineArrowLeftOnRectangle />
            <span className="text-[1rem] text-black">Logout</span>
          </LogoutButton>
        </li>
      </BottomNavList>
    </nav>
  );
}
const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding-top: 2rem;
`;

const BottomNavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-top: auto;
  padding-bottom: 2rem;
`;

// const StyledNavLink = styled(NavLink)`
//   &:link,
//   &:visited {
//     display: flex;
//     align-items: center;
//     gap: 1.2rem;
//     border-radius: 10px;
//     color: var(--color-grey-50);
//     font-size: 1rem;
//     font-weight: 500;
//     padding: 1rem 2rem;
//     transition: all 0.3s;
//   }
//   &:hover {
//     background-color: rgba(4, 151, 60, 0.2);
//     color: #ffff;
//     border-radius: 10px;
//   }

//   &:active,
//   &.active:link,
//   &.active:visited {
//     color: #ffff;
//     background-color: rgba(4, 151, 60, 0.8);
//     border-radius: 10px;
//   }

//   & svg {
//     width: 2.4rem;
//     height: 2.4rem;
//     color: rgba(4, 151, 60, 0.8);
//     transition: all 0.3s;
//   }

//   &:hover svg,
//   &:active svg,
//   &.active:link svg,
//   &.active:visited svg {
//     color: #ffff;
//   }
// `;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  border: none;
  background: none;
  color: rgba(4, 151, 60, 0.8);
  font-size: 1.4rem;
  font-weight: 500;
  padding: 1.2rem 2.4rem;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    color: var(--color-brand-50);
    background-color: rgba(4, 151, 60, 0.8);
    border-radius: 10px;
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    transition: all 0.3s;
  }

  &:hover svg {
    color: #ffff;
  }
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    border-radius: 10px;
    color: var(--color-grey-50);
    font-size: 1rem;
    font-weight: 500;
    padding: 1rem 2rem;
    transition: all 0.3s;
  }
  &:hover {
    background-color: rgba(4, 151, 60, 0.2);
    color: #ffff;
    border-radius: 10px;
  }

  &:active,
  &.active:link,
  &.active:visited {
    color: #ffff;
    background-color: rgba(4, 151, 60, 0.8);
    border-radius: 10px;
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: rgba(4, 151, 60, 0.8);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: #ffff;
  }
`;

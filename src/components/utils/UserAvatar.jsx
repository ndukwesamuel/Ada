import PropTypes from "prop-types";
import { FaRegUserCircle } from "react-icons/fa";
import { useAuth } from "../../../contexts/Auth";
import { useSelector } from "react-redux";
/**
 * UserAvatar component that displays a user's avatar image along with their name and role.
 * The avatar is a circular image, and the user information (name and role) is displayed next to it.
 *
 * @component
 * @example
 * <UserAvatar />
 *
 * @returns {JSX.Element} The rendered user avatar component with an image and text.
 */

function UserAvatar() {
  const { user } = useSelector((state) => state?.reducer?.AuthSlice);

  const { selectedEstate } = useSelector(
    (state) => state?.reducer?.estateSlice
  );

  console.log({
    ll: selectedEstate?.name,
  });

  return (
    <div className="w-[240px] hidden md:flex justify-end  gap-4 items-center">
      <FaRegUserCircle className="text-2xl text-green-500" />
      <div className="flex flex-col">
        <span className="text-lg font-bold">{selectedEstate?.name}</span>
      </div>
    </div>
  );
}

// PropTypes validation
UserAvatar.propTypes = {
  username: PropTypes.string,
  role: PropTypes.string,
};

export default UserAvatar;

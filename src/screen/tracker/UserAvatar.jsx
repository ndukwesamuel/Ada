import PropTypes from "prop-types";
import { FaRegUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";

function UserAvatar() {
  const { user } = useSelector((state) => state?.reducer?.AuthSlice);
  const { selectedEstate } = useSelector(
    (state) => state?.reducer?.estateSlice
  );

  return (
    <div className="w-[240px] hidden md:flex justify-end gap-4 items-center">
      <FaRegUserCircle className="text-2xl text-green-500" />
      <div className="flex flex-col">
        <span className="text-lg font-bold">{selectedEstate?.name}</span>
      </div>
    </div>
  );
}

UserAvatar.propTypes = {
  username: PropTypes.string,
  role: PropTypes.string,
};

export default UserAvatar;

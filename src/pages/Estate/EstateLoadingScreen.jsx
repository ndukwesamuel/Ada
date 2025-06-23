import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/Auth";
import { FaSpinner } from "react-icons/fa"; // For loading spinner
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedEstate } from "@/redux/estateSlice";

export default function EstateLoadingScreen() {
  // State
  const [loading, setLoading] = useState(true);

  // Redux state
  const { user } = useSelector((state) => state?.reducer?.AuthSlice);
  const { selectedEstate } = useSelector(
    (state) => state?.reducer?.estateSlice
  );

  const dispatch = useDispatch();
  console.log({
    ooo: selectedEstate,
  });

  // Hooks
  const { auth } = useAuth();
  const navigate = useNavigate();

  // Handle estate selection
  const handleEstateSelection = (estateId) => {
    navigate(`/dashboard/estate/${estateId}`); // Navigate to the selected estate's dashboard
  };

  // Handle join/leave estate
  const handleJoinLeaveEstate = (estateId) => {
    if (selectedEstate?._id === estateId._id) {
      // Leave the estate
      console.log("Leaving estate:", estateId);
      dispatch(setSelectedEstate(null));
      // Add your logic to leave the estate (e.g., API call)
    } else {
      // Join the estate
      console.log("Joining estate:", estateId);
      dispatch(setSelectedEstate(estateId));

      // Add your logic to join the estate (e.g., API call)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div>
          <h2 className="text-2xl font-bold mb-6 text-center">
            Select an Estate
          </h2>
          {user?.user?.estates?.length > 0 ? (
            <ul className="space-y-4">
              {user?.user?.estates.map((estate) => (
                <div
                  className="flex justify-between items-center"
                  key={estate._id}
                >
                  <li
                    className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => handleEstateSelection(estate._id)}
                  >
                    <h3 className="text-lg font-semibold">{estate.name}</h3>
                    <p className="text-sm text-gray-600">{estate.email}</p>
                  </li>

                  {/* Join/Leave Button */}
                  <div>
                    <button
                      className={`${
                        selectedEstate?._id === estate._id
                          ? "bg-red-500 hover:bg-red-600"
                          : "bg-blue-500 hover:bg-blue-600"
                      } text-white py-2 px-4 rounded`}
                      onClick={() => handleJoinLeaveEstate(estate)}
                    >
                      {selectedEstate?._id === estate._id ? "Leave" : "Join"}
                    </button>
                  </div>
                </div>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-700">
              You are not an admin of any estate.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

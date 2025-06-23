import React, { useState, useEffect } from "react";
import { useFetchData, useMutateData } from "@/hook/Request";
import { FaEdit, FaTrash, FaSearch, FaFilter } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

// import { useMutateData } from "@/hook/Request";
// import { FaTimes } from "react-icons/fa";

export default function UserProfile() {
  const { id } = useParams();
  const { selectedEstate } = useSelector(
    (state) => state?.reducer?.estateSlice
  );
  const { data, isLoading, isError } = useFetchData(
    `/v1/clan/${selectedEstate?._id}/${id}`,
    "memberProfile"
  );

  if (isLoading)
    return <div className="min-h-screen bg-gray-100 p-4">Loading...</div>;
  if (isError)
    return (
      <div className="min-h-screen bg-gray-100 p-4">Error loading profile</div>
    );
  if (!data?.data)
    return (
      <div className="min-h-screen bg-gray-100 p-4">No profile data found</div>
    );

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <UserProfileCard userData={data.data} />
    </div>
  );
}

const UserProfileCard = ({ userData }) => {
  const [showAdminModal, setShowAdminModal] = useState(false);
  const { selectedEstate } = useSelector(
    (state) => state?.reducer?.estateSlice
  );
  const [currentStatus, setCurrentStatus] = useState(
    userData?.member?.status || "pending"
  );

  console.log({
    jajavnv: userData?.id,
  });

  const [isUpdating, setIsUpdating] = useState(false);

  // Determine available status actions based on current status
  const getAvailableActions = () => {
    switch (currentStatus) {
      case "approved":
        return ["suspended"];
      case "suspended":
        return ["approved"];
      case "pending":
        return ["approved", "rejected"];
      default:
        return [];
    }
  };

  // const handleStatusChange = async (newStatus) => {
  //   setIsUpdating(true);
  //   try {
  //     // Here you would typically make an API call to update the status
  //     // For now, we'll just simulate it
  //     console.log(`Updating status to ${newStatus}`);
  //     await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API delay
  //     setCurrentStatus(newStatus);
  //   } catch (error) {
  //     console.error("Failed to update status:", error);
  //   } finally {
  //     setIsUpdating(false);
  //   }
  // };

  const {
    mutate: approved_suspend_members,
    isPending: isPendingapproved_suspend,
  } = useMutateData("clanMembers", "POST");

  const handleStatusChange = (newStatus) => {
    let data = {
      newStatus: newStatus, //"approved",
      memberUserId: userData?.id, //"66a6fef6006e9083f79143db",
    };
    console.log({
      kaka: data,
    });

    approved_suspend_members(
      {
        url: `/v1/clan/${selectedEstate?._id}/webEstateMember/approve-suppend-member`,
        data: data,
      },
      {
        onSuccess: (res) => {
          console.log({
            res: res?.updatedMember?.status,
          });

          alert(`Member Status  ${res?.updatedMember?.status} successfully!`);
        },
        onError: (err) => {
          console.log({
            xc: err,
          });
          alert(`${err}`);
        },
      }
    );
  };

  const { mutate: creatememercode, isPending: isPendingcreatememercode } =
    useMutateData("clanMembers", "POST");

  const statusColors = {
    approved: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    suspended: "bg-red-100 text-red-800",
    rejected: "bg-gray-100 text-gray-800",
  };

  console.log({ lll: userData });

  const handlecreatecode = (id) => {
    let data = {
      memberId: id,
      clanId: selectedEstate?._id,
    };
    console.log({
      kaka: data,
    });

    creatememercode(
      {
        url: `/v1/clan/membercode`,
        data: data,
      },
      {
        onSuccess: () => {
          alert("Member created successfully!");
          // setFormData({ name: "", type: "", description: "", address: "" });
          // setShowModal(false);
        },
        onError: (err) => {
          console.log({
            xc: err,
          });
          alert(`${err}`);
        },
      }
    );
  };

  // Add null checks for all userData accesses
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4">
      <div className="p-8">
        <div className="flex items-center">
          <img
            className="h-16 w-16 rounded-full object-cover mr-4"
            src={userData?.photo || "https://via.placeholder.com/150"}
            alt={`${userData?.name || "User"}'s profile`}
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {userData?.name || "No name"}
            </h1>
            <p className="text-gray-600">{userData?.email || "No email"}</p>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center mb-2">
            <span className="font-semibold mr-2">Phone:</span>
            <span>{userData?.phoneNumber || "Not provided"}</span>
          </div>

          <div className="mb-2">
            <span className="font-semibold">Address:</span>
            <p>
              {userData?.address?.street || "No street"},{" "}
              {userData?.address?.city || "No city"},{" "}
              {userData?.address?.state || "No state"}
            </p>
          </div>

          <div className="mb-4">
            <span className="font-semibold">Member Code:</span>
            {userData?.member?.memberCode ? (
              <p>{userData?.member?.memberCode}</p>
            ) : (
              <button
                className="bg-green-300 p-2 rounded-lg ml-2"
                onClick={() => handlecreatecode(userData?.member?._id)}
              >
                Genereate code
              </button>
            )}
          </div>

          <div className="flex items-center mb-4">
            <span className="font-semibold mr-2">Status:</span>
            <span
              className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[currentStatus]}`}
            >
              {currentStatus}
            </span>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold mb-2">Status Actions</h3>
            <div className="flex flex-wrap gap-2">
              {getAvailableActions().map((action) => (
                <button
                  key={action}
                  onClick={() => handleStatusChange(action)}
                  disabled={isUpdating}
                  className={`px-3 py-1 rounded text-sm font-medium ${
                    isUpdating
                      ? "bg-gray-300 cursor-not-allowed"
                      : action === "approved"
                      ? "bg-green-500 hover:bg-green-600 text-white"
                      : action === "suspended"
                      ? "bg-red-500 hover:bg-red-600 text-white"
                      : "bg-yellow-500 hover:bg-yellow-600 text-white"
                  }`}
                >
                  {isUpdating && action === currentStatus
                    ? "Updating..."
                    : action}
                </button>
              ))}
            </div>
          </div>

          {userData?.member?.status === "approved" && (
            <button
              onClick={() => setShowAdminModal(true)}
              className="mt-4 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
            >
              Make Admin
            </button>
          )}

          {showAdminModal && (
            <MakeAdminModal
              isOpen={showAdminModal}
              onClose={() => setShowAdminModal(false)}
              userId={userData?.member?.user} // or userData.member._id depending on your structure
              clanId={selectedEstate?._id}
              onSuccess={() => {
                // Optional: refresh data or show success message
                alert("User successfully made admin!");
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const MakeAdminModal = ({ isOpen, onClose, userId, clanId, onSuccess }) => {
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // const { mutate: makeAdmin } = useMutateData("clanAdmins", "POST");
  // setIsSubmitting(false);

  const { mutate: createadminModal, isPending: ispendingcreateadminModal } =
    useMutateData("clanMembers", "POST");

  const handleSubmit = () => {
    // setIsSubmitting(true);

    console.log({
      fjfj: {
        userId,
        clanId,
        selectedLevel,
      },
    });

    createadminModal(
      {
        url: `/v1/clan/makeMemberAdmin`,
        data: {
          clanId,
          userId,
          adminLevel: selectedLevel,
        },
      },
      {
        onSuccess: () => {
          alert("Member created successfully!");
        },
        onError: (error) => {
          alert(`Error: ${error.message}`);
        },
        // onSettled: () => {
        //   setIsSubmitting(false);
        // },
      }
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Make User Admin</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            {/* <FaTimes /> */}
          </button>
        </div>

        <div className="mb-4">
          <p className="mb-2">Select Admin Level:</p>
          <div className="grid grid-cols-5 gap-2">
            {[1, 2, 3, 4, 5].map((level) => (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={`py-2 px-4 rounded ${
                  selectedLevel === level
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                Level {level}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`px-4 py-2 rounded text-white ${
              isSubmitting
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {ispendingcreateadminModal ? "Processing..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
};

// export default MakeAdminModal;

import { useFetchData, useMutateData } from "@/hook/Request";
import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const HouseholdDetails = () => {
  const { id } = useParams();
  const { selectedEstate } = useSelector(
    (state) => state?.reducer?.estateSlice
  );
  const [isUpdating, setIsUpdating] = useState(false);
  const [availableSearchTerm, setAvailableSearchTerm] = useState("");
  const [currentSearchTerm, setCurrentSearchTerm] = useState("");

  // Fetch all data
  const {
    data: householdData,
    isLoading: householdLoading,
    refetch: refetchHousehold,
    isError: householdError,
  } = useFetchData(
    `/v1/clan/single-household/${selectedEstate?._id}/${id}`,
    "single-household"
  );

  const { data: clanData, isLoading: clanLoading } = useFetchData(
    `/v1/clan/${selectedEstate?._id}`,
    "clanMembers"
  );

  const {
    data: nonHouseholdData,
    isLoading: nonHouseholdLoading,
    refetch: refetchNonHousehold,
  } = useFetchData(
    `/v1/clan/get-all-member-not-in-an-household/${selectedEstate?._id}`,
    "all-member-not"
  );

  const { mutateAsync: addMemberMutation } = useMutateData("household-members");
  const { mutateAsync: RemoveMemberMutation } = useMutateData(
    "household-members",
    "DELETE"
  );

  const { mutateAsync: DeleteHoueMutation } = useMutateData(
    "household-members",
    "DELETE"
  );

  // Get the household or return empty object if undefined
  const household = householdData?.households || {};

  // Define mergeMemberData within a useMemo to ensure consistency
  const availableMembers = useMemo(() => {
    const mergeMemberData = (clanMembers = [], nonHouseholdMembers = []) => {
      return nonHouseholdMembers.map((member) => {
        const userId = member.user?._id || member.user;
        const clanMember = clanMembers.find((m) => m._id === userId);

        return {
          ...clanMember,
          ...member,
          user: {
            ...(clanMember?.user || {}),
            ...(typeof member.user === "object"
              ? member.user
              : { _id: member.user }),
            name: clanMember?.name || member.user?.name,
            email: clanMember?.email || member.user?.email,
          },
        };
      });
    };

    return mergeMemberData(
      clanData?.members || [],
      nonHouseholdData?.data || []
    );
  }, [clanData, nonHouseholdData]);

  // Filter members based on search terms
  const filteredAvailableMembers = useMemo(() => {
    return availableMembers.filter((member) =>
      member?.user?.name
        ?.toLowerCase()
        .includes(availableSearchTerm.toLowerCase())
    );
  }, [availableMembers, availableSearchTerm]);

  const filteredCurrentMembers = useMemo(() => {
    return (
      household.members?.filter((member) =>
        member?.user?.name
          ?.toLowerCase()
          .includes(currentSearchTerm.toLowerCase())
      ) || []
    );
  }, [household.members, currentSearchTerm]);

  const handleAddMember = async (userId, role) => {
    setIsUpdating(true);
    try {
      await addMemberMutation({
        url: "/v1/clan/add-member",
        data: {
          householdId: id,
          users: [{ user: userId, role }],
        },
      });
      await Promise.all([refetchHousehold(), refetchNonHousehold()]);
    } catch (error) {
      console.error("Failed to add member:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemoveMember = async (userId) => {
    setIsUpdating(true);

    let householdId = id;
    try {
      console.log({
        xxx: {
          userId,
          id,
        },
      });

      console.log({
        nnn: `/v1/clan/remove-member/${householdId}/${userId}`,
      });

      await RemoveMemberMutation({
        url: `/v1/clan/remove-member/${householdId}/${userId}`,
      });
      await Promise.all([refetchHousehold(), refetchNonHousehold()]);
    } catch (error) {
      console.error("Failed to remove member:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  // Loading state
  if (householdLoading || clanLoading || nonHouseholdLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const deleteHousehold = async () => {
    if (filteredCurrentMembers.length > 0) {
      alert("Please remove all members before deleting the household.");
      return;
    } else {
      try {
        let url = `/v1/clan/remove-houseHold/${household?._id}`;

        await DeleteHoueMutation({
          url: url,
        });
        await Promise.all([refetchHousehold(), refetchNonHousehold()]);
      } catch (error) {
        console.error("Failed to delete household:", error);
      }
    }
    // if (household.members.length === 0) {
  };

  return (
    <div className="container mx-auto p-4">
      <button onClick={deleteHousehold} className=" p-2  bg-red-400 rounded-lg">
        Delete House Hold
      </button>
      {/* Header Section */}
      <div className="bg-white  mt-10 rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          {household.name || "Household Details"}
        </h1>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <div>
            <span className="font-semibold">Type:</span>{" "}
            {household.type || "N/A"}
          </div>
          <div>
            <span className="font-semibold">Created:</span>{" "}
            {household.createdAt
              ? new Date(household.createdAt).toLocaleDateString()
              : "N/A"}
          </div>
        </div>
        <p className="mt-4 text-gray-700">
          <span className="font-semibold">Address:</span>{" "}
          {household.address || "No address provided"}
        </p>
        <p className="mt-2 text-gray-700">
          <span className="font-semibold">Description:</span>{" "}
          {household.description || "No description available"}
        </p>
      </div>

      {/* Main Content - Two Column Layout */}
      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6"> */}
      <div>
        {/* Current Members */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Current Members ({filteredCurrentMembers.length || 0})
            </h2>
            <div className="relative w-64">
              <input
                type="text"
                placeholder="Search current members..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={currentSearchTerm}
                onChange={(e) => setCurrentSearchTerm(e.target.value)}
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
          {filteredCurrentMembers.length ? (
            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
              {filteredCurrentMembers.map((member) => (
                <MemberCard
                  key={member._id}
                  member={member}
                  isCurrentMember
                  onRemoveMember={handleRemoveMember}
                  isUpdating={isUpdating}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">
              {currentSearchTerm
                ? "No matching members found"
                : "No members in this household"}
            </p>
          )}
        </div>

        {/* Available Members */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Available Members ({filteredAvailableMembers.length || 0})
            </h2>
            <div className="relative w-64">
              <input
                type="text"
                placeholder="Search available members..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={availableSearchTerm}
                onChange={(e) => setAvailableSearchTerm(e.target.value)}
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
          {filteredAvailableMembers.length ? (
            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
              {filteredAvailableMembers.map((member) => (
                <MemberCard
                  key={member._id}
                  member={member}
                  onAddMember={handleAddMember}
                  isUpdating={isUpdating}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">
              {availableSearchTerm
                ? "No matching members found"
                : "No available members"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

// Reusable Member Card Component
const MemberCard = ({
  member,
  isCurrentMember = false,
  onAddMember,
  onRemoveMember,
  isUpdating,
}) => {
  const userId = member?.user?._id || member?.user;

  return (
    <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
      <div className="flex items-center mb-2 gap-4 justify-between">
        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-gray-900">
                {member?.user?.name || "Unnamed Member"}
              </h3>
              <p className="text-sm text-gray-600">
                {member?.user?.email || "No email"}
              </p>
            </div>
            {isCurrentMember && member?.role && (
              <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
                {member?.role}
              </span>
            )}
          </div>

          <div className="mt-2 flex flex-wrap gap-2">
            {member?.status && (
              <span className="inline-block px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">
                {member?.status}
              </span>
            )}
            {member?.memberCode && (
              <span className="inline-block px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded-full">
                {member?.memberCode}
              </span>
            )}
            {member?.isAdmin && (
              <span className="inline-block px-2 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-full">
                Admin
              </span>
            )}
          </div>
        </div>

        {!isCurrentMember ? (
          <div className="flex flex-col gap-2 min-w-[100px]">
            <button
              onClick={() => onAddMember(userId, "Member")}
              disabled={isUpdating}
              className="bg-sky-600 p-2 rounded-lg text-white text-sm hover:bg-sky-700 disabled:bg-sky-300"
            >
              {isUpdating ? "Adding..." : "Member"}
            </button>
            <button
              onClick={() => onAddMember(userId, "Leader")}
              disabled={isUpdating}
              className="bg-green-600 p-2 rounded-lg text-white text-sm hover:bg-green-700 disabled:bg-green-300"
            >
              {isUpdating ? "Adding..." : "Leader"}
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-2 min-w-[100px]">
            <button
              onClick={() => onRemoveMember(userId)}
              disabled={isUpdating}
              className="bg-red-600 p-2 rounded-lg text-white text-sm hover:bg-red-700 disabled:bg-red-300"
            >
              {isUpdating ? "Removing..." : "Remove"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HouseholdDetails;

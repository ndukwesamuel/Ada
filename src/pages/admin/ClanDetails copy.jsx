import { useFetchData } from "@/hook/Request";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

const ClanDetails = () => {
  const { clanId } = useParams();
  const [clanData, setClanData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: isgetEstateDetails,
    isLoading: isLoadinggetEstateDetails,
    isError: isErrorgetEstateDetails,
  } = useFetchData(`/v1/admin/get--estate/${clanId}`, "get--estate");

  console.log({
    oooo: isgetEstateDetails,
  });
  // In a real app, you would fetch this data from your API
  // useEffect(() => {
  //   const fetchClanData = async () => {
  //     try {
  //       const response = await fetch(`/api/clans/${clanId}`);
  //       const data = await response.json();
  //       setClanData(data.data);
  //     } catch (err) {
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchClanData();
  // }, [clanId]);

  // For demo purposes, we'll use static data
  React.useEffect(() => {
    setClanData({
      // Your provided clan data object here
    });
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error: {error}
        </div>
      </div>
    );
  }

  if (!clanData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          Clan data not found
        </div>
      </div>
    );
  }

  // Filter members based on search term and status
  const filteredMembers = clanData.members.filter((member) => {
    const matchesSearch =
      member.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.user.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // Group members by status
  const membersByStatus = {
    approved: filteredMembers.filter((m) => m.status === "approved"),
    pending: filteredMembers.filter((m) => m.status === "pending"),
    suspended: filteredMembers.filter((m) => m.status === "suspended"),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {clanData.name}
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Clan ID: {clanData.uniqueClanID} | Created:{" "}
                {new Date(clanData.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  clanData.status === "approved"
                    ? "bg-green-100 text-green-800"
                    : clanData.status === "pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {clanData.status.charAt(0).toUpperCase() +
                  clanData.status.slice(1)}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  clanData.isActive
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {clanData.isActive ? "Active" : "Inactive"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
    </div>
  );
};

// Tab Components
const OverviewTab = ({ clanData }) => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-blue-800">Total Members</h3>
          <p className="text-3xl font-bold mt-2">{clanData.members.length}</p>
          <p className="text-sm text-blue-600 mt-1">
            {clanData.stats?.totalAdmins || 0} admins
          </p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-green-800">Households</h3>
          <p className="text-3xl font-bold mt-2">
            {clanData.households.length}
          </p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-purple-800">Clan Wallet</h3>
          <p className="text-3xl font-bold mt-2">
            {clanData.wallet?.balance?.toLocaleString() || "0"}{" "}
            {clanData.wallet?.currency || "NGN"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-medium mb-4">Clan Information</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-500">Email</span>
              <span>{clanData.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Address</span>
              <span>{clanData.address || "Not specified"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Phone</span>
              <span>{clanData.phonenumber || "Not specified"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Created</span>
              <span>{new Date(clanData.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Last Updated</span>
              <span>{new Date(clanData.updatedAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-medium mb-4">Admin Team</h3>
          <div className="space-y-3">
            {clanData.admins.map((admin) => (
              <div
                key={admin._id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center">
                  <img
                    className="w-8 h-8 rounded-full mr-3"
                    src={`https://ui-avatars.com/api/?name=${admin.user.name}&background=random`}
                    alt={admin.user.name}
                  />
                  <div>
                    <p className="font-medium">{admin.user.name}</p>
                    <p className="text-sm text-gray-500">{admin.user.email}</p>
                  </div>
                </div>
                <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                  Level {admin.level}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const MembersTab = ({
  members,
  membersByStatus,
  searchTerm,
  setSearchTerm,
}) => {
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredMembers =
    statusFilter === "all"
      ? members
      : members.filter((m) => m.status === statusFilter);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search members by name or email..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          )}
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => setStatusFilter("all")}
            className={`px-4 py-2 rounded-lg ${
              statusFilter === "all"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 border"
            }`}
          >
            All ({members.length})
          </button>
          <button
            onClick={() => setStatusFilter("approved")}
            className={`px-4 py-2 rounded-lg ${
              statusFilter === "approved"
                ? "bg-green-600 text-white"
                : "bg-white text-gray-700 border"
            }`}
          >
            Approved ({membersByStatus.approved.length})
          </button>
          <button
            onClick={() => setStatusFilter("pending")}
            className={`px-4 py-2 rounded-lg ${
              statusFilter === "pending"
                ? "bg-yellow-500 text-white"
                : "bg-white text-gray-700 border"
            }`}
          >
            Pending ({membersByStatus.pending.length})
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Member
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Home Address
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredMembers.length > 0 ? (
              filteredMembers.map((member) => (
                <tr key={member._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={`https://ui-avatars.com/api/?name=${member.user.name}&background=random`}
                          alt={member.user.name}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {member.user.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {member.user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        member.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : member.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {member.status.charAt(0).toUpperCase() +
                        member.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {member.homeAddress || "Not specified"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  No members found matching your criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const HouseholdsTab = ({ households }) => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      {households.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {households.map((household) => (
            <div
              key={household._id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-medium mb-2">{household.name}</h3>
              <p className="text-sm text-gray-600 mb-1">
                Type: {household.type}
              </p>
              <p className="text-sm text-gray-600 mb-3">
                Members: {household.members.length}
              </p>
              <div className="text-sm text-gray-500 mb-3">
                <p className="truncate">{household.address}</p>
              </div>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View Details →
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">
            No households
          </h3>
          <p className="mt-1 text-gray-500">
            This clan doesn't have any households yet.
          </p>
        </div>
      )}
    </div>
  );
};

const WalletTab = ({ wallet }) => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-blue-800">Current Balance</h3>
          <p className="text-4xl font-bold mt-4">
            {wallet?.balance?.toLocaleString() || "0"}{" "}
            {wallet?.currency || "NGN"}
          </p>
        </div>

        <div className="md:col-span-2">
          <h3 className="text-lg font-medium mb-4">Recent Transactions</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-500 text-center">No transactions yet</p>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-medium mb-4">Add Funds</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Amount
              </label>
              <input
                type="number"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
              Deposit
            </button>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-medium mb-4">Withdraw Funds</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Amount
              </label>
              <input
                type="number"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700">
              Withdraw
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SettingsTab = ({ clanData }) => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-bold mb-6">Clan Settings</h2>

      <div className="space-y-6">
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-lg font-medium mb-4">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Clan Name
              </label>
              <input
                type="text"
                defaultValue={clanData.name}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                defaultValue={clanData.email}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                defaultValue={clanData.address}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                defaultValue={clanData.phonenumber}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-lg font-medium mb-4">Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Clan Status
              </label>
              <select
                defaultValue={clanData.status}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Active Status
              </label>
              <div className="mt-2">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    defaultChecked={clanData.isActive}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2">Active Clan</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClanDetails;

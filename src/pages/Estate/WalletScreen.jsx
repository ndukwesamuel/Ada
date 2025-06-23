import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  FiArrowUp,
  FiArrowDown,
  FiPlus,
  FiSend,
  FiRefreshCw,
} from "react-icons/fi";
import { useFetchData, useMutateData } from "@/hook/Request";

import { Link } from "react-router-dom";
// import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import AccountDetailsScreen from "./AccountDetailsScreen";

const WalletScreen = () => {
  const [isWithdrawalModalOpen, setIsWithdrawalModalOpen] = useState(false);
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("account");
  const { selectedEstate } = useSelector(
    (state) => state?.reducer?.estateSlice
  );

  const {
    data: getWallet,
    isLoading: isLoadingWallet,
    isError,
  } = useFetchData(`/v1/clan/wallet/${selectedEstate?._id}`, "household");

  const {
    data: getdues,
    isLoading: isLoadinggetdues,
    isError: iserrorgetdues,
  } = useFetchData(`/v1/clan/getallDue/${selectedEstate?._id}`, "getallDue");

  const {
    data: accounthistory,
    isLoading: isLoadingaccounthistory,
    isError: iserroraccounthistory,
  } = useFetchData(
    `/v1/clan/withdrawal-account-history/${selectedEstate?._id}`,
    "accounthistory"
  );

  //localhost:5050/api/v1/clan/withdrawal-account-history/67b4da82ed25b8de312354e3

  if (isLoadingWallet) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-600">Loading wallet data...</p>
        </div>
      </div>
    );
  }

  const handleCreateWithdrawal = async (amount) => {
    try {
    } catch (error) {
      console.error("Error creating withdrawal:", error);
      throw error;
    }
  };

  const handleWithdrawClick = () => {
    if (accounthistory?.message === "No withdrawal account") {
      alert("Please update your account information first");
    } else {
      setIsWithdrawalModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">My Wallet</h1>
        </div>

        {/* Balance Card */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="mb-6">
            <p className="text-gray-500 text-sm font-medium">
              Available Balance
            </p>
            <h2 className="text-3xl font-bold text-gray-800">
              ₦{getWallet?.clan?.balance.toFixed(2)}
            </h2>
          </div>

          <div className="flex space-x-4">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              {activeTab === "account" ? (
                <button
                  // onClick={withdrawmoney}
                  onClick={handleWithdrawClick}
                  className="flex-1 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-colors"
                >
                  <FiPlus className="mr-2" />
                  Withdraw
                </button>
              ) : (
                <Link
                  to="/estate-admin/createdue"
                  className="flex-1 flex items-center justify-center bg-yellow-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg transition-colors"
                >
                  <FiPlus className="mr-2" />
                  Create Due
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab("account")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "account"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Account Details
            </button>
            <button
              onClick={() => setActiveTab("dues")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "dues"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Dues Management
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {activeTab === "account" ? (
            <AccountDetailsScreen accountData={accounthistory} />
          ) : (
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="flex justify-between items-center p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800">
                  Recent Transactions
                </h3>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors">
                  See All
                </button>
              </div>

              <div className="divide-y divide-gray-100">
                <DuesScreen duesData={getdues} />
              </div>
            </div>
          )}
        </div>

        {/* Transactions Section */}

        <WithdrawalModal
          isOpen={isWithdrawalModalOpen}
          onClose={() => setIsWithdrawalModalOpen(false)}
          onSubmit={handleCreateWithdrawal}
          balance={getWallet?.clan?.balance || 0}
        />
      </div>
    </div>
  );
};

export default WalletScreen;

const WithdrawalModal = ({ isOpen, onClose, onSubmit, balance }) => {
  const [amount, setAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const { selectedEstate } = useSelector(
    (state) => state?.reducer?.estateSlice
  );

  const { mutate: withdrawalMutate, isPending: ispendingwithdrawalMutate } =
    useMutateData("householddata", "POST");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!amount) {
      setError("Please enter an amount");
      return;
    }

    const amountNum = parseFloat(amount);

    if (isNaN(amountNum) || amountNum <= 0) {
      setError("Please enter a valid positive amount");
      return;
    }

    if (amountNum > balance) {
      setError(`Amount cannot exceed your balance of ₦${balance.toFixed(2)}`);
      return;
    }

    // setIsSubmitting(true);
    setError("");

    let data = {
      amount: amountNum,
      clanId: selectedEstate?._id, //"67b4da82ed25b8de312354e3",
    };

    withdrawalMutate(
      {
        url: `/v1/clan/withdrawal-money`,
        data: data,
      },
      {
        onSuccess: () => {
          alert("withdrawal created successfully!");
        },
        onError: (err) => {
          console.log("Error creating household:", err);
          alert("An error occurred while creating the withdrawal.");
        },
      }
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center border-b px-6 py-4">
          <h2 className="text-xl font-semibold">Create Withdrawal Request</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            disabled={isSubmitting}
          >
            {/* <FiX size={24} /> */}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Amount (₦)
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              // placeholder="0.00"
              // step="0.01"
              // min="0"
              // max={balance}
            />
            <p className="text-sm text-gray-500 mt-1">
              Available balance: ₦{balance.toFixed(2)}
            </p>
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              disabled={isSubmitting}
            >
              {ispendingwithdrawalMutate ? (
                <>
                  <FiRefreshCw className="animate-spin inline mr-2" />
                  Processing...
                </>
              ) : (
                <>
                  <FiSend className="inline mr-2" />
                  Submit Request
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const DuesScreen = ({ duesData }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Add loading state if duesData is not yet available
  if (!duesData) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Ensure dues array exists or default to empty array
  const duesArray = duesData?.dues || [];

  // Filter dues based on search term and status
  const filteredDues = duesArray.filter((due) => {
    const matchesSearch =
      due?.serviceName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      due?.clan?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      due?.membersToPay?.some((member) =>
        member?.user?.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesStatus =
      statusFilter === "all" ||
      due?.membersToPay?.some((member) => member?.status === statusFilter);

    return matchesSearch && matchesStatus;
  });

  // Count payment statuses
  const countStatus = (status) => {
    return duesArray.reduce((count, due) => {
      return (
        count +
        (due?.membersToPay?.filter((m) => m?.status === status)?.length || 0)
      );
    }, 0);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dues Management</h1>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <label
              htmlFor="search"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Search Dues
            </label>
            <input
              type="text"
              id="search"
              placeholder="Search by service, clan, or member..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="w-full md:w-64">
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Filter by Status
            </label>
            <select
              id="status"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="bg-blue-50 px-4 py-2 rounded-lg">
            <p className="text-sm text-blue-800">
              Total Dues: {duesArray.length}
            </p>
          </div>
          <div className="bg-yellow-50 px-4 py-2 rounded-lg">
            <p className="text-sm text-yellow-800">
              Pending: {countStatus("pending")}
            </p>
          </div>
          <div className="bg-green-50 px-4 py-2 rounded-lg">
            <p className="text-sm text-green-800">
              Paid: {countStatus("paid")}
            </p>
          </div>
        </div>
      </div>

      {/* Dues List */}
      <div className="space-y-6">
        {filteredDues.length > 0 ? (
          filteredDues.map((due) => (
            <div
              key={due?._id}
              className="bg-white rounded-lg shadow overflow-hidden"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      {due?.serviceName || "No service name"}
                    </h2>
                    <p className="text-gray-600">
                      {due?.serviceDetails || "No details"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-blue-600">
                      ₦{(due?.amount || 0).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      Due:{" "}
                      {due?.dueDate
                        ? new Date(due.dueDate).toLocaleDateString()
                        : "No date"}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    {due?.clan?.name || "No clan"}
                  </span>
                  <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                    Created:{" "}
                    {due?.createdAt
                      ? new Date(due.createdAt).toLocaleDateString()
                      : "Unknown"}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-medium text-gray-700 mb-3">
                  Members ({due?.membersToPay?.length || 0})
                </h3>
                {due?.membersToPay?.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Email
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {due.membersToPay.map((member) => (
                          <tr key={member?._id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="text-sm font-medium text-gray-900">
                                  {member?.user?.name || "No name"}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {member?.user?.email || "No email"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                ${
                                  member?.status === "paid"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {member?.status || "unknown"}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-gray-500">
                    No members assigned to this due
                  </p>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-500">
              No dues found matching your criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

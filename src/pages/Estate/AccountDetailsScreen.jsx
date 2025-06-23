import { useMutateData } from "@/hook/Request";
import React, { useState } from "react";
import {
  FiArrowUp,
  FiArrowDown,
  FiPlus,
  FiSend,
  FiRefreshCw,
  FiEdit,
  FiX,
} from "react-icons/fi";
import { useSelector } from "react-redux";

const AccountDetailsScreen = ({ accountData }) => {
  const [isWithdrawalModalOpen, setIsWithdrawalModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { selectedEstate } = useSelector(
    (state) => state?.reducer?.estateSlice
  );
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const handleCreateWithdrawal = async (amount) => {
    console.log(`Creating withdrawal for amount: ${amount}`);
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Withdrawal created successfully");
        resolve();
      }, 1500);
    });
  };

  const handleUpdateAccount = async (updatedData) => {
    console.log("Updating account with:", updatedData);
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     console.log("Account updated successfully");
    //     resolve();
    //   }, 1500);
    // });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-blue-600 px-6 py-4">
          <h1 className="text-2xl font-bold text-white">Account Details</h1>
        </div>

        <div className="p-6">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b">
              Bank Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Account Name
                </p>
                <p className="text-lg font-semibold">
                  {accountData?.accountDetails?.accountName || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Account Number
                </p>
                <p className="text-lg font-semibold">
                  {accountData?.accountDetails?.accountNumber || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Bank Name</p>
                <p className="text-lg font-semibold">
                  {accountData?.accountDetails?.bankName || "N/A"}
                </p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b">
              Approval Status
            </h2>
            <div className="flex items-center">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  accountData?.accountDetails?.isAccountApproved
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {accountData?.accountDetails?.isAccountApproved
                  ? "Approved"
                  : "Pending Approval"}
              </span>
              {accountData?.accountDetails?.isAccountApproved && (
                <div className="ml-4">
                  <p className="text-sm text-gray-500">
                    Approved by:{" "}
                    {accountData?.accountDetails?.approvedBy || "N/A"}
                  </p>
                  <p className="text-sm text-gray-500">
                    Approval date:{" "}
                    {formatDate(accountData?.accountDetails?.approvalDate)}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b">
              Transaction Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Withdrawn
                </p>
                <p className="text-lg font-semibold">
                  #{accountData?.totalWithdrawn?.toFixed(2) || "0.00"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Pending Withdrawals
                </p>
                <p className="text-lg font-semibold">
                  {accountData?.pendingWithdrawals || 0}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Withdrawal Requests
                </p>
                <p className="text-lg font-semibold">
                  {accountData?.withdrawalRequests?.length || 0}
                </p>
              </div>
            </div>
          </div>

          {console.log({
            ccc: accountData?.withdrawalRequests,
          })}

          <WithdrawalRequests
            withdrawalRequests={accountData?.withdrawalRequests}
          />

          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b">
              Timestamps
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Created At</p>
                <p className="text-sm">
                  {formatDate(accountData?.createdAt) || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Last Updated
                </p>
                <p className="text-sm">
                  {formatDate(accountData?.accountDetails?.lastUpdated) ||
                    "N/A"}
                </p>
              </div>
            </div>
          </div>

          {console.log({
            vv: accountData?.message,
          })}
          <div className="mt-6 flex justify-end">
            {/* {accountData?.message === "No_withdrawal_account" ? (
              <button
                onClick={() => setIsWithdrawalModalOpen(true)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <FiPlus className="mr-2" />
                Create Withdrawal Account
              </button>
            ) : ( */}
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <FiEdit className="mr-2" />
              Edit Account Details
            </button>
            {/* )} */}
          </div>
        </div>
      </div>

      {/* Withdrawal Modal */}
      <WithdrawalModal
        isOpen={isWithdrawalModalOpen}
        onClose={() => setIsWithdrawalModalOpen(false)}
        onSubmit={handleCreateWithdrawal}
      />

      {/* Edit Account Modal */}
      <EditAccountModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleUpdateAccount}
        currentData={accountData?.accountDetails || {}}
        clan={selectedEstate}
      />
    </div>
  );
};

const WithdrawalModal = ({ isOpen, onClose, onSubmit }) => {
  const [amount, setAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount) {
      setError("Please enter an amount");
      return;
    }
    if (isNaN(amount) || parseFloat(amount) <= 0) {
      setError("Please enter a valid positive amount");
      return;
    }

    setIsSubmitting(true);
    setError("");

    onSubmit(parseFloat(amount))
      .then(() => {
        onClose();
        setAmount("");
      })
      .catch((err) => {
        setError(err.message || "Failed to create withdrawal");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
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
          >
            <FiX size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Amount (#)
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0.00"
              step="0.01"
              min="0"
            />
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
              {isSubmitting ? (
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

const EditAccountModal = ({ isOpen, onClose, onSubmit, currentData, clan }) => {
  const [formData, setFormData] = useState({
    accountName: currentData.accountName || "",
    accountNumber: currentData.accountNumber || "",
    bankName: currentData.bankName || "",
    bankCode: currentData.bankCode || "1234",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { mutate: updatebankinfo, isPending: ispendingupdatebankinfo } =
    useMutateData("accounthistory", "POST");
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.accountName.trim()) {
      setError("Account name is required");
      return;
    }
    if (!formData.accountNumber.trim()) {
      setError("Account number is required");
      return;
    }
    if (!formData.bankName.trim()) {
      setError("Bank name is required");
      return;
    }
    if (!formData.bankCode.trim()) {
      setError("Bank code is required");
      return;
    }

    setIsSubmitting(true);
    setError("");

    console.log({
      ghgH: formData,
    });

    let newdata = {
      accountName: formData?.accountName, //"Frist bank",
      accountNumber: formData?.accountNumber, //"123456789",
      bankName: formData?.bankName,
      bankCode: formData?.bankCode,
      clanId: clan?._id,
    };

    console.log({
      nvnv: newdata,
    });

    updatebankinfo(
      {
        url: `/v1/clan/updateaccount`,
        data: newdata,
      },
      {
        onSuccess: () => {
          alert("Account  created successfully!");
          onClose();
        },
        onError: (err) => {
          setError(err.message || "Failed to update account");
        },
      }
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center border-b px-6 py-4">
          <h2 className="text-xl font-semibold">Edit Account Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FiX size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Account Name
            </label>
            <input
              type="text"
              name="accountName"
              value={formData.accountName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Account Number
            </label>
            <input
              type="text"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bank Name
            </label>
            <input
              type="text"
              name="bankName"
              value={formData.bankName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {/* 
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bank Code
            </label>
            <input
              type="text"
              name="bankCode"
              value={formData.bankCode}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div> */}

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              //   disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              //   onClick={handleSubmit}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              //   disabled={isSubmitting}
            >
              {ispendingupdatebankinfo ? (
                <>
                  <FiRefreshCw className="animate-spin inline mr-2" />
                  Saving...
                </>
              ) : (
                <>
                  <FiEdit className="inline mr-2" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountDetailsScreen;

// import React from "react";

const WithdrawalRequests = ({ withdrawalRequests }) => {
  // const withdrawalRequests = [
  //   {
  //     amount: 0,
  //     status: "pending",
  //     _id: "680a3ccb19752d45a6084e7a",
  //     requestDate: "2025-04-24T13:29:47.360Z",
  //     id: "680a3ccb19752d45a6084e7a",
  //   },
  //   {
  //     amount: 0,
  //     status: "pending",
  //     _id: "680cabedd40ac07891624b4b",
  //     requestDate: "2025-04-26T09:48:29.769Z",
  //     id: "680cabedd40ac07891624b4b",
  //   },
  //   {
  //     amount: 0,
  //     status: "pending",
  //     _id: "680cac33d40ac07891624b75",
  //     requestDate: "2025-04-26T09:49:39.535Z",
  //     id: "680cac33d40ac07891624b75",
  //   },
  // ];

  // Format date to a more readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  console.log({
    omm: withdrawalRequests,
  });

  if (!withdrawalRequests || !Array.isArray(withdrawalRequests)) {
    return (
      <div className="text-center py-8 text-gray-500">
        No withdrawal requests available
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Withdrawal Requests
      </h1>

      {withdrawalRequests.length > 0 && (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Request Date
                </th>
                {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th> */}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {withdrawalRequests?.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      #{request.amount.toFixed(2)}
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${
                      request.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : request.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                    >
                      {request.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(request.requestDate)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {withdrawalRequests?.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No withdrawal requests found.
        </div>
      )}
    </div>
  );
};

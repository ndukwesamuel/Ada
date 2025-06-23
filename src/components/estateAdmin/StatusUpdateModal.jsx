import { useState } from "react";
import { useSelector } from "react-redux";
import { useMutateData } from "@/hook/Request";
import toast from "react-hot-toast";
import StatusBadge from "../utils/StatusBadge";
const StatusUpdateModal = ({ product, onClose, onUpdate }) => {
  const [selectedStatus, setSelectedStatus] = useState(product.status);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { selectedEstate } = useSelector(
    (state) => state?.reducer?.estateSlice
  );
  const clanId = selectedEstate._id;

  const { mutateAsync: updateStatus, isLoading } = useMutateData(
    "products",
    "PUT"
  );

  const handleUpdate = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const url = `/v1/products/status/${product._id}`;
      const data = {
        status: selectedStatus,
        clanId: clanId,
      };

      const response = await updateStatus({ url, data });

      if (response.success) {
        // Call the onUpdate callback to update UI and refetch data
        onUpdate(product._id, selectedStatus);
        onClose();
      }
    } catch (error) {
      toast.error(error.message || "Failed to update status");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-w-full">
        <h3 className="text-xl font-semibold mb-4">Update Product Status</h3>
        <div className="mb-4">
          <p className="text-gray-700 mb-2">
            Product: <span className="font-semibold">{product.name}</span>
          </p>
          <p className="text-gray-700 mb-4">
            Current Status: <StatusBadge status={product.status} />
          </p>

          <label className="block text-gray-700 mb-2">New Status:</label>
          <select
            className="w-full p-2 border rounded-md"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            disabled={isSubmitting || isLoading}
          >
            <option value="Pending">Pending</option>
            <option value="Approve">Approve</option>
            <option value="Decline">Decline</option>
          </select>
        </div>

        <div className="flex justify-end space-x-2">
          <button
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 disabled:opacity-50"
            onClick={onClose}
            disabled={isSubmitting || isLoading}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center"
            onClick={handleUpdate}
            disabled={isSubmitting || isLoading}
          >
            {isSubmitting || isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Updating...
              </>
            ) : (
              "Update"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatusUpdateModal;

import PropTypes from "prop-types";

const ConfirmDelete = ({
  resourceName,
  onConfirm,
  onCloseModal,
  disabled = false,
}) => {
  return (
    <div>
      <div className="flex flex-col gap-4 ">
        {/* Heading */}
        <h3 className="text-2xl font-semibold text-gray-800">
          Delete {resourceName}
        </h3>

        {/* Description */}
        <p className="text-gray-500">
          Are you sure you want to delete this {resourceName} permanently? This
          action cannot be undone.
        </p>

        {/* Buttons */}
        <div className="flex justify-end gap-4">
          <button
            onClick={onCloseModal}
            disabled={disabled}
            className={`px-4 py-2 border rounded-md font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 ${
              disabled ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={disabled}
            className={`px-4 py-2 border rounded-md font-medium text-white bg-red-500 hover:bg-red-600 ${
              disabled ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

// PropTypes for the ConfirmDelete component
ConfirmDelete.propTypes = {
  resourceName: PropTypes.string.isRequired, 
  onConfirm: PropTypes.func.isRequired,    
  onCloseModal: PropTypes.func.isRequired, 
  disabled: PropTypes.bool, 
};

export default ConfirmDelete;

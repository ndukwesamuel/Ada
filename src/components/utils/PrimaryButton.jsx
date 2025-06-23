import PropTypes from "prop-types";


const PrimaryButton = ({ label, onClick, type = "button", className, ...props }) => {
  return (
    <button
      className={`flex items-center bg-custom-green text-white hover:bg-green-600 justify-center px-3 py-2 rounded-[10px] transition-all duration-200 ${className}`}
      onClick={onClick}
      type={type}
      {...props}
    >
      {label}
    </button>
  );
};


export default PrimaryButton





PrimaryButton.propTypes = {
  label: PropTypes.string.isRequired, // Button label is required
  onClick: PropTypes.func,           // Optional callback for click events
  type: PropTypes.oneOf(["button", "submit", "reset"]), // Restrict type to valid button types
};

PrimaryButton.defaultProps = {
  type: "button",  // Default button type
};

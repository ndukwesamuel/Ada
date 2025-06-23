import PropTypes from "prop-types";

/**
 * OutlineButton component renders a styled button with an outline and optional click handler.
 * It provides a flexible way to display a button with custom content (children) inside and an optional `onClick` handler.
 * The button has hover effects and a smooth transition to enhance its user experience.
 *
 * @component
 * @example
 * <OutlineButton onClick={() => console.log("Button clicked!")}>Click Me</OutlineButton>
 *
 * @param {Object} props - The props for the OutlineButton component.
 * @param {React.ReactNode} props.children - The content to be displayed inside the button.
 * @param {Function} [props.onClick] - An optional click handler function for the button.
 *
 * @returns {JSX.Element} The rendered OutlineButton component.
 */

const OutlineButton = ({ children, onClick }) => {
  return (
    <button
      className="flex items-center whitespace-nowrap justify-center gap-2 bg-white text-gray-500 text-xl px-5 py-3 rounded-lg hover:bg-gray-50 duration-200 transition-all border-2 border-gray-300"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

// PropTypes for the OutlineButton component
OutlineButton.propTypes = {
  children: PropTypes.node.isRequired, // The content inside the button, required
  onClick: PropTypes.func,            // Optional function to handle click events
};

export default OutlineButton;

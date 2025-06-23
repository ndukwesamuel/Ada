import PropTypes from "prop-types";

/**
 * SelectDropdown component renders a customizable dropdown (select) menu with options.
 * It allows the user to select a value from a list of options, and the selected value is controlled via props.
 * The component supports an optional label to describe the dropdown field.
 *
 * @component
 * @example
 * <SelectDropdown
 *   label="Select Role"
 *   options={[{ value: 'admin', label: 'Admin' }, { value: 'user', label: 'User' }]}
 *   selectedValue="admin"
 *   onChange={(value) => console.log(value)}
 * />
 *
 * @param {Object} props - The props for the SelectDropdown component.
 * @param {string} [props.label] - An optional label for the dropdown menu.
 * @param {Array} props.options - A list of options to display in the dropdown. Each option is an object with `value` and `label` properties.
 * @param {string} props.selectedValue - The currently selected value in the dropdown.
 * @param {Function} props.onChange - A function that will be called with the selected value when the user selects an option.
 *
 * @returns {JSX.Element} The rendered SelectDropdown component.
 */
const SelectDropdown = ({ label, options, selectedValue, onChange }) => {
  return (
    <div className="w-full max-w-xs">
      {label && (
        <label className="block text-xl font-medium text-gray-700">
          {label}
        </label>
      )}
      <select
        value={selectedValue}
        onChange={(e) => onChange(e.target.value)}
        className="w-60 px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

// Add PropTypes validation
SelectDropdown.propTypes = {
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SelectDropdown;

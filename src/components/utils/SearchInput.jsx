import PropTypes from "prop-types";

const SearchInput = ({ 
  width = "33%", 
  value, 
  onChange, 
  placeholder 
}) => {
  return (
    <input
      className={`w-${width} hidden lg:block md:w-1/2 lg:w-1/3 px-8 py-1 placeholder:text-xl bg-gray-100 rounded-full border focus:border-blue-600 outline-none`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

// PropTypes for the SearchInput component
SearchInput.propTypes = {
  width: PropTypes.string,              
  value: PropTypes.string,                 
  placeholder: PropTypes.string,           
  onChange: PropTypes.func,         
};

export default SearchInput;

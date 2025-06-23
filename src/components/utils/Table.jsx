import { createContext, useContext } from "react";
import PropTypes from "prop-types";

// Table context to pass columns
const TableContext = createContext({ columns: "" });

const Table = ({ columns, children }) => {
  return (
    <TableContext.Provider value={{ columns }}>
      <div
        role="table"
        className="border border-gray-200 rounded-lg w-full mx-auto"
      >
        {children}
      </div>
    </TableContext.Provider>
  );
};

Table.propTypes = {
  columns: PropTypes.string.isRequired, // CSS grid-template-columns value
  children: PropTypes.node.isRequired,
};

// Header component
const Header = ({ children, bgColor }) => {
  const { columns } = useContext(TableContext);
  return (
    <header
      role="row"
      className={`grid ${columns} ${bgColor} gap-6 items-center border-b border-gray-300 p-4 text-sm font-semibold uppercase tracking-wide text-gray-600`}
    >
      {children}
    </header>
  );
};

Header.propTypes = {
  children: PropTypes.node.isRequired,
  bgColor: PropTypes.string, // Optional background color
};

// Row component
const Row = ({ children }) => {
  const { columns } = useContext(TableContext);
  return (
    <div
      role="row"
      className={`grid ${columns} gap-6 items-center p-4 text-sm`}
    >
      {children}
    </div>
  );
};

Row.propTypes = {
  children: PropTypes.node.isRequired,
};

// Body component
const Body = ({ data, render }) => {
  if (!data || data.length === 0) {
    return (
      <p className="text-center text-lg font-medium py-4">
        No data to show at the moment
      </p>
    );
  }

  return (
    <div role="row" className="py-2 px-3">
      {data.map((item, index) => render(item, index))}
    </div>
  );
};

Body.propTypes = {
  data: PropTypes.array.isRequired, // Array of data items
  render: PropTypes.func.isRequired, // Function to render each row
};

// Footer component
const Footer = ({ children }) => {
  return (
    <footer className="bg-gray-100 p-4 flex justify-center">
      {children || null}
    </footer>
  );
};

Footer.propTypes = {
  children: PropTypes.node,
};

// Compose components within Table
Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Footer = Footer;

export default Table;

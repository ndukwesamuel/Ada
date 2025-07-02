// Summary.jsx
import React from "react";
import PropTypes from "prop-types";

function Summary({ incomes, expenses, balance }) {
  const balanceColorClass = balance >= 0 ? "text-green-600" : "text-red-600";

  return (
    <div className="text-center">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800">
        Your Financial Summary
      </h2>
      <div className="flex flex-col sm:flex-row justify-around items-center sm:space-x-8 space-y-4 sm:space-y-0">
        <div className="flex flex-col items-center">
          <p className="text-gray-600 text-sm sm:text-base">Total Income</p>
          <span className="text-green-600 text-2xl sm:text-3xl font-bold">
            £{incomes.toFixed(2)}
          </span>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-gray-600 text-sm sm:text-base">Total Expenses</p>
          <span className="text-red-600 text-2xl sm:text-3xl font-bold">
            £{expenses.toFixed(2)}
          </span>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-gray-600 text-sm sm:text-base">Balance</p>
          <span
            className={`text-2xl sm:text-3xl font-bold ${balanceColorClass}`}
          >
            £{balance.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}

Summary.propTypes = {
  incomes: PropTypes.number.isRequired,
  expenses: PropTypes.number.isRequired,
  balance: PropTypes.number.isRequired,
};

export default Summary;

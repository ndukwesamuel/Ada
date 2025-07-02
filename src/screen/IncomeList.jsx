import React from "react";
import PropTypes from "prop-types";

function IncomeList({ incomes, deleteIncome }) {
  return (
    <div>
      <h3 className="text-lg font-bold mb-3 text-gray-800">Income History</h3>
      {incomes?.length === 0 ? (
        <p className="text-gray-500 text-sm italic">No income recorded yet.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {incomes?.map((income) => (
            <li
              key={income.id}
              className="py-3 flex justify-between items-center text-gray-800"
            >
              <div className="flex-1 min-w-0 pr-2">
                <span className="font-medium text-base sm:text-lg block truncate">
                  {income.source}
                </span>
                <span className="text-gray-500 text-xs sm:text-sm">
                  {income.date}
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-green-600 font-semibold text-base sm:text-lg">
                  £{income.amount?.toFixed(2)}
                </span>
                <button
                  onClick={() => deleteIncome(income.id)}
                  className="ml-3 sm:ml-4 text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors duration-200"
                  aria-label="Delete income"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm6 0a1 1 0 11-2 0v6a1 1 0 112 0V8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

IncomeList.propTypes = {
  incomes: PropTypes.array, // Can be null initially
  deleteIncome: PropTypes.func.isRequired,
};

export default IncomeList;

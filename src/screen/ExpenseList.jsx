import React from "react";
import PropTypes from "prop-types";

function ExpenseList({ expenses, deleteExpense }) {
  return (
    <div>
      <h3 className="text-lg font-bold mb-3 text-gray-800">Expense History</h3>
      {expenses?.length === 0 ? (
        <p className="text-gray-500 text-sm italic">
          No expenses recorded yet.
        </p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {expenses?.map((expense) => (
            <li
              key={expense.id}
              className="py-3 flex justify-between items-center text-gray-800"
            >
              <div className="flex-1 min-w-0 pr-2">
                <span className="font-medium text-base sm:text-lg block truncate">
                  {expense.category}
                </span>
                <span className="text-gray-500 text-xs sm:text-sm">
                  {expense.date}
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-red-600 font-semibold text-base sm:text-lg">
                  £{expense.amount?.toFixed(2)}
                </span>
                <button
                  onClick={() => deleteExpense(expense.id)}
                  className="ml-3 sm:ml-4 text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors duration-200"
                  aria-label="Delete expense"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zm-1 8a1 1 0 100 2h4a1 1 0 100-2H8z"
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

ExpenseList.propTypes = {
  expenses: PropTypes.array, // Can be null initially
  deleteExpense: PropTypes.func.isRequired,
};

export default ExpenseList;

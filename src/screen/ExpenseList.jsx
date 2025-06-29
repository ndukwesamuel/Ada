function ExpenseList({ expenses, deleteExpense }) {
  return (
    <div>
      <h3 className="text-lg font-medium mb-2">Expense History</h3>
      {expenses.length === 0 ? (
        <p className="text-gray-500">No expenses recorded yet</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {expenses.map((expense) => (
            <li key={expense.id} className="py-3 flex justify-between">
              <div>
                <span className="font-medium">{expense.category}</span>
                <span className="text-gray-500 text-sm block">
                  {expense.date}
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-red-600 font-medium">
                  £{expense.amount.toFixed(2)}
                </span>
                <button
                  onClick={() => deleteExpense(expense.id)}
                  className="ml-4 text-red-500 hover:text-red-700"
                  aria-label="Delete expense"
                >
                  ×
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ExpenseList;

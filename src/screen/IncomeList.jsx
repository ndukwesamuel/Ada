function IncomeList({ incomes, deleteIncome }) {
  return (
    <div>
      <h3 className="text-lg font-medium mb-2">Income History</h3>
      {incomes?.length === 0 ? (
        <p className="text-gray-500">No income recorded yet</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {incomes?.map((income) => (
            <li key={income.id} className="py-3 flex justify-between">
              <div>
                <span className="font-medium">{income.source}</span>
                <span className="text-gray-500 text-sm block">
                  {income.date}
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-green-600 font-medium">
                  £{income.amount.toFixed(2)}
                </span>
                <button
                  onClick={() => deleteIncome(income.id)}
                  className="ml-4 text-red-500 hover:text-red-700"
                  aria-label="Delete income"
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

export default IncomeList;

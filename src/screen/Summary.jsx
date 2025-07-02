function Summary({ incomes, expenses, balance }) {
  // const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);
  // const totalExpenses = expenses.reduce(
  //   (sum, expense) => sum + expense.amount,
  //   0
  // );
  // const netBalance = totalIncome - totalExpenses;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-blue-600">Summary</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-green-800">Total Income</h3>
          <p className="text-2xl font-bold text-green-600">
            £{incomes.toFixed(2)}
          </p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-red-800">Total Expenses</h3>
          <p className="text-2xl font-bold text-red-600">
            £{expenses.toFixed(2)}
          </p>
        </div>
        <div
          className={`p-4 rounded-lg ${
            balance >= 0 ? "bg-blue-50" : "bg-yellow-50"
          }`}
        >
          <h3 className="text-sm font-medium">Net Balance</h3>
          <p
            className={`text-2xl font-bold ${
              balance >= 0 ? "text-blue-600" : "text-yellow-600"
            }`}
          >
            £{balance.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Summary;

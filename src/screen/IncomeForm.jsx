import { useMutateData } from "@/hook/Request";
import { useState } from "react";
// import { useSelector } from "react-redux"; // Not used in this component currently

function IncomeForm({ onIncomeAdded }) {
  // Changed prop name for clarity
  const [source, setSource] = useState("");
  const [amount, setAmount] = useState("");
  // const { user } = useSelector((state) => state?.reducer?.AuthSlice); // Commented out as `user` isn't used directly here

  const { mutate: createIncome, isPending: isCreatingIncome } = useMutateData(
    "incomes",
    "POST"
  ); // Changed query key to 'incomes'

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!source || !amount) {
      alert("Please enter both source and amount.");
      return;
    }

    createIncome(
      {
        url: `/api/v1/main/income`,
        data: {
          source: source,
          amount: parseFloat(amount),
        },
      },
      {
        onSuccess: () => {
          alert("Income added successfully!");
          setSource("");
          setAmount("");
          if (onIncomeAdded) {
            onIncomeAdded(); // Trigger refetch in parent
          }
        },
        onError: (err) => {
          console.error("Error creating income:", err);
          alert(`Failed to add income: ${err.message || "An error occurred"}`);
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-4">
      <div>
        <label
          htmlFor="income-source"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Source
        </label>
        <input
          type="text"
          id="income-source"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-800 placeholder-gray-400"
          placeholder="Where did the income come from?"
          required
        />
      </div>
      <div>
        <label
          htmlFor="income-amount"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Amount (£)
        </label>
        <input
          type="number"
          id="income-amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-800 placeholder-gray-400"
          placeholder="0.00"
          min="0"
          step="0.01"
          required
        />
      </div>

      <button
        type="submit"
        className={`w-full py-2 px-4 rounded-md transition duration-200 font-semibold
          ${
            isCreatingIncome
              ? "bg-purple-300 text-gray-600 cursor-not-allowed"
              : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md"
          }`}
        disabled={isCreatingIncome}
      >
        {isCreatingIncome ? "Adding Income..." : "Add Income"}
      </button>
    </form>
  );
}

export default IncomeForm;

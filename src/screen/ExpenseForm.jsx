import { useMutateData } from "@/hook/Request";
import { useState } from "react";

function ExpenseForm({ onExpenseAdded }) {
  // Changed prop name for clarity
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");

  const { mutate: createExpense, isPending: isCreatingExpense } = useMutateData(
    "expenses", // Changed query key to 'expenses'
    "POST"
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!category || !amount) {
      alert("Please enter both category and amount.");
      return;
    }

    createExpense(
      {
        url: `/api/v1/main/exp`, // Assuming this is your expense endpoint
        data: {
          category: category,
          amount: parseFloat(amount),
        },
      },
      {
        onSuccess: () => {
          alert("Expense added successfully!");
          setCategory("");
          setAmount("");
          if (onExpenseAdded) {
            onExpenseAdded(); // Trigger refetch in parent
          }
        },
        onError: (err) => {
          console.error("Error creating expense:", err);
          alert(`Failed to add expense: ${err.message || "An error occurred"}`);
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-4">
      <div>
        <label
          htmlFor="expense-category"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Category
        </label>
        <input
          type="text"
          id="expense-category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-800 placeholder-gray-400"
          placeholder="What was the expense for?"
          required
        />
      </div>
      <div>
        <label
          htmlFor="expense-amount"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Amount (£)
        </label>
        <input
          type="number"
          id="expense-amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-800 placeholder-gray-400"
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
            isCreatingExpense
              ? "bg-red-300 text-gray-600 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700 text-white shadow-md"
          }`}
        disabled={isCreatingExpense}
      >
        {isCreatingExpense ? "Adding Expense..." : "Add Expense"}
      </button>
    </form>
  );
}

export default ExpenseForm;

import { useMutateData } from "@/hook/Request";
import { useState } from "react";
import { useSelector } from "react-redux";

function IncomeForm({ addIncome }) {
  const [source, setSource] = useState("");
  const [amount, setAmount] = useState("");
  const { user } = useSelector((state) => state?.reducer?.AuthSlice);

  console.log({
    gggh: user?.data?.token,
  });

  const { mutate: createIncome, isPending: isPendingcreateIncome } =
    useMutateData("incomedata", "POST");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!source || !amount) return;
    // addIncome(source, amount);

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
          alert("Income created successfully!");
          setSource("");
          setAmount("");
        },
        onError: (err) => {
          console.log({
            xc: err,
          });
          alert(`${err}`);
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Source
        </label>
        <input
          type="text"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="Where did the income come from?"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Amount (£)
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="0.00"
          min="0"
          step="0.01"
          required
        />
      </div>

      {isPendingcreateIncome ? (
        <div className="mb-4">
          <p>Loading .........</p>
        </div>
      ) : (
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md transition duration-200"
        >
          Add Income
        </button>
      )}
    </form>
  );
}

export default IncomeForm;

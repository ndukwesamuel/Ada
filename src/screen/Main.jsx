import { useState, useEffect } from "react";
import IncomeForm from "./IncomeForm";
import ExpenseForm from "./ExpenseForm";
import IncomeList from "./IncomeList";
import ExpenseList from "./ExpenseList";
import Summary from "./Summary";
import { useFetchData, useMutateData } from "@/hook/Request"; // Ensure this path is correct

function Main() {
  // Local state for incomes and expenses (kept for now, but API data is prioritized)
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);

  // Fetching data from API
  const { data: incomeApiData, refetch: refetchIncomeData } = useFetchData(
    `/api/v1/main/income`,
    "incomes" // Changed query key for clarity
  );

  const { data: expenseApiData, refetch: refetchExpenseData } = useFetchData(
    `/api/v1/main/exp`,
    "expenses" // Changed query key for clarity
  );

  const { mutateAsync: RemoveExp } = useMutateData("expenses", "DELETE");

  // Calculate totals from API data
  const totalIncome =
    incomeApiData?.incomes?.reduce((sum, item) => sum + item?.amount, 0) || 0;
  const totalExpenses =
    expenseApiData?.reduce((sum, item) => sum + item?.amount, 0) || 0;

  const balance = totalIncome - totalExpenses;

  // --- Local Storage Management (Consider removing if API is the single source of truth) ---
  // If you want to keep local storage for offline capabilities or initial load,
  // ensure it doesn't conflict with API data. For this example,
  // I'm assuming API data is paramount once fetched.
  useEffect(() => {
    // These useEffects for localStorage are potentially redundant if API is primary source.
    // They are kept here for now as per your original code, but you might want to remove them
    // or adjust their logic to integrate better with the fetched data.
    const savedIncomes = JSON.parse(localStorage.getItem("incomes")) || [];
    const savedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    setIncomes(savedIncomes);
    setExpenses(savedExpenses);
  }, []);

  useEffect(() => {
    localStorage.setItem("incomes", JSON.stringify(incomes));
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [incomes, expenses]);
  // --- End Local Storage Management ---

  // Functions for adding/deleting (these should ideally trigger API calls and then refetch)
  // For now, I'm keeping the local state updates, but you'll likely want to
  // integrate them with your `useMutateData` calls in IncomeForm/ExpenseForm
  // and then call `refetchIncomeData()` or `refetchExpenseData()` on success.
  const addIncome = (source, amount) => {
    // This local state update is being superseded by API calls.
    // It's here mainly for conceptual completeness if you also want local fallback.
    const newIncome = {
      id: Date.now(),
      source,
      amount: parseFloat(amount),
      date: new Date().toLocaleDateString(),
    };
    setIncomes([...incomes, newIncome]); // This will likely be removed
  };

  const addExpense = (category, amount) => {
    // This local state update is being superseded by API calls.
    const newExpense = {
      id: Date.now(),
      category,
      amount: parseFloat(amount),
      date: new Date().toLocaleDateString(),
    };
    setExpenses([...expenses, newExpense]); // This will likely be removed
  };

  const deleteIncome = async (item) => {
    console.log({
      gg: item?._id,
    });

    try {
      await RemoveExp({
        url: `/api/v1/main/income/${item?._id}`,
      });
      await Promise.all([refetchIncomeData()]);
    } catch (error) {
      console.error("Failed to remove member:", error);
    } finally {
      // setIsUpdating(false);
    }
  };

  const deleteExpense = async (item) => {
    console.log({
      gg: item?._id,
    });

    try {
      await RemoveExp({
        url: `/api/v1/main/exp/${item?._id}`,
      });
      await Promise.all([refetchExpenseData()]);
    } catch (error) {
      console.error("Failed to remove member:", error);
    } finally {
      // setIsUpdating(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-6 sm:mb-8 text-purple-600">
        Exp/Income Tracker
      </h1>

      {/* Summary Section */}
      <div className="mb-8 bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-gray-100">
        <Summary
          incomes={totalIncome}
          expenses={totalExpenses}
          balance={balance}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {/* Income Section */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold mb-5 text-green-600">Income</h2>
          <IncomeForm addIncome={addIncome} onIncomeAdded={refetchIncomeData} />
          <IncomeList
            incomes={incomeApiData?.incomes}
            deleteIncome={deleteIncome} // You'll want to update this to trigger an API delete
          />
        </div>

        {/* Expense Section */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold mb-5 text-red-600">Expenses</h2>
          <ExpenseForm
            addExpense={addExpense}
            onExpenseAdded={refetchExpenseData}
          />
          <ExpenseList
            expenses={expenseApiData}
            deleteExpense={deleteExpense} // You'll want to update this to trigger an API delete
          />
        </div>
      </div>
    </div>
  );
}

export default Main;

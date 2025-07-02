import { useState, useEffect } from "react";
// import IncomeForm from "./components/IncomeForm";
// import ExpenseForm from "./components/ExpenseForm";
// import IncomeList from "./components/IncomeList";
// import ExpenseList from "./components/ExpenseList";
// import Summary from "./components/Summary";
import IncomeForm from "./IncomeForm";
import ExpenseForm from "./ExpenseForm";
import IncomeList from "./IncomeList";
import ExpenseList from "./ExpenseList";
import Summary from "./Summary";
import { useFetchData } from "@/hook/Request";

function Main() {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const { data: isIncomeData, refetch: refetchisIncomeData } = useFetchData(
    `/api/v1/main/income`,
    "incomedata"
  );

  const { data: isExp, refetch: refetchisExp } = useFetchData(
    `/api/v1/main/exp`,
    "expdata"
  );

  const totalIncome =
    isIncomeData?.incomes?.reduce((sum, item) => sum + item?.amount, 0) || 0;
  const totalExpenses =
    isExp?.reduce((sum, item) => sum + item?.amount, 0) || 0;

  const balance = totalIncome - totalExpenses;

  // Load data from localStorage on initial render
  useEffect(() => {
    const savedIncomes = JSON.parse(localStorage.getItem("incomes")) || [];
    const savedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    setIncomes(savedIncomes);
    setExpenses(savedExpenses);
  }, []);

  // Save data to localStorage whenever incomes or expenses change
  useEffect(() => {
    localStorage.setItem("incomes", JSON.stringify(incomes));
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [incomes, expenses]);

  const addIncome = (source, amount) => {
    const newIncome = {
      id: Date.now(),
      source,
      amount: parseFloat(amount),
      date: new Date().toLocaleDateString(),
    };
    setIncomes([...incomes, newIncome]);
  };

  const addExpense = (category, amount) => {
    const newExpense = {
      id: Date.now(),
      category,
      amount: parseFloat(amount),
      date: new Date().toLocaleDateString(),
    };
    setExpenses([...expenses, newExpense]);
  };

  const deleteIncome = (id) => {
    setIncomes(incomes.filter((income) => income.id !== id));
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">
        Exp/Income Tracker
      </h1>

      {/* Summary Section */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <Summary
          incomes={totalIncome}
          expenses={totalExpenses}
          balance={balance}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Income Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-green-600">Income</h2>
          <IncomeForm addIncome={addIncome} />
          <IncomeList
            incomes={isIncomeData?.incomes}
            deleteIncome={deleteIncome}
          />
        </div>

        {/* Expense Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-red-600">Expenses</h2>
          <ExpenseForm addExpense={addExpense} />
          <ExpenseList expenses={isExp} deleteExpense={deleteExpense} />
        </div>
      </div>
    </div>
  );
}

export default Main;

import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import SummaryCards from "./components/SummaryCards";
import Transactions from "./components/Transactions";
import RoleSwitcher from "./components/RoleSwitcher";
import Charts from "./components/Charts";
import Insights from "./components/Insights";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
  return localStorage.getItem("theme") === "dark";
});
  const [role, setRole] = useState(
  localStorage.getItem("role") || "viewer"
);

  // load from localStorage
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");

    if (saved) {
      return JSON.parse(saved);
    } else {
      return [
        { id: 1, date: "2026-04-01", amount: 500, category: "Food", type: "expense" },
        { id: 2, date: "2026-04-02", amount: 2000, category: "Salary", type: "income" },
        { id: 3, date: "2026-04-03", amount: 800, category: "Shopping", type: "expense" },
      ];
    }
  });

  // save to localStorage
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  // dark mode logic
  useEffect(() => {
  if (darkMode) {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
}, [darkMode]);

//Save Role
  useEffect(() => {
  localStorage.setItem("role", role);
}, [role]);

  const income = transactions
  .filter((t) => t.type === "income")
  .reduce((sum, t) => sum + t.amount, 0);

const expenses = transactions
  .filter((t) => t.type === "expense")
  .reduce((sum, t) => sum + t.amount, 0);

const balance = income - expenses;

  return (
    <div className="min-h-screen bg-white dark:bg-black">

      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <div className="p-6">

        <RoleSwitcher role={role} setRole={setRole} />

        <h2 className="text-2xl font-semibold text-black dark:text-white mb-6">
          Overview
        </h2>

        <SummaryCards
          balance={balance}
          income={income}
          expenses={expenses}
          role={role}
        />

        <Charts transactions={transactions} />

<div className="mt-6">
  <Insights transactions={transactions} />
</div>

<div className="mt-6">
  <Transactions
    transactions={transactions}
    setTransactions={setTransactions}
    role={role}
  />
</div>

      </div>

    </div>
  );
}

export default App;
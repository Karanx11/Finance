import { useState, useEffect } from "react";

function SummaryCards({ balance, income, expenses, role }) {
  const [editMode, setEditMode] = useState(false);
  const [isEdited, setIsEdited] = useState(false);

  const [localData, setLocalData] = useState({
    balance,
    income,
    expenses,
  });

  // load saved summary
  useEffect(() => {
    const saved = localStorage.getItem("summary");

    if (saved) {
      const parsed = JSON.parse(saved);
      setLocalData(parsed);
      setIsEdited(true);
    }
  }, []);

  // ✅ reset only when NOT editing
  useEffect(() => {
    if (!editMode) {
      setIsEdited(false);
    }
  }, [balance, income, expenses]);

  // save only if edited
  useEffect(() => {
    if (isEdited) {
      localStorage.setItem("summary", JSON.stringify(localData));
    }
  }, [localData, isEdited]);

  const toggleEdit = () => {
    if (editMode) {
      setIsEdited(true); // save on exit
    }
    setEditMode(!editMode);
  };

  const handleChange = (key, value) => {
    setLocalData({
      ...localData,
      [key]: Number(value),
    });
  };

  // display logic
  const displayBalance = isEdited ? localData.balance : balance;
  const displayIncome = isEdited ? localData.income : income;
  const displayExpenses = isEdited ? localData.expenses : expenses;

  return (
    <div className="mb-8">

      {/* Admin only edit */}
      {role === "admin" && (
        <div className="flex justify-end mb-2 gap-2">

          <button
            onClick={toggleEdit}
            className="px-3 py-1 bg-[#346739] text-white rounded text-sm"
          >
            {editMode ? "Save" : "Edit"}
          </button>

          {/* Reset */}
          {isEdited && (
            <button
              onClick={() => {
                localStorage.removeItem("summary");
                setIsEdited(false);
              }}
              className="px-3 py-1 bg-red-500 text-white rounded text-sm"
            >
              Reset
            </button>
          )}

        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Balance */}
        <div className="p-5 rounded-lg bg-gray-100 dark:bg-gray-900">
          <p className="text-gray-600 dark:text-gray-400">Total Balance</p>

          {editMode ? (
            <input
              type="number"
              value={localData.balance}
              onChange={(e) => handleChange("balance", e.target.value)}
              className="mt-2 p-2 w-full rounded border dark:bg-gray-800 dark:text-white"
            />
          ) : (
            <h3 className="text-2xl font-bold text-black dark:text-white mt-2">
              ₹{displayBalance}
            </h3>
          )}
        </div>

        {/* Income */}
        <div className="p-5 rounded-lg bg-gray-100 dark:bg-gray-900">
          <p className="text-gray-600 dark:text-gray-400">Income</p>

          {editMode ? (
            <input
              type="number"
              value={localData.income}
              onChange={(e) => handleChange("income", e.target.value)}
              className="mt-2 p-2 w-full rounded border dark:bg-gray-800 dark:text-white"
            />
          ) : (
            <h3 className="text-2xl font-bold text-green-500 mt-2">
              ₹{displayIncome}
            </h3>
          )}
        </div>

        {/* Expenses */}
        <div className="p-5 rounded-lg bg-gray-100 dark:bg-gray-900">
          <p className="text-gray-600 dark:text-gray-400">Expenses</p>

          {editMode ? (
            <input
              type="number"
              value={localData.expenses}
              onChange={(e) => handleChange("expenses", e.target.value)}
              className="mt-2 p-2 w-full rounded border dark:bg-gray-800 dark:text-white"
            />
          ) : (
            <h3 className="text-2xl font-bold text-red-500 mt-2">
              ₹{displayExpenses}
            </h3>
          )}
        </div>

      </div>
    </div>
  );
}

export default SummaryCards;
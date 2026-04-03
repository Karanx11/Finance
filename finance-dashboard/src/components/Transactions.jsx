import { useState } from "react";

function Transactions({ transactions, setTransactions, role }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("expense");

  const filteredData = transactions.filter((t) => {
    const matchSearch = t.category.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || t.type === filter;
    return matchSearch && matchFilter;
  });

  const handleAdd = () => {
    if (!amount || !category) return;

    const newTransaction = {
      id: Date.now(),
      date: new Date().toISOString().split("T")[0],
      amount: Number(amount),
      category,
      type,
    };

    setTransactions([newTransaction, ...transactions]);

    setAmount("");
    setCategory("");
    setType("expense");
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this transaction?"
    );

    if (confirmDelete) {
      const updated = transactions.filter((t) => t.id !== id);
      setTransactions(updated);
    }
  };

  return (
    <div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-2">
        <h2 className="text-xl md:text-2xl font-semibold text-black dark:text-white">
          Transactions
        </h2>
      </div>

      {/* ADMIN FORM */}
      {role === "admin" && (
        <div className="mb-6 p-4 bg-gray-100 dark:bg-gray-900 rounded">

          <h3 className="mb-3 font-semibold text-black dark:text-white">
            Add Transaction
          </h3>

          {/* Mobile: stacked, Desktop: grid */}
          <div className="flex flex-col md:grid md:grid-cols-4 gap-3">

            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="p-2 border rounded dark:bg-gray-800 dark:text-white w-full"
            />

            <input
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="p-2 border rounded dark:bg-gray-800 dark:text-white w-full"
            />

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="p-2 border rounded dark:bg-gray-800 dark:text-white w-full"
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>

            <button
              onClick={handleAdd}
              className="bg-[#346739] text-white rounded p-2 w-full"
            >
              Add
            </button>

          </div>

        </div>
      )}

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-3 mb-4">

        <input
          type="text"
          placeholder="Search category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded w-full dark:bg-gray-900 dark:border-gray-700 dark:text-white"
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border rounded w-full md:w-auto dark:bg-gray-900 dark:border-gray-700 dark:text-white"
        >
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded border border-gray-300 dark:border-gray-700">

        <table className="min-w-[600px] w-full">

          <thead className="bg-gray-200 dark:bg-gray-800 text-sm text-black dark:text-white">
            <tr>
              <th className="p-2 md:p-3 text-left">Date</th>
              <th className="p-2 md:p-3 text-left">Category</th>
              <th className="p-2 md:p-3 text-left">Type</th>
              <th className="p-2 md:p-3 text-left">Amount</th>
              {role === "admin" && (
                <th className="p-2 md:p-3 text-left">Action</th>
              )}
            </tr>
          </thead>

          <tbody className="text-sm md:text-base text-black dark:text-white">
            {filteredData.length > 0 ? (
              filteredData.map((t) => (
                <tr key={t.id} className="border-t dark:border-gray-700">
                  <td className="p-2 md:p-3">{t.date}</td>
                  <td className="p-2 md:p-3">{t.category}</td>
                  <td className="p-2 md:p-3 capitalize">{t.type}</td>
                  <td
                    className={`p-2 md:p-3 font-semibold ${
                      t.type === "income"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    ₹{t.amount}
                  </td>

                  {role === "admin" && (
                    <td className="p-2 md:p-3">
                      <button
                        onClick={() => handleDelete(t.id)}
                        className="px-2 py-1 md:px-3 md:py-1 bg-red-500 text-white rounded text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  )}

                </tr>
              ))
            ) : (
              <tr>
                <td className="p-3 text-center" colSpan="5">
                  No transactions found
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>

    </div>
  );
}

export default Transactions;
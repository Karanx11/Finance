function Insights({ transactions }) {

  let totalIncome = 0;
  let totalExpense = 0;
  let categoryMap = {};

  transactions.forEach((t) => {
    if (t.type === "income") {
      totalIncome += t.amount;
    } else {
      totalExpense += t.amount;

      categoryMap[t.category] =
        (categoryMap[t.category] || 0) + t.amount;
    }
  });

  // find highest category
  let highestCategory = "";
  let maxAmount = 0;

  for (let key in categoryMap) {
    if (categoryMap[key] > maxAmount) {
      maxAmount = categoryMap[key];
      highestCategory = key;
    }
  }

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-900 rounded">

      <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">
        Insights
      </h2>

      <div className="space-y-2 text-black dark:text-white">

        <p>
          Total Income: <span className="text-green-500">₹{totalIncome}</span>
        </p>

        <p>
          Total Expenses: <span className="text-red-500">₹{totalExpense}</span>
        </p>

        <p>
          Highest Spending Category:{" "}
          <span className="font-semibold">
            {highestCategory || "N/A"}
          </span>
        </p>

      </div>

    </div>
  );
}

export default Insights;
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

function Charts({ transactions }) {

  // GROUP DATA BY MONTH
  const monthlyMap = {};

  transactions.forEach((t) => {
    const date = new Date(t.date);
    const month = date.toLocaleString("default", { month: "short" });

    if (!monthlyMap[month]) {
      monthlyMap[month] = 0;
    }

    if (t.type === "income") {
      monthlyMap[month] += t.amount;
    } else {
      monthlyMap[month] -= t.amount;
    }
  });

  // convert to array for chart
  const lineData = Object.keys(monthlyMap).map((month) => ({
    name: month,
    amount: monthlyMap[month],
  }));

  // CATEGORY BREAKDOWN (same as before)
  const categoryMap = {};

  transactions.forEach((t) => {
    if (t.type === "expense") {
      categoryMap[t.category] =
        (categoryMap[t.category] || 0) + t.amount;
    }
  });

  const pieData = Object.keys(categoryMap).map((key) => ({
    name: key,
    value: categoryMap[key],
  }));

  const colors = ["#346739", "#8884d8", "#ff8042", "#ffbb28"];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

      {/* Line Chart */}
      <div className="p-4 bg-gray-100 dark:bg-gray-900 rounded">
        <h3 className="mb-3 text-black dark:text-white">
          Balance Trend
        </h3>

        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={lineData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#346739"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div className="p-4 bg-gray-100 dark:bg-gray-900 rounded">
        <h3 className="mb-3 text-black dark:text-white">
          Expense Breakdown
        </h3>

        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              outerRadius={80}
              label
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

export default Charts;
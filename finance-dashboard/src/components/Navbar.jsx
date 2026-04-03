function Navbar({ darkMode, setDarkMode }) {
  return (
    <div className="flex justify-between items-center p-4 border-b border-gray-300 dark:border-gray-800">
      
      <h1 className="text-xl font-bold text-[#346739]">
        Finance Dashboard
      </h1>

      <button
        onClick={() => setDarkMode(!darkMode)}
        className="px-4 py-2 bg-[#346739] text-white rounded"
      >
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>

    </div>
  );
}

export default Navbar;
function RoleSwitcher({ role, setRole }) {
  return (
    <div className="mb-4">
      <label className="mr-2 text-black dark:text-white">
        Role:
      </label>

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="p-2 border rounded dark:bg-gray-900 dark:border-gray-700 dark:text-white"
      >
        <option value="viewer">Viewer</option>
        <option value="admin">Admin</option>
      </select>
    </div>
  );
}

export default RoleSwitcher;
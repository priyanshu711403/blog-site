export const Logout = () => {
  return (
    <button
      onClick={() => {
        localStorage.removeItem("token");
      }}
      className="border-2 rounded-md px-2 py-1 text-sm"
    >
      Logout
    </button>
  );
};

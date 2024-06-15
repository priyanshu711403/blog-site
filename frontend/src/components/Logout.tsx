export const Logout = () => {
  return (
    <button
      onClick={() => {
        localStorage.removeItem("token");
      }}
      className="border-2"
    >
      Logout
    </button>
  );
};

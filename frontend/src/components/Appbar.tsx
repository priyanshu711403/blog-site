import { Link } from "react-router-dom";
import { Avatar } from "./Avatar";
import { Logout } from "./Logout";

export const Appbar = () => {
  return (
    <div className="border-b border-gray-200 gb-slate-600 flex justify-between mx-12 py-3  font-semibold ">
      <div className="flex flex-col justify-center text-lg">
        <Link to={"/blogs"}>Medium</Link>
      </div>

      <div className="flex flex-col justify-center ">
        <div className="flex  ">
          {/* {localStorage.getItem} */}
          <Link to="/publish">
            <button
              type="button"
              className="h-8 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-4  text-center me-4"
            >
              Create
            </button>
          </Link>

          <Avatar name="Piri" size="large" />
          <Logout />
        </div>
      </div>
    </div>
  );
};

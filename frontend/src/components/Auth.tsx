import { SignupInput } from "@priyanshu711/common";
import { ChangeEventHandler, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  async function sendRequest() {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs);
      const jwt = response.data.jwt;
      console.log(jwt);
      localStorage.setItem("token", "Bearer " + jwt);
      navigate("/blogs");
    } catch (error) {
      console.log("error:", error);
    }
  }
  const [postInputs, setPostInputs] = useState<SignupInput>({ name: "", email: "", password: "" });
  return (
    <div className="bg-white h-screen flex flex-col justify-center">
      <div className="flex justify-center">
        <div>
          <div className="px-10">
            <div className="text-3xl font-bold text-center">{type === "signup" ? "Create an account" : "Sign In"}</div>
            <div className="text-gray-400 mt-1 text-center">
              {type === "signup" ? "Already have an account?" : "Don't have an account?"}
              <Link to={type === "signup" ? "/signin" : "/signup"} className="pl-2 underline ">
                {type === "signup" ? "Sign in" : "Sign up"}
              </Link>
            </div>
          </div>
          <div className="mt-5">
            {type === "signup" ? (
              <LabelledInput
                label="Name"
                placeholder="Priyanshu Gupta"
                onChange={(e) => setPostInputs((c) => ({ ...c, name: e.target.value }))}
              />
            ) : null}
            <LabelledInput
              label="Username"
              placeholder="piri@piri.com"
              onChange={(e) => setPostInputs((c) => ({ ...c, email: e.target.value }))}
            />
            <LabelledInput
              label="Password"
              placeholder="lnLN93*@"
              type="password"
              onChange={(e) => setPostInputs((c) => ({ ...c, password: e.target.value }))}
            />
          </div>
          <div className="flex justify-center mt-9">
            <button
              onClick={sendRequest}
              type="button"
              className=" text-white w-full bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5  mb-2 "
            >
              {type === "signup" ? "Sign Up" : "Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
interface LabelledInputType {
  label: string;
  placeholder: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  type?: string;
}
function LabelledInput({ label, placeholder, onChange, type }: LabelledInputType) {
  return (
    <div className="mt-3">
      <label className="block mb-2 text-sm font-medium text-black-900 dark:text-white">{label}</label>
      <input
        onChange={onChange}
        type={type || "text"}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        placeholder={placeholder}
        required
      />
    </div>
  );
}

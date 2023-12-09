import { z } from "zod";
import { User } from "../utils/validation";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../utils/API";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const user = User.parse({
        id: crypto.randomUUID(),
        email,
        password,
        createdAt: Date.now(),
      });
      if (password !== repeatedPassword) {
        setErrors({ password: { _errors: ["Passwords didn`t match"] } });
        return;
      }
      setErrors(null);

      const users = await API.getUsers();

      const isUserUnique = users.some((user) => email === user.email);
      if (!isUserUnique) {
        await API.addUser(user);

        navigate(`/login`);
      } else {
        setErrors({ user: { _errors: ["user exists"] } });
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        setErrors(err.format());
      }
    }
  };
  return (
    <div className="flex justify-center items-center mt-20">
      <div className=" flex flex-col justify-center h-400 p-12 items-center gap-12 ">
        <span className=" text-7xl ">Sign up</span>
        <div className="flex flex-col justify-center h-16 w-80">
          <input
            className="bg-gray-300 px-4 text-lg  text-black  w-full h-full"
            type="text"
            placeholder="Login"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          {errors?.email && (
            <div className="text-red-400 text-center h-0 font-semibold text-xs">
              {errors?.email?._errors}
            </div>
          )}
        </div>
        <div className="flex flex-col justify-center h-16 w-80">
          <input
            className="bg-gray-300 px-4 text-lg  text-black  w-full h-full"
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          {errors?.password && (
            <div className="text-red-400 text-center h-0 font-semibold text-xs">
              {errors?.password?._errors}
            </div>
          )}
        </div>
        <div className="flex flex-col justify-center h-16 w-80">
          <input
            className="bg-gray-300 px-4 text-lg  text-black  w-full h-full"
            type="password"
            placeholder="Repeat password"
            onChange={(e) => {
              setRepeatedPassword(e.target.value);
            }}
          />
          {errors?.password && (
            <div className="text-red-400 text-center h-0 font-semibold text-xs">
              {errors?.password?._errors}
            </div>
          )}
        </div>
        <div className="flex flex-col justify-center h-16 w-80">
          <button
            className="inline-block mt-6 bg-gray-400 text-black text-4xl px-2 p-3  transition duration-300 hover:bg-gray-500"
            onClick={handleSignUp}
          >
            Sign up
          </button>
          {errors?.user && (
            <div className="text-red-400 text-center h-0 font-semibold text-xs">
              {errors?.user?._errors}
            </div>
          )}
        </div>
        <div>
          <span className=" text-xl">
            Authorization{" "}
            <Link to="/login" className=" font-bold">
              Login
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

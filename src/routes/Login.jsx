import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { User } from "../utils/validation";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { getUser } from "../redux/user/actions";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLogin = () => {
    try {
      const user = User.parse({
        id: crypto.randomUUID(),
        email,
        password,
        createdAt: Date.now(),
      });
      setErrors(null);
      dispatch(getUser({email, password})).then(
        () => navigate(`/about`),
        () => 
          setErrors({
            userNotFound: {
              _errors: ["user not found, check login or password"],
            },
          })
      );
    } catch (err) {
      if (err instanceof z.ZodError) {
        setErrors(err.format());
      }
    }
  };
  return (
    <div className="flex justify-center items-center mt-20">
      <div className="flex flex-col justify-center h-400 p-12 items-center gap-12">
        <span className=" text-7xl ">Log in</span>
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
          <button
            className="inline-block mt-6 bg-gray-400 text-black text-4xl px-2 p-3  transition duration-300 hover:bg-gray-500"
            onClick={handleLogin}
          >
            Log in
          </button>
          {errors?.userNotFound && (
            <div className="text-red-400 text-center h-0 font-semibold text-xs">
              {errors?.userNotFound?._errors}
            </div>
          )}
        </div>
        <div>
          <span className="  text-xl">
            Registration{" "}
            <Link to="/" className=" font-bold">
              Sign up
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

import { useSelector } from "react-redux";
import { Link, useRouteError } from "react-router-dom";
import { selectUser } from "../redux/user/selectors";

export default function ErrorPage() {
  const user =useSelector(selectUser)
  console.log(user);
  const error = useRouteError();

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="text-center w-4/5 md:w-2/5 flex flex-col gap-8">
        <span className=" text-6xl md:text-8xl ">404</span>
        <span className="  text-4xl md:text-5xl">Page not found</span>
        <div className="flex items-center justify-center gap-4 text-gray-500">
          <span className="text-3xl md:text-4xl">Go to page</span>
          {user? (
            <Link className="text-black text-3xl md:text-4xl" to="/about">
              About
            </Link>
          ) : (
            <Link className="text-black text-3xl md:text-4xl" to="/login">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

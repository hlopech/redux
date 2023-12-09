
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/user/selectors";
export default function Home() {
  const  user  = useSelector(selectUser);
  return (
    <div className="flex flex-col items-center gap-5 justify-center mt-60">
      <span className="text-7xl font-semibold text-black mb-10 ">About me</span>
      <div className="flex flex-col gap-4 text-black text-3xl">
        <span>
          Email: <span className="font-semibold">{user.email}</span>
        </span>
        <span>
          Date sign up:
          <span className="font-bold">
            {new Date(user.createdAt).toLocaleString()}
          </span>
        </span>
      </div>
      <Link
        to={`/notes`}
        className="inline-block mt-6 bg-gray-400 text-black text-5xl px-4 p-5  transition duration-300 hover:bg-gray-500"
      >
        Go to notes
      </Link>
    </div>
  );
}

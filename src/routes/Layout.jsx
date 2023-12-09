import { NavLink, Outlet } from "react-router-dom";
import { Divider } from "@mui/material";
import { connect } from "react-redux";
import { selectUser } from "../redux/user/selectors";

export default connect(mapStateToProps, mapDispatchToProps)(Layout);

function mapStateToProps(state) {
  return {
    user: selectUser(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    deleteUser: () =>
      dispatch({
        type: "USER/SET",
        payload: null,
      }),
  };
}
export function Layout({ user, deleteUser }) {
  const handleLogout = () => {
    deleteUser();
    window.location.href = "/";
  };
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-purple-white flex justify-between items-center p-4">
        <div className="text-black text-2xl pl-5">
          <span>Hi, {user.email}</span>
        </div>
        <nav className="flex gap-4 text-2xl">
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "text-black  " : "hover: text-gray-500 "
            }
          >
            About
          </NavLink>
          <NavLink
            to={`/notes`}
            className={({ isActive }) =>
              isActive ? "text-black  " : "hover: text-gray-500 "
            }
          >
            Notes
          </NavLink>
          <button
            to="/login"
            className="text-gray-500 hover:text-black"
            onClick={handleLogout}
          >
            Log out
          </button>
        </nav>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="bg-gray-200 py-4  text-center">
        <div className="flex justify-center">
          <Divider style={{ height: "4px" }} />
        </div>
        <div className=" flex text-1xl justify-between mx-20 mt-2">
          <span>Created by: Angelina Gorbachenok</span>
          <span>BSU: {new Date().getFullYear()}</span>
        </div>
      </footer>
    </div>
  );
}

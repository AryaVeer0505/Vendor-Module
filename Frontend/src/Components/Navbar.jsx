import React, { useContext, useState } from "react";
import { NavLink,Link, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import { toast } from "react-toastify";

const Navbar = () => {
  const { token, setToken } = useContext(AppContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
    toast.success("Logged Out");
    setOpen(false);
    navigate("/login");
  };

  return (
    <div className="flex justify-between py-5 px-10 bg-black text-white items-center">
      <Link
        to="/"
        className="font-bold text-2xl border-2 border-red-300 rounded py-3 px-5"
      >
        Vendor Module
      </Link>

      <ul className="flex gap-10 font-semibold text-lg">
        <NavLink to="/all-products">
          <li className="hover:text-gray-400">All Products</li>
        </NavLink>
        <NavLink to="/pending-products">
          <li className="hover:text-gray-400">Pending Products</li>
        </NavLink>
        <NavLink to="/add-products">
          <li className="hover:text-gray-400">
            Add Products
          </li>
        </NavLink>
      </ul>

      {token ? (
        <div className="relative">

          <button
            onClick={() => setOpen(!open)}
            className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center font-bold text-lg"
          >
            V
          </button>

          {open && (
            <div className="absolute right-0 mt-3 w-40 bg-white text-black rounded shadow-lg">
              <button
                onClick={() => {
                  navigate("/profile");
                  setOpen(false);
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Profile
              </button>

              <button
                onClick={logout}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="bg-red-500 text-white font-bold py-3 px-5 rounded-xl"
        >
          Login
        </button>
      )}
    </div>
  );
};

export default Navbar;

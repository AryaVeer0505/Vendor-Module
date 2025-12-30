import React from "react";
import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import { toast } from "react-toastify";

const Navbar = () => {
  const { token, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
    toast.success("Logged Out")
  };
  return (
    <div className="flex justify-between py-5 px-10 bg-black text-white items-center">
      <NavLink to="/" className="font-bold cursor-pointer text-2xl border-2 border-red-300 rounded py-3 px-5">Vendor Module</NavLink>
      <ul className="flex gap-10 font-semibold text-lg cursor-pointer">
        <NavLink to="/all-products">
          <li className="hover:text-gray-400 transition-all">All Products</li>
        </NavLink>
        <NavLink to="/pending-products">
          <li className="hover:text-gray-400 transition-all">Pending Products</li>
        </NavLink>
        <NavLink to="/approved-products">
          <li className="hover:text-gray-400 transition-all">Approved Products</li>
        </NavLink>
        <NavLink to="/add-products">
          <li className="cursor-pointer rounded text-red-300 hover:scale-105">Add Products</li>
        </NavLink>
      </ul>
      {token ? (
        <button onClick={logout} className="bg-red-500 text-white font-bold py-3 px-5 rounded-xl cursor-pointer">Logout</button>
      ) : (
        <button onClick={()=>navigate("/login")} className="bg-red-500 text-white font-bold py-3 px-5 rounded-xl cursor-pointer">Login</button>
      )}
    </div>
  );
};

export default Navbar;

import React, { useContext, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import { toast } from "react-toastify";

const Navbar = () => {
  const { token, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);      
  const [menuOpen, setMenuOpen] = useState(false); 

  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
    toast.success("Logged Out");
    setOpen(false);
    setMenuOpen(false);
    navigate("/login");
  };

  return (
    <div className="bg-black text-white">
      <div className="flex justify-between items-center py-4 px-6 md:px-10">
  
        <Link
          to="/"
          className="font-bold text-xl md:text-2xl border-2 border-red-300 rounded py-2 px-4"
        >
          Vendor Module
        </Link>


        <ul className="hidden md:flex gap-10 font-semibold text-lg">
          <NavLink to="/all-products">
            <li className="hover:text-gray-400">All Products</li>
          </NavLink>
          <NavLink to="/pending-products">
            <li className="hover:text-gray-400">Pending Products</li>
          </NavLink>
          <NavLink to="/add-products">
            <li className="hover:text-gray-400">Add Products</li>
          </NavLink>
        </ul>

        
        <div className="flex items-center gap-4">
        
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-2xl"
          >
            ☰
          </button>

          {token ? (
            <div className="relative hidden md:block">
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
              className="hidden md:block bg-red-500 text-white font-bold py-2 px-5 rounded-xl"
            >
              Login
            </button>
          )}
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-black border-t border-gray-700 px-6 py-4 space-y-4">
          <NavLink
            to="/all-products"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-gray-400"
          >
            All Products
          </NavLink>

          <NavLink
            to="/pending-products"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-gray-400"
          >
            Pending Products
          </NavLink>

          <NavLink
            to="/add-products"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-gray-400"
          >
            Add Products
          </NavLink>

          {token ? (
            <>
              <button
                onClick={() => {
                  navigate("/profile");
                  setMenuOpen(false);
                }}
                className="block w-full text-left hover:text-gray-400"
              >
                Profile
              </button>

              <button
                onClick={logout}
                className="block w-full text-left text-red-400"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                navigate("/login");
                setMenuOpen(false);
              }}
              className="block w-full text-left text-red-400"
            >
              Login
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;

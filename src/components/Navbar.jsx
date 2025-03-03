import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-white text-lg font-semibold">
          Quiz App
        </Link>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              {user.role === "admin" && (
                <>
                  <Link
                    to="/questions"
                    className="text-gray-300 hover:text-white"
                  >
                    Questions
                  </Link>
                  <Link
                    to="/answers"
                    className="text-gray-300 hover:text-white"
                  >
                    Answers
                  </Link>
                </>
              )}
              <span className="text-gray-300">Welcome, {user.id}</span>
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/signin" className="text-gray-300 hover:text-white">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

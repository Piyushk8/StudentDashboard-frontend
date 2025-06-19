import React from "react";
import { useNavigate } from "react-router-dom";
import { ModeToggle } from "./ModeToggle";
//@ts-ignore
const Navbar = ({ toggleTheme, theme }) => {
    
  const nav = useNavigate();
  return (
    <nav className="bg-gray-800 dark:bg-gray-900 text-white p-4 shadow-md rounded-b-xl flex items-center justify-between">
      <div className="flex items-center">
        <button
          onClick={() => nav("/")}
          className="text-2xl font-bold text-indigo-400 hover:text-indigo-300 transition-colors duration-200"
        >
          StudentSphere
        </button>
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={() => nav("/")}
          className={`px-3 py-2 rounded-lg transition-all duration-200`}
        >
          Dashboard
        </button>

       <ModeToggle/>
      </div>
    </nav>
  );
};

export default Navbar;

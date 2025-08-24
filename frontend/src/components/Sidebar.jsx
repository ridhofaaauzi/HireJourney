import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/Auth/AuthContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <>
      <div className="md:hidden flex items-center justify-between p-4 bg-white shadow">
        <button
          onClick={() => setIsOpen(true)}
          className="text-gray-700 focus:outline-none">
          &#9776;
        </button>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={() => setIsOpen(false)}></div>
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md flex flex-col z-50 transform transition-transform duration-300
        ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:flex`}>
        <div className="p-6 text-3xl font-bold border-b text-blue-400 flex justify-between items-center md:block">
          HireJourney
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden text-gray-700 text-xl">
            &times;
          </button>
        </div>

        <nav className="p-4 flex-1">
          <ul className="space-y-2">
            <li>
              <Link
                to="/dashboard"
                className={`flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer ${
                  location.pathname === "/dashboard"
                    ? "bg-blue-50 text-blue-600"
                    : ""
                }`}>
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/manage-jobs"
                className={`flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer ${
                  location.pathname === "/dashboard/manage-jobs"
                    ? "bg-blue-50 text-blue-600"
                    : ""
                }`}>
                Manage Jobs
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer w-full text-left">
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;

import React from "react";
import todoLogo from "../assets/todo.png";
import { useContext, useState } from "react";
import { TodoContext } from "../context/Contex.js";

// popup
import LogoutPopup from "./popup/LogoutPopup";

function Navbar() {
  const { userData } = useContext(TodoContext);
  const [showLogoutPopUp, setShowLogoutPopuot] = useState(false);

  return (
    <nav className=" fixed w-full top-0 bg-gray-600   border-gray-200 px-2 sm:px-4 py-2.5  dark:bg-gray-900">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <div className="flex items-center">
          <img src={todoLogo} className="h-6 mr-3 sm:h-9" alt="Flowbite Logo" />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            Todo App
          </span>
        </div>
        {Object.keys(userData).length >= 1 ? (
          <div className="flex items-center  gap-10">
            <span className="self-center  flex items-center text-sm font-semibold whitespace-nowrap dark:text-white">
              <span className="text-2xl">🤪</span>
              {userData.name}
            </span>

            <span
              className="    cursor-pointer"
              onClick={() => setShowLogoutPopuot(true)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                ></path>
              </svg>
            </span>
          </div>
        ) : null}
      </div>
      <LogoutPopup
        showLogoutPopUp={showLogoutPopUp}
        setShowLogoutPopuot={setShowLogoutPopuot}
      />
    </nav>
  );
}

export default Navbar;

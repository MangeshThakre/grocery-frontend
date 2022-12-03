import React from "react";

import { useContext } from "react";
import { TodoContext } from "../../context/Contex";
import account from "../../services/appwriteConfig";
import { useNavigate } from "react-router-dom";

function LogoutPopup({ showLogoutPopUp, setShowLogoutPopuot }) {
  const { notify, setUserData } = useContext(TodoContext);
  const navigate = useNavigate();
  async function handleLogout() {
    try {
      await account.deleteSessions();
      setUserData({});
      navigate("/signin");
      setShowLogoutPopuot(false);
    } catch (error) {
      notify(error.message, "error");
    }
  }

  return (
    <>
      {showLogoutPopUp ? (
        <div
          id="popup-modal"
          tabIndex="-1"
          style={{ height: "100vh", background: "#1212137b" }}
          className="       absolute overflow-y-auto overflow-x-hidden   flex items-center justify-center z-50 p-4 md:inset-0  "
        >
          <div className="relative w-full max-w-md h-full md:h-auto">
            <div className="relative  rounded-lg shadow bg-gray-700">
              <button
                onClick={() => setShowLogoutPopuot(false)}
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent  rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-800 hover:text-white"
                data-modal-toggle="popup-modal"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-6 text-center">
                <svg
                  aria-hidden="true"
                  className="mx-auto mb-4 w-14 h-14  text-gray-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-400">
                  Are you sure you want to logOut?
                </h3>
                <button
                  onClick={() => handleLogout()}
                  data-modal-toggle="popup-modal"
                  type="button"
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                >
                  Yes, I'm sure
                </button>
                <button
                  onClick={() => setShowLogoutPopuot(false)}
                  data-modal-toggle="popup-modal"
                  type="button"
                  className=" focus:ring-4 focus:outline-none  rounded-lg border  text-sm font-medium px-5 py-2.5  focus:z-10 bg-gray-700 text-gray-300 border-gray-500 hover:text-white hover:bg-gray-600 focus:ring-gray-600"
                >
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default LogoutPopup;

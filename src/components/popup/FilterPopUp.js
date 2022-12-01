import React from "react";

import { useContext } from "react";
import { TodoContext } from "../../context/Contex.js";

function FilterPopUp() {
  const { showFilterPopUp, setShowFilterPopUp } = useContext(TodoContext);

  return (
    <>
      {showFilterPopUp ? (
        <div
          id="popup-modal"
          tabIndex="-1"
          style={{ height: "100vh", background: "#1212137b" }}
          className="       absolute overflow-y-auto overflow-x-hidden   flex items-center justify-center z-50 p-4 md:inset-0  "
        >
          <div className="relative w-full max-w-md h-full md:h-auto">
            <div className="relative  rounded-lg shadow bg-gray-700">
              <button
                onClick={() => setShowFilterPopUp(false)}
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
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  ></path>
                </svg>
                <div className="flex flex-col justify-center  my-8">
                  {/* isImportant */}
                  <div className="flex items-center mb-4">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      value=""
                      className="w-6 h-6 text-blue-600  rounded   focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
                    />
                    {/*  toggle*/}
                    <div className="ml-6 flex items-center">
                      <span className="mr-3 text-sm font-medium  text-gray-300">
                        Important todos
                      </span>
                      <label class="inline-flex relative items-center cursor-pointer">
                        <input
                          type="checkbox"
                          value=""
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6  peer-focus:outline-none peer-focus:ring-4  rounded-full peer bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    {/* toggle */}
                  </div>
                  {/* set IsImportant */}
                  {/* to date */}
                  <div className="flex items-center mb-4">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      value=""
                      className="w-6 h-6 text-blue-600  rounded   focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
                    />
                  </div>
                  {/* to date end */}
                  {/* from date */}
                  <div className="flex items-center mb-4">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      value=""
                      className="w-6 h-6 text-blue-600  rounded   focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
                    />
                  </div>
                  {/* from date end */}
                </div>
                <button
                  //   onClick={() => handleLogout()}
                  data-modal-toggle="popup-modal"
                  type="button"
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                >
                  Yes, I'm sure
                </button>
                <button
                  onClick={() => setShowFilterPopUp(false)}
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

export default FilterPopUp;

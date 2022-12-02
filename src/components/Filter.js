import React, { useState, useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TodoContext } from "../context/Contex.js";

function Filter() {
  const [disable, setDisable] = useState({ important: true, date: true });
  const [dateRange, setDateRange] = useState(["", ""]);
  const [startDate, endDate] = dateRange;
  const [isImportant, setIsImportant] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const { setFilter } = useContext(TodoContext);
  function handleFilter() {
    if (disable.important && disable.date) {
      setFilter({ from: "", to: "", isImportant: "" });
    } else if (disable.important && !disable.date) {
      setFilter({ from: startDate, to: endDate, isImportant: "" });
    } else if (!disable.important && disable.date) {
      setFilter({ from: "", to: "", isImportant: isImportant });
    } else {
      setFilter({ from: startDate, to: endDate, isImportant: isImportant });
    }
  }

  // console.log(filter);

  return (
    <div
      className="flex  items-center justify-evenly  px- border rounded-lg  gap-4  border-gray-600"
      style={showFilter ? { padding: "0.25rem " } : { padding: "0" }}
    >
      <button
        className="cursor-pointer hover:bg-gray-700   h-[2.5rem]  w-[40px] flex items-center justify-center rounded-md"
        onClick={() => setShowFilter(!showFilter)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke={showFilter ? "#2563eb" : "white"}
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
      </button>

      {showFilter ? (
        <div className="flex flex-wrap gap-6 ">
          {/* date */}
          <div className="flex  gap-4 items-center">
            <input
              id="default-checkbox"
              type="checkbox"
              onChange={() => {
                setDisable({ ...disable, date: !disable.date });
                setDateRange([null, null]);
              }}
              className="w-6 h-6 text-blue-600  rounded   focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
            />
            <DatePicker
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              onChange={(update) => {
                setDateRange(update);
              }}
              disabled={disable.date}
              isClearable={true}
            />
          </div>
          {/* date */}
          {/* important */}
          <div className="flex items-center ">
            <input
              id="default-checkbox"
              type="checkbox"
              onChange={() =>
                setDisable({ ...disable, important: !disable.important })
              }
              className="w-6 h-6 text-blue-600  rounded   focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
            />
            {/*  toggle*/}
            <div className="ml-2 flex items-center">
              <span className="mr-3 text-sm font-medium  text-gray-300">
                Important todos
              </span>
              <label class="inline-flex relative items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  disabled={disable.important}
                  onChange={() => setIsImportant(!isImportant)}
                />
                <div className="w-11 h-6  peer-focus:outline-none peer-focus:ring-4  rounded-full peer bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
            {/* toggle */}
          </div>
          {/* important end */}
          <button
            className="cursor-pointer hover:bg-gray-700   h-[2.5rem]  w-[40px] flex items-center justify-center rounded-md"
            onClick={() => handleFilter()}
          >
            <svg
              className="w-6 h-6 rotate-90  text-blue-500 cursor-pointer"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
            </svg>
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default Filter;

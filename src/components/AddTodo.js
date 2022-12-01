import axios from "axios";
import React from "react";
import { useState, useContext, useRef, useEffect } from "react";
import { TodoContext } from "../context/Contex";

function AddTodo() {
  const URL = process.env.REACT_APP_URL;
  const [addTodo, setAddTodo] = useState(false);
  const [newTodo, setNewTodo] = useState("");
  const newTodoInput = useRef(null);
  const [isNewTodoLoading, setIsNewTodoLoading] = useState(false);
  const {
    todoData,
    setTodoData,
    notify,
    userData,
    setSearch,
    setShowFilterPopUp,
  } = useContext(TodoContext);

  async function handlenewTodo(e) {
    e.preventDefault();
    setIsNewTodoLoading(true);
    try {
      const response = await axios({
        method: "post",
        url: URL + "/v1/todo",
        data: { userId: userData.$id, title: newTodo },
      });
      const data = response.data;
      const newtodoData = [data.data, ...todoData];
      setTodoData(newtodoData);
      setAddTodo(false);
      notify("successfuly created new Todo", "success");
      setIsNewTodoLoading(false);
    } catch (error) {
      console.log(error);
      notify(error.response.data.message, "error");
      setIsNewTodoLoading(false);
    }
  }

  function handleSearch(e) {
    e.preventDefault();
    setSearch(e.target[0].value);
  }

  useEffect(() => {
    if (addTodo) newTodoInput.current.focus();
  }, [addTodo]);

  return (
    <div className=" flex flex-col justify-between">
      <div className="  my-10 flex justify-between px-4 items-end  flex-wrap">
        {/* add Button */}
        <button
          disabled={addTodo}
          onClick={() => setAddTodo(true)}
          type="button"
          className={
            addTodo
              ? " cursor-not-allowed  py-2 px-3 mr-2 text-sm font-medium  rounded-lg border   focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700   border-gray-600 text-gray-600 bg-gray-700 inline-flex items-center"
              : "cursor-pointer  py-2 px-3 mr-2 text-sm font-medium  rounded-lg border   focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 bg-gray-800 text-gray-400 border-gray-600 hover:text-white hover:bg-gray-700 inline-flex items-center"
          }
        >
          <svg
            className="w-6 h-6 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clipRule="evenodd"
            ></path>
          </svg>
          Add Todo
        </button>
        {/* add todo button */}
        {/* search */}
        <div className="flex">
          <form
            className=" mr-4 flex items-center"
            onSubmit={(e) => handleSearch(e)}
          >
            <label htmlFor="simple-search" className="sr-only">
              Search
            </label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5  text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                id="simple-search"
                className=" text-sm rounded-lg   block w-full pl-10 p-2.5  bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search"
              />
            </div>
            <button
              type="submit"
              className="p-2.5 ml-2 text-sm font-medium text-white  rounded-lg border border-blue-700  focus:ring-4 focus:outline-none  bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </form>
          {/* search end */}

          {/* filter  toddle*/}
          <button
            onClick={() => setShowFilterPopUp(true)}
            type="button"
            className="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800"
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
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              ></path>
            </svg>
            <span className="sr-only">Icon description</span>
          </button>
          {/* filter */}
        </div>
      </div>

      {/* todo from */}
      {addTodo ? (
        <form
          onSubmit={(e) => handlenewTodo(e)}
          className="flex items-center justify-between w-full font-medium text-left  ring-gray-800  text-gray-400    bg-gray-800"
        >
          <div className="flex items-center justify-start w-full p-5 font-medium text-left">
            {/*  arrow svg  */}
            <svg
              data-accordion-icon
              className="w-6 h-6 shrink-0 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z"
              ></path>
            </svg>
            {/*  arrwo svg*/}

            {/* todo input */}
            <span className="w-2/4 cursor-pointer">
              <input
                ref={newTodoInput}
                type="text"
                onChange={(e) => setNewTodo(e.target.value)}
                id="floating_email"
                autoComplete="off"
                className="block md:py-2.5 py-1 px-0 w-full text-lg  bg-transparent border-0 border-b-2  appearance-none text-white border-gray-600  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder="Enter task"
                required
              />
            </span>
            {/* todo input end */}
          </div>
          {/* edit cancle button */}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              style={{ width: "7rem" }}
              className="flex  justify-center items-center cursor-pointer py-2 mr-3 px-3 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none "
            >
              Add Todo
              {isNewTodoLoading ? (
                <>
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="inline  ml-3 w-4 h-4 text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                </>
              ) : null}
            </button>
            <button
              type="button"
              onClick={() => setAddTodo(false)}
              className="  cursor-pointer py-2 focus:outline-none px-3 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-xs  mr-2 "
            >
              Cancle
            </button>
          </div>
          {/* edit cancle button end */}
        </form>
      ) : null}
      {/* todo form */}
    </div>
  );
}

export default AddTodo;

import axios from "axios";
import { useState, useContext, useRef, useEffect } from "react";
import { TodoContext } from "../context/Contex";
function AddTodo({ currentTodo }) {
  const URL = process.env.REACT_APP_URL;
  const { todoData, setTodoData, notify } = useContext(TodoContext);
  const [isAddNewTask, setIsAddNewTask] = useState(false);
  const [newTask, setTask] = useState({ task: "", checked: false });
  const [newtTaskLoading, setNewTaskLoading] = useState();
  const taskInputRef = useRef(null);
  async function handleEditTask(e) {
    e.preventDefault();
    setNewTaskLoading(true);
    try {
      const response = await axios({
        method: "post",
        url: URL + "/api/create_task",
        data: { todoId: currentTodo._id, taskObj: newTask },
      });

      const data = await response.data.data;
      const newTasks = [...currentTodo.tasks, data];
      const newTodoData = todoData.map((todo) => {
        return todo._id === currentTodo._id
          ? {
              _id: currentTodo._id,
              title: currentTodo.title,
              tasks: newTasks,
            }
          : todo;
      });

      // console.log(newTasks);
      setTodoData(newTodoData);
      setTask({ task: "", checked: false });
      setNewTaskLoading(false);
      setIsAddNewTask(false);
      notify("successfully Added new task", "success");
    } catch (error) {
      notify(error.response.data.message, "error");
      setNewTaskLoading(false);
    }
  }

  useEffect(() => {
    if (isAddNewTask) taskInputRef.current.focus();
  }, [isAddNewTask]);

  return (
    <div className="w-full">
      {isAddNewTask ? (
        // <ul className="max-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <li className="py-3 sm:pb-4   md:px-10  ">
          <form
            className="flex items-center space-x-4"
            onSubmit={(e) => handleEditTask(e)}
          >
            <div className="w-full flex  gap-8">
              {/* checked  */}
              <div className="flex items-center">
                {newTask.checked ? (
                  <button
                    type="button"
                    className="h-8 w-8   hover:bg-gray-600  rounded-full flex items-center justify-center"
                    onClick={() =>
                      setTask((preVal) => {
                        return {
                          task: preVal.task,
                          checked: false,
                        };
                      })
                    }
                  >
                    <svg
                      className="w-6 h-6  md:w-6 md:h-6 cursor-pointer text-green-400"
                      data-tooltip-target="tooltip-default"
                      data-tooltip-trigger="hover"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                ) : (
                  <button
                    className="h-8 w-8   hover:bg-gray-600  rounded-full flex items-center justify-center"
                    type="button"
                    onClick={() =>
                      setTask((preVal) => {
                        return {
                          task: preVal.task,
                          checked: true,
                        };
                      })
                    }
                  >
                    <svg
                      className="w-6 h-6  md:w-6 md:h-6 cursor-pointer text-red-400"
                      data-tooltip-target="tooltip-animation"
                      data-tooltip-trigger="hover"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <div
                      id="tooltip-animation"
                      role="tooltip"
                      className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700"
                    >
                      Check
                      <div className="tooltip-arrow" data-popper-arrow></div>
                    </div>
                  </button>
                )}
              </div>
              {/* input field */}
              <div className="flex-1 min-w-0">
                <input
                  type="text"
                  ref={taskInputRef}
                  onChange={(e) =>
                    setTask((preVal) => {
                      return {
                        task: e.target.value,
                        checked: preVal.checked,
                      };
                    })
                  }
                  id="floating_email"
                  autoComplete="off"
                  className="block md:py-2.5 py-1 px-0 w-full text-lg text-gray-300 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder="Enter task"
                  required
                />
              </div>
              {/* input field */}
              {/* checked   end*/}
            </div>
            {/* add cancle */}
            <div className="inline-flex   gap-4 items-center text-base font-semibold text-white">
              <button type="submit">
                {newtTaskLoading ? (
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="inline  ml-3 w-4 h-4 text-blue-500 animate-spin"
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
                ) : (
                  <svg
                    className="w-6 h-6 rotate-90  text-blue-500 cursor-pointer"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                  </svg>
                )}
              </button>

              <svg
                onClick={() => setIsAddNewTask(false)}
                className="w-6 h-6    cursor-pointer text-red-500"
                data-tooltip-target="tooltip-animation"
                data-tooltip-trigger="hover"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            {/* add cancle */}
          </form>
        </li>
      ) : (
        //  </ul>
        <div className="w-full flex justify-center mt-4">
          <button
            onClick={() => setIsAddNewTask(true)}
            disabled={isAddNewTask}
            type="button"
            className="cursor-pointer  py-2 px-3 mr-2 text-xs font-medium  rounded-lg border border-gray-200  focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 bg-gray-800 text-gray-400 dark:border-gray-600 hover:text-white hover:bg-gray-700 inline-flex items-center"
          >
            <svg
              className="w-4 h-4 mr-2"
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
            Add task
          </button>
        </div>
      )}
    </div>
  );
}

export default AddTodo;

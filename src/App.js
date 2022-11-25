import "./App.css";
import Navbar from "./components/Navbar.js";
import Todo from "./components/Todo";
import { useContext, useEffect, useState } from "react";
import DeletePopUp from "./components/DeletePopUp";
import AddTodo from "./components/AddTodo.js";
import axios from "axios";
import { TodoContext } from "./context/Contex";
import { ToastContainer } from "react-toastify";

// img icon svg
import loadingSvg from "./assets/loading.svg";
import github from "./assets/GitHub.png";

function App() {
  const URL = process.env.REACT_APP_URL;
  const [showTodoList, setShowTodoList] = useState(null);
  const { todoData, setTodoData, deletePopUp, setDeletePopUp } =
    useContext(TodoContext);

  const [todoDataLoading, setTodoDataLoading] = useState(false);
  async function getAllTodoDate() {
    setTodoDataLoading(true);
    try {
      const response = await axios.get(URL + "/api/get_todos");
      const data = response.data.data;
      setTodoData(data.reverse());
      setTodoDataLoading(false);
    } catch (error) {
      setTodoDataLoading(false);
    }
  }

  useEffect(() => {
    getAllTodoDate();
  }, []);

  return (
    <div className="App-header flex flex-col justify-start">
      <Navbar />

      {/* main section */}
      <div className="flex flex-col    overflow-y-auto">
        <div style={{ paddingTop: "4rem", paddingBottom: "4xrem" }}>
          <AddTodo />
          {todoDataLoading ? (
            <div className="w-full  flex justify-center">
              <img src={loadingSvg} alt="loading" />
            </div>
          ) : (
            todoData.map((todo, i) => (
              <Todo
                key={todo._id}
                todo={todo}
                setShowTodoList={setShowTodoList}
                showTodoList={showTodoList}
                i={i}
              />
            ))
          )}
        </div>
      </div>
      {/* main section end */}

      {/* footer */}
      <div className="flex-1 w-full   flex  items-end  mt-2 ">
        <footer
          className="bg-gray-700 h-14 w-full flex   justify-between   items-center"
          style={{ padding: "0 4rem" }}
        >
          <a
            target="_blank"
            href="https://github.com/MangeshThakre/todo_node_app"
            className="flex items-center h-8 gap-2 rounded-lg     px-2   bg-transparent  hover:bg-gray-600 "
          >
            <img src={github} className="w-6" alt="git" />
            <p className="text-gray-400">Sorce Code</p>
          </a>

          <a href="https://github.com/MangeshThakre" target="_blank">
            <p className="text-gray-400"> Build by MangeshThakre 😀</p>
          </a>
        </footer>
      </div>
      {/* footer  end*/}

      {deletePopUp.display ? (
        <DeletePopUp
          todoData={todoData}
          setTodoData={setTodoData}
          deletePopUp={deletePopUp}
          setDeletePopUp={setDeletePopUp}
        />
      ) : null}
      <ToastContainer />
    </div>
  );
}

export default App;

import React from "react";
import { useState, useEffect } from "react";
import Todo from "../Todo.js";
import AddTodo from "../AddTodo.js";
import loadingSvg from "../../assets/loading.svg";
import axios from "axios";
import { useContext } from "react";
import { TodoContext } from "../../context/Contex.js";

function Home() {
  const { todoData, setTodoData, userData, notify, search, filter } =
    useContext(TodoContext);

  const [showTodoList, setShowTodoList] = useState(null);

  const URL = process.env.REACT_APP_URL;
  const [todoDataLoading, setTodoDataLoading] = useState(false);

  // get all todos
  async function getAllTodoDate() {
    setTodoDataLoading(true);
    try {
      const response = await axios.get(
        `${URL}/v1/todos/${
          userData.$id
        }?withTasks=${true}&search=${search}&isImportant=${
          filter.isImportant
        }&from=${filter.from}&to=${filter.to}`
      );
      const data = response.data.data;
      setTodoData(data.reverse());
      setTodoDataLoading(false);
    } catch (error) {
      setTodoDataLoading(false);
      notify(error.response.data.message, "error");
    }
  }

  useEffect(() => {
    getAllTodoDate();
  }, [userData, search, filter]);

  return (
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
  );
}

export default Home;

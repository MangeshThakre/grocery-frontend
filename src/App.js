import "./App.css";
import Navbar from "./components/Navbar.js";

import DeletePopUp from "./components/DeletePopUp";
import { ToastContainer } from "react-toastify";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import SignUp from "./components/signin-signup/SignUp.js";
import SignIn from "./components/signin-signup/SignIn.js";
import Home from "./components/Home/Home";
import account from "./services/appwriteConfig";
// img icon svg
import github from "./assets/GitHub.png";

import { TodoContext } from "./context/Contex";
import { useContext, useEffect } from "react";
function App() {
  const navigate = useNavigate();
  const {
    todoData,
    setTodoData,
    deletePopUp,
    setUserData,
    notify,
    setDeletePopUp,
  } = useContext(TodoContext);

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    try {
      const user = await account.get();
      setUserData(user);
      if (user) {
        navigate("/home");
      }
    } catch (error) {
      if (error.type === "general_unauthorized_scope") navigate("/signin");
      else notify(error.message, "error");
    }
  }

  return (
    <div className="App-header flex flex-col justify-start">
      <Navbar />

      <Routes>
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/signIn" element={<SignIn />} />
        {/* main section */}
        <Route path="/home" element={<Home />} />
        {/* main section end */}
      </Routes>

      {/* footer */}
      <div className="flex-1 w-full   flex  items-end  mt-2 ">
        <footer
          className="bg-gray-700 h-14 w-full flex   justify-between   items-center"
          style={{ padding: "0 4rem" }}
        >
          <a
            rel="noreferrer"
            target="_blank"
            href="https://github.com/MangeshThakre/todo_node_app"
            className="flex items-center h-8 gap-2 rounded-lg     px-2   bg-transparent  hover:bg-gray-600 "
          >
            <img src={github} className="w-6" alt="git" />
            <p className="text-gray-400">Sorce Code</p>
          </a>

          <a
            rel="noreferrer"
            href="https://github.com/MangeshThakre"
            target="_blank"
          >
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

import React from "react";
import { useState, useContext } from "react";
import { TodoContext } from "../../context/Contex";
import account from "../../services/appwriteConfig";
import { useNavigate, Link } from "react-router-dom";
function SignIn() {
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { notify } = useContext(TodoContext);
  const [loginLoading, setIsloginLoading] = useState(false);
  async function handleSubmitSignIn(e) {
    e.preventDefault();
    setIsloginLoading(true);
    navigate("/home");
    try {
      await account.createEmailSession(user.email, user.password);
      setIsloginLoading(false);
    } catch (error) {
      setIsloginLoading(false);
      notify(error.message, "error");
    }
  }

  return (
    <div className="   top-0 left-0 flex absolute h-full w-full justify-center items-center">
      <div className="max-w-sm p-6  rounded-lg shadow-md bg-gray-800 border-gray-700">
        <form onSubmit={(e) => handleSubmitSignIn(e)}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium  text-white"
            >
              Your email
            </label>
            <input
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              type="email"
              id="email"
              className="text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              placeholder="name@flowbite.com"
              required
              autoComplete="off"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium  text-white"
            >
              Enter password
            </label>
            <input
              type="password"
              id="password"
              className=" text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              required
              minLength="8"
              maxLength="8"
              autoComplete="off"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className="text-white  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
          >
            SignIn
            {loginLoading ? (
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
            ) : null}
          </button>
          <div className="flex justify-between mt-6">
            <p>
              Dont have an account ?{" "}
              <Link to="/signUp" className="text-blue-500">
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;

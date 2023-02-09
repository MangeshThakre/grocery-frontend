import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import ListComponent from "./components/ListComponent.js";
import uniqid from "uniqid";
function App() {
  const URL = process.env.REACT_APP_URL;

  const [search, setSearch] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getitems() {
    setLoading(true);
    try {
      const response = await axios({
        url: URL + "/api/grocery?search=" + search,
        method: "get",
      });
      const items = await response.data;
      if (items.success) {
        setItems(items.data);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert(error.response.data.message);
    }
  }
  useEffect(() => {
    getitems();
  }, []);

  return (
    <div className="App-header flex flex-col justify-start items-center">
      {/* search */}
      <div className="my-8    w-[20rem]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            getitems(e);
          }}
        >
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
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
            </div>
            <input
              type="search"
              onChange={(e) => setSearch(e.target.value)}
              id="default-search"
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Mockups, Logos..."
            />
            <button
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>
      </div>
      {/* search */}

      {loading ? (
        <div className=" my-36 text-blue-600 font-bold text-5xl">
          {" "}
          Please Wait{" "}
        </div>
      ) : (
        <>
          <div>
            {items.map((item) => (
              <ListComponent
                key={item._id}
                item={item}
                setItems={setItems}
                items={items}
              />
            ))}
          </div>

          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={() => {
              setItems((preVal) => [...preVal, { _id: uniqid() }]);
            }}
          >
            add new item
          </button>
        </>
      )}
    </div>
  );
}

export default App;

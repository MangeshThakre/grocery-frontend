import React, { useEffect, useState } from "react";
import axios from "axios";

function ListComponent({ item, setItems, items }) {
  const [isNewItem, setNewItem] = useState(Object.keys(item).length < 2);
  const [itemName, setItemName] = useState(item.itemName ? item.itemName : "");
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [itemUnit, setItemUnit] = useState(item.unit ? item.unit : "kilogram");
  const [ItemQuantity, setItemQuertity] = useState(
    item.quantity ? item.quantity : 1
  );
  const URL = process.env.REACT_APP_URL;
  async function handleDelete() {
    setLoading(true);
    try {
      const response = await axios.delete(URL + "/api/grocery/" + item._id);
      if (response.data.success) {
        const newItemList = items.filter((e) => e._id != item._id);
        setItems(newItemList);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert(error.response.data.message);
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios({
        url: URL + "/api/grocery/" + item._id,
        method: "patch",
        data: {
          itemName: itemName,
          unit: itemUnit,
          quantity: ItemQuantity,
        },
      });
      const data = response.data;
      if (data.success) {
        const newItemList = items.map((e) => {
          if (e._id === item._id) {
            return data.data;
          } else return e;
        });
        setItems(newItemList);
        setIsEdit(false);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      alert(error.response.data.message);
    }
  }

  async function handleAdd(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios({
        url: URL + "/api/grocery/",
        method: "post",
        data: {
          itemName: itemName,
          unit: itemUnit,
          quantity: ItemQuantity,
        },
      });
      const data = response.data;
      if (data.success) {
        const newItemList = items.map((e) => {
          if (e._id === item._id) {
            return data.data;
          } else return e;
        });
        setItems(newItemList);
        setIsEdit(false);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      alert(error.response.data.message);
    }
  }

  function handleDisable() {
    if (isNewItem) {
      return false;
    } else {
      return !isEdit;
    }
  }

  return (
    <form
      className="flex   items-center gap-4 flex-wrap "
      onSubmit={(e) => (isNewItem ? handleAdd(e) : handleUpdate(e))}
    >
      <div className="flex gap-2 items-center">
        {/* name */}
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            itemName
          </label>
          <input
            type="text"
            id="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="item name"
            required
            disabled={handleDisable()}
          />
        </div>
        {/* name */}
        {/* quentity */}
        <div className="mb-6">
          <label
            htmlFor="number"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            quentity
          </label>
          <input
            type="number"
            id="number"
            value={ItemQuantity}
            onChange={(e) => setItemQuertity(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="quentity"
            required
            disabled={handleDisable()}
            min="1"
          />
        </div>
        {/* quentity */}
        {/* unit  */}
        <button
          type="button"
          disabled={handleDisable()}
          onClick={() =>
            setItemUnit((preVal) => {
              return preVal === "kilogram" ? "liter" : "kilogram";
            })
          }
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          {itemUnit}
        </button>
        {/* unit */}
      </div>
      {isNewItem ? (
        <>
          <button
            type="button"
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            onClick={() =>
              setItems((preVal) => {
                return preVal.filter((e) => e._id !== item._id);
              })
            }
          >
            cancle
          </button>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            {loading ? "...." : "Add"}
          </button>
        </>
      ) : (
        <div>
          {/* delete */}
          {!isEdit ? (
            <button
              type="button"
              className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              onClick={() => handleDelete()}
            >
              {loading ? "...." : "Delete"}
            </button>
          ) : null}
          {/* delete */}

          {!isEdit ? (
            //   edit
            <button
              type="button"
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              onClick={() => setIsEdit(true)}
            >
              Edit
            </button>
          ) : (
            //   edit
            <>
              {/* cancle edit  */}
              <button
                type="button"
                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                onClick={() => {
                  setItemName(item.itemName);
                  setItemQuertity(item.quantity);
                  setItemUnit(item.unit);
                  setIsEdit(false);
                }}
              >
                Cancle edit
              </button>
              {/* cancle edit  */}
              {/* update  */}
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                {loading ? "...." : "Update"}
              </button>

              {/* update */}
            </>
          )}
        </div>
      )}
    </form>
  );
}

export default ListComponent;

"use client";
import { useEffect, useState } from "react";
import Todo from "./components/Todo";
import axios from "axios";

export default function Home() {
  // state to get data
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  // get as you type
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((form) => ({ ...form, [name]: value }));
  };

  // console.log(formData)

  // submit Form Data
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      //api code
      const response = await axios.post("/api/", formData);
      // alert(response.data.messsage)
      setFormData({
        title: "",
        description: "",
      });
      await getData();
    } catch (e) {
      console.log(e.messsage);
    }
  };

  // delete data
  const deleteData = async (id) => {
    const response = await axios.delete("/api", {
      params: {
        mongoId: id,
      },
    });
    // alert(response.data.messsage);
    getData();
  };

  // update data
  const completeTodo = async (id) => {
    const response = await axios.put("/api", {} , {
      params: {
        mongoId: id,
      },
    });
    console.log(response.messsage);
    getData();
  };

  // Read data
  const [todoData, setTodoData] = useState([]);

  // get data
  const getData = async () => {
    const response = await axios("/api");
    setTodoData(response.data.todos);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {/* form to create todoLists */}
      <form
        className="flex items-start flex-col gap-2 w-[80%] max-w-[600px] mt-24 px-2 mx-auto text-2xl"
        onSubmit={onSubmitHandler}
      >
        <input
          type="text"
          class="px-3 py-2 border-2 w-full"
          name="title"
          placeholder="Enter Title"
          onChange={onChangeHandler}
          value={formData.title}
        />
        <input
          type="text"
          class="px-3 py-2 border-2 w-full"
          name="description"
          placeholder="Enter Description"
          onChange={onChangeHandler}
          value={formData.description}
        />
        <button
          type="submit"
          className="bg-[#1F2937] hover:bg-[#0c1016] py-3 px-11 text-white"
        >
          Add Todo
        </button>
      </form>

      {/* table to show data */}
      <div className="relative overflow-x-auto w-[50%] mx-auto mt-20">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Id
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {todoData.map((item, index) => (
              <Todo
                id={index}
                key={index}
                title={item.title}
                description={item.description}
                isCompleted={item.isCompleted}
                mongoId={item._id}
                deleteTodo={deleteData}
                completeTodo={completeTodo}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

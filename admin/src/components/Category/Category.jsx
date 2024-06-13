import React, { useState } from "react";
import CategoryModal from "./CategoryModal";
import { useAuth } from "../Context/Context";
import { MdOutlineDeleteOutline } from "react-icons/md";

const Category = () => {
  const [seen, setSeen] = useState(false);
  const { category, deletecategory } = useAuth();
  const handleToggle = () => {
    setSeen(!seen);
  };
  return (
    <div>
      <div className="text-[#97a4be] font-medium text-2xl">Categories</div>
      <div className="h-auto bg-[#151431] p-4 rounded-lg mt-4">
        <div
          className="mb-4 cursor-pointer lg:w-[15%] lg:hover:scale-105 hover:bg-[#6367f0] duration-200 p-2 rounded-[4px] flex justify-center gap-1 bg-blue-500"
          onClick={handleToggle}
        >
          <button className="text-sm font-medium">Add New</button>
          <div className="text-lg">+</div>
        </div>
        <div className="relative border border-[#2d2f5b] overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl: bg-transparent text-gray-500 dark:text-gray-400">
            <thead className="text-sm bg-[#1c1d43] text-gray-700 uppercase dark:text-gray-400">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-4 border-r text-center border-r-[#2d2f5b]"
                >
                  Category
                </th>
                <th scope="col" className="px-6 text-center py-4">
                  Action
                </th>
              </tr>
            </thead>
            {category &&
              category.map((data, i) => (
                <tbody key={i}>
                  <tr className="border-b dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 border-r text-center border-r-[#2d2f5b] font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {data.name}
                    </th>
                    <td className="px-6 py-4">
                      <div className="flex gap-2 ml-3 items-center justify-center text-gray-500">
                        <div
                          className="p-2 hover:scale-110 duration-200 rounded-md hover:bg-red-500 hover:text-white bg-[#524f4f40]"
                          onClick={()=>deletecategory(data._id)}
                        >
                          <MdOutlineDeleteOutline className="text-lg" />
                        </div>
                        {/* <div className="p-2 rounded-md hover:scale-110 duration-200 hover:bg-green-600 hover:text-white bg-[#524f4f40]" onClick={()=>setseen(!seen)}>
                          <FaRegEdit className="text-lg" onClick={()=>getsingleuser(data.name)} />
                        </div> */}
                      </div>
                    </td>
                  </tr>
                </tbody>
              ))}
          </table>
        </div>
      </div>
      {seen && <CategoryModal toggle={seen} handletog={handleToggle} />}
    </div>
  );
};

export default Category;

import React, { useState } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useAuth } from "../Context/Context";
import { FaRegEdit } from "react-icons/fa";
import Modal from "../Modal/Modal";

const Customers = () => {
  const { allUsers, deleteuser, getsingleuser } = useAuth();
  const [seen, setseen] = useState(false)
  // console.log("seen",seen);
  const handletoggle = ()=>{
    setseen(!seen)
  }
  
  // console.log(allUsers);
  return (<>
    <div className="text-[#97a4be] font-medium text-2xl">Customers</div>
    <div className="h-auto bg-[#151431] p-4 rounded-lg mt-4">
      <div className="relative border border-[#2d2f5b] overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl: bg-transparent text-gray-500 dark:text-gray-400">
          <thead className="text-sm  bg-[#1c1d43] text-gray-700 uppercase  dark:text-gray-400">
            <tr>
              <th
                scope="col"
                className="px-6  py-4 border-r border-r-[#2d2f5b]"
                >
                Customers
              </th>
              <th
                scope="col"
                className="px-6  py-4 border-r border-r-[#2d2f5b]"
                >
                Email
              </th>
              <th
                scope="col"
                className="px-6  py-4 border-r border-r-[#2d2f5b]"
              >
                Phone
              </th>
              <th
                scope="col"
                className="px-6  py-4 border-r border-r-[#2d2f5b]"
                >
                Role
              </th>
              <th scope="col" className="px-6 py-4 ">
                Action
              </th>
            </tr>
          </thead>
          {allUsers &&
            allUsers.map((data, i) => (
              <tbody key={i}>
                <tr className=" border-b  dark:border-gray-700 ">
                  <td className="px-6 b py-4 border-r border-r-[#2d2f5b] font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {data.name}
                  </td>
                  <th
                    scope="row"
                    className="px-6 b py-4 border-r border-r-[#2d2f5b] font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                    {data.email}
                  </th>
                  <td className="px-6 py-4 border-r border-r-[#2d2f5b]">
                    {data.phone}
                  </td>
                  <td className="px-6 py-4 border-r border-r-[#2d2f5b]">
                    {data.role === 1 ? "Admin" : "Member"}
                  </td>
                  <td className="px-6 py-4  ">
                    <div className="flex gap-2 ml-3 items-center text-gray-500">
                      <div className=" p-2 hover:scale-110 duration-200 rounded-md hover:bg-red-500 hover:text-white bg-[#524f4f40]" onClick={()=>deleteuser(data._id)}>
                        <MdOutlineDeleteOutline className="text-lg " />
                      </div>
                      <div className=" p-2 rounded-md hover:scale-110 duration-200 hover:bg-green-600 hover:text-white bg-[#524f4f40]" onClick={()=>setseen(!seen)}>
                        <FaRegEdit className="text-lg" onClick={()=>getsingleuser(data.name)} />
                      </div>
                      
                    </div>
                  </td>
                </tr>
              </tbody>
            ))}
        </table>
      {seen?<Modal toggle={seen} handletog={handletoggle}/>:null}
      </div>
    </div>
          </>
  );
};

export default Customers;

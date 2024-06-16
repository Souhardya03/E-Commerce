import React, { useState } from "react";
import { useAuth } from "../Context/Context";
import { MdOutlineDeleteOutline } from "react-icons/md";

const Order = () => {
  const [seen, setSeen] = useState(false);
  const { allorders } = useAuth();

  const handleToggle = () => {
    setSeen(!seen);
  };

  if (!allorders) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <div className="text-[#97a4be] font-medium text-3xl">Orders</div>
      <div className="h-auto bg-[#151431] p-4 rounded-lg mt-4">
        <div
          className={`relative border ${
            allorders.length === 0 ? "h-[8rem]" : "h-[30rem]"
          } overflow-y-auto border-[#2d2f5b] overflow-x-auto shadow-md sm:rounded-lg`}
        >
          <table className="w-full text-sm text-left rtl:bg-transparent text-gray-500 dark:text-gray-400">
            <thead className="text-xs sticky top-0 bg-[#1c1d43] text-gray-700 uppercase dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-4 border-r border-r-[#2d2f5b]">
                  Products
                </th>
                <th scope="col" className="px-6 py-4 border-r border-r-[#2d2f5b]">
                  Email
                </th>
                <th scope="col" className="px-6 py-4 border-r border-r-[#2d2f5b]">
                  Price
                </th>
                <th scope="col" className="px-6 py-4 border-r border-r-[#2d2f5b]">
                  Amount
                </th>
                <th scope="col" className="px-6 py-4">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {allorders.map((data, orderIndex) => (
                data.cart.map((item, itemIndex) => (
                  <tr key={`${orderIndex}-${itemIndex}`} className="border-b dark:border-gray-700">
                    <td className="lg:px-6 px-3 py-4 border-r border-r-[#2d2f5b] w-[28%] font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <div className="flex gap-2 items-center">
                        <img src={item.image} alt="" className="w-[25%] rounded-[6px]" />
                        <div className="text-[12px] lg:text-sm">
                          {item.title}
                        </div>
                      </div>
                    </td>
                    {itemIndex === 0 && (
                      <>
                        <td rowSpan={data.cart.length} className="px-6 py-4 border-r border-r-[#2d2f5b] font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {data.email}
                        </td>
                      </>
                    )}
                    <td className="px-6 py-4 border-r border-r-[#2d2f5b] font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      ₹ {item.price}
                    </td>
                    <td className="px-8 py-4 border-r border-r-[#2d2f5b] font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {item.amount}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2 ml-3 items-center text-gray-500">
                        <div className="p-2 hover:scale-110 duration-200 rounded-md hover:bg-red-500 hover:text-white bg-[#524f4f40]">
                          <MdOutlineDeleteOutline className="text-lg" />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Order;

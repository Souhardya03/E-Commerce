import React, { useState, useEffect } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useAuth } from "../Context/Auth_context";

const OrderList = () => {
  const { allorders, userdata } = useAuth();
  const [userOrders, setUserOrders] = useState([]);

  useEffect(() => {
    if (allorders && userdata) {
      const ordersForUser = allorders.filter(
        (order) => order.userId === userdata.id
      );
      const combinedCart = ordersForUser.flatMap((order) => order.cart);
      setUserOrders(combinedCart);
    }
  }, [allorders, userdata]);

  if (!allorders) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div
          class="inline-block h-14 w-14 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status"
        >
          <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="text-[#97a4be] font-medium text-3xl">Get your orders</div>
      <div className="h-auto bg-[#4c4c4d] p-4 rounded-lg mt-4">
        <div
          className={`relative border ${
            userOrders.length === 0 ? "h-[8rem]" : "h-[30rem]"
          } overflow-y-auto border-[#cdcdd0] bg-[#353538] overflow-x-auto shadow-md sm:rounded-lg`}
        >
          <table className="w-full text-sm text-left rtl:bg-transparent text-gray-500 dark:text-gray-400">
            <thead className="text-xs sticky top-0 bg-[#353538] border-b-black text-gray-700 uppercase dark:text-gray-400">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-4 border-r border-b-[#c0c0c3] border-b border-r-[#c0c0c3]"
                >
                  Products
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 border-r border-b-[#c0c0c3] border-b border-r-[#c0c0c3]"
                >
                  Price
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 border-r border-b-[#c0c0c3] border-b border-r-[#c0c0c3]"
                >
                  Amount
                </th>
                {/* <th
                  scope="col"
                  className="px-6 border-b-[#c0c0c3] text-center border-b py-4"
                >
                  Action
                </th> */}
              </tr>
            </thead>
            <tbody className="">
              {userOrders.map((item, itemIndex) => (
                <tr
                  key={`${itemIndex}`}
                  className="border-b dark:border-gray-700"
                >
                  <td className="lg:px-6 px-3 py-4 border-r border-b-[#c0c0c3] border-b border-r-[#c0c0c3] w-[28%] font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <div className="flex gap-2 items-center">
                      <img
                        src={item.image}
                        alt=""
                        className="w-[25%] rounded-[6px]"
                      />
                      <div className="text-[12px] lg:text-sm">{item.title}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 border-r border-b-[#c0c0c3] border-b border-r-[#c0c0c3] font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    ₹ {item.amount * item.price}
                  </td>
                  <td className="px-8 py-4 border-r border-b-[#c0c0c3] border-b border-r-[#c0c0c3] font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {item.amount}
                  </td>

                  {/* <td
                    //   rowSpan={userOrders.length}
                      className="px-6 py-4 border-b-[#c0c0c3] w-[20%]  h-full border-b"
                    >
                      <div className="flex gap-2 ml-3 cursor-pointer justify-center  items-center text-white">
                        <div className="p-2 hover:scale-110 duration-200 flex gap-1 rounded-md hover:bg-red-500 hover:text-white bg-[#87828240]">
                          <MdOutlineDeleteOutline className="text-lg" />
                          <span className="font-medium">Cancel Order</span>
                        </div>
                      </div>
                    </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderList;

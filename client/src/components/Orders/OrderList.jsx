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
    <div className="lg:p-8 p-6">
      <div className="text-[#97a4be] text-center font-medium text-3xl">
        Get your orders
      </div>
      <div className="h-auto  rounded-lg ">
        <div
          className={
            userOrders.length !== 0
              ? "mt-8 space-y-3 rounded-lg   bg-[#302f2f] px-2 py-4 sm:px-6"
              : "mt-8 space-y-3 rounded-lg  bg-[#302f2f] px-2 py-4 sm:px-6"
          }
        >
          {userOrders.length !== 0 ? (
            userOrders?.map((item) => (
              <div key={item.id}>
                  <div className="absolute right-1 lg:right-3 mt-6  rounded-[4px] p-1 px-3 font-medium bg-red-500 text-white ">
                    <div text-sm>x{item.amount}</div>
                  </div>
                <div className="items-center rounded-lg bg-[#474444] ">
                  <div className="flex items-center">
                    <img
                      className="m-2 h-16 w-28 rounded-md  object-contain object-center"
                      src={item.image}
                      alt=""
                    />
                    <div className="flex w-full flex-col px-4 py-4">
                      <span className="font-semibold lg:text-lg md:text-xl text-[12px] text-white">
                        {item.title}
                      </span>
                      <span className="float-right text-[8px] lg:text-sm md:text-lg text-gray-400">
                        {item.info}
                      </span>
                    </div>
                    <div className="lg:text-lg mr-5 lg:mr-4 md:text-lg text-sm font-bold text-[#ffeba7]">
                      <span className="pr-1">₹</span><span>{item.amount * item.price}</span>
                    </div>
                  </div>

                  {/* <div className=" text-xl bg-[#2b2929] loginbutton text-red-500  p-2 flex items-center mx-4 rounded-[4px]">
                      <button
                        // onClick={() => removeFromCart(item.id)}
                        className="font-medium"
                      >
                        <MdDelete />
                      </button>
                    </div> */}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-white font-medium">
              No Items Added
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderList;

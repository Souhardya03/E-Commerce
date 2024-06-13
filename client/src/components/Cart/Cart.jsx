import React, { useState } from "react";
import { useCartContext } from "../Context/Cart_Context";
import { MdDelete, MdDriveFileRenameOutline } from "react-icons/md";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/Auth_context";
import { FaPhone } from "react-icons/fa6";

const Cart = () => {
  const navigate = useNavigate();
  const { userdata } = useAuth();
  const data = JSON.parse(userdata);
  const { cart, removeFromCart, removeAllItems } = useCartContext();
  const orderClick = () => {
    toast.success("Order Successfull", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    console.log({ cart: cart });

    navigate("/");
    removeAllItems();
  };

  let amount = 0;
  for (let i = 0; i < cart.length; i++) {
    amount += cart[i].amount * cart[i].price;
  }
  let shipPrice = 150;
  let totalAmount = shipPrice + amount;

  const [formdata, setformdata] = useState({
    name: data?.name || "",
    email: data?.email || "",
    address: data?.address || "",
    phone: data?.phone || "",
    total: totalAmount ,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setformdata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    console.log({ formdata: formdata });
    orderClick();
  };
  return (
    <>
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div className="px-4 pt-8">
          <p className="text-2xl font-medium text-white">Order Summary</p>
          <p className="text-gray-400 text-sm">
            Check your items. And select a suitable shipping method.
          </p>
          <div
            className={
              cart.length !== 0
                ? "mt-8 space-y-3 rounded-lg border overflow-y-auto h-[50vh] bg-[#302f2f] px-2 py-4 sm:px-6"
                : "mt-8 space-y-3 rounded-lg border bg-[#302f2f] px-2 py-4 sm:px-6"
            }
          >
            {cart.length !== 0 ? (
              cart.map((item) => (
                <div key={item.id}>
                  <div className="flex flex-row items-center rounded-lg bg-[#474444] ">
                    <div className="relative right-3  rounded-[4px] p-1 px-3 font-medium bg-red-500 text-white ">
                      <div text-sm>x{item.amount}</div>
                    </div>
                    <img
                      className="m-2 h-16 w-28 rounded-md border object-cover object-center"
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
                      <p className="lg:text-lg md:text-lg text-sm font-bold text-[#ffeba7]">
                        ₹ {item.amount * item.price}
                      </p>
                    </div>

                    <div className=" text-xl bg-[#2b2929] loginbutton text-red-500  p-2 flex items-center mx-4 rounded-[4px]">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="font-medium"
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-white font-medium">
                No Items Added
              </div>
            )}
          </div>

          <p className="mt-8 text-xl text-white font-medium">
            Shipping Methods
          </p>
          <form className="mt-5 grid gap-6 ">
            <div className="relative bg-[#282727] ">
              <input
                className=" hidden bg-[#474444]"
                id="radio_1"
                type="radio"
                name="radio"
              />
              <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label
                className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                htmlFor="radio_1"
              >
                <img
                  className="w-14 object-contain bg-transparent"
                  src="https://png.pngtree.com/png-vector/20210528/ourmid/pngtree-cash-on-delivery-bagde-olshop-png-image_3381308.jpg"
                  alt=""
                />
                <div className="ml-5">
                  <span className="mt-2 text-white font-semibold">
                    Fedex Delivery
                  </span>
                  <p className="text-slate-500 text-sm leading-6">
                    Delivery: 2-4 Days
                  </p>
                </div>
              </label>
            </div>
            {/* <div className="relative">
              <input
                className="peer hidden"
                id="radio_2"
                type="radio"
                name="radio"
                checked
              />
              <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label
                className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                htmlFor="radio_2"
              >
                <img
                  className="w-14 object-contain"
                  src="/images/oG8xsl3xsOkwkMsrLGKM4.png"
                  alt=""
                />
                <div className="ml-5">
                  <span className="mt-2 font-semibold">Fedex Delivery</span>
                  <p className="text-slate-500 text-sm leading-6">
                    Delivery: 2-4 Days
                  </p>
                </div>
              </label>
            </div> */}
          </form>
        </div>
        <form className="mt-10 bg-[#3a3838] px-4 mx-4 pt-8 lg:mt-4 border rounded-lg">
          <p className="text-2xl text-white font-medium">Payment Details</p>
          <p className="text-gray-400">
            Complete your order by providing your payment details.
          </p>
          <div className="text-[#ffeba7]">
            <label
              htmlFor="name"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Name
            </label>
            <div className="relative">
              <input
                type="text"
                id="name"
                name="name"
                value={formdata.name}
                onChange={handleChange}
                className="w-full rounded-md border bg-transparent border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Full Name"
              />
              <div className="pointer-events-none absolute text-gray-400 inset-y-0 left-0 inline-flex items-center px-3">
                <MdDriveFileRenameOutline />
              </div>
            </div>
            <label
              htmlFor="email"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Email
            </label>
            <div className="relative">
              <input
                type="text"
                id="email"
                onChange={handleChange}
                value={formdata.email}
                name="email"
                className="w-full rounded-md border bg-transparent border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="your.email@gmail.com"
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </div>
            </div>
            <label
              htmlFor="address"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Billing Address
            </label>
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="relative flex-shrink-0 sm:w-7/12">
                <input
                  type="text"
                  id="address"
                  name="address"
                  onChange={handleChange}
                  value={formdata.address}
                  className="w-full rounded-md border bg-transparent border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Street Address"
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <img
                    className="h-4 w-4 object-contain"
                    src="https://flagpack.xyz/_nuxt/4c829b6c0131de7162790d2f897a90fd.svg"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <label
              htmlFor="phone"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Tel. Number
            </label>
            <div className="relative">
              <input
                type="text"
                id="phone"
                onChange={handleChange}
                value={formdata.phone}
                name="phone"
                className="w-full rounded-md border bg-transparent border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Phone number"
              />
              <div className="pointer-events-none absolute text-gray-400 inset-y-0 left-0 inline-flex items-center px-3">
                <FaPhone/>
              </div>
            </div>

            <div className="mt-6 border-t  border-b py-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-white">Subtotal</p>
                <p className="font-semibold text-[#ffeba7]">₹ {amount}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-white">Shipping</p>
                <p className="font-semibold text-[#ffeba7]">₹ {shipPrice}</p>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm font-medium text-white">Total</p>
              <p className="text-2xl font-semibold text-[#ffeba7]">
                ₹ {totalAmount}
              </p>
            </div>
          </div>
          <button
            onClick={handlesubmit}
            disabled={cart.length === 0 ? true : false}
            className={
              cart.length !== 0
                ? "mt-4  mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
                : "mt-4  mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white cursor-not-allowed"
            }
          >
            Place Order
          </button>
        </form>
      </div>
    </>
  );
};

export default Cart;

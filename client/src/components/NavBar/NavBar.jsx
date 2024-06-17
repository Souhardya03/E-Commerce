import React from "react";

import { IoCartOutline } from "react-icons/io5";
import { VscAccount } from "react-icons/vsc";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import "./NavBarStyle.css";
import { Link,NavLink } from "react-router-dom";
import { useCartContext } from "../Context/Cart_Context";
import SearchForm from "../Search/SearchForm";
import { useAuth } from "../Context/Auth_context";
const NavBar = () => {
  const { isLoggedIn, userdata, isAdmin } = useAuth();
  const { cart } = useCartContext();
  let amount = 0;
  for (let i = 0; i < cart.length; i++) {
    amount += cart[i].amount;
  }
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  const data = userdata;
  return (
    <div className="top-0 sticky bg-[#242323] z-[999]">
      <div className="flex  items-center pt-[14px] lg:px-[40px] px-4 justify-between">
        <Link
          to="/"
          onClick={scrollToTop}
          className="lg:text-3xl md:text-2xl text-xl text-[#d8d6d6da] fontstyle font-medium"
        >
          X-Head
        </Link>
        <div>
          <SearchForm />
        </div>

        <div className="text-[#d8d6d6da] flex items-center text-2xl lg:gap-12 md:gap-4 gap-1 font-medium">
          <a href="/cart" onClick={scrollToTop}>
            <button
              type="button"
              className="relative inline-flex items-center p-3 text-sm font-medium text-center text-white "
            >
              <IoCartOutline size={24} color="#fff" />
              {amount === 0 ? null : (
                <>
                  <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
                    {amount}
                  </div>
                </>
              )}
            </button>
          </a>
          <div>
            <Menu as="div" className="relative ml-3">
              <div>
                <Menu.Button className="pt-2">
                  <VscAccount />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute fontstyle1 right-0 z-10 mt-2 w-[18rem] h-[16rem] origin-top-right rounded-md border border-gray-500 bg-[#3f3c3c] py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="flex flex-col gap-2 p-3 px-4">
                    <Menu.Item>
                      <>
                        <p className=" text-white">Hello! {data?.name}</p>
                        <p className=" text-xs">
                          Access accounts and manage orders
                        </p>
                        {!isLoggedIn ? (
                          <>
                            <a
                              href="/login"
                              className="text-sm  mb-2  border w-32"
                            >
                              <div className="loginbutton p-3 ">
                                Login / Sign Up
                              </div>
                            </a>
                          </>
                        ) : (
                          <>
                            <a
                              href="/logout"
                              className="text-sm  mb-2  border w-32"
                            >
                              <div className=" text-center loginbutton p-3 ">
                                Logout
                              </div>
                            </a>
                          </>
                        )}
                        <hr />
                      </>
                    </Menu.Item>

                    <Menu.Item>
                      {({ active }) => (
                        <a href="/" className="text-sm mt-3 text-white">
                          Your Profile
                        </a>
                      )}
                    </Menu.Item>
                    {isAdmin===1?<Menu.Item>
                      {({ active }) => (
                        <a href="https://e-commerce-admin-tan.vercel.app/customers" target="_blank" rel="noreferrer" className="text-sm  text-white">
                          Admin Panel
                        </a>
                      )}
                    </Menu.Item>:null}
                    {isLoggedIn && isAdmin===0?<Menu.Item>
                    {({ active }) => (
                        <a href="/orderlist" className="text-sm  text-white">
                          Order List
                        </a>
                      )}
                    </Menu.Item>:null}
                    
                    {/* <Menu.Item>
                      {({ active }) => (
                        <a href="/" className="text-sm text-white">
                          Sign out
                        </a>
                      )}
                    </Menu.Item> */}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
      <hr className="mt-3" />
    </div>
  );
};

export default NavBar;

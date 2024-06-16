import React, { useState } from "react";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { FiSearch } from "react-icons/fi";
import { FiGithub } from "react-icons/fi";
import { FiLinkedin } from "react-icons/fi";
import { CgMenuLeft } from "react-icons/cg";
import { FaRegUser } from "react-icons/fa";
import { IoStorefrontOutline } from "react-icons/io5";
import { BiCategoryAlt } from "react-icons/bi";
import { MdAttachMoney } from "react-icons/md";
import { NavLink, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Context/Context";
import { RxExit } from "react-icons/rx";

const Home = () => {
  const {isLoggedIn,isAdmin} = useAuth();
  const [open, setopen] = useState(true);
  const [active, setactive] = useState(1);
 
  // if( !isLoggedIn){
  //   alert("Get Out you mf");
  //   return (<Navigate to="/login" />);
  // }
  console.log("Fom home",isLoggedIn);
   if(isLoggedIn && isAdmin===0){
    alert("BSDK you are not admin");
    return (<Navigate to="/login"/>)
  }
  return (
    <>
      <div className="text-white flex ">
        <div
          className={`relative  h-[100vh] duration-200 ${
            open ? "  left-0 w-[20%] text-lg" : " -left-[200px] w-[0%] text-sm"
          } bg-[#151431]`}
        >
          <div className="flex flex-col">
            <div className="text-center block text-wrap py-6 font-medium ">
              Admin Dashboard
            </div>
            <div
              className={`p-8 ${
                open ? "text-[18px]" : "text-[15px]"
              } flex flex-col gap-10 text-gray-400 font-medium  mt-[6em] px-12`}
            >
              <div className={`flex gap-2 items-center ${active===1?"text-[#6168e8]":""} hover:text-[#6168e8] duration-150 `}>
                <FaRegUser />
                <NavLink to="/customers" onClick={()=>setactive(1)} >Customers</NavLink>
              </div>
              <div className={`flex gap-2 items-center ${active===2?"text-[#6168e8]":""} hover:text-[#6168e8] duration-150 `}>
                <IoStorefrontOutline />
                <NavLink to="/products" onClick={()=>setactive(2)}>Products</NavLink>
              </div>
              <div className={`flex gap-2 items-center ${active===3?"text-[#6168e8]":""} hover:text-[#6168e8] duration-150`} >
                <BiCategoryAlt />
                <NavLink to="/categories" onClick={()=>setactive(3)}>Category</NavLink>
              </div>
              <div className="flex gap-2 items-center hover:text-[#6168e8] duration-150">
                <MdAttachMoney />
                <a href="/">Orders</a>
              </div>
              <div className="flex gap-2 items-center hover:text-[#6168e8] duration-150">
                <RxExit/>
                <a href="/logout">Logout</a>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full">
          <div className="h-[10vh] flex items-center justify-between px-4  bg-[#151431]">
            <div className=" items-center flex">
              <div
                className="text-3xl text-[#6367f0] hover:text-white duration-200 cursor-pointer"
                onClick={() => setopen(!open)}
              >
                {" "}
                {open ? <HiOutlineMenuAlt2 /> : <CgMenuLeft />}{" "}
              </div>
              <div className="mx-8 flex items-center">
                <input
                  type="text"
                  className="p-2 px-4 rounded-[4px] bg-[#1e1e49]"
                  placeholder="Search..."
                />
                <div className="bg-[#6367f0] rounded-r-[4px] py-[0.64rem] px-4">
                  <FiSearch />
                </div>
              </div>
            </div>
            <div className="flex gap-6 pr-6">
              <a
                href="#githubLink"
                className="text-xl hover:text-white duration-300 text-[#6367f0]"
              >
                <FiGithub />
              </a>
              <a
                href="#githubLink"
                className="text-xl hover:text-white duration-300 text-[#6367f0]"
              >
                <FiLinkedin />
              </a>
            </div>
          </div>
          <div className="p-6 bg-black h-full">
            
            {/* <div className="h-auto bg-[#151431] p-4 rounded-lg mt-4">
              <div class="relative border border-[#2d2f5b] overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left rtl: bg-transparent text-gray-500 dark:text-gray-400">
                  <thead class="text-sm  bg-[#1c1d43] text-gray-700 uppercase  dark:text-gray-400">
                    <tr>
                      <th scope="col" class="px-6  py-4 border-r border-r-[#2d2f5b]">
                        Customers
                      </th>
                      <th scope="col" class="px-6  py-4 border-r border-r-[#2d2f5b]">
                        Email
                      </th>
                      <th scope="col" class="px-6  py-4 border-r border-r-[#2d2f5b]">
                        Phone
                      </th>
                      <th scope="col" class="px-6  py-4 border-r border-r-[#2d2f5b]">
                        Role
                      </th>
                      <th scope="col" class="px-6 py-4 ">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class=" border-b  dark:border-gray-700 ">
                      <td
                        class="px-6 b py-4 border-r border-r-[#2d2f5b] font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        Souhardya Deb
                      </td>
                      <th scope="row" class="px-6 b py-4 border-r border-r-[#2d2f5b] font-medium text-gray-900 whitespace-nowrap dark:text-white">souhardyadeb2016@gmail.com</th>
                      <td class="px-6 py-4 border-r border-r-[#2d2f5b]">8777423388</td>
                      <td class="px-6 py-4 border-r border-r-[#2d2f5b]">Member</td>
                      <td class="px-6 py-4  ">
                        <a
                          href="/"
                          class="font-medium "
                        >
                          <MdOutlineDeleteOutline className="text-xl"/>
                        </a>
                      </td>
                    </tr>
                    
                  </tbody>
                </table>
              </div>
            </div> */}
            <Outlet/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

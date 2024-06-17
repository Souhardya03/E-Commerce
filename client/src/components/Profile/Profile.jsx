import React, { useEffect, useState } from 'react';
import { useAuth } from '../Context/Auth_context';

const Profile = () => {
  const { userdata,updateUser } = useAuth();
  const [user, setUser] = useState({
    name: userdata?.name || "",
    email: userdata?.email || "",
    phone: userdata?.phone || "",
    address: userdata?.address || "",
    id: userdata?.id || "",
    role: userdata?.role || ""
  });
 useEffect(() => {
   
 }, [userdata])
 

  if (!userdata) {
    return (
      <div className="flex flex-col gap-2 items-center justify-center h-[80vh]">
        <div
          className="inline-block h-14 w-14 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
        <div className="text-white font-medium text-lg">Loading ...</div>
      </div>
    );
  }

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const handlesubmit = async()=>{
    console.log(user);
    await updateUser(user)
  }

  return (
    <div className="">
      <div className="flex min-h-full items-end justify-center duration-300 p-4 text-center sm:items-center sm:p-0">
        <div>
          <div className="relative transform overflow-hidden rounded-lg bg-[#39393bbc] text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="h-auto px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="flex text-white justify-center text-2xl font-medium uppercase">
                Update Your Info
              </div>
              <div className="w-[100%] mt-14 text-white">
                <div className="p-4">
                  <label htmlFor="name" className="text-xl pl-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    onChange={handleInput}
                    className="w-full bg-[#202021] p-4 mt-1 rounded-md"
                    value={user.name}
                    placeholder="Enter your name"
                  />
                </div>
                <div className="p-4">
                  <label htmlFor="email" className="text-xl pl-2">
                    Email
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    onChange={handleInput}
                    className="w-full bg-[#202021] p-4 mt-1 rounded-md"
                    value={user.email}
                    placeholder="Enter your email"
                  />
                </div>
                <div className="p-4">
                  <label htmlFor="phone" className="text-xl pl-2">
                    Phone No.
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    onChange={handleInput}
                    className="w-full bg-[#202021] p-4 mt-1 rounded-md"
                    value={user.phone}
                    placeholder="Enter your Phone No."
                  />
                </div>
                <div className="p-4 ">
                  <label htmlFor="address" className="text-xl pl-2">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    onChange={handleInput}
                    className="w-full bg-[#202021] p-4 mt-1 rounded-md"
                    value={user.address}
                    placeholder="Enter your address"
                  />
                </div>
              </div>
            </div>
            <div className="px-4 pb-8 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={()=>handlesubmit()}
                className="inline-flex w-full justify-center rounded-md bg-green-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-800 hover:scale-110 duration-200 sm:ml-3 sm:w-auto"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

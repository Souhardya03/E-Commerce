import React, { useEffect } from "react";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useAuth } from "../Context/Context";

const Modal = (props) => {
  const [open, setOpen] = useState(props.toggle);
  const { singleuser, updateUser } = useAuth();
  const [user, setuser] = useState({
    name: singleuser?.name || "",
    email: singleuser?.email || "",
    phone: singleuser?.phone || "",
    role: singleuser?.role || "",
  });
  useEffect(() => {
    if (singleuser) {
      setuser({
        name: singleuser.name,
        email: singleuser.email,
        phone: singleuser.phone,
        role: singleuser.role,
      });
    }
  }, [singleuser]);
  const handleinput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setuser({
      ...user,
      [name]: value,
    });
  };
  // console.log(singleuser);
  const cancelButtonRef = useRef(null);
  return (
    <div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={props.handletog}
        >
          <Transition.Child
            as={Fragment}
            enter="ease duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-[#6a696989] bg-opacity-75 duration-300 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center duration-300 p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-[#151431] text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className=" h-auto px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    {/* <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title as="h3" className="text-base text-center font-semibold leading-6 text-gray-900">
                        Deactivate account
                      </Dialog.Title>
                      <div className="mt-2">
                        
                      </div>
                    </div>
                  </div> */}
                    <div className="flex text-white justify-center text-2xl font-medium uppercase">
                      Update Your Info
                    </div>
                    <div></div>
                    <div className="w-[100%] mt-14 text-white">
                      <div className="p-4">
                        <label htmlFor="name" className="text-xl pl-2">
                          Name
                        </label>

                        <input
                          type="text"
                          id="name"
                          name="name"
                          onChange={handleinput}
                          className="w-full bg-[#1e1e49] p-4 mt-1 rounded-md"
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
                          value={user.email}
                          onChange={handleinput}
                          className="w-full bg-[#1e1e49] p-4 mt-1 rounded-md"
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
                          onChange={handleinput}
                          value={user.phone}
                          className="w-full bg-[#1e1e49] p-4 mt-1 rounded-md"
                          placeholder="Enter your Phone No."
                        />
                      </div>
                      <div className="p-4 ">
                        <label htmlFor="Role" className="text-xl pl-2">
                          Role
                        </label>

                        <input
                          type="number"
                          id="Role"
                          name="role"
                          onChange={handleinput}
                          value={user.role}
                          className="w-full bg-[#1e1e49] p-4 mt-1 rounded-md"
                          placeholder="0 for Member & 1 for Admin"
                        />
                      </div>
                    </div>
                  </div>
                  <div className=" px-4 pb-8 sm:flex sm:flex-row-reverse sm:px-6" onClick={props.handletog}>
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-green-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-800 hover:scale-110 duration-200 sm:ml-3 sm:w-auto"
                      onClick={()=>updateUser(singleuser._id,user)}
                    >
                      Update
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-red-500 hover:text-white hover:scale-110 duration-200 sm:mt-0 sm:w-auto"
                      onClick={props.handletog}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default Modal;

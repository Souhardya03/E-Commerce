import React, { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useAuth } from "../Context/Context";
import {toast, Zoom} from "react-toastify"
const CategoryModal = ({ toggle, handletog }) => {
  const { apiUrl, isAuthorizedToken, getCategory } = useAuth();
  const [open, setOpen] = useState(toggle);
  const [user, setUser] = useState({
    name: "",
  });

  useEffect(() => {
    setOpen(toggle);
  }, [toggle]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handlesubmit = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/auth/create-category`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: isAuthorizedToken,
        },
        body: JSON.stringify(user)
      });
      if(response.ok){
        getCategory();
        toast.success('Category Created!', {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Zoom,
          });
      }      
    } catch (error) {
      console.log(error);
      console.log("Error from category modal");
    }
  };

  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={handletog}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-[#6a696989] bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
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
                <div className="h-auto px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="flex text-white justify-center text-2xl font-medium uppercase">
                    Create Your Category
                  </div>

                  <div className="w-[100%] mt-14   text-white">
                    <div className="px-4">
                      <label htmlFor="name" className="text-xl pl-2">
                        Category Name
                      </label>

                      <input
                        type="text"
                        id="name"
                        name="name"
                        onChange={handleInput}
                        className="w-full bg-[#1e1e49] p-4 mt-1 rounded-md"
                        value={user.name}
                        placeholder="Enter the category of product..."
                      />
                    </div>
                  </div>
                </div>
                <div className="px-4 pb-8 sm:flex sm:flex-row-reverse sm:px-6" onClick={handletog}>
                  <button
                    type="button"
                    onClick={handlesubmit}
                    className="inline-flex w-full justify-center rounded-md bg-green-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-800 hover:scale-110 duration-200 sm:ml-3 sm:w-auto"
                  >
                    Create
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-red-500 hover:text-white hover:scale-110 duration-200 sm:mt-0 sm:w-auto"
                    onClick={handletog}
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
  );
};

export default CategoryModal;

import React, { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useAuth } from "../Context/Context";
import {toast,Zoom} from "react-toastify"
const ProductsModal = ({ toggle, handletog }) => {
  const [open, setOpen] = useState(toggle);
  const { isAuthorizedToken, category, getProducts, apiUrl } = useAuth();
  const [files, setFiles] = useState([]);
  const [filenames, setFilenames] = useState([]);
  const [user, setUser] = useState({
    name: "",
    description: "",
    finalprice: "",
    originalprice: "",
    quantity: "",
    category: "",
    photo: "",
    topProduct: "",
    featuredProduct: "",
    info:""
  });

  useEffect(() => {
    setOpen(toggle);
  }, [toggle]);

  const uploadPhotos = async () => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("product", file);
    });

    try {
      const response = await fetch(`${apiUrl}/api/auth/upload`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: isAuthorizedToken,
        },
      });

      const data = await response.json();
      console.log("image ", data);
      if (response.ok) {
        return data.image_url;
      } else {
        throw new Error("Image upload failed");
      }
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const handleSubmit = async () => {
    try {
      const image_url = await uploadPhotos();
      console.log(image_url);
      if (image_url) {
        const productData = {
          name: user.name,
          description: user.description,
          finalprice: user.finalprice,
          originalprice: user.originalprice,
          quantity: user.quantity,
          category: user.category,
          topProduct: user.topProduct,
          featuredProduct: user.featuredProduct,
          photo: image_url,
          info: user.info
        };

        const response = await fetch(`
          ${apiUrl}/api/auth/create-product`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: isAuthorizedToken,
            },
            body: JSON.stringify(productData),
          }
        );

        if (response.ok) {
          // const data = await response.json();
          toast.success('Product Created!', {
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
          
          getProducts();
        } else {
          throw new Error("Failed to upload product");
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleChange = (e, index) => {
    const file = e.target.files[0];
    const newFiles = [...files];
    const newFilenames = [...filenames];
    newFiles[index] = file;
    newFilenames[index] = URL.createObjectURL(file);
    setFiles(newFiles);
    setFilenames(newFilenames);
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
                    Create Your Product
                  </div>

                  <div className="w-[100%] mt-14 h-[30rem] overflow-y-scroll text-white">
                    <div className="px-4 pb-3">
                      <label htmlFor="name" className="text-xl pl-2">
                        Product Name
                      </label>

                      <input
                        type="text"
                        id="name"
                        name="name"
                        onChange={handleInput}
                        className="w-full bg-[#1e1e49] p-4 mt-1 rounded-md"
                        value={user.name}
                        placeholder="Enter the title of product..."
                      />
                    </div>
                    <div className="px-4">
                      <label htmlFor="info" className="text-xl pl-2">
                        Information
                      </label>

                      <input
                        type="text"
                        id="info"
                        name="info"
                        onChange={handleInput}
                        className="w-full bg-[#1e1e49] p-4 mt-1 rounded-md"
                        value={user.info}
                        placeholder="Enter the info of product..."
                      />
                    </div>
                    <div className="py-3 px-4">
                      <label htmlFor="description" className="text-xl pl-2">
                        Description
                      </label>

                      <textarea
                        id="description"
                        name="description"
                        value={user.description}
                        onChange={handleInput}
                        className="w-full bg-[#1e1e49] p-4 mt-1 rounded-md"
                        placeholder="Enter product description..."
                        rows="3"
                        cols="2"
                      />
                    </div>
                    <div className="px-4 flex gap-2 pb-2">
                      <div>
                        <label htmlFor="finalprice" className="text-xl pl-2">
                          Final Price
                        </label>

                        <input
                          type="number"
                          id="finalprice"
                          name="finalprice"
                          onChange={handleInput}
                          value={user.finalprice}
                          className="w-full bg-[#1e1e49] p-4 mt-1 rounded-md"
                          placeholder="Enter Price"
                        />
                      </div>
                      <div>
                        <label htmlFor="originalprice" className="text-xl pl-2">
                          Original Price
                        </label>

                        <input
                          type="number"
                          id="originalprice"
                          name="originalprice"
                          onChange={handleInput}
                          value={user.originalprice}
                          className="w-full bg-[#1e1e49] p-4 mt-1 rounded-md"
                          placeholder="Enter Price"
                        />
                      </div>
                      <div className="flex flex-col text-right">
                        <label htmlFor="quantity" className="text-xl pl-2">
                          Quantity
                        </label>

                        <input
                          type="number"
                          id="quantity"
                          name="quantity"
                          onChange={handleInput}
                          value={user.quantity}
                          className="w-full bg-[#1e1e49] text-right p-4 mt-1 rounded-md"
                          placeholder="0"
                        />
                      </div>
                    </div>
                    <div className="px-4 pb-4">
                      <label htmlFor="category" className="text-xl pl-2">
                        Category
                      </label>
                      <Transition
                        as={Fragment}
                        show={true}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 transform scale-95"
                        enterTo="opacity-100 transform scale-100"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 transform scale-100"
                        leaveTo="opacity-0 transform scale-95"
                      >
                        <select
                          id="category"
                          name="category"
                          onChange={handleInput}
                          value={user.category}
                          className="w-full bg-[#1e1e49] p-4 mt-2 rounded-[4px]"
                        >
                          <option value="">Select Category</option>
                          {category.map((cat) => (
                            <option key={cat._id} value={cat._id}>
                              {cat.name}
                            </option>
                          ))}
                        </select>
                      </Transition>
                    </div>
                    <div className="py-3 px-4">
                      <label htmlFor="description" className="text-xl pl-2">
                        Top-Product
                      </label>
                      <Transition
                        as={Fragment}
                        show={true}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 transform scale-95"
                        enterTo="opacity-100 transform scale-100"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 transform scale-100"
                        leaveTo="opacity-0 transform scale-95"
                      >
                        <select
                          id="topProduct"
                          name="topProduct"
                          onChange={handleInput}
                          value={user.topProduct}
                          className="w-full bg-[#1e1e49] p-4 mt-2 rounded-[4px]"
                        >
                          <option value="">Choose</option>

                          <option value={true}>Yes</option>
                          <option value={false}>No</option>
                        </select>
                      </Transition>
                    </div>
                    <div className="py-3 px-4">
                      <label htmlFor="description" className="text-xl pl-2">
                        Featured-Product
                      </label>
                      <Transition
                        as={Fragment}
                        show={true}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 transform scale-95"
                        enterTo="opacity-100 transform scale-100"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 transform scale-100"
                        leaveTo="opacity-0 transform scale-95"
                      >
                        <select
                          id="featuredProduct"
                          name="featuredProduct"
                          onChange={handleInput}
                          value={user.featuredProduct}
                          className="w-full bg-[#1e1e49] p-4 mt-2 rounded-[4px]"
                        >
                          <option value="">Choose</option>

                          <option value={true}>Yes</option>
                          <option value={false}>No</option>
                        </select>
                      </Transition>
                    </div>
                    <div className="px-4 pb-4">
                      <label htmlFor="photos" className="text-xl pl-2">
                        Photos
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {Array.from({ length: 4 }).map((_, index) => (
                          <Fragment key={index}>
                            <label
                              htmlFor={`file-upload${index + 1}`}
                              className="text-sm w-full flex gap-0 bg-[#1e1e49] p-4 mt-1 rounded-md"
                            >
                              <div className="w-[50%] flex justify-center items-center">
                                <div className="bg-blue-600 px-8 py-2 rounded-[4px] text-[12px] flex justify-center w-[30%]">
                                  Upload
                                </div>
                              </div>
                              <div className="flex justify-center rounded-[4px] bg-[#95989b43] w-full h-[80px]">
                                {filenames[index] ? (
                                  <img src={filenames[index]} alt="" />
                                ) : (
                                  <img
                                    src="https://img.icons8.com/carbon-copy/100/no-image.png"
                                    alt=""
                                  />
                                )}
                              </div>
                            </label>
                            <input
                              id={`file-upload${index + 1}`}
                              type="file"
                              onChange={(e) => handleChange(e, index)}
                              className="hidden"
                            />
                          </Fragment>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 pb-8 sm:flex sm:flex-row-reverse sm:px-6" onClick={handletog}>
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-green-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-800 hover:scale-110 duration-200 sm:ml-3 sm:w-auto"
                    onClick={handleSubmit}
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

export default ProductsModal;

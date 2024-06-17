import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import reviewsData from "../Data/ReviewsData";
import "./ProductDetails.css";
import { useCartContext } from "../Context/Cart_Context";
import { useAuth } from "../Context/Auth_context";

const ProductDetails = () => {
  const { id } = useParams();
  const { displayProducts,getSingleCategory,singleCategory } = useAuth();
  const [data, setData] = useState(null);
  const [previewimg, setPreviewimg] = useState("");
  const [cur_section, setCurSection] = useState(0);

  useEffect(() => {
    if (displayProducts) {
      const product = displayProducts.find((e) => e._id === id);
      setData(product);
      if (product) setPreviewimg(product.photo[0]);
    }
  }, [displayProducts, id]);
  useEffect(() => {
    getSingleCategory(data?.category); // Fetch category when data or category ID changes
  }, [data?.category, getSingleCategory]);


  const changeImage = (i) => {
    setPreviewimg(data.photo[i]);
    setCurSection(i);
  };

  const { addToCart } = useCartContext();

  if (!data) {
    return (
      <div className="flex flex-col gap-2 items-center justify-center h-[80vh]">
        <div
          class="inline-block h-14 w-14 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status"
        >
          <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
        <div className="text-white font-medium text-lg">Loading ...</div>
      </div>
      
    );
  }

  return (
    <div className="font-[sans-serif] bg-[#191919]">
      <div className="lg:p-6 p-2 lg:max-w-7xl max-w-4xl mx-auto">
        <div className="grid items-start rounded-xl bg-[#4f4d4d2e] shadowDetails grid-cols-1 lg:grid-cols-5 lg:gap-10 gap-8 p-6">
          <div className="lg:col-span-3 w-full lg:sticky top-0 text-center">
            <div className="px-4 py-10 rounded-xl bg-[#4f4d4d24] shadowDetails relative">
              <img
                src={previewimg}
                alt="Product"
                className="w-4/5 rounded object-cover"
              />
              <button type="button" className="absolute top-4 right-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20px"
                  fill="#ccc"
                  className="mr-1 hover:fill-[#333]"
                  viewBox="0 0 64 64"
                >
                  <path
                    d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                    data-original="#000000"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-6 mx-auto">
              {data.photo.map((photo, index) => (
                <div
                  key={index}
                  className={
                    index === cur_section
                      ? "rounded-xl bg-[#4f4d4d36] border border-gray-300 p-4 shadowDetails"
                      : "rounded-xl bg-[#4f4d4d36] p-4 shadowDetails"
                  }
                >
                  <img
                    src={photo}
                    alt="Product"
                    onClick={() => changeImage(index)}
                    className="w-24 cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-2 gap-4 lg:gap-8 flex flex-col">
            <div>
              <h2 className="text-2xl font-extrabold text-white">{data.name}</h2>
              <div className="text-gray-500 font-medium">{""}</div>
              <div className="flex space-x-2 mt-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 fill-[#d41717]"
                    viewBox="0 0 14 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                  </svg>
                ))}
                <h4 className="text-white text-base">{5} Reviews</h4>
              </div>
            </div>
            <hr />
            <div className="flex justify-between items-center gap-4 my-4">
              <div className="text-white text-3xl lg:text-4xl font-bold">
                <div>
                  ₹{data.finalprice}{" "}
                  <span className="text-gray-400 font-medium text-xl">
                    <strike>₹{data.originalprice}</strike>
                  </span>
                </div>
                <p className="text-gray-400 text-xl">
                  {" "}
                  <span className="text-sm text-green-400 ml-1">
                    Tax included
                  </span>
                </p>
              </div>
              <div>
                <div className="w-[100%] p-2 flex justify-center items-center rounded-md text-white text-sm bg-green-600">
                  &#x2714; {data.quantity !== 0 ? "In Stock" : "Out of Stock"}
                </div>
              </div>
            </div>
            <hr />
            <div className="text-white text-xs font-medium lg:text-[15px]">
              <div className="text-xl pb-2">Description :</div>
              <div>{data.description}</div>
            </div>
            <hr />
            <div className="flex lg:w-[50%] flex-wrap ">
              <button
                onClick={() => addToCart(data)}
                type="button"
                className="w-full herobutton px-4 py-4 border border-[#6a6868] bg-transparent text-white text-sm font-bold rounded"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
        <div className="mt-10 bg-[#4f4d4d2e] rounded-xl shadowDetails p-6">
          <h3 className="text-lg font-bold text-white">Product information</h3>
          <ul className="mt-6 space-y-6 text-white">
          <li className="text-sm">
              Brand <span className="ml-4 float-right">{data.brandname}</span>
            </li>
            <li className="text-sm">
              Model <span className="ml-4 float-right">{data.name}</span>
            </li>
            <li className="text-sm">
              Generic Name{" "}
              <span className="ml-4 float-right">{singleCategory ? singleCategory.category.name : ''}</span>
            </li>
            <li className="text-sm">
              Microphone <span className="ml-4 float-right">Yes</span>
            </li>
          </ul>
        </div>
        <div className="mt-10 bg-[#4f4d4d2e] rounded-xl h-[40vh] overflow-y-auto shadowDetails p-6">
          <h3 className="text-lg font-bold text-white">
            Reviews({reviewsData.length})
          </h3>
          <div className="grid md:grid-cols-2 gap-12 mt-6">
            {reviewsData &&
              reviewsData.map((item, i) => (
                <div key={i}>
                  <div className="flex items-start">
                    <img
                      src="https://media.istockphoto.com/id/1332100919/vector/man-icon-black-icon-person-symbol.jpg?s=612x612&w=0&k=20&c=AVVJkvxQQCuBhawHrUhDRTCeNQ3Jgt0K1tXjJsFy1eg="
                      alt=""
                      className="w-12 h-12 rounded-full border-2 border-white"
                    />
                    <div className="ml-3">
                      <h4 className="text-sm font-bold text-white">
                        {item.name}
                      </h4>
                      <div className="flex space-x-1 mt-1">
                        {[...Array(item.rateCount)].map((_, i) => (
                          <svg
                            key={i}
                            className="w-4 fill-[#d41717]"
                            viewBox="0 0 14 13"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                          </svg>
                        ))}
                        <p className="text-xs !ml-2 font-semibold text-white">
                          {item.date}
                        </p>
                      </div>
                      <p className="text-sm mt-4 text-white">{item.review}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

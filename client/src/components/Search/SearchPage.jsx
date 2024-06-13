import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useCartContext } from "../Context/Cart_Context";
import { useAuth } from "../Context/Auth_context";
const SearchPage = () => {
  const location = useLocation();
  const searchParms = new URLSearchParams(location.search);
  const searchTerm = searchParms.get("query");
  const { addToCart } = useCartContext();
  const {displayProducts} = useAuth()
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const product = displayProducts.filter((e) =>
    e.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  console.log(product);
  return (
      <div className="">
        {product.length!==0?<>
        <div className="text-white md:px-6 lg:px-10 px-2 my-4 mb-8 text-2xl font-medium">Showing Search Results ({product.length})</div>
            
      <div className="w-[100%] mt-2 lg:mt-4 grid md:grid-cols-3 grid-cols-2 lg:grid-cols-4 lg:gap-4 md:gap-2 gap-1 md:px-6 lg:px-10 px-2">
        {product &&
          product.map((item, i) => (
            <div key={i}>
              <div className="border border-gray-400 rounded-md overflow-hidden   ">
                <Link
                  to={`/product-details/${item.slug}/${item._id}`}
                  onClick={scrollToTop}
                  className="lg:h-[32vh] md:h-[16vh] h-[16vh] flex justify-center topimages"
                >
                  <img src={item.photo[0]} className="" alt="" />
                </Link>

                <div className="bg-[#1f1e1e] flex flex-col lg:p-4 p-2 h-full">
                  <div className="flex space-x-1 mb-2">
                    {[...Array(5)].map((i) => (
                      <div key={i}>
                        <svg
                          className="lg:w-4 w-3 fill-[#d41717]"
                          viewBox="0 0 17 13"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                        </svg>
                      </div>
                    ))}
                  </div>
                  <div className="text-white text-sm font-medium md:text-xl lg:text-xl">
                    {item.name}
                  </div>
                  <div className="text-[8px]  lg:text-sm font-medium text-gray-500">
                    {item.info}
                  </div>
                  <hr className="mt-4" />
                  <div className="text-white font-medium lg:text-2xl pt-4">
                    ₹{item.finalprice}{" "}
                    <span className="lg:text-xl text-xs text-gray-500">
                      <strike>₹{item.originalprice}</strike>
                    </span>{" "}
                  </div>
                  <div
                    onClick={() => addToCart(item)}
                    className="w-[100%] mt-4 flex justify-center items-center herobutton bg-red-800 lg:h-[8vh] h-[6vh] md:h-[5vh] rounded-md"
                  >
                    <div className="lg:text-lg md:text-lg text-sm text-white font-medium">
                      Add To Cart
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
        </>:<>
        <div className="text-white flex justify-center items-center h-[50vh] text-2xl font font-medium">No Products Found</div>
        </>}
     
    </div>
  );
};

export default SearchPage;

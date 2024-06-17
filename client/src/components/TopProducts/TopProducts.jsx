import React, { useState, useEffect } from "react";
import "./TopProducts.css";
import { Link } from "react-router-dom";
import { useCartContext } from "../Context/Cart_Context";
import { useAuth } from "../Context/Auth_context";

const TopProducts = () => {
  const { addToCart } = useCartContext();
  const { displayProducts = [], category = [] } = useAuth();
  const [products, setProducts] = useState([]);
  const [curSection, setCurSection] = useState(0);


  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  useEffect(() => {
    if (displayProducts) {
      // Filter products that have topProduct set to true
      const topProducts = displayProducts.filter(
        (product) => product.topProduct === true
      );
      setProducts(topProducts);
    }
  }, [displayProducts]);

  const handleClick = (categoryId, index) => {
    if (categoryId === category[0]._id) {
      setProducts(displayProducts);
    } else {
      const filteredProducts = displayProducts.filter(
        (product) => product.category === categoryId
      );
      setProducts(filteredProducts);
    }
    setCurSection(index);
  };

  return (
    <div className="flex gap-4 mb-8 flex-col items-center topproducts">
      <div className="text-white text-center text-3xl font-medium py-4">
        Top Products
      </div>
      <div>
        <ul className="flex flex-wrap justify-center lg:gap-8 gap-2 font-medium text-white">
          {category.length > 0 &&
            category.map((section, index) => (
              <li
                key={index}
                className={
                  index === curSection
                    ? "active p-3 px-6 cursor-pointer categorystyle"
                    : "p-3 px-6 cursor-pointer categorystyle"
                }
                onClick={() => handleClick(section._id, index)}
              >
                {section.name}
              </li>
            ))}
        </ul>
      </div>
      <div className="w-[100%] mt-2 lg:mt-4 grid md:grid-cols-3 grid-cols-2 lg:grid-cols-4 lg:gap-4 md:gap-2 gap-1 md:px-6 lg:px-10 px-2">
        {products.length > 0 &&
          products.map((item, i) => (
            <div key={i} className="border border-gray-400 rounded-md overflow-hidden">
              <Link
                to={`/product-details/${item.slug}/${item._id}`}
                onClick={scrollToTop}
                className="lg:h-[32vh] md:h-[16vh] h-[16vh] flex justify-center topimages"
              >
                {item.photo && item.photo.length > 0 ? (
                  <img src={item.photo[0]} className="" alt={item.name} />
                ) : (
                  <div className="flex items-center justify-center w-full h-full bg-gray-200">
                    <span className="text-gray-500">No Image Available</span>
                  </div>
                )}
              </Link>
              <div className="bg-[#1f1e1e] flex flex-col lg:p-4 p-2 h-full">
                <div className="flex space-x-1 mb-2">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      className="lg:w-4 w-3 fill-[#d41717]"
                      viewBox="0 0 17 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                    </svg>
                  ))}
                </div>
                <div className="text-white text-sm font-medium md:text-xl lg:text-xl">
                  {item.name}
                </div>
                <div className="text-[8px] lg:text-sm font-medium text-gray-500">
                  {item.info}
                </div>
                <hr className="mt-4" />
                <div className="text-white font-medium lg:text-2xl pt-4">
                  ₹{item.finalprice}{" "}
                  <span className="lg:text-xl text-xs text-gray-500">
                    <strike>₹{item.originalprice}</strike>
                  </span>
                </div>
                <div
                  onClick={() => addToCart(item)}
                  className="w-[100%] mt-4 flex justify-center items-center herobutton bg-red-800 lg:h-[8vh] h-[6vh] md:h-[5vh] rounded-md cursor-pointer"
                >
                  <div className="lg:text-lg md:text-lg text-sm text-white font-medium">
                    Add To Cart
                  </div>
                </div>
              </div>
            </div>
          ))}
        <div>
          <Link
            to="/allproducts"
            onClick={scrollToTop}
            className="border flex items-center justify-center rounded-md h-[41vh] lg:h-[63vh]"
          >
            <div className="lg:text-2xl text-sm hover:underline text-white font-medium cursor-pointer">
              Browse All Products &rarr;
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopProducts;

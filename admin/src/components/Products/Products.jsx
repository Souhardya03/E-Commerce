import React, { useState, useEffect } from "react";
import ProductsModal from "./ProductsModal";
import { useAuth } from "../Context/Context";
import { MdOutlineDeleteOutline } from "react-icons/md";

const Products = () => {
  const [seen, setSeen] = useState(false);
  const { displayProducts, getSingleCategory, deleteProduct } = useAuth();
  const [categories, setCategories] = useState({});

  const handleToggle = () => {
    setSeen(!seen);
  };
  useEffect(() => {
    // Fetch category names for all displayed products
    const fetchCategories = async () => {
      const categoryData = {};
      for (const product of displayProducts) {
        if (product.category && !categoryData[product.category]) {
          const category = await getSingleCategory(product.category);

          if (category) {
            categoryData[product.category] = category.category.name;
          }
        }
      }
      setCategories(categoryData);
    };

    if (displayProducts) {
      fetchCategories();
    }
  }, [displayProducts]);

  return (
    <div>
      <div className="text-[#97a4be] font-medium text-2xl">Products</div>
      <div className="h-auto bg-[#151431] p-4 rounded-lg mt-4">
        <div
          className="mb-4 cursor-pointer lg:w-[15%] lg:hover:scale-105 hover:bg-[#6367f0] duration-200 p-2 rounded-[4px] flex justify-center gap-1 bg-blue-500"
          onClick={handleToggle}
        >
          <button className="text-sm font-medium">Add New</button>
          <div className="text-lg">+</div>
        </div>
        <div className={`relative border ${displayProducts.length===0?"h-[8rem]":"h-[30rem]"} overflow-y-auto border-[#2d2f5b] overflow-x-auto shadow-md sm:rounded-lg`}>
          <table className="w-full  text-sm text-left rtl: bg-transparent text-gray-500 dark:text-gray-400">
            <thead className="text-xs sticky top-0 bg-[#1c1d43] text-gray-700 uppercase dark:text-gray-400">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-4 border-r border-r-[#2d2f5b]"
                >
                  Products
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 border-r border-r-[#2d2f5b]"
                >
                  Final Price
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 border-r border-r-[#2d2f5b]"
                >
                  Original Price
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 border-r border-r-[#2d2f5b]"
                >
                  Category
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 border-r text-center border-r-[#2d2f5b]"
                >
                  Hero-Product
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 border-r text-center border-r-[#2d2f5b]"
                >
                  Top-Product
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 border-r text-center border-r-[#2d2f5b]"
                >
                  Featured-Product
                </th>
                <th scope="col" className="px-6 py-4">
                  Action
                </th>
              </tr>
            </thead>
            {displayProducts &&
              displayProducts.map((data, i) => (
                <tbody key={i}>
                  <tr className="border-b dark:border-gray-700">
                    <th className="lg:px-6 px-3 py-4 border-r border-r-[#2d2f5b] w-[28%] font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <div className="flex gap-2 items-center">
                        <img
                          src={data.photo[0]}
                          alt=""
                          className="w-[20%] rounded-[6px]"
                        />
                        <div className="text-[8px] lg:text-sm">{data.name}</div>
                      </div>
                    </th>
                    <th
                      scope="row"
                      className="px-6 py-4 border-r border-r-[#2d2f5b] font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      ₹ {data.finalprice}
                    </th>
                    <td className="px-6 py-4 text-white font-medium border-r border-r-[#2d2f5b]">
                      ₹ {data.originalprice}
                    </td>
                    <td className="px-6 py-4 font-medium border-r border-r-[#2d2f5b]">
                      {categories[data.category] || data.category}
                    </td>
                    <td className="px-6 py-4 font-medium text-center border-r border-r-[#2d2f5b]">
                      {data.heroProduct?"Yes":"No"}
                    </td>
                    <td className="px-6 py-4 font-medium text-center border-r border-r-[#2d2f5b]">
                      {data.topProduct?"Yes":"No"}
                    </td>
                    <td className="px-6 py-4 font-medium text-center border-r border-r-[#2d2f5b]">
                      {data.featuredProduct?"Yes":"No"}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2 ml-3 items-center text-gray-500">
                        <div
                          className="p-2 hover:scale-110 duration-200 rounded-md hover:bg-red-500 hover:text-white bg-[#524f4f40]"
                          onClick={() => deleteProduct(data._id)}
                        >
                          <MdOutlineDeleteOutline className="text-lg" />
                        </div>
                        {/* <div className="p-2 rounded-md hover:scale-110 duration-200 hover:bg-green-600 hover:text-white bg-[#524f4f40]" onClick={()=>setseen(!seen)}>
                          <FaRegEdit className="text-lg" onClick={()=>getsingleuser(data.name)} />
                        </div> */}
                      </div>
                    </td>
                  </tr>
                </tbody>
              ))}
          </table>
        </div>
      </div>
      {seen && <ProductsModal toggle={seen} handletog={handleToggle} />}
    </div>
  );
};

export default Products;

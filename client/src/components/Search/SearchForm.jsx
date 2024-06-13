import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchForm = () => {
    const navigate = useNavigate()
  const [searchTerm, setsearchTerm] = useState("");
  const handlesearch = (e)=>{
    setsearchTerm(e.target.value);
  }
  const handleSubmit = (e)=>{
    e.preventDefault();
    
    if(searchTerm.length>0){
      navigate(`/search?query=${searchTerm}`);
      document.querySelector('input').value="";
      setsearchTerm("");
    }
  }
  const handleclick = (e)=>{
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        onKeyDown={handleclick}
        onChange={handlesearch}
        className="lg:w-[60vw] md:w-[45vw] w-[45vw] text-white md:p-2 border border-gray-600 lg:p-2  p-2 px-2 lg:text-xl text-[14px] lg:placeholder:text-lg  placeholder:text-[11px] placeholder:font-medium ml-2 lg:rounded-[8px] rounded-[4px] bg-[#3f3c3c] "
        placeholder="Search for the product..."
      />
    </form>
  );
};

export default SearchForm;

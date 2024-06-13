// import { useEffect } from "react";
import { createContext, useContext, useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const [token, settoken] = useState(localStorage.getItem("token"));
  const [userdata, setuserdata] = useState(localStorage.getItem("userdata"));
  const datauser = (data) => {
    console.log(userdata);
    return window.localStorage.setItem("userdata", JSON.stringify(data.user));
  };
  //storing token
  const storeToken = (tkn) => {
    settoken(tkn);
    return window.localStorage.setItem("token", tkn);
  };
  //Create User
  const createUser = async (user) => {
    try {
      const response = await fetch(`${apiUrl}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("User Created");
        storeToken(data.token);
        datauser(data);
      } else {
        console.log("User Exists");
      }
    } catch (error) {
      console.log(error);
      console.log("Error from create user frontend");
    }
  };

  //Login function
  const Login = async (user) => {
    try {
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Login Successfull");
        storeToken(data.token);
        console.log(isLoggedIn);
        // console.log(data.user);

        datauser(data);
        window.location.replace("/testpage");
      } else {
        console.log("Invalid Credentials");
      }
    } catch (error) {
      console.log(error);
      console.log("Error from Login Frontend");
    }
  };
  //Checking Login or not
  const isLoggedIn = !!token;
  console.log(isLoggedIn);

  //admin check
  const isAdmin = JSON.parse(userdata ? userdata : "{}").role;

  //Logout function
  const logout = () => {
    settoken("");
    window.localStorage.removeItem("token");
    setuserdata("");
    window.localStorage.removeItem("userdata");
  };

  //get products
  const [displayProducts, setdisplayProducts] = useState()
  const getProducts = async()=>{
    try {
      const response = await fetch(`${apiUrl}/api/auth/get-products`,{
        method: 'GET',
      });
      const data = await response.json();
      if(response.ok){
        setdisplayProducts(data);
      }
    } catch (error) {
      console.log(error);
      console.log("Error From context get Products");
    }
  }
  const [category, setcategory] = useState();
  const getCategory = async()=>{
    try {
      const response = await fetch(`${apiUrl}/api/auth/get-category`, {
        method: "GET",
        
      });
      if(response.ok){
        const data = await response.json();
        setcategory(data.categories);
        
      }
    } catch (error) {
      console.log(error);
      console.log("Error From getcategory of context");
    }
  }
  const [singlecategory, setsinglecategory] = useState()
  const getsinglecategory = async(id)=>{
    try {
      const response = await fetch(`${apiUrl}/api/auth/single-category/${id}`,{
        method: 'GET',
      })
      const data = await response.json();
      if(response.ok){
        setsinglecategory(data);
       return data
      }
    } catch (error) {
      console.log(error);
      console.log("Error From context single category");
    }
  }
  useEffect(()=>{
    getCategory();
  },[])

  useEffect(()=>{
    getProducts();
  },[])
  return (
    <AuthContext.Provider
      value={{
        createUser,
        logout,
        Login,
        isLoggedIn,
        userdata,
        token,
        isAdmin,
        displayProducts, category, getsinglecategory, singlecategory
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  return useContext(AuthContext);
};

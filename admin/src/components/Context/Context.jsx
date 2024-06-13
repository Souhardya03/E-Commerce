// import { useEffect } from "react";
import { createContext, useContext, useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";
import {toast, Zoom} from "react-toastify"

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [allUsers, setallUsers] = useState();

  const [token, settoken] = useState(localStorage.getItem("token"));
  const [userdata, setuserdata] = useState(localStorage.getItem("userdata"));

  //Getting Token
  const isAuthorizedToken = token;

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
        // console.log(isLoggedIn);
        // console.log(data.user);

        datauser(data);
        // window.location.replace("/testpage")
      } else {
        console.log("Invalid Credentials");
      }
    } catch (error) {
      console.log(error);
      console.log("Error from Login Frontend");
    }
  };
  const datauser = (data) => {
    console.log(userdata);
    return window.localStorage.setItem("userdata", JSON.stringify(data.user));
  };
  //storing token
  const storeToken = (tkn) => {
    settoken(tkn);
    return window.localStorage.setItem("token", tkn);
  };
  //Checking Login or not
  const isLoggedIn = !!token;
  // console.log(isLoggedIn);

  //admin check
  const isAdmin = JSON.parse(userdata ? userdata : "{}").role;
  // console.log("Admin Context",isAdmin);

  //Logout function
  const logout = () => {
    settoken("");
    window.localStorage.removeItem("token");
    setuserdata("");
    window.localStorage.removeItem("userdata");
  };

  //get all users
  const getallUsers = async () => {
    const response = await fetch(`${apiUrl}/api/auth/getallusers`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      const data = await response.json();
      setallUsers(data);
    }
  };

  //delete user
  const deleteuser = async (id) => {
    const response = await fetch(`${apiUrl}/api/auth/deleteuser/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: isAuthorizedToken,
      },
    });
    if (response.ok) {
      // alert('User has been deleted');
      getallUsers();
    }
  };
  const [singleuser, setsingleuser] = useState(null);
  const getsingleuser = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/api/auth/getsingleuser/${id}`, {
        method: "GET",
        headers: { Authorization: isAuthorizedToken },
      });
      if (response.ok) {
        const data = await response.json();
        setsingleuser(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //update user
  const updateUser = async(id,user)=>{
    try {
      const response = await fetch(`${apiUrl}/api/auth/updateuser/${id}`,{
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if(response.ok){
        toast.success('User Updated!', {
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
        getallUsers();
      }
    } catch (error) {
      console.log("Error From Context Single User");
    }
  }

  //Get Category
  const [category, setcategory] = useState();
  const getCategory = async()=>{
    try {
      const response = await fetch(`${apiUrl}/api/auth/get-category`, {
        method: "GET",
        headers: { Authorization: isAuthorizedToken },
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

  //Get Products
  const [displayProducts, setdisplayProducts] = useState()
  const getProducts = async()=>{
    try {
      const response = await fetch(`${apiUrl}/api/auth/get-products`,{
        method: 'GET',
        headers: {
          Authorization:isAuthorizedToken
        }
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

  //Get single category
  const [singlecategory, setsinglecategory] = useState()
  const getsinglecategory = async(id)=>{
    try {
      const response = await fetch(`${apiUrl}/api/auth/single-category/${id}`,{
        method: 'GET',
        headers: {
          Authorization:isAuthorizedToken
        }
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

  //delete product
  const deleteProduct = async(id)=>{
    try {
      const response = await fetch(`${apiUrl}/api/auth/delete-product/${id}`,{
        method: "DELETE",
        headers:{
          Authorization:isAuthorizedToken
        }
      })
      if(response.ok){

        getProducts();
        
        toast.success('Product Deleted!', {
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
      console.log("Error From context delete product");
    }
  }

  //delete category
  const deletecategory = async(id)=>{
    try {
      const response = await fetch(`${apiUrl}/api/auth/delete-category/${id}`,
        {
          method:"DELETE",
          headers: {
            Authorization:isAuthorizedToken
          }
        }
      )
      if(response.ok){
        toast.success('Category Deleted!', {
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
        getCategory();
      }
    } catch (error) {
      console.log(error);
      console.log("Error From context delete category");
    }
  }
  
  useEffect(()=>{
    getProducts();
  },[])

  useEffect(()=>{
    getCategory();
  },[])
  
  useEffect(() => {
    getallUsers();
  }, []);

  useEffect(() => {
    getsingleuser();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        apiUrl,
        allUsers,
        Login,
        createUser,
        logout,
        isAdmin,
        isLoggedIn,
        deleteuser,
        getsingleuser,
        singleuser,
        isAuthorizedToken,
        updateUser,category,
        displayProducts,getProducts,
        singlecategory,getsinglecategory,getCategory,
        deleteProduct,deletecategory
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  return useContext(AuthContext);
};

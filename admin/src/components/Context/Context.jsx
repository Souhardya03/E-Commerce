import { createContext, useContext, useEffect, useState } from "react";
import { toast, Zoom } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [allUsers, setAllUsers] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userdata, setUserdata] = useState(
    JSON.parse(localStorage.getItem("userdata"))
  );

  const isAuthorizedToken = token;

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
        storeUserdata(data.user);
      } else {
        console.log("User Exists");
      }
    } catch (error) {
      console.log("Error from create user frontend", error);
    }
  };

  const login = async (user) => {
    try {
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      
      if (response.ok) {
        console.log("Login Successful");
        storeToken(data.token);
        storeUserdata(data.user);
      } else {
        console.log("Invalid Credentials");
      }
    } catch (error) {
      console.log("Error from Login Frontend", error);
    }
  };

  const storeToken = (tkn) => {
    setToken(tkn);
    localStorage.setItem("token", tkn);
  };

  const storeUserdata = (user) => {
    setUserdata(user);
    localStorage.setItem("userdata", JSON.stringify(user));
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    setUserdata(null);
    localStorage.removeItem("userdata");
  };

  const isLoggedIn = !!token;
  const isAdmin = userdata?.role;

  const getAllUsers = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/auth/getallusers`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        const data = await response.json();
        setAllUsers(data);
      }
    } catch (error) {
      console.log("Error from getAllUsers", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/api/auth/deleteuser/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: isAuthorizedToken,
        },
      });
      if (response.ok) {
        getAllUsers();
      }
    } catch (error) {
      console.log("Error from deleteUser", error);
    }
  };

  const [singleUser, setSingleUser] = useState(null);
  const getSingleUser = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/api/auth/getsingleuser/${id}`, {
        method: "GET",
        headers: { Authorization: isAuthorizedToken },
      });
      if (response.ok) {
        const data = await response.json();
        setSingleUser(data);
      }
    } catch (error) {
      console.log("Error from getSingleUser", error);
    }
  };

  const updateUser = async (id, user) => {
    try {
      const response = await fetch(`${apiUrl}/api/auth/updateuser/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        toast.success("User Updated!", {
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
        getAllUsers();
      }
    } catch (error) {
      console.log("Error from updateUser", error);
    }
  };

  const [category, setCategory] = useState([]);
  const getCategory = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/auth/get-category`, {
        method: "GET",
        headers: { Authorization: isAuthorizedToken },
      });
      if (response.ok) {
        const data = await response.json();
        setCategory(data.categories);
      }
    } catch (error) {
      console.log("Error from getCategory", error);
    }
  };

  const [displayProducts, setDisplayProducts] = useState([]);
  const getProducts = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/auth/get-products`, {
        method: "GET",
        headers: { Authorization: isAuthorizedToken },
      });
      if (response.ok) {
        const data = await response.json();
        setDisplayProducts(data);
      }
    } catch (error) {
      console.log("Error from getProducts", error);
    }
  };

  const [singleCategory, setSingleCategory] = useState(null);
  const getSingleCategory = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/api/auth/single-category/${id}`, {
        method: "GET",
        headers: { Authorization: isAuthorizedToken },
      });
      if (response.ok) {
        const data = await response.json();
        setSingleCategory(data);
        return data;
      }
    } catch (error) {
      console.log("Error from getSingleCategory", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/api/auth/delete-product/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: isAuthorizedToken,
        },
      });
      if (response.ok) {
        getProducts();
        toast.success("Product Deleted!", {
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
      console.log("Error from deleteProduct", error);
    }
  };

  const deleteCategory = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/api/auth/delete-category/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: isAuthorizedToken,
        },
      });
      if (response.ok) {
        getCategory();
        toast.success("Category Deleted!", {
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
      console.log("Error from deleteCategory", error);
    }
  };

  useEffect(() => {
    if (token && isAdmin===1) {
      getProducts();
      getCategory();
      getAllUsers();
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        apiUrl,
        allUsers,
        login,
        createUser,
        logout,
        isAdmin,
        isLoggedIn,
        storeToken,
        deleteUser,
        getSingleUser,
        singleUser,
        isAuthorizedToken,
        updateUser,
        category,
        displayProducts,
        getProducts,
        singleCategory,
        getSingleCategory,
        getCategory,
        deleteProduct,
        deleteCategory,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

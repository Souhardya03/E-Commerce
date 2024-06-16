import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userdata, setUserdata] = useState(
    JSON.parse(localStorage.getItem("userdata"))
  );

  const datauser = (data) => {
    const parsedUserdata = JSON.stringify(data.user);
    setUserdata(parsedUserdata);
    window.localStorage.setItem("userdata", parsedUserdata);
  };

  // Storing token
  const storeToken = (tkn) => {
    setToken(tkn);
    window.localStorage.setItem("token", tkn);
  };

  // Create User
  const createUser = async (user) => {
    try {
      const response = await fetch(`${apiUrl}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        const data = await response.json();
        storeToken(data.token);
        datauser(data);
      } else {
        console.log("User Exists");
      }
    } catch (error) {
      console.error("Error from create user frontend:", error);
    }
  };

  // Login function
  const login = async (user) => {
    try {
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        const data = await response.json();
        storeToken(data.token);
        datauser(data);
      } else {
        console.log("Invalid Credentials");
      }
    } catch (error) {
      console.error("Error from login frontend:", error);
    }
  };

  // Checking Login or not
  const isLoggedIn = !!token;

  // Admin check
  const isAdmin = userdata?.role || 0;

  // Logout function
  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
    setUserdata("");
    window.localStorage.removeItem("userdata");
  };

  // Get products
  const [displayProducts, setDisplayProducts] = useState();
  const getProducts = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/auth/get-products`, {
        method: "GET",
      });
      const data = await response.json();
      if (response.ok) {
        setDisplayProducts(data);
      }
    } catch (error) {
      console.error("Error from context get products:", error);
    }
  };

  // Get categories
  const [category, setCategory] = useState();
  const getCategory = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/auth/get-category`, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        setCategory(data.categories);
      }
    } catch (error) {
      console.error("Error from getCategory of context:", error);
    }
  };

  // Get single category
  const [singleCategory, setSingleCategory] = useState();
  const getSingleCategory = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/api/auth/single-category/${id}`, {
        method: "GET",
      });
      const data = await response.json();
      if (response.ok) {
        setSingleCategory(data);
        return data;
      }
    } catch (error) {
      console.error("Error from context single category:", error);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    setUserdata(JSON.parse(localStorage.getItem("userdata")));
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        createUser,
        logout,
        login,
        isLoggedIn,
        userdata,
        token,
        isAdmin,
        displayProducts,
        category,
        getSingleCategory,
        singleCategory,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

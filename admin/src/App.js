
import "./App.css";
import Home from "./components/Home/Home";
import { Routes, Route, useNavigate } from "react-router-dom";
import Customers from "./components/Customers/Customers";
import Login from "./components/Login/Login";
import Logout from "./components/Logout/Logout";
import Modal from "./components/Modal/Modal.jsx"
import Products from "./components/Products/Products.jsx";
import Category from "./components/Category/Category.jsx";
import { useAuth } from "./components/Context/Context.jsx";

function App() {
  const {isLoggedIn,isAdmin}= useAuth();
  const navigate = useNavigate();
  if(isLoggedIn && isAdmin===0)
    navigate("/logout")
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/" element={<Home />}>
          <Route path="/customers" element={<Customers />}/>
          <Route path="/products" element={<Products/>}/>
          <Route path="/categories" element={<Category/>}/>
        </Route>
        <Route path="/logout" element={<Logout/>}/>
        <Route path="/modal" element={<Modal/>}/>
        
      </Routes>
    </>
  );
}

export default App;

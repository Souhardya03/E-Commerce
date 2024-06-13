
import "./App.css";
import Home from "./components/Home/Home";
import { Routes, Route } from "react-router-dom";
import Customers from "./components/Customers/Customers";
import Login from "./components/Login/Login";
import Logout from "./components/Logout/Logout";
import Modal from "./components/Modal/Modal.jsx"
import Products from "./components/Products/Products.jsx";
import Category from "./components/Category/Category.jsx";

function App() {
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

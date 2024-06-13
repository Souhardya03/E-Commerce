import "./App.css";
import Cart from "./components/Cart/Cart";
import Login from "./components/Login/Login";
import { Routes, Route } from "react-router-dom";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Footer from "./components/Footer/Footer";
import AllProducts from "./components/AllProducts/AllProducts";
import Hero from "./components/HomePage/Hero";
import NavBar from "./components/NavBar/NavBar";
import SearchPage from "./components/Search/SearchPage";
import Logout from "./components/Logout/Logout";
import TestPage from "./components/TestPage/TestPage";
function App() {
  return (
    <>
    <NavBar/>
      <Routes>
        <Route path="/" element={<Hero />}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="product-details/:title">
          <Route path=":id" element={<ProductDetails />}></Route>
        </Route>
        <Route path="/allproducts" element={<AllProducts />} />
        <Route path="/search" element={<SearchPage/>}/>
        <Route path="/logout" element={<Logout/>}/>
        <Route path="/testpage" element={<TestPage/>}/>
      </Routes>
      <Footer />
    </>
  );
}

export default App;

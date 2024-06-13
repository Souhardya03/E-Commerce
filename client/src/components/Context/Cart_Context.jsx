import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "./Cart_reducer";
import { toast } from "react-toastify";

const CartContext = createContext();
const localCartData = () => {
  const data = localStorage.getItem("cart");
  if (data) {
    return JSON.parse(data);
  }
  return [];
};
const initialState = {
  cart: localCartData(),
  total_item: "",
  total_amount: "",
  shipping_fee: 500,
};
const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const addToCart = (item) => {
    if (state.cart.find((i) => i.id === item._id)) {
      dispatch({ type: "ADD_TO_Existing_CART", payload: item._id });
      toast.success("Added To Cart", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      dispatch({ type: "ADD_TO_CART", payload: { item } });
      toast.success("Added To Cart", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };
  const removeFromCart = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
    toast.success("Removed From Cart", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  const removeAllItems = ()=>{
    dispatch({type: "Remove_All_Items"})
  }
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <CartContext.Provider value={{ ...state, addToCart, removeFromCart, removeAllItems }}>
      {children}
    </CartContext.Provider>
  );
};
const useCartContext = () => {
  return useContext(CartContext);
};
export { CartProvider, useCartContext };

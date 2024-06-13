const Cart_reducer = (state, action) => {
  const amount = 1;
  if (action.type === "ADD_TO_CART") {
    let { item } = action.payload;
    let CartItems = {
      id: item._id,
      amount,
      title: item.name,
      price: amount * item.finalprice,
      info: item?.info,
      image: item.photo[0],
    };
    return {
      ...state,
      cart: [...state.cart, CartItems],
    };
  }
  if (action.type === "REMOVE_FROM_CART") {
    return {
      ...state,
      cart: state.cart.filter((x) => x.id !== action.payload),
    };
  }
  if (action.type === "ADD_TO_Existing_CART") {
    let updatedProduct = state.cart.map((currelement) => {
      if (currelement.id === action.payload) {
        let newamount = currelement.amount + amount;
        console.log(newamount);
        return {
          ...currelement,
          amount: newamount,
        };
      } else {
        return currelement;
      }
    });
    return {
      ...state,
      cart: updatedProduct,
    };
  }
  if(action.type === "Remove_All_Items"){
    return{
        ...state,
        cart: []
    }
  }

  return state;
};

export default Cart_reducer;

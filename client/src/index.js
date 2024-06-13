import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import 'react-toastify/dist/ReactToastify.css';
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./components/Context/Cart_Context";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./components/Context/Auth_context";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>

  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <App />
        <ToastContainer/>
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
  </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from "react";
import './LoginStyle.css'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/Context";

const Login = () => {
  const navigate = useNavigate()
  const {createUser,login} = useAuth();
  const [user, setuser] = useState({
    name:"",
    email:"",
    password:"",
    phone:"",
    address:""
})
const [logindata, setlogindata] = useState({
  email:"",
  password:""
})
const  handleInputChange= (e) =>{
  const {name, value} = e.target;
   setuser({...user ,[name]:value});
}
const handleLoginChange = (e)=>{
  const {name, value} = e.target;
   setlogindata({...logindata ,[name]:value});
}
const  submitHandler=(e)=>{
  e.preventDefault();
  // console.log(user);
  createUser(user);
  // window.location.replace("/testpage")
}
const handleLogin = (e)=>{
  e.preventDefault();
  login(logindata)
  navigate("/customers")
}
  return (
    <div className="login">
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      <div className="section">
        <div className="container">
          <div className="row full-height justify-content-center">
            <div className="col-12 text-center align-self-center py-5">
              <div className="section pb-5 pt-5 pt-sm-2 text-center">
                <h6 className="mb-0 pb-3">
                  <span>Log In </span>
                  <span>Sign Up</span>
                </h6>
                <input
                  className="checkbox"
                  type="checkbox"
                  id="reg-log"
                  name="reg-log"
                />
                <label htmlFor="reg-log"></label>
                <div className="card-3d-wrap mx-auto">
                  <div className="card-3d-wrapper">
                    <form onSubmit={handleLogin} className="card-front">
                      <div className="center-wrap">
                        <div className="section text-center">
                          <h4 className="mb-4 text-xl pb-3 uppercase">Login</h4>
                          <div className="form-group">
                            <input
                              type="email"
                              name="email"
                              value={logindata.email}
                              onChange={handleLoginChange}
                              className="form-style"
                              placeholder="Email"
                            />
                            <i className="input-icon uil uil-at"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="password"
                              name="password"
                              value={logindata.password}
                              onChange={handleLoginChange}
                              className="form-style"
                              placeholder="Password"
                            />
                            <i className="input-icon uil uil-lock-alt"></i>
                          </div>
                          <button
                            onSubmit={handleLogin}
                            
                            className="btn mt-4"
                          >
                            Login
                          </button>
                          <p className="mb-0 mt-4 text-center">
                            <a href="https://www.web-leb.com/code" className="link">
                              Forgot your password?
                            </a>
                          </p>
                        </div>
                      </div>
                    </form>
                    <form onSubmit={submitHandler} className="card-back">
                      <div className="center-wrap">
                        <div className="section text-center">
                          <h4 className="mb-3 pb-3 uppercase">Register</h4>
                          <div className="form-group">
                            <input
                              type="text"
                              name="name"
                              onChange={handleInputChange}
                              value={user.name}
                              className="form-style"
                              placeholder="Full Name"
                            />
                            <i className="input-icon uil uil-user"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="email"
                              name="email"
                              onChange={handleInputChange}
                              value={user.email}
                              className="form-style"
                              placeholder="Email"
                            />
                            <i className="input-icon uil uil-at"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="password"
                              name="password"
                              onChange={handleInputChange}
                              value={user.password}
                              className="form-style"
                              placeholder="Password"
                            />
                            <i className="input-icon uil uil-lock-alt"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="tel"
                              name="phone"
                              onChange={handleInputChange}
                              value={user.phone}
                              className="form-style"
                              placeholder="Phone Number"
                            />
                            <i className="input-icon uil uil-phone"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="text"
                              name="address"
                              onChange={handleInputChange}
                              value={user.address}
                              className="form-style"
                              placeholder="Address"
                            />
                            <i className="input-icon uil uil-location-point"></i>
                          </div>
                          <button
                            onClick={submitHandler}
                            className="btn mt-4"
                          >
                            Register
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

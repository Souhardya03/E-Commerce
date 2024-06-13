const UserModel = require("../models/userModel.js");
const authHelper = require("../helpers/authHelper.js");
const jwt = require("jsonwebtoken");
// const User = require("../models/userModel.js");
const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, role } = req.body;
    //user existance
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    //new user create
    const hashedpassword = await authHelper.hashPassword(password);
    const newUser = await UserModel.create({
      name,
      email,
      password: hashedpassword,
      phone,
      address,
      role,
    });
    const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "365d",
    });
    return res.status(200).json({
      message: "Regitration Successfull",
      user: {
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        address: newUser.address,
        id: newUser._id,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    console.log({ message: "error from register controller" });
  }
};
//Login Controller

const LoginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email not found" });
    }
    const passMatch = await authHelper.comparePassword(password, user.password);
    if (!passMatch) {
      return res.status(400).json({ message: "Password mismatched" });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "365d",
    });
    return res.status(200).json({
      message: "Login Successfull",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        id: user._id,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log("Error from Login Controller");
    console.log(error);
  }
};

//Get All Users
const displayAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    console.log("Error from Display All users");
  }
};

//Delete User
const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await UserModel.deleteOne({ _id: id });
    return res.status(200).json({ message: "User Deleted Successfully" });
  } catch (error) {
    console.log(error);
    console.log("Error from delete user");
  }
};

//update user
const updateuser = async(req,res)=>{
  try {
    const id = req.params.id;
    const data = req.body;
    const updatedata = await UserModel.updateOne({ _id: id }, { $set: data });
    return res.status(200).json({message:"User Updated"})
  } catch (error) {
    console.log(error);
    console.log("Error from update user");
  }
}

//Single User
const  singleUser = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await UserModel.findOne({name:id}).select("-password");
    return res.status(200).json(data);    
  } catch (error) {
    console.log("Error from single user");
    console.log(error);
  }
}


module.exports = {
  registerController,
  LoginController,
  displayAllUsers,
  deleteUser,
  updateuser,
  singleUser
};

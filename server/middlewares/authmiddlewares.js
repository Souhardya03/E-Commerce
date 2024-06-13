const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel.js");
const requireSignIn = async (req, res, next) => {
  try {
    const decode = await jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode
    next();
  } catch (error) {
    console.log("Error from requireSignIn");
    console.log(error);
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(400).json({ message: "BSDK you are not admin" });
    }
    else
    next();
  } catch (error) {
    console.log("Error from isAdmin");
    console.log(error);
  }
};
module.exports = { isAdmin, requireSignIn };

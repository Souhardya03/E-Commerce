const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel.js");

const requireSignIn = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: "Authorization header is missing" });
    }

    const token = req.headers.authorization;
    const decode = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    console.log("Error from requireSignIn:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== 1) {
      return res.status(403).json({ message: "You are not authorized to perform this action" });
    }

    next();
  } catch (error) {
    console.log("Error from isAdmin:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { isAdmin, requireSignIn };

const express = require("express")
const authMiddlewares = require("../middlewares/authmiddlewares.js")
const router = express.Router();
const authController = require("../controllers/authController.js")
router.post("/register",authController.registerController);
router.post("/login",authController.LoginController);
router.get("/getallusers",authMiddlewares.requireSignIn,authMiddlewares.isAdmin,authController.displayAllUsers);
router.delete("/deleteuser/:id",authMiddlewares.requireSignIn,authMiddlewares.isAdmin,authController.deleteUser);
router.patch("/updateuser/:id",authController.updateuser);
router.get("/getsingleuser/:id",authController.singleUser);
module.exports = router;
const express = require("express")
const router = express.Router();
const authMiddlewares =require( "../middlewares/authmiddlewares.js");
const categoryController = require( "../controllers/categoryController.js");
router.post("/create-category",authMiddlewares.requireSignIn,authMiddlewares.isAdmin,categoryController.createCategory)
router.get("/get-category",categoryController.getAllCategories)
router.delete("/delete-category/:id",authMiddlewares.requireSignIn,authMiddlewares.isAdmin,categoryController.deleteCategory)
router.get("/single-category/:id",categoryController.getSingleCategory)
module.exports = router
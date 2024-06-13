const express = require("express");
const router = express.Router();
const authMiddlewares = require("../middlewares/authmiddlewares.js");
const productController = require("../controllers/productController.js");

router.post(
  "/create-product",
  authMiddlewares.requireSignIn,
  authMiddlewares.isAdmin,
  productController.createProduct
);
router.get(
  "/get-products",
  productController.getAllProducts
);
router.delete(
  "/delete-product/:id",
  authMiddlewares.requireSignIn,
  authMiddlewares.isAdmin,
  productController.deleteProduct
);

module.exports = router;

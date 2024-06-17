const express = require("express")
const router = express.Router();
const authMiddlewares = require("../middlewares/authmiddlewares");
const OrderController = require("../controllers/orderController");

router.post("/create-order",OrderController.createOrder);
router.get("/display-orders",authMiddlewares.requireSignIn,OrderController.displayorder);
router.get("/single-order/:id",authMiddlewares.requireSignIn,OrderController.getSingleOrder);
router.delete("/delete-order/:id",authMiddlewares.requireSignIn,OrderController.deleteOrder)
module.exports = router
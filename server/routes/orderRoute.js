const express = require("express")
const router = express.Router();
const authMiddlewares = require("../middlewares/authmiddlewares");
const OrderController = require("../controllers/orderController");

router.post("/create-order",OrderController.createOrder);
router.get("/display-orders",authMiddlewares.requireSignIn,authMiddlewares.isAdmin,OrderController.displayorder)
module.exports = router
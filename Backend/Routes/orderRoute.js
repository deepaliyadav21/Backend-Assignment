
const express = require("express");
const router = express.Router();

const productController = require('../Controllers/orderController');


router.post("/createAgent",productController.addAgent);
router.post("/orderItem",productController.orderItem);
router.get("/pendingOrder/:id",productController.getPendingOrders);
router.get("/approveOrder/:id",productController.approveOrder);
module.exports  = router


const express = require("express");
const router = express.Router();

const orderController = require('../Controllers/orderController');


router.post("/createAgent",orderController.addAgent);
router.post("/orderItem",orderController.orderItem);
router.get("/pendingOrder/:id",orderController.getPendingOrders);
router.get("/approveOrder/:id",orderController.approveOrder);
module.exports  = router

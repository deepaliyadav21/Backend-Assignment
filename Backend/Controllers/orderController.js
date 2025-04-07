const Agent = require("../Models/DeliveryAgent");
const Order = require("../Models/Order");

// Add Delivery Agent
exports.addAgent = async (req, res) => {
  try {
    const newAgent = new Agent(req.body);
    const savedAgent = await newAgent.save();
    res.status(201).json(savedAgent);
  } catch (error) {
    console.error("Error adding agent:", error);
    res.status(500).json({ message: "Failed to add agent", error });
  }
};

// Place Order
exports.orderItem = async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Failed to place order", error });
  }
};

// Get Pending Orders for a User
exports.getPendingOrders = async (req, res) => {
  try {
    const { id } = req.params;
    const pendingOrders = await Order.find({ userId: id, status: "pending" });

    res.status(200).json(pendingOrders);
  } catch (error) {
    console.error("Error fetching pending orders:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Approve Order & Assign Agent
exports.approveOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const orderDoc = await Order.findOne({ _id: id, status: "pending" });
    if (!orderDoc) {
      return res.status(404).json({ message: "Order not found or already processed" });
    }

    // Update order status
    orderDoc.status = "out for delivery";
    await orderDoc.save();

    // Find available agent
    const allotedAgent = await Agent.findOne({ available: true });
    if (!allotedAgent) {
      return res.status(503).json({ message: "No available delivery agent at the moment" });
    }

    // Update agent availability
    allotedAgent.available = false;
    const agentID = allotedAgent._id;
    await allotedAgent.save();

    // Simulate delivery after 10 seconds
    setTimeout(async () => {
      try {
        const deliveryOrder = await Order.findOne({ _id: id, status: "out for delivery" });
        if (deliveryOrder) {
          deliveryOrder.status = "Delivered";
          await deliveryOrder.save();
          console.log("Order delivered:", deliveryOrder);
        }

        const deliveryAgent = await Agent.findById(agentID);
        if (deliveryAgent) {
          deliveryAgent.available = true;
          await deliveryAgent.save();
          console.log("Agent available again:", deliveryAgent);
        }
      } catch (error) {
        console.error("Error during delivery update:", error.message);
      }
    }, 10000);

    res.status(200).json({
      message: "Order approved and out for delivery",
      order: orderDoc,
      agent: allotedAgent
    });
  } catch (error) {
    console.error("Error approving order:", error.message);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// Rate Order and Delivery
exports.rateOrder = async (req, res) => {
  try {
    const { orderId, orderRating, deliveryRating } = req.body;

    if (!orderId || orderRating == null || deliveryRating == null) {
      return res.status(400).json({ message: "orderId, orderRating, and deliveryRating are required" });
    }

    if (
      typeof orderRating !== "number" || orderRating < 1 || orderRating > 5 ||
      typeof deliveryRating !== "number" || deliveryRating < 1 || deliveryRating > 5
    ) {
      return res.status(400).json({ message: "Ratings must be numbers between 1 and 5" });
    }

    const orderDoc = await Order.findById(orderId);
    if (!orderDoc) {
      return res.status(404).json({ message: "Order not found" });
    }

    orderDoc.orderRating = orderRating;
    orderDoc.deliveryRating = deliveryRating;
    await orderDoc.save();

    res.status(200).json({ message: "Ratings updated successfully", order: orderDoc });
  } catch (error) {
    console.error("Error rating order:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

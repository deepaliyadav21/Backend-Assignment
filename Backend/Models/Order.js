const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    name:String,
    userId:String,
    restaurantId:String,
    orderRating:Number,
    DeliveryRating:Number,
    status:String,
    DeliverBy:String
})

module.exports = mongoose.model("order",orderSchema);
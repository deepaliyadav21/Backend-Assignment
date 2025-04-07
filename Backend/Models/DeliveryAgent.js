const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
    name:String,
    ownerId:String,
    available:Boolean,
})

module.exports = mongoose.model("agent",agentSchema);
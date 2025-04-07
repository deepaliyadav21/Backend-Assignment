const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:String,
    userId:String,
    imageURL:String,
    status:Boolean,
    recipes: [
        {
          recipeName: String,
          price: Number
        }
      ]
})

module.exports = mongoose.model("products",productSchema);
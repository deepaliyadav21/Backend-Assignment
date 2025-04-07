const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.mongodbURL).then(()=>{
    console.log("connected succesfully")
})
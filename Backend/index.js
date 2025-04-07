const express = require("express");
const app = express();

require("./Utils/db");

const cors = require("cors");

//routes
const userRoutes = require("./Routes/userRoute");
const restaurantRoutes = require("./Routes/restaurantRoutes");
const orderRoutes = require("./Routes/orderRoutes");

const corsOptions = { origin: "*", methods: ["POST", "GET","PUT","DELETE"], credentials: true }

// apis
app.use(cors(corsOptions));
app.use(express.json(corsOptions));
app.use("",userRoutes);
app.use("",restaurantRoutes);
app.use("",orderRoutes);

app.listen(5000);

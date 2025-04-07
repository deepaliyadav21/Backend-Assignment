const express = require("express");
const app = express();

require("./Utils/db");

const cors = require("cors");

//routes
const userRoutes = require("./Routes/userRoute");
const productRoutes = require("./Routes/productRoutes");

const corsOptions = { origin: "*", methods: ["POST", "GET","PUT","DELETE"], credentials: true }

// apis
app.use(cors(corsOptions));
app.use(express.json(corsOptions));
app.use("",userRoutes);
app.use("",productRoutes);

app.listen(5000);

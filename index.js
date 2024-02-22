const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");

// middlewares
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// database connection
require("./database/connection");


// routes
const imagesRoutes = require("./routes/images");
const parentReferenceRoute = require("./routes/parentReferenceRoutes");
app.use("/api", imagesRoutes);
app.use("/api/pr", parentReferenceRoute);

// server
app.listen(process.env.PORT , ()=>{
    console.log(`server running at http://${process.env.PORT}/`)
})


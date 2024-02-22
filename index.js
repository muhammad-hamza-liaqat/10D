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

// routes
const imagesRoutes = require("./routes/images");
app.use("/api", imagesRoutes);

app.listen(process.env.PORT , ()=>{
    console.log(`server running at http://${process.env.PORT}/`)
})


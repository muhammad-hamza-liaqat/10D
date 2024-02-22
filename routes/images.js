const express = require("express");
const { addData } = require("../controller/imagesController");
const { upload } = require("../services/multer/multer");
const imagesRoutes = express.Router();


imagesRoutes.route("/upload-data").post(upload.array('files',10),addData);

module.exports = imagesRoutes

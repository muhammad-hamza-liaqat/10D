const express = require("express");
const { addData, uploadToAws } = require("../controller/imagesController");
const { upload } = require("../services/multer/multer");
const { uploadImagetoS3 } = require("../services/multer s3/uploadImage");
const imagesRoutes = express.Router();


imagesRoutes.route("/upload-data").post(upload.array('files',10),addData);
// imagesRoutes.route("/upload-awss3").post(upload.array("files",10),uploadToAws);
imagesRoutes.route("/s3").post(uploadImagetoS3.array("files",10), uploadToAws)
module.exports = imagesRoutes

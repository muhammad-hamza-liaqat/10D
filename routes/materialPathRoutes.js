const express = require("express");
const { findSubTree } = require("../controller/materialPathController");

const materialPathRoutes = express.Router();

materialPathRoutes.route("/find-subTree/:id").get(findSubTree)

module.exports = materialPathRoutes
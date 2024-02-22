const express = require("express");
const {  findParent, subTree } = require("../controller/parentReference");
const parentReferenceRoute = express.Router();


parentReferenceRoute.route("/find-parent/:id").get(findParent)
parentReferenceRoute.route("/find-subTree/:id").get(subTree)

module.exports = parentReferenceRoute
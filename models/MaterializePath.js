const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define schema
const categorySchema = new Schema({
  _id: String,
  path: String
});
console.log("materializePath model sync");
const materialPathModel = mongoose.model('MaterialPath', categorySchema);

module.exports = materialPathModel;

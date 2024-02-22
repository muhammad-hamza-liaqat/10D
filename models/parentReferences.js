const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  _id: String,
  parent: { type: String, default: null }
});

const parentReferenceModel = mongoose.model('parentReference', categorySchema);

module.exports = parentReferenceModel;

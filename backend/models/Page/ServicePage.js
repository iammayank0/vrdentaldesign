const mongoose = require('mongoose');

const SingleServiceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true }
});


const SingleService = mongoose.model('SingleService', SingleServiceSchema);

module.exports = { SingleService };
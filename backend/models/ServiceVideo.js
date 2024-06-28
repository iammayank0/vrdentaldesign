const mongoose = require('mongoose');

const ServiceVideoSchema = new mongoose.Schema({
    Video: { type: String, required: true }
  });


const ServiceVideo = mongoose.model('ServiceVideo', ServiceVideoSchema);

module.exports = { ServiceVideo };
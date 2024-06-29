const mongoose = require('mongoose');

const MapSchema = new mongoose.Schema({
    Video: { type: String, required: true }
  });


const MapVideo = mongoose.model('MapVideo', MapSchema);

module.exports = { MapVideo };
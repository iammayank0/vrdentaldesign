const mongoose = require('mongoose');

const BannerVideoSchema = new mongoose.Schema({
    Video: { type: String, required: true }
  });


const BannerVideo = mongoose.model('BannerVideo', BannerVideoSchema);

module.exports = { BannerVideo };
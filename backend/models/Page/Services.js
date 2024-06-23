const mongoose = require('mongoose');

const ServicePageBGSchema = new mongoose.Schema({
  BackgroundImage: { type: String, required: true }
});

  const ServiceBG = mongoose.model('ServiceBG', ServicePageBGSchema);
  
  module.exports = { ServiceBG };
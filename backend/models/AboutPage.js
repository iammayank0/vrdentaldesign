const mongoose = require('mongoose');

const BackgroundSchema = new mongoose.Schema({
    BackgroundImage: { type: String, required: true }
});

const ContentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true }
});

const AboutUsContentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    heading: { type: String, required: true },
    description: { type: String, required: true }
});

  const BackgroundContent = mongoose.model('BackgroundContent', BackgroundSchema);
  const AboutContent = mongoose.model('AboutContent', ContentSchema);
  const AboutUsContent = mongoose.model('AboutUsContent', AboutUsContentSchema);
  
  module.exports = { BackgroundContent, AboutContent, AboutUsContent };
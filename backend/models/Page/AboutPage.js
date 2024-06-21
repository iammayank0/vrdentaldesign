const mongoose = require('mongoose');

const BackgroundSchema = new mongoose.Schema({
    BackgroundImage: { type: String, required: true }
});

const ContentSchema = new mongoose.Schema({
    title1: { type: String, required: true },
    description1: { type: String, required: true },
    title2: { type: String, required: true },
    description2: { type: String, required: true }
});

const AboutUsContentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    heading: { type: String, required: true },
    description: { type: String, required: true }
});

  const BackgroundContent = mongoose.model('BackgroundContent', BackgroundSchema);
  const AboutPageContent = mongoose.model('AboutPageContent', ContentSchema);
  const AboutUsContent = mongoose.model('AboutUsContent', AboutUsContentSchema);
  
  module.exports = { BackgroundContent, AboutPageContent, AboutUsContent };
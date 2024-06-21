const mongoose = require('mongoose');

const GalleryBgSchema = new mongoose.Schema({
    BackgroundImage: { type: String, required: true }
  });

const GallerySchema = new mongoose.Schema({
    GalleryImage: { type: String, required: true }
});

const GalleryBgContent = mongoose.model('GalleryBgContent', GalleryBgSchema);
const GalleryContent = mongoose.model('GalleryContent', GallerySchema);

module.exports = { GalleryContent, GalleryBgContent };
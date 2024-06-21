const express = require('express');
const multer = require('multer');
const { GalleryContent, GalleryBgContent } = require('../models/GalleryImages');
const cloudinary = require('../config/cloudinaryConfig');
const fs = require('fs');

const router = express.Router();

const upload = multer({
  dest: 'uploads/',
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) { 
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  },
});

// FETCH all gallery backgrounds
router.get('/gallerybg', async (req, res) => {
    try {
      const galleryBgs = await GalleryBgContent.find();
      res.status(200).json(galleryBgs);
    } catch (error) {
      console.error('Failed to fetch gallery backgrounds:', error);
      res.status(500).json({ message: 'Failed to fetch gallery backgrounds', error: error.message });
    }
  });
  
  // FETCH gallery background by ID
  router.get('/gallerybg/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const galleryBg = await GalleryBgContent.findById(id);
  
      if (!galleryBg) {
        return res.status(404).json({ message: 'Gallery BG not found' });
      }
  
      res.status(200).json(galleryBg);
    } catch (error) {
      console.error('Failed to fetch gallery background:', error);
      res.status(500).json({ message: 'Failed to fetch gallery background', error: error.message });
    }
  });
  
  // FETCH all gallery images
  router.get('/galleryimg', async (req, res) => {
    try {
      const galleryImgs = await GalleryContent.find();
      res.status(200).json(galleryImgs);
    } catch (error) {
      console.error('Failed to fetch gallery images:', error);
      res.status(500).json({ message: 'Failed to fetch gallery images', error: error.message });
    }
  });
  
  // FETCH gallery image by ID
  router.get('/galleryimg/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const galleryImg = await GalleryContent.findById(id);
  
      if (!galleryImg) {
        return res.status(404).json({ message: 'Gallery image not found' });
      }
  
      res.status(200).json(galleryImg);
    } catch (error) {
      console.error('Failed to fetch gallery image:', error);
      res.status(500).json({ message: 'Failed to fetch gallery image', error: error.message });
    }
  });

// ADD gallery Background
router.post('/gallerybg/upload', upload.single('BackgroundImage'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Image file must be uploaded' });
        }

        // Upload image to Cloudinary
        const uploadImage = async (filePath) => {
            const result = await cloudinary.uploader.upload(filePath, {
                folder: 'Gallery-images', 
            });
            await fs.unlinkSync(filePath); 
            return result.secure_url; 
        };


        const BackgroundImageUrl = await uploadImage(req.file.path);


        const newGalleryBg = new GalleryBgContent({
            BackgroundImage: BackgroundImageUrl,
        });


        await newGalleryBg.save();


        res.status(201).json(newGalleryBg);
    } catch (error) {
        console.error('Failed to upload image and create Gallery BG:', error);
        res.status(500).json({ message: 'Failed to upload image and create Gallery BG', error: error.message });
    }
});

// ADD gallery image
router.post('/galleryimg/upload', upload.single('GalleryImage'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Image file must be uploaded' });
        }

        // Upload image to Cloudinary
        const uploadImage = async (filePath) => {
            const result = await cloudinary.uploader.upload(filePath, {
                folder: 'Gallery-images', 
            });
            await fs.unlinkSync(filePath); 
            return result.secure_url; 
        };


        const GalleryImageUrl = await uploadImage(req.file.path);


        const newGallery = new GalleryContent({
            GalleryImage: GalleryImageUrl,
        });


        await newGallery.save();


        res.status(201).json(newGallery);
    } catch (error) {
        console.error('Failed to upload image and create Gallery container:', error);
        res.status(500).json({ message: 'Failed to upload image and create Gallery container', error: error.message });
    }
});

// EDIT gallery Background
router.put('/gallerybg/:id', upload.fields([{ name: 'BackgroundImage', maxCount: 1 }]), async (req, res) => {
    const { id } = req.params;
    const updates = {};
  
    try {
      // Handle image upload if a new image is provided
      if (req.files && req.files['BackgroundImage']) {
        const imageResult = await cloudinary.uploader.upload(req.files['BackgroundImage'][0].path, {
          folder: 'Gallery-images',
        });
        updates.BackgroundImage = imageResult.secure_url;
        fs.unlinkSync(req.files['BackgroundImage'][0].path); // Remove the file from local uploads folder
      }
  
      const updatedGalleryBg = await GalleryBgContent.findByIdAndUpdate(id, updates, { new: true });
  
      if (!updatedGalleryBg) {
        return res.status(404).json({ message: 'Gallery BG not found' });
      }
  
      res.json(updatedGalleryBg);
    } catch (error) {
      console.error('Error updating gallery background:', error);
      res.status(500).json({ message: 'Error updating gallery background', error: error.message });
    }
  });
  
  // EDIT gallery image
  router.put('/galleryimg/:id', upload.fields([{ name: 'GalleryImage', maxCount: 1 }]), async (req, res) => {
    const { id } = req.params;
    const updates = {};
  
    try {
      // Handle image upload if a new image is provided
      if (req.files && req.files['GalleryImage']) {
        const imageResult = await cloudinary.uploader.upload(req.files['GalleryImage'][0].path, {
          folder: 'Gallery-images',
        });
        updates.GalleryImage = imageResult.secure_url;
        fs.unlinkSync(req.files['GalleryImage'][0].path); // Remove the file from local uploads folder
      }
  
      const updatedGallery = await GalleryContent.findByIdAndUpdate(id, updates, { new: true });
  
      if (!updatedGallery) {
        return res.status(404).json({ message: 'Gallery image not found' });
      }
  
      res.json(updatedGallery);
    } catch (error) {
      console.error('Error updating gallery image:', error);
      res.status(500).json({ message: 'Error updating gallery image', error: error.message });
    }
  });

module.exports = router;

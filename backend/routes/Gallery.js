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

module.exports = router;

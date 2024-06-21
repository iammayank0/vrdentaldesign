const express = require('express');
const multer = require('multer');
const { BackgroundContent, AboutPageContent, AboutUsContent } = require('../../models/Page/AboutPage');
const cloudinary = require('../../Config/CloudinaryConfig');
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
router.post('/aboutbg/upload', upload.single('BackgroundImage'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Image file must be uploaded' });
        }

        // Upload image to Cloudinary
        const uploadImage = async (filePath) => {
            const result = await cloudinary.uploader.upload(filePath, {
                folder: 'page-title-bg', 
            });
            await fs.unlinkSync(filePath); 
            return result.secure_url; 
        };


        const BackgroundImageUrl = await uploadImage(req.file.path);


        const newAboutBg = new BackgroundContent({
            BackgroundImage: BackgroundImageUrl,
        });


        await newAboutBg.save();


        res.status(201).json(newAboutBg);
    } catch (error) {
        console.error('Failed to upload image and create About BG:', error);
        res.status(500).json({ message: 'Failed to upload image and create About BG', error: error.message });
    }
});

// Create Blog Text
router.post('/about-page/content', async (req, res) => {
    try {
      const newBlogText = new BlogText({
        title: req.body.title,
        heading: req.body.heading,
        description: req.body.description
      });
  
      // Save to database
      await newBlogText.save();
  
      res.status(201).json(newBlogText);
    } catch (error) {
      console.error('Failed to create blog text:', error);
      res.status(500).json({ message: 'Failed to create blog text', error: error.message });
    }
  });

// EDIT gallery Background
router.put('/aboutbg/:id', upload.fields([{ name: 'BackgroundImage', maxCount: 1 }]), async (req, res) => {
    const { id } = req.params;
    const updates = {};
  
    try {
      // Handle image upload if a new image is provided
      if (req.files && req.files['BackgroundImage']) {
        const imageResult = await cloudinary.uploader.upload(req.files['BackgroundImage'][0].path, {
          folder: 'page-title-bg',
        });
        updates.BackgroundImage = imageResult.secure_url;
        fs.unlinkSync(req.files['BackgroundImage'][0].path); 
      }
  
      const updatedAboutBg = await BackgroundContent.findByIdAndUpdate(id, updates, { new: true });
  
      if (!updatedAboutBg) {
        return res.status(404).json({ message: 'About BG not found' });
      }
  
      res.json(updatedAboutBg);
    } catch (error) {
      console.error('Error updating about background:', error);
      res.status(500).json({ message: 'Error updating about background', error: error.message });
    }
  });

module.exports = router;
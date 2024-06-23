const express = require('express');
const multer = require('multer');
const { ServiceBG } = require('../../models/Page/Services');
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

// FETCH all gallery backgrounds
router.get('/servicebg', async (req, res) => {
    try {
      const servicebg = await ServiceBG.find();
      res.status(200).json(servicebg);
    } catch (error) {
      console.error('Failed to fetch service background:', error);
      res.status(500).json({ message: 'Failed to fetch service background', error: error.message });
    }
  });

// ADD gallery Background
router.post('/servicebg/upload', upload.single('BackgroundImage'), async (req, res) => {
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


        const newServiceBg = new ServiceBG({
            BackgroundImage: BackgroundImageUrl,
        });


        await newServiceBg.save();


        res.status(201).json(newServiceBg);
    } catch (error) {
        console.error('Failed to upload image and create service BG:', error);
        res.status(500).json({ message: 'Failed to upload image and create service BG', error: error.message });
    }
});

// EDIT gallery Background
router.put('/servicebg/:id', upload.fields([{ name: 'BackgroundImage', maxCount: 1 }]), async (req, res) => {
    const { id } = req.params;
    const updates = {};
  
    try {
      // Handle image upload if a new image is provided
      if (req.files && req.files['BackgroundImage']) {
        const imageResult = await cloudinary.uploader.upload(req.files['BackgroundImage'][0].path, {
          folder: 'page-title-bg',
        });
        updates.BackgroundImage = imageResult.secure_url;
        fs.unlinkSync(req.files['BackgroundImage'][0].path); // Remove the file from local uploads folder
      }
  
      const updatedServiceBg = await ServiceBG.findByIdAndUpdate(id, updates, { new: true });
  
      if (!updatedServiceBg) {
        return res.status(404).json({ message: 'Service BG not found' });
      }
  
      res.json(updatedServiceBg);
    } catch (error) {
      console.error('Error updating service background:', error);
      res.status(500).json({ message: 'Error updating service background', error: error.message });
    }
  });

  module.exports = router;
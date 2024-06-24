const express = require('express');
const multer = require('multer');
const fs = require('fs');
const cloudinary = require('../../Config/CloudinaryConfig');
const { SingleService } = require('../../models/Page/ServicePage');



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

// Fetch All Services
router.get('/single-services', async (req, res) => {
  try {
    const services = await SingleService.find();
    res.status(200).json(services);
  } catch (error) {
    console.error('Failed to fetch services:', error);
    res.status(500).json({ message: 'Failed to fetch services', error: error.message });
  }
});

// Create Single Service
router.post('/single-services', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Image file must be uploaded' });
  }

  try {
    // Upload image to Cloudinary
    const imageResult = await cloudinary.uploader.upload(req.file.path, {
      folder: 'services',
    });

    // Create new single service
    const newService = new SingleService({
      title: req.body.title,
      image: imageResult.secure_url,
      description: req.body.description
    });

    // Save to database
    await newService.save();
    fs.unlinkSync(req.file.path); // Remove the file from local uploads folder

    res.status(201).json(newService);
  } catch (error) {
    console.error('Failed to upload image and create single service:', error);
    res.status(500).json({ message: 'Failed to upload image and create single service', error: error.message });
  }
});

// Edit Single Service
router.put('/single-services/:id', upload.single('image'), async (req, res) => {
  const { id } = req.params;

  try {
    const service = await SingleService.findById(id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    // If a new image is uploaded, upload it to Cloudinary
    if (req.file) {
      const imageResult = await cloudinary.uploader.upload(req.file.path, {
        folder: 'services',
      });
      service.image = imageResult.secure_url;
      fs.unlinkSync(req.file.path); // Remove the file from local uploads folder
    }

    // Update the other fields
    service.title = req.body.title || service.title;
    service.description = req.body.description || service.description;

    // Save the updated service to the database
    await service.save();

    res.status(200).json(service);
  } catch (error) {
    console.error('Failed to update single service:', error);
    res.status(500).json({ message: 'Failed to update single service', error: error.message });
  }
});




module.exports = router;

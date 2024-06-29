const express = require('express');
const multer = require('multer');
const { ServiceVideo } = require('../models/ServiceVideo');
const cloudinary = require('../Config/CloudinaryConfig');
const fs = require('fs');

const router = express.Router();

const upload = multer({
    dest: 'uploads/',
    fileFilter: (req, file, cb) => {
      if (file.mimetype.startsWith('video/')) {
        cb(null, true);
      } else {
        cb(new Error('Only video files are allowed!'), false);
      }
    },
  });
  

  // Fetch all Service Videos
router.get('/service-video', async (req, res) => {
    try {
      const serviceVideos = await ServiceVideo.find();
      res.status(200).json(serviceVideos);
    } catch (error) {
      console.error('Failed to fetch service videos:', error);
      res.status(500).json({ message: 'Failed to fetch service videos', error: error.message });
    }
  });

// Add Service Video
router.post('/service-video', upload.single('Video'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'Video file must be uploaded' });
      }
  
      
      const uploadVideo = async (filePath) => {
        const result = await cloudinary.uploader.upload(filePath, {
          resource_type: 'video', 
          folder: 'Service-video',
        });
        await fs.unlinkSync(filePath); 
        return result.secure_url; 
      };
  
      const videoUrl = await uploadVideo(req.file.path);
  
      const newServiceVideo = new ServiceVideo({
        Video: videoUrl,
      });
  
      await newServiceVideo.save();
  
      res.status(201).json(newServiceVideo);
    } catch (error) {
      console.error('Failed to upload video and create service video:', error);
      res.status(500).json({ message: 'Failed to upload video and create service video', error: error.message });
    }
  });

  // Edit a Service Video
router.put('/service-video/:id', upload.single('Video'), async (req, res) => {
    try {
      const { id } = req.params;
      
      if (!req.file) {
        return res.status(400).json({ message: 'Video file must be uploaded' });
      }
  
      // Upload video to Cloudinary
      const uploadVideo = async (filePath) => {
        const result = await cloudinary.uploader.upload(filePath, {
          resource_type: 'video', 
          folder: 'Service-video',
        });
        await fs.unlinkSync(filePath); 
        return result.secure_url; 
      };
  
      const videoUrl = await uploadVideo(req.file.path);
  
      const updatedServiceVideo = await ServiceVideo.findByIdAndUpdate(
        id,
        { Video: videoUrl },
        { new: true, runValidators: true }
      );
  
      if (!updatedServiceVideo) {
        return res.status(404).json({ message: 'Service Video not found' });
      }
  
      res.status(200).json(updatedServiceVideo);
    } catch (error) {
      console.error('Failed to update service video:', error);
      res.status(500).json({ message: 'Failed to update service video', error: error.message });
    }
  });
  
  module.exports = router;
  
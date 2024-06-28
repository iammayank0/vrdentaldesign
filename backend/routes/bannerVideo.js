const express = require('express');
const multer = require('multer');
const { BannerVideo } = require('../models/Banner');
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
  

  // Fetch all Banner Videos
router.get('/banner-video', async (req, res) => {
    try {
      const bannerVideos = await BannerVideo.find();
      res.status(200).json(bannerVideos);
    } catch (error) {
      console.error('Failed to fetch banner videos:', error);
      res.status(500).json({ message: 'Failed to fetch banner videos', error: error.message });
    }
  });

// Add Banner Video
router.post('/banner-video', upload.single('Video'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'Video file must be uploaded' });
      }
  
      
      const uploadVideo = async (filePath) => {
        const result = await cloudinary.uploader.upload(filePath, {
          resource_type: 'video', 
          folder: 'Banner-video',
        });
        await fs.unlinkSync(filePath); 
        return result.secure_url; 
      };
  
      const videoUrl = await uploadVideo(req.file.path);
  
      const newBannerVideo = new BannerVideo({
        Video: videoUrl,
      });
  
      await newBannerVideo.save();
  
      res.status(201).json(newBannerVideo);
    } catch (error) {
      console.error('Failed to upload video and create banner video:', error);
      res.status(500).json({ message: 'Failed to upload video and create banner video', error: error.message });
    }
  });

  // Edit a Banner Video
router.put('/banner-video/:id', upload.single('Video'), async (req, res) => {
    try {
      const { id } = req.params;
      
      if (!req.file) {
        return res.status(400).json({ message: 'Video file must be uploaded' });
      }
  
      // Upload video to Cloudinary
      const uploadVideo = async (filePath) => {
        const result = await cloudinary.uploader.upload(filePath, {
          resource_type: 'video', 
          folder: 'Banner-video',
        });
        await fs.unlinkSync(filePath); 
        return result.secure_url; 
      };
  
      const videoUrl = await uploadVideo(req.file.path);
  
      const updatedBannerVideo = await BannerVideo.findByIdAndUpdate(
        id,
        { Video: videoUrl },
        { new: true, runValidators: true }
      );
  
      if (!updatedBannerVideo) {
        return res.status(404).json({ message: 'Banner Video not found' });
      }
  
      res.status(200).json(updatedBannerVideo);
    } catch (error) {
      console.error('Failed to update banner video:', error);
      res.status(500).json({ message: 'Failed to update banner video', error: error.message });
    }
  });
  
  module.exports = router;
  
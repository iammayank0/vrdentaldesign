const express = require('express');
const { SingleService } = require('../../models/Page/ServicePage');

const router = express.Router();

// Fetch All Single Services
router.get('/single-services', async (req, res) => {
    try {
      const singleServices = await SingleService.find();
      res.json(singleServices);
    } catch (error) {
      console.error('Error fetching single Services:', error);
      res.status(500).json({ message: 'Error fetching single Services', error: error.message });
    }
  });


  // Create Blog Text
router.post('/single-services', async (req, res) => {
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
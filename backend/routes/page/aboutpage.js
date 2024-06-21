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

// Fetch Background Content
router.get('/backgroundcontent', async (req, res) => {
    try {
        const backgroundContent = await BackgroundContent.find();
        res.status(200).json(backgroundContent);
    } catch (error) {
        console.error('Failed to fetch Background Content:', error);
        res.status(500).json({ message: 'Failed to fetch Background Content', error: error.message });
    }
});

// Fetch About Page Content
router.get('/aboutpagecontent', async (req, res) => {
    try {
        const aboutPageContent = await AboutPageContent.find();
        res.status(200).json(aboutPageContent);
    } catch (error) {
        console.error('Failed to fetch About Page Content:', error);
        res.status(500).json({ message: 'Failed to fetch About Page Content', error: error.message });
    }
});

// Fetch About Us Content
router.get('/aboutuscontent', async (req, res) => {
    try {
        const aboutUsContent = await AboutUsContent.find();
        res.status(200).json(aboutUsContent);
    } catch (error) {
        console.error('Failed to fetch About Us Content:', error);
        res.status(500).json({ message: 'Failed to fetch About Us Content', error: error.message });
    }
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

  // Create About Page Content
router.post('/aboutpagecontent', upload.none(), async (req, res) => {
    const { title1, description1, title2, description2 } = req.body;

    if (!title1 || !description1 || !title2 || !description2) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const newAboutPageContent = new AboutPageContent({
            title1,
            description1,
            title2,
            description2
        });

        await newAboutPageContent.save();

        res.status(201).json(newAboutPageContent);
    } catch (error) {
        console.error('Failed to create About Page Content:', error);
        res.status(500).json({ message: 'Failed to create About Page Content', error: error.message });
    }
});

// Create About Us Content
router.post('/aboutuscontent', upload.none(), async (req, res) => {
    const { title, heading, description } = req.body;

    if (!title || !heading || !description) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const newAboutUsContent = new AboutUsContent({
            title,
            heading,
            description
        });

        await newAboutUsContent.save();

        res.status(201).json(newAboutUsContent);
    } catch (error) {
        console.error('Failed to create About Us Content:', error);
        res.status(500).json({ message: 'Failed to create About Us Content', error: error.message });
    }
});

// Edit About Page Content
router.put('/aboutpagecontent/:id', upload.none(), async (req, res) => {
    const { id } = req.params;
    const { title1, description1, title2, description2 } = req.body;

    const updates = {};

    if (title1 !== undefined) updates.title1 = title1;
    if (description1 !== undefined) updates.description1 = description1;
    if (title2 !== undefined) updates.title2 = title2;
    if (description2 !== undefined) updates.description2 = description2;

    try {
        const updatedAboutPageContent = await AboutPageContent.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedAboutPageContent) {
            return res.status(404).json({ message: 'About Page Content not found' });
        }

        res.json(updatedAboutPageContent);
    } catch (error) {
        console.error('Failed to update About Page Content:', error);
        res.status(500).json({ message: 'Failed to update About Page Content', error: error.message });
    }
});

// Edit About Us Content
router.put('/aboutuscontent/:id', upload.none(), async (req, res) => {
    const { id } = req.params;
    const { title, heading, description } = req.body;

    const updates = {};

    if (title !== undefined) updates.title = title;
    if (heading !== undefined) updates.heading = heading;
    if (description !== undefined) updates.description = description;

    try {
        const updatedAboutUsContent = await AboutUsContent.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedAboutUsContent) {
            return res.status(404).json({ message: 'About Us Content not found' });
        }

        res.json(updatedAboutUsContent);
    } catch (error) {
        console.error('Failed to update About Us Content:', error);
        res.status(500).json({ message: 'Failed to update About Us Content', error: error.message });
    }
});

module.exports = router;
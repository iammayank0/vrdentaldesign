const express = require('express');
const multer = require('multer');
const { AboutContent } = require('../models/AboutItem');
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

const uploadImage = async (filePath) => {
    const result = await cloudinary.uploader.upload(filePath, {
        folder: 'about-images',
    });
    fs.unlinkSync(filePath); // Remove the temporary file
    return result.secure_url;
};

// Endpoint to fetch About content
router.get('/about', async (req, res) => {
    try {
        const aboutContent = await AboutContent.findOne();
        if (!aboutContent) {
            return res.status(404).json({ message: 'No About content found' });
        }
        res.json(aboutContent);
    } catch (error) {
        console.error('Error fetching About content:', error);
        res.status(500).json({ message: 'Error fetching About content', error: error.message });
    }
});

// Endpoint to create a new slide with multiple images
router.post('/about/upload', upload.fields([
    { name: 'img1', maxCount: 1 },
    { name: 'img2', maxCount: 1 },
    { name: 'signImage', maxCount: 1 },
]), async (req, res) => {
    if (!req.files || !req.files.img1 || !req.files.img2 || !req.files.signImage) {
        return res.status(400).json({ message: 'All image files must be uploaded' });
    }

    try {
        const img1Url = await uploadImage(req.files.img1[0].path);
        const img2Url = await uploadImage(req.files.img2[0].path);
        const signImageUrl = await uploadImage(req.files.signImage[0].path);

        const { subTitle, title, description, services, companyName, founders } = req.body;

        // Ensure services is parsed correctly as an array of strings
        let parsedServices;
        try {
            parsedServices = JSON.parse(services);
            if (!Array.isArray(parsedServices)) {
                throw new Error("Services should be an array");
            }
        } catch (error) {
            return res.status(400).json({ message: 'Invalid services format. It should be a JSON array.' });
        }

        const newAbout = new AboutContent({
            img1: img1Url,
            img2: img2Url,
            signImage: signImageUrl,
            subTitle,
            title,
            description,
            services: parsedServices,
            companyName,
            founders,
        });

        await newAbout.save();

        res.status(201).json(newAbout);
    } catch (error) {
        console.error('Failed to upload images and create about content:', error);
        res.status(500).json({ message: 'Failed to upload images and create about content', error: error.message });
    }
});

// Endpoint to update About content
router.put('/about/:id', upload.fields([
    { name: 'img1', maxCount: 1 },
    { name: 'img2', maxCount: 1 },
    { name: 'signImage', maxCount: 1 },
]), async (req, res) => {
    const { id } = req.params;
    const { subTitle, title, description, services, companyName, founders } = req.body;

    const updates = { subTitle, title, description, companyName, founders };

    if (services) {
        try {
            updates.services = JSON.parse(services);
            if (!Array.isArray(updates.services)) {
                throw new Error("Services should be an array");
            }
        } catch (error) {
            return res.status(400).json({ message: 'Invalid services format. It should be a JSON array.' });
        }
    }

    try {
        if (req.files) {
            if (req.files.img1) {
                updates.img1 = await uploadImage(req.files.img1[0].path);
            }
            if (req.files.img2) {
                updates.img2 = await uploadImage(req.files.img2[0].path);
            }
            if (req.files.signImage) {
                updates.signImage = await uploadImage(req.files.signImage[0].path);
            }
        }

        const updatedAbout = await AboutContent.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedAbout) {
            return res.status(404).json({ message: 'About content not found' });
        }

        res.json(updatedAbout);
    } catch (error) {
        console.error('Error updating About content:', error);
        res.status(500).json({ message: 'Error updating About content', error: error.message });
    }
});

// Endpoint to delete About content
router.delete('/about/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedAbout = await AboutContent.findByIdAndDelete(id);

        if (!deletedAbout) {
            return res.status(404).json({ message: 'About content not found' });
        }

        res.json({ message: 'About content deleted successfully' });
    } catch (error) {
        console.error('Error deleting About content:', error);
        res.status(500).json({ message: 'Error deleting About content', error: error.message });
    }
});

module.exports = router;

const express = require('express');
const multer = require('multer');
const Doctor = require('../models/DoctorItem');
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

// Helper function to upload image to Cloudinary
const uploadImage = async (filePath) => {
    const result = await cloudinary.uploader.upload(filePath, {
        folder: 'DoctorService-images',
    });
    await fs.unlinkSync(filePath); // Remove the temporary file
    return result.secure_url;
};

// Endpoint to fetch all doctor slides
router.get('/doctors', async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.json(doctors);
    } catch (error) {
        console.error('Error fetching doctors:', error);
        res.status(500).json({ message: 'Error fetching doctors', error: error.message });
    }
});

// Endpoint to create a new doctor slide with image and social links
router.post('/doctors/upload', upload.fields([{ name: 'img', maxCount: 1 }]), async (req, res) => {
    if (!req.files || !req.files.img) {
        return res.status(400).json({ message: 'An image file must be uploaded' });
    }

    try {
        const imgUrl = await uploadImage(req.files.img[0].path);
        const { title, time, facebook, twitter, linkedin, instagram } = req.body;

        const newDoctor = new Doctor({
            img: imgUrl,
            title,
            time,
            socialLinks: { facebook, twitter, linkedin, instagram }
        });

        await newDoctor.save();
        res.status(201).json(newDoctor);
    } catch (error) {
        console.error('Failed to upload image and create doctor slide:', error);
        res.status(500).json({ message: 'Failed to upload image and create doctor slide', error: error.message });
    }
});

// Endpoint to update a doctor slide
router.put('/doctors/:id', upload.fields([{ name: 'img', maxCount: 1 }]), async (req, res) => {
    const { id } = req.params;
    const { title, time, facebook, twitter, linkedin, instagram } = req.body;
    const updates = { title, time, 'socialLinks.facebook': facebook, 'socialLinks.twitter': twitter, 'socialLinks.linkedin': linkedin, 'socialLinks.instagram': instagram };

    try {
        if (req.files && req.files['img']) {
            const imgUrl = await uploadImage(req.files['img'][0].path);
            updates.img = imgUrl;
        }

        const updatedDoctor = await Doctor.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedDoctor) {
            return res.status(404).json({ message: 'Doctor slide not found' });
        }

        res.json(updatedDoctor);
    } catch (error) {
        console.error('Error updating doctor slide:', error);
        res.status(500).json({ message: 'Error updating doctor slide', error: error.message });
    }
});

// Endpoint to delete a doctor slide
router.delete('/doctors/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedDoctor = await Doctor.findByIdAndDelete(id);

        if (!deletedDoctor) {
            return res.status(404).json({ message: 'Doctor slide not found' });
        }

        res.json({ message: 'Doctor slide deleted successfully' });
    } catch (error) {
        console.error('Error deleting doctor slide:', error);
        res.status(500).json({ message: 'Error deleting doctor slide', error: error.message });
    }
});

module.exports = router;

const express = require('express');
const Enquiry = require('../models/Enquiry');
const nodemailer = require('nodemailer');
const router = express.Router();
require('dotenv').config(); // Ensure this is at the top to load environment variables

// Middleware to handle async errors
const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: process.env.SMPT_SERVICE, // Use the environment variable
  auth: {
    user: process.env.SMPT_MAIL, // Your email address
    pass: process.env.SMPT_PASSWORD // Your app password
  }
});

router.post('/submit', asyncHandler(async (req, res) => {
  console.log('Received enquiry:', req.body);

  const { name, email, phone, message } = req.body;

  // Basic validation
  if (!name || !email || !phone || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Additional validation (example: email format)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  // Sanitization
  const sanitizedMessage = message.replace(/<[^>]+>/g, ''); // basic HTML tag removal

  const newEnquiry = new Enquiry({
    name,
    email,
    phone: Number(phone),
    message: sanitizedMessage
  });

  await newEnquiry.save();

  // Send email with enquiry details
  const mailOptions = {
    from: process.env.SMPT_MAIL, 
    to: process.env.SMPT_MAIL, 
    subject: 'New Enquiry Submission',
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${sanitizedMessage}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ message: 'Failed to send email', error: error.message });
    }
    console.log('Email sent:', info.response);
    res.status(201).json({ message: 'Enquiry submitted successfully', enquiry: newEnquiry });
  });
}));

// Error handling middleware
router.use((error, req, res, next) => {
  console.error('Error handling request:', error);
  res.status(500).json({ message: 'Internal Server Error', error: error.message });
});

module.exports = router;

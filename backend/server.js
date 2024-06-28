const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');


// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, 'config.env') });

const navbarRoutes = require('./routes/navbar');
const bannerRoutes = require('./routes/banner');
const enquiryRoutes = require('./routes/enquiry');
const aboutRoutes = require('./routes/about');
const factRoutes = require('./routes/fact');
const serviceRoutes = require('./routes/service');
const whychooseusRoutes = require('./routes/whychooseus');
const doctorRoutes = require('./routes/doctor');
const ctaRoutes = require('./routes/cta');
const PartnerRoutes = require('./routes/partner');
const BlogRoutes = require('./routes/blog');
const FooterRoutes = require('./routes/footer');
const GalleryRoutes = require('./routes/page/Gallery');
const AboutPageRoutes = require('./routes/page/aboutpage');
const ServicePageRoutes = require('./routes/page/Service-page');
const SingleServiceRoutes = require('./routes/page/Single-service');
const BannerVideoRoutes = require('./routes/bannerVideo');
const ServiceVideoRoutes = require('./routes/serviceVideo');
const MapVideoRoutes = require('./routes/map');


const app = express();
const PORT = process.env.PORT  || 5000; 

app.use(bodyParser.json());
app.use(cors());

const MONGODB_URI = process.env.MONGODB_URI; 
mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error: ', err));


app.use('/api', navbarRoutes);
app.use('/api', bannerRoutes);
app.use('/api/enquiry', enquiryRoutes); 
app.use('/api', aboutRoutes);
app.use('/api', factRoutes);
app.use('/api', serviceRoutes);
app.use('/api', whychooseusRoutes);
app.use('/api', doctorRoutes);
app.use('/api', ctaRoutes);
app.use('/api', PartnerRoutes);
app.use('/api', BlogRoutes);
app.use('/api', FooterRoutes);
app.use('/api', GalleryRoutes);
app.use('/api', AboutPageRoutes);
app.use('/api', ServicePageRoutes);
app.use('/api', SingleServiceRoutes);
app.use('/api', BannerVideoRoutes);
app.use('/api', ServiceVideoRoutes);
app.use('/api', MapVideoRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

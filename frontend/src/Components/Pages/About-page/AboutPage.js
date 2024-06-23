import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../Navbar/Navbar';
import './AboutPage.css';
import { Link } from 'react-router-dom';

import About from '../../Main/Home-Page/About';
import WhyChooseUs from '../../Main/Home-Page/WhyChooseUs';
import Doctor from '../../Main/Home-Page/Doctor';
import CTA from '../../Main/Home-Page/CTA';
import Footer from "../../Footer/Footer";

const AboutPage = () => {
  const [backgroundImage, setBackgroundImage] = useState('');
  const [aboutPageContent, setAboutPageContent] = useState({
    title1: '',
    description1: '',
    title2: '',
    description2: ''
  });
  const [aboutUsContent, setAboutUsContent] = useState({
    title: '',
    heading: '',
    description: ''
  });

  useEffect(() => {
    const fetchBackgroundImage = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/backgroundcontent');
        setBackgroundImage(response.data.length > 0 ? response.data[0].BackgroundImage : '');
      } catch (error) {
        console.error('Failed to fetch about background image:', error);
      }
    };

    const fetchAboutPageContent = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/aboutpagecontent');
        if (response.data.length > 0) {
          setAboutPageContent(response.data[0]);
        }
      } catch (error) {
        console.error('Failed to fetch about page content:', error);
      }
    };

    const fetchAboutUsContent = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/aboutuscontent');
        if (response.data.length > 0) {
          setAboutUsContent(response.data[0]);
        }
      } catch (error) {
        console.error('Failed to fetch about us content:', error);
      }
    };

    fetchBackgroundImage();
    fetchAboutPageContent();
    fetchAboutUsContent();
  }, []);

  return (
    <>
      <div className='page' style={{ backgroundImage: `url(${backgroundImage})` }}>
        <Navbar />
        <div className='d-table'>
          <div className="d-table-cell">
            <div className="page-container">
              <div className="page-title-content">
                <h2>ABOUT US</h2>
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>About Us</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className='about-area'>
        <div>
          <About />
        </div>
      </section>
      <section className='mission-vision-area'>
        <div className='page-container'>
          <div className="page-row">
            <div className="mission">
              <div className="page-row-content">
                <h2>{aboutPageContent.title1}</h2>
                <p>{aboutPageContent.description1}</p>
              </div>
            </div>
            <div className="vision">
              <div className="page-row-content">
                <h2>{aboutPageContent.title2}</h2>
                <p>{aboutPageContent.description2}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='who-we-are'>
        <div className="page-container">
          <div className="who-we-are-content">
            <div className="content-container">
              <div className="funfacts">
                <span className='sub-title'>{aboutUsContent.title}</span>
                <h2>{aboutUsContent.heading}</h2>
                <p>{aboutUsContent.description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='about-page-WYCU'>
        <WhyChooseUs />
      </section>
      <section className='about-page-doctor'>
        <div className="page-container">
          <Doctor />
        </div>
      </section>
      <section className='about-page-cta'>
        <div className="about-page-container">
          <CTA />
        </div>
      </section>
      <section>
        <div>
          <Footer />
        </div>
      </section>
    </>
  );
}

export default AboutPage;

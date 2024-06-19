import React from 'react';
import Navbar from '../Navbar/Navbar'
import './Page.css';
import { Link } from 'react-router-dom';


import aboutBG from '../../Assets/images/page-title-image/1.jpg';
import About from '../Main/Home-Page/About';
import WhyChooseUs from '../Main/Home-Page/WhyChooseUs';
import Doctor from '../Main/Home-Page/Doctor';
import CTA from '../Main/Home-Page/CTA';
import Footer from "../Footer/Footer"

const AboutPage = () => {
  return (
    <>
    <div className='about-page' style={{ backgroundImage: `url(${aboutBG})`}}>
        <Navbar />
      <div className='d-table'>
        <div className="d-table-cell">
            <div className="page-container">
            <div className="page-title-content">
                <h2>ABOUT US</h2>
                <ul>
                  <li>
                    <Link to="/*">Home</Link>
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
              <h2>Our Mission</h2>
              <p>At VR2020 Dentlab, our mission is to revolutionize the digital dental industry through our commitment to excellence, innovation, and transformative designs. We strive to create dental spaces that not only captivate the senses but also enhance the overall patient experience. Our mission is to merge technology and functionality, crafting environments that inspire comfort, tranquility, and confidence among our clients. We are dedicated to understanding the unique needs and aspirations of our clients, collaborating closely with them to bring their vision to life through creation of best restorations. With an unwavering focus on quality, precision and attention to details, our mission is to set new standards in digital dental designing, leaving a lasting impact on practices worldwide.</p>
            </div>
          </div>
          <div className="vision">
            <div className="page-row-content">
              <h2>Our Vision</h2>
              <p>Our vision as a digital dental designing company is to provide exceptional and personalized CAD designing services to our clients. We strive to become a leading name in the dental industry, recognized for our commitment to excellence and innovation. Our goal is to provide comprehensive dental solutions using the latest technology and techniques to improve the oral health and wellbeing of our clients. We aim to create a comfortable and welcoming environment for our clients, where they feel at ease and confident in the desings they receive. Our vision is to build lasting relationships with our clients, based on trust, respect, and open communication. We aspire to continuously improve our skills and knowledge to ensure that we stay at the forefront of the dental field.</p>
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
              <span className='sub-title'>About Us</span>
              <h2>Who We Are</h2>
              <p>In order to accommodate every customer’s needs, VR 2020 Dental lab has created specialized design teams that cater to certain design preferences. Rather than going to a large group of designers, with VR2020Dentlab you will be assigned to a specific team that will handle your cases day in and day out</p>
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

import React, { useEffect, useState } from 'react';
import './Footer.css';
import axios from 'axios'; 
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import {  MdOutlineCopyright } from "react-icons/md";

const Footer = () => {
  const [footerData, setFooterData] = useState(null);

  useEffect(() => {
    // Fetch footer data from your backend API
    const fetchFooterData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/footer'); // Replace '/api/footer' with your actual API endpoint
        setFooterData(response.data);
      } catch (error) {
        console.error('Error fetching footer data:', error);
      }
    };

    fetchFooterData();
  }, []);

  return (
    <div>
      <footer className='footer-area'>
        <div className="container-footer">
          {footerData && (
            <div className="footer-row">
              <div className="single-footer-widget">
                <div className="Description">
                  {footerData.description.logo && <img src={footerData.description.logo} alt="footer-logo-img" />}
                  <p>{footerData.description.text}</p>
                </div>
                <ul className="footer-social">
                  <li><a href={footerData.socialLinks.facebook}><FaFacebook /></a></li>
                  <li><a href={footerData.socialLinks.twitter}><FaTwitter /> </a></li>
                  <li><a href={footerData.socialLinks.linkedin}><FaLinkedin /> </a></li>
                  <li><a href={footerData.socialLinks.instagram}><FaInstagram /> </a></li>
                </ul>
              </div>
              <div className="single-footer-widget">
                <h3>QUICK LINKS</h3>
                <ul className='footer-quick-links'>
                  {footerData.quickLinks.map((link, index) => (
                    <li key={index}><a href={link.url}>{link.text}</a></li>
                  ))}
                </ul>
              </div>
              <div className="single-footer-widget">
                <h3>CONTACT INFO</h3>
                <ul className="footer-contact-info">
                  <li>
                    <span>Location:</span> {footerData.contactInfo.location1}
                  </li>
                  <li>
                    <span>Location:</span> {footerData.contactInfo.location2}
                  </li>
                  <li>
                    <span>Phone:</span> {footerData.contactInfo.phone}
                  </li>
                </ul>
              </div>
            </div>
          )}
          <div className="copyright-area">
            <div className="copyright-text">
              <p>
              <MdOutlineCopyright />
                {footerData && footerData.copyright}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;

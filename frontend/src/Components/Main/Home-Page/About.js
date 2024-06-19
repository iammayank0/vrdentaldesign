import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Main.css';

import { FaCheck } from 'react-icons/fa';

const About = () => {
    const [aboutContent, setAboutContent] = useState(null);
    const [sliderPosition, setSliderPosition] = useState(50);

    useEffect(() => {
        const fetchAboutContent = async () => {
          try {
            const response = await axios.get('http://localhost:5000/api/about');
            const data = response.data;
    
            if (typeof data.services === 'string') {
              data.services = JSON.parse(data.services);
            }
    
            setAboutContent(data);
          } catch (error) {
            console.error('Error fetching About content:', error);
          }
        };
    
        fetchAboutContent();
      }, []);
    
      const handleSliderChange = (e) => {
        setSliderPosition(e.target.value);
      };

  if (!aboutContent) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* ABOUT AREA */}
      <section className='about-area'>
            <div className="container-about">
              <div className="about-img-container">
                <div className='about-image' style={{ '--position': `${sliderPosition}%` }}>
                  <div className="content-image">
                    <img src={aboutContent.img1} alt='img1' className='image-before slider-image' />
                    <img src={aboutContent.img2} alt='img2' className='image-after slider-image' />
                  </div>
                  <input type="range" min="0" max="100" value={sliderPosition} onChange={handleSliderChange} aria-label='Percentage of before photo shown' className='slider' />
                  <div className="slider-line" aria-hidden="true"></div>
                  <div className="slider-button" aria-hidden="true">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      fill="currentColor"
                      viewBox="0 0 256 256"
                    >
                      <rect width="256" height="256" fill="none"></rect>
                      <line
                        x1="128"
                        y1="40"
                        x2="128"
                        y2="216"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="16"
                      ></line>
                      <line
                        x1="96"
                        y1="128"
                        x2="16"
                        y2="128"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="16"
                      ></line>
                      <polyline
                        points="48 160 16 128 48 96"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="16"
                      ></polyline>
                      <line
                        x1="160"
                        y1="128"
                        x2="240"
                        y2="128"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="16"
                      ></line>
                      <polyline
                        points="208 96 240 128 208 160"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="16"
                      ></polyline>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="about-content">
                <span className='subTitle'>{aboutContent.subTitle}</span>
                <h2>{aboutContent.title}</h2>
                <p>{aboutContent.description}</p>
                <div className="content-list">
                  <div className="list1">
                    <ul>
                      {aboutContent.services && aboutContent.services.slice(0, Math.ceil(aboutContent.services.length / 2)).map((service, index) => (
                        <li key={index}><FaCheck className='icon' />{service}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="list2">
                    <ul>
                      {aboutContent.services && aboutContent.services.slice(Math.ceil(aboutContent.services.length / 2)).map((service, index) => (
                        <li key={index}><FaCheck className='icon' />{service}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="signature-content">
                  <div className="sign-img">
                    <img src={aboutContent.signImage} alt='signImage' />
                  </div>
                  <div className="sign-content">
                    <h5>{aboutContent.companyName}</h5>
                    <span>{aboutContent.founders}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
    </div>
  )
}

export default About

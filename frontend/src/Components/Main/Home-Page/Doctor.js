import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Main.css';

import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const Doctor = () => {
    const [doctors, setDoctors] = useState([]);
    const [currentDoctorSlide, setCurrentDoctorSlide] = useState(0);
    const doctorsPerPage = window.innerWidth >= 1050 ? 4 : window.innerWidth >= 600 ? 3 : 2;
    const totalDoctorSlides = Math.ceil(doctors.length / doctorsPerPage);

    useEffect(() => {
        const fetchDoctors = async () => {
          try {
            const response = await axios.get('http://localhost:5000/api/doctors'); 
            setDoctors(response.data);
          } catch (error) {
            console.error('Error fetching doctors:', error);
          }
        };
    
        fetchDoctors();
      }, []);
    
      const handleDotClick = (index) => {
        setCurrentDoctorSlide(index);
      };

  return (
    <div>
      {/* Doctor Area */}
      <section className="doctor-area">
        <div className="container-doctor">
          <div className="section-title">
            <span className="doctor-title">OUR SERVICES</span>
            <h2>Check our all Digital Dental Services</h2>
          </div>
          <div className="doctor-slides-carousel">
            <div
              className="doctor-slides"
              style={{ transform: `translateX(-${currentDoctorSlide * 100}%)` }}
            >
              {doctors.map((doctor, index) => (
                <div className="single-doctor-box" key={index}>
                  <div className="doctor-image">
                    <img src={doctor.img} alt={doctor.title} />
                  </div>
                  <div className="doctor-content">
                    <h3>{doctor.title}</h3>
                    <span>{doctor.time}</span> {/* Use the 'time' property from the fetched data */}
                    <ul className="social-icon">
                      {/* Render social links */}
                      <li>
                        <a href={doctor.socialLinks.facebook}>
                          <FaFacebook />
                        </a>
                      </li>
                      <li>
                        <a href={doctor.socialLinks.twitter}>
                          <FaTwitter />
                        </a>
                      </li>
                      <li>
                        <a href={doctor.socialLinks.linkedin}>
                          <FaLinkedin />
                        </a>
                      </li>
                      <li>
                        <a href={doctor.socialLinks.instagram}>
                          <FaInstagram />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              ))}
            </div>
            <div className="slides-dot">
              {Array.from({ length: totalDoctorSlides }).map((_, index) => (
                <button
                  key={index}
                  className={`dot ${currentDoctorSlide === index ? "active" : ""}`}
                  onClick={() => handleDotClick(index)}
                >
                  <span>.</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Doctor

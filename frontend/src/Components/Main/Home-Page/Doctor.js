import React, { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';
import '../Main.css';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const Doctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [doctorsPerPage, setDoctorsPerPage] = useState(0); // Initialize with 0
  const doctorSlidesRef = useRef(null); // Ref to doctor slides container

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/doctors'); 
        setDoctors(response.data);
      } catch (error) {
        setError('Error fetching doctors');
        console.error('Error fetching doctors:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();

    const handleResize = () => {
      setDoctorsPerPage(calculateDoctorsPerPage());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setDoctorsPerPage(calculateDoctorsPerPage());
  }, []);

  const slideToNextDoctor = useCallback(() => {
    if (doctorSlidesRef.current) {
      doctorSlidesRef.current.style.transition = 'transform 0.5s ease-in-out';
      doctorSlidesRef.current.style.transform = `translateX(-${100 / doctorsPerPage}%)`;

      setTimeout(() => {
        setDoctors((prevDoctors) => {
          const updatedDoctors = [...prevDoctors];
          updatedDoctors.push(updatedDoctors.shift()); // Rotate doctors array
          return updatedDoctors;
        });

        doctorSlidesRef.current.style.transition = 'none';
        doctorSlidesRef.current.style.transform = 'translateX(0)';
      }, 500); // Ensure transition completes before resetting
    }
  }, [doctorsPerPage]);

  useEffect(() => {
    if (doctors.length > 0) {
      const interval = setInterval(() => {
        slideToNextDoctor();
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [doctors, slideToNextDoctor]);

  const calculateDoctorsPerPage = () => {
    return window.innerWidth >= 1050 ? 4 : window.innerWidth >= 600 ? 3 : 2;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

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
            <div className="doctor-slides" ref={doctorSlidesRef}>
              {doctors.map((doctor, index) => (
                <DoctorBox key={index} doctor={doctor} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const DoctorBox = ({ doctor }) => {
  return (
    <div className="single-doctor-box">
      <div className="doctor-image">
        <img src={doctor.img} alt={doctor.title} />
      </div>
      <div className="doctor-content">
        <h3>{doctor.title}</h3>
        <span>{doctor.time}</span> 
        <ul className="social-icon">
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
  );
};

export default Doctor;

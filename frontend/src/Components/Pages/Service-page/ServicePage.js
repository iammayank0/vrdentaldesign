import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./ServicePage.css";
import Navbar from '../../Navbar/Navbar';
import Footer from '../../Footer/Footer';
import { Link } from 'react-router-dom';

import { FaArrowRight } from 'react-icons/fa';


const ServicePage = () => {
  const [backgroundImage, setBackgroundImage] = useState('');
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchBackgroundImage = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/servicebg');
        setBackgroundImage(response.data.length > 0 ? response.data[0].BackgroundImage : '');
      } catch (error) {
        console.error('Failed to fetch about background image:', error);
      }
    };

    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/single-services'); 
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchBackgroundImage();
    fetchServices();
  }, []);

  return (
    <>
      <div className='page' style={{ backgroundImage: `url(${backgroundImage})` }}>
        <Navbar />
        <div className='d-table'>
          <div className="d-table-cell">
            <div className="page-container">
              <div className="page-title-content">
                <h2>SERVICES</h2>
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>Services</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className='services-page'>
        <div className="page-container">
          <div className="service-row">
            {services.map((services, index) => (
              <div className="single-service" key={index}>
                <div className="single-service-box">
                  <img src={services.image} alt={`${services.title}-img`} />
                  <h3>{services.title}</h3>
                  <Link to={`/service-detail/${services.title.toLowerCase().replace(/ /g, '-')}`}>
                    Read More <FaArrowRight />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className='service-footer'>
        <Footer />
      </section>
    </>
  );
};

export default ServicePage;

import React from 'react';
import "./ServicePage.css";
import Navbar from '../../Navbar/Navbar';
import Footer from '../../Footer/Footer'
import { Link } from 'react-router-dom';

import aboutBG from '../../../Assets/images/page-title-image/1.jpg';
import { FaArrowRight } from 'react-icons/fa';

import serviceimg1 from '../../../Assets/images/doctor-image/1.jpg';
import serviceimg2 from '../../../Assets/images/doctor-image/2.jpg';
import serviceimg3 from '../../../Assets/images/doctor-image/3.jpg';
import serviceimg4 from '../../../Assets/images/doctor-image/4.jpg';
import serviceimg5 from '../../../Assets/images/doctor-image/5.jpg';
import serviceimg6 from '../../../Assets/images/doctor-image/6.jpg';
import serviceimg7 from '../../../Assets/images/doctor-image/7.jpg';
import serviceimg8 from '../../../Assets/images/doctor-image/8.jpg';
import serviceimg9 from '../../../Assets/images/doctor-image/9.jpg';
import serviceimg10 from '../../../Assets/images/doctor-image/10.jpg';
import serviceimg11 from '../../../Assets/images/doctor-image/11.jpg';
import serviceimg12 from '../../../Assets/images/doctor-image/12.jpg';

const services = [
  { img: serviceimg1, title: 'VALPLAST FLEXIBLE' },
  { img: serviceimg2, title: 'COSMETIC DENTISTRY' },
  { img: serviceimg3, title: 'INLAY ONLAY' },
  { img: serviceimg4, title: 'VENEER' },
  { img: serviceimg5, title: 'SNAP ON SMILE' },
  { img: serviceimg6, title: 'CUSTOM TRAY' },
  { img: serviceimg7, title: 'DIGITAL DENTURE' },
  { img: serviceimg8, title: 'MODEL CREATE' },
  { img: serviceimg9, title: 'SURGICAL GUIDE' },
  { img: serviceimg10, title: 'NIGHT-GUARD' },
  { img: serviceimg11, title: 'SCREW-RETAIN-CROWN' },
  { img: serviceimg12, title: 'CROWN & BRIDGE' },
  { img: serviceimg11, title: 'CPD-RPD' }, 
];

const ServicePage = () => {
  return (
    <>
      <div className='page' style={{ backgroundImage: `url(${aboutBG})` }}>
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
            {services.map((service, index) => (
              <div className="single-service" key={index}>
                <div className="single-service-box">
                  <img src={service.img} alt={`${service.title}-img`} />
                  <h3>{service.title}</h3>
                  <Link to={`/service-detail/${service.title.toLowerCase().replace(/ /g, '-')}`}>
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

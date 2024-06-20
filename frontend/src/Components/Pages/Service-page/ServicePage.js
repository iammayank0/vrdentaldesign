import React from 'react';
import "./ServicePage.css";
import Navbar from '../../Navbar/Navbar';
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


const ServicePage = () => {
  return (
    <>
    <div className='page' style={{ backgroundImage: `url(${aboutBG})`}}>
        <Navbar />
      <div className='d-table'>
        <div className="d-table-cell">
            <div className="page-container">
            <div className="page-title-content">
                <h2>SERVICES</h2>
                <ul>
                  <li>
                    <Link to="/*">Home</Link>
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
                <div className="single-service">
                    <div className="single-service-box">
                        <img src={serviceimg1} alt="service-img" />
                        <h3>VALPLAST FLEXIBLE</h3>
                        <Link>Read More<FaArrowRight /></Link>
                    </div>
                </div>
                <div className="single-service">
                    <div className="single-service-box">
                        <img src={serviceimg2} alt="service-img" />
                        <h3>COSMETIC DENTISTRY</h3>
                        <Link>Read More<FaArrowRight /></Link>
                    </div>
                </div>
                <div className="single-service">
                    <div className="single-service-box">
                        <img src={serviceimg3} alt="service-img" />
                        <h3>INLAY ONLAY</h3>
                        <Link>Read More<FaArrowRight /></Link>
                    </div>
                </div>
                <div className="single-service">
                    <div className="single-service-box">
                        <img src={serviceimg4} alt="service-img" />
                        <h3>VENEER</h3>
                        <Link>Read More<FaArrowRight /></Link>
                    </div>
                </div>
                <div className="single-service">
                    <div className="single-service-box">
                        <img src={serviceimg5} alt="service-img" />
                        <h3>SNAP ON SMILE</h3>
                        <Link>Read More<FaArrowRight /></Link>
                    </div>
                </div>
                <div className="single-service">
                    <div className="single-service-box">
                        <img src={serviceimg6} alt="service-img" />
                        <h3>CUSTOM TRAY</h3>
                        <Link>Read More<FaArrowRight /></Link>
                    </div>
                </div>
                <div className="single-service">
                    <div className="single-service-box">
                        <img src={serviceimg7} alt="service-img" />
                        <h3>DIGITAL DENTURE</h3>
                        <Link>Read More<FaArrowRight /></Link>
                    </div>
                </div>
                <div className="single-service">
                    <div className="single-service-box">
                        <img src={serviceimg8} alt="service-img" />
                        <h3>MODEL CREATE</h3>
                        <Link>Read More<FaArrowRight /></Link>
                    </div>
                </div>
                <div className="single-service">
                    <div className="single-service-box">
                        <img src={serviceimg9} alt="service-img" />
                        <h3>SURGICAL GUIDE</h3>
                        <Link>Read More<FaArrowRight /></Link>
                    </div>
                </div>
                <div className="single-service">
                    <div className="single-service-box">
                        <img src={serviceimg10} alt="service-img" />
                        <h3>NIGHT-GUARD</h3>
                        <Link>Read More<FaArrowRight /></Link>
                    </div>
                </div>
                <div className="single-service">
                    <div className="single-service-box">
                        <img src={serviceimg11} alt="service-img" />
                        <h3>SCREW-RETAIN-CROWN</h3>
                        <Link>Read More<FaArrowRight /></Link>
                    </div>
                </div>
                <div className="single-service">
                    <div className="single-service-box">
                        <img src={serviceimg12} alt="service-img" />
                        <h3>CROWN & BRIDGE</h3>
                        <Link>Read More<FaArrowRight /></Link>
                    </div>
                </div>
                <div className="single-service">
                    <div className="single-service-box">
                        <img src={serviceimg11} alt="service-img" />
                        <h3>CPD-RPD</h3>
                        <Link>Read More<FaArrowRight /></Link>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </>
  )
}

export default ServicePage

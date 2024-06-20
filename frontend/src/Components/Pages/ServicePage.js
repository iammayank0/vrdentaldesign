
import React from 'react';
import Navbar from '../Navbar/Navbar'
import './Page.css';
import { Link } from 'react-router-dom';
import aboutBG from '../../Assets/images/page-title-image/1.jpg';



export const ServicePage = () => {
  return (
    <><div className='about-page' style={{ backgroundImage: `url(${aboutBG})` }}>
          <Navbar />
          <div className='d-table'>
              <div className="d-table-cell">
                  <div className="about-page-container">
                      <div className="page-title-content">
                          <h2>Services</h2>
                          <ul>
                              <li>
                                  <Link to="/*">Home</Link>
                              </li>
                              <li>This is Service Page</li>
                          </ul>
                      </div>
                  </div>
              </div>
          </div>
      </div><section className='about-area'>
              <div>
               
              </div>
          </section><section className='mission-vision-area'></section></>
  )
}
export default ServicePage;
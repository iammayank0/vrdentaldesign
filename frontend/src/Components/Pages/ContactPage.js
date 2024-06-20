import React from 'react';
import './ContactPage.css';
import { FaArrowRight } from 'react-icons/fa';
import { CiUser, CiMail, CiPhone } from 'react-icons/ci';
import { RiMessage2Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import About from '../Main/Home-Page/About';
import aboutBG from '../../Assets/images/page-title-image/1.jpg';


const Enquiry = () => {
  return (
    <div>
        <div className='about-page' style={{ backgroundImage: `url(${aboutBG})`}}>
        <Navbar />
      <div className='d-table'>
        <div className="d-table-cell">
            <div className="page-container">
            <div className="page-title-content">
                <h2>Contact US</h2>
                <ul>
                  <li>
                    <Link to="/*">Home</Link>
                  </li>
                  <li>CONTACT Us</li>
                </ul>
            </div>
            </div>
        </div>
      </div>
    </div>
      {/* Enquiry form */}
      <section className='container'>
            <div className='content'>
              <span className='title'>ENQUIRY FORM</span>
              <h2>Enquiry Now</h2>

              <form className="enquiry-form">
                <div className='personal-details'>
                  <div className="text-name">
                    <CiUser className="icon" />
                    <div className="separator">|</div>
                    <input
                      type="text"
                      name="name"
                      placeholder="YOUR NAME"
                      required
                    />
                  </div>
                  <div className="text-email">
                    <CiMail className="icon" />
                    <div className="separator">|</div>
                    <input
                      type="email"
                      name="email"
                      placeholder="YOUR EMAIL"
                      required
                    />
                  </div>
                  <div className="text-num">
                    <CiPhone className="icon" />
                    <div className="separator">|</div>
                    <input
                      type="number"
                      name="phone"
                      placeholder="YOUR PHONE"
                      required
                    />
                  </div>
                </div>
                <div className="message">
                  <RiMessage2Line className="icon" />
                  <div className="separator">|</div>
                  <input
                    type="text"
                    name="message"
                    placeholder="Message"
                    required
                  />
                </div>
                <div className="enquiry-button">
                  <button type="submit" className="submit-button">
                    SEND ENQUIRY
                    <span className="icon--circle"><FaArrowRight /></span>
                  </button>
                </div>
              </form>
              <div><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3509.887440086101!2d77.30879977615818!3d28.392467494940593!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cdd193b9fc4b1%3A0x507e6415a7ae5df0!2sVr2020%20Dental%20Designing%20Solutions%20%26%20Digital%20Laboratory%20Pvt.%20Ltd!5e0!3m2!1sen!2sin!4v1718788979144!5m2!1sen!2sin"
                   width="600" 
                   height="450" 
                   style={{border: "0"}} 
                   allowfullscreen=""
                    loading="lazy" 
                   referrerpolicy="no-referrer-when-downgrade">
                    </iframe></div>
            </div>
          </section>
    </div>
  )
}

export default Enquiry

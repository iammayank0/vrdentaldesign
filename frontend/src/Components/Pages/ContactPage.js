import React from 'react';
import './ContactPage.css';
import { FaArrowRight } from 'react-icons/fa';
import { CiUser, CiMail, CiPhone } from 'react-icons/ci';
import { RiMessage2Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import aboutBG from '../../Assets/images/page-title-image/1.jpg';
import { MdOutlineDesignServices } from "react-icons/md";
import Footer from '../Footer/Footer';



const Enquiry = () => {
  return (
    <div>
        <div className='page' style={{ backgroundImage: `url(${aboutBG})`}}>
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
      <section className='contact-container'>
            <div className='contact-content'>
             
         
              {/* <h1>Enquiry Now</h1> */}

              <form className="contact-form">
              <span className='contact-title'>MESSAGE US
              </span>
              <h1>Drop us Message for any Query</h1>
                <div className='contact-personal-details'>
                  <div className="contact-text-name">
                    <CiUser className="contact-icon"/>
                    <div className="contact-separator">|</div>
                    <input
                      type="text"
                      name="name"
                      placeholder="YOUR NAME"
                      required
                    />
                  </div>
                  <div className="contact-text-email">
                    <CiMail className="contact-icon" />
                    <div className="contact-separator">|</div>
                    <input
                      type="email"
                      name="email"
                      placeholder="YOUR EMAIL"
                      required
                    />
                  </div>
                  <div className="contact-text-num">
                    <CiPhone className="contact-icon" />
                    <div className="contact-separator">|</div>
                    <input
                      type="number"
                      name="phone"
                      placeholder="YOUR PHONE"
                      required
                    />
                  </div>
                  <div className="contact-text-num">
                <MdOutlineDesignServices  className="contact-icon"/>
                    <div className="contact-separator">|</div>
                    <input
                      type="text"
                      name="subject"
                      placeholder="YOUR SUBJECT"
                      required
                    />
                  </div>
                </div>
              
                <div className="contact-message">
                  <RiMessage2Line className="contact-icon" />
                  <div className="contact-separator">|</div>
                  <input
                    type="text"
                    name="message"
                    placeholder="Message"
                    required
                  />
                </div>
                <div className="contact-button">
                  <button type="submit" className="submit-button">
                    SEND ENQUIRY
                    <span className="conatct-icon-circle"><FaArrowRight /></span>
                  </button>
                </div>
              </form>
              <div className='map-container'>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3509.887440086101!2d77.30879977615818!3d28.392467494940593!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cdd193b9fc4b1%3A0x507e6415a7ae5df0!2sVr2020%20Dental%20Designing%20Solutions%20%26%20Digital%20Laboratory%20Pvt.%20Ltd!5e0!3m2!1sen!2sin!4v1718788979144!5m2!1sen!2sin"
                   width="600" 
                   height="450" 
                   style={{border: "0"}} 
                   allowfullscreen=""
                    loading="lazy" 
                   referrerpolicy="no-referrer-when-downgrade"
                   title='map'>
                    </iframe>
                    </div>
            </div>
          </section>
          <section>
      <div>
        <Footer />
      </div>
    </section>
    </div>
  )
}

export default Enquiry

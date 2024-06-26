import React from "react";
import "./ContactPage.css";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import EnquiryForm from '../Main/Home-Page/Enquiry'
import aboutBG from "../../Assets/images/page-title-image/1.jpg";
import Footer from "../Footer/Footer";
import WorldMap from '../World Map/WorldMap';

const Enquiry = () => {
  return (
    <div>
      <div className="page" style={{ backgroundImage: `url(${aboutBG})` }}>
        <Navbar />
        <div className="d-table">
          <div className="d-table-cell">
            <div className="page-container">
              <div className="page-title-content">
                <h2>CONTACT US</h2>
                <ul>
                  <li>
                    <Link to="/*">Home</Link>
                  </li>
                  <li>Contact Us</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Enquiry form */}
      <section className="contact-container">
        <div className="enq-form">
          <EnquiryForm />
        </div>
          {/* <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3509.887440086101!2d77.30879977615818!3d28.392467494940593!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cdd193b9fc4b1%3A0x507e6415a7ae5df0!2sVr2020%20Dental%20Designing%20Solutions%20%26%20Digital%20Laboratory%20Pvt.%20Ltd!5e0!3m2!1sen!2sin!4v1718788979144!5m2!1sen!2sin"
              width="600"
              height="450"
              style={{ border: "0" }}
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              title="map"
            ></iframe>
          </div> */}
      </section>
      <section className="worldmap">
        <WorldMap />
      </section>
      <section>
        <div>
          <Footer />
        </div>
      </section>
    </div>
  );
};

export default Enquiry;

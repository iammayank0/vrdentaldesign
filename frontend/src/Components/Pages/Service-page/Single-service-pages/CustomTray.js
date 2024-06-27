import React, { useEffect, useState } from "react";
import axiosInstance from '../../../../axiosInstance';
import "./SingleService.css";
import Navbar from "../../../Navbar/Navbar";
import { Link } from "react-router-dom";
import bgimg from '../../../../Assets/images/why-choose-img3.jpg';
import { FaArrowRight } from "react-icons/fa";
import Footer from "../../../Footer/Footer";

const CustomTray = () => {
  const [backgroundImage, setBackgroundImage] = useState('');
  const [services, setServices] = useState([]);
  const [service, setservice] = useState(null);

  useEffect(() => {
    const fetchBackgroundImage = async () => {
      try {
        const response = await axiosInstance.get('/servicebg');
        setBackgroundImage(response.data.length > 0 ? response.data[0].BackgroundImage : '');
      } catch (error) {
        console.error('Failed to fetch about background image:', error);
      }
    };

    const fetchServices = async () => {
      try {
        const response = await axiosInstance.get('/single-services'); 
        setServices(response.data);
        // Set the second service separately for use in rendering
        if (response.data.length > 1) {
          setservice(response.data[5]);
        }
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchBackgroundImage();
    fetchServices();
  }, []);
  return (
    <>
      <div
        className="page"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <Navbar />
        <div className="d-table">
          <div className="d-table-cell">
            <div className="page-container">
              <div className="page-title-content">
                <h2>{service ? service.title : "Loading..."}</h2>
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>{service ? service.title : "Loading..."}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="single-service-detail">
        <div className="page-container">
          <div className="single-service-row">
            <div className="services-button">
              <aside className="widget-area">
                <section className="services-list">
                  {services.map((service, index) => (
                    <div className="services-btn" key={index}>
                      <ul>
                        <li>
                          <Link
                            to={`/service-detail/${service.title.toLowerCase().replace(/ /g, "-")}`}
                          >
                            {service.title} <div className="arrow-icn"><FaArrowRight /></div>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  ))}
                </section>
                <section className="widget-image" style={{ backgroundImage: `url(${bgimg})` }}></section>
              </aside>
            </div>
            <div className="service-detail">
              {service && (
                <>
                  <div className="service-detail-header">
                    <h3>{service.title}</h3>
                  </div>
                  <div className="single-service-img">
                    <img src={service.image} alt={service.title} />
                  </div>
                  <div className="service-detail-desc">
                    <p>
                      <span>{service.description}</span>
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
      <section className="service-detail-footer">
        <Footer />
      </section>
    </>
  )
}

export default CustomTray

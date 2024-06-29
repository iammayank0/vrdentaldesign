import React, { useEffect, useState } from "react";
import axiosInstance from '../../../axiosInstance';
import "../Main.css";

import { FaArrowRight } from "react-icons/fa";

const Services = () => {
  const [serviceContents, setServiceContents] = useState([]);
  const [serviceUrl, setServiceUrl] = useState('');
  const [error, setError] = useState(null);

  const handleVideoError = (e) => {
    console.error("Error loading video", e);
    setError("Failed to load video");
  };


  useEffect(() => {
    const fetchServiceContents = async () => {
      try {
        const response = await axiosInstance.get('/services');
        setServiceContents(response.data);
      } catch (error) {
        console.error("Error fetching service contents:", error);
      }
    };
    const fetchServiceVideo = async () => {
      try {
        const response = await axiosInstance.get('/service-video');
        if (response.data.length > 0) {
          setServiceUrl(response.data[0].Video);
        }
      } catch (error) {
        console.error('Failed to fetch service video:', error);
        setError("Failed to fetch service video");
      }
    };

    fetchServiceVideo();
    fetchServiceContents();
  }, []);

  return (
    <div>
      {/* Services Area */}
      <section className="services-area">
        <div className="container-services">
          <div className="service-area">
            {serviceContents.map((service) => (
              <div key={service._id} className="service-content">
                <span className="service-title">{service.subTitle}</span>
                <h2>{service.title}</h2>
                <p></p>
                <p>
                  The concept of VR Dental Design arose from the need to address
                  the challenges of all modern dentists.
                </p>
                {service.description.map((item, index) => (
                  <p key={index}>✅ {item}</p>
                ))}
                <p></p>
                <div className="learnMore-button">
                  <button type="button" className="learn-more-button">
                    LEARN MORE
                    <span className="icon-circle">
                      <FaArrowRight />
                    </span>
                  </button>
                </div>
              </div>
            ))}
            <div className="services-video">
            {serviceUrl ? (
        <video className="service-video" autoPlay loop muted playsInline onError={handleVideoError}>
          <source src={serviceUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <p>{error ? error : "Loading..."}</p>
      )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;

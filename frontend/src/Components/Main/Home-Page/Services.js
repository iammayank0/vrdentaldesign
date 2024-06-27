import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Main.css";
import ServiceVideo from "../../../Assets/service.mp4"

import { FaArrowRight } from "react-icons/fa";

const Services = () => {
  const [serviceContents, setServiceContents] = useState([]);

  useEffect(() => {
    const fetchServiceContents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/services");
        setServiceContents(response.data);
      } catch (error) {
        console.error("Error fetching service contents:", error);
      }
    };

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
              <video
                className="service-video"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src={ServiceVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;

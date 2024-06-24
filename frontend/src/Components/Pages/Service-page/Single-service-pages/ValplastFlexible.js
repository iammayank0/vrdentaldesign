import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SingleService.css";
import Navbar from "../../../Navbar/Navbar";
import { Link } from "react-router-dom";
import bgimg from '../../../../Assets/images/why-choose-img3.jpg';
import { FaArrowRight } from "react-icons/fa";
import Footer from "../../../Footer/Footer";

const ValplastFlexible = () => {
  const [backgroundImage, setBackgroundImage] = useState("");
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchBackgroundImage = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/servicebg");
        setBackgroundImage(
          response.data.length > 0 ? response.data[0].BackgroundImage : ""
        );
      } catch (error) {
        console.error("Failed to fetch about background image:", error);
      }
    };

    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/doctors");
        setDoctors(response.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchBackgroundImage();
    fetchDoctors();
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
                <h2>VALPLAST FLEXIBLE</h2>
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>VALPLAST FLEXIBLE</li>
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
                  {doctors.map((doctor, index) => (
                    <div className="services-btn" key={index}>
                      <ul>
                        <li>
                          <Link
                            to={`/service-detail/${doctor.title
                              .toLowerCase()
                              .replace(/ /g, "-")}`}
                          >
                            {doctor.title} <div className="arrow-icn"><FaArrowRight /></div>
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
              {doctors.length > 0 && (
                <>
                  <div className="service-detail-header">
                    <h3>{doctors[0].title}</h3>
                  </div>
                  <div className="single-service-img">
                    <img src={doctors[0].img} alt={doctors[0].title} />
                  </div>
                  <div className="service-detail-desc">
                    <p>
                      <span>Valplast flexible is a type of removable dental prosthesis made from a flexible thermoplastic material called nylon. It is designed to provide a comfortable and aesthetic solution for replacing missing teeth. Valplast flexible dentures offer several advantages over traditional rigid acrylic dentures. The flexibility of the material allows for a precise fit, enhancing patient comfort and reducing the risk of irritation or sore spots. The lightweight and metal-free nature of Valplast make it an excellent choice for patients with metal allergies. Additionally, the gum-colored material blends seamlessly with the natural tissues, creating a more natural-looking smile. Valplast flexible dentures provide an alternative and flexible option for restoring missing teeth.</span>
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
      <section className="service-detail-footer">
        <Footer/>
      </section>
    </>
  );
};

export default ValplastFlexible;

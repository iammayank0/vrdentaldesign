import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../axiosInstance';
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import './Panel.css';
import ServiceVideoPanel from './ServiceVideoPanel';

const ServicePanel = () => {
  const [serviceContents, setServiceContents] = useState([]);
  const [formData, setFormData] = useState({
    subTitle: '',
    title: '',
    description: '',
    img1: null,
    img1Title: '',
    img2: null,
    img2Title: '',
    img3: null,
    img3Title: '',
    img4: null,
    img4Title: '',
  });

  useEffect(() => {
    fetchServiceContents();
  }, []);

  const fetchServiceContents = async () => {
    try {
      const response = await axiosInstance.get('/services');
      setServiceContents(response.data);
      if (response.data.length > 0) {
        const firstService = response.data[0];
        setFormData({
          subTitle: firstService.subTitle || '',
          title: firstService.title || '',
          description: firstService.description || '',
          img1Title: firstService.img1Title || '',
          img2Title: firstService.img2Title || '',
          img3Title: firstService.img3Title || '',
          img4Title: firstService.img4Title || '',
          img1: null,
          img2: null,
          img3: null,
          img4: null,
        });
      }
    } catch (error) {
      console.error('Error fetching service contents:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleFileChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  // };

  const handleFormSubmit = async (e, service) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      if (formData.subTitle !== service.subTitle) {
        formDataToSend.append('subTitle', formData.subTitle);
      }
      if (formData.title !== service.title) {
        formDataToSend.append('title', formData.title);
      }
      if (formData.description !== service.description) {
        formDataToSend.append('description', formData.description);
      }
      if (formData.img1Title !== service.img1Title) {
        formDataToSend.append('img1Title', formData.img1Title);
      }
      if (formData.img2Title !== service.img2Title) {
        formDataToSend.append('img2Title', formData.img2Title);
      }
      if (formData.img3Title !== service.img3Title) {
        formDataToSend.append('img3Title', formData.img3Title);
      }
      if (formData.img4Title !== service.img4Title) {
        formDataToSend.append('img4Title', formData.img4Title);
      }
      if (formData.img1) {
        formDataToSend.append('img1', formData.img1);
      }
      if (formData.img2) {
        formDataToSend.append('img2', formData.img2);
      }
      if (formData.img3) {
        formDataToSend.append('img3', formData.img3);
      }
      if (formData.img4) {
        formDataToSend.append('img4', formData.img4);
      }

      const response = await axiosInstance.put(`/services/${service._id}`, formDataToSend, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        fetchServiceContents();
        setFormData({ subTitle: '', title: '', description: '', img1Title: '', img2Title: '', img3Title: '', img4Title: '', img1: null, img2: null, img3: null, img4: null });
      } else {
        console.error('Update failed:', response.statusText);
      }
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  return (
    <div className="panel-container">
      <div className="panel-button">
              <aside className="panel-widget-area">
                <section className="panel-list">
                    <div className="panel-btn" >
                    <Link to="/admin" ><h3>Home Page</h3></Link>
                      <ul>
                        <li>
                          <Link
                            to="/admin/nav-panel"
                          >
                            Navbar <div className="arrow-icn"><FaArrowRight /></div>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/admin/banner"
                          >
                            Banner <div className="arrow-icn"><FaArrowRight /></div>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/admin/about-section"
                          >
                            About <div className="arrow-icn"><FaArrowRight /></div>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/admin/funFacts"
                          >
                            Fun Facts <div className="arrow-icn"><FaArrowRight /></div>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/admin/OurSpecialisation"
                          >
                            Our Specialisation <div className="arrow-icn"><FaArrowRight /></div>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/admin/wycu"
                          >
                            Why You Choose Us <div className="arrow-icn"><FaArrowRight /></div>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/admin/services"
                          >
                            Services <div className="arrow-icn"><FaArrowRight /></div>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/admin/cta"
                          >
                            CTA <div className="arrow-icn"><FaArrowRight /></div>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/admin/partners"
                          >
                            Partners Image <div className="arrow-icn"><FaArrowRight /></div>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/admin/blog"
                          >
                            Blogs <div className="arrow-icn"><FaArrowRight /></div>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/admin/footer"
                          >
                            Footer <div className="arrow-icn"><FaArrowRight /></div>
                          </Link>
                        </li>
                      </ul>
                    </div>
                </section>
              </aside>
            </div>
      <div className="panel-form">
      <div className="admin-slide-container">
      <h2 className="admin-slide-heading">Service Panel</h2>
      {serviceContents.map((service) => (
        <div key={service._id} className="service">
          <form className="admin-form" onSubmit={(e) => handleFormSubmit(e, service)}>
            
            <div>
              <label htmlFor="subTitle">Sub Title:</label>
              <input type="text" name="subTitle" value={formData.subTitle} onChange={handleChange} placeholder="Sub Title" />
            </div>
            <div>
              <label htmlFor="title">Title:</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" />
            </div>
            <div>
              <label htmlFor="description">Description:</label>
              <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
            </div>
            <button type="submit">Update</button>
          </form>
        </div>
      ))}
      <div className="servic-video-panel">
        <ServiceVideoPanel />
      </div>
    </div>
      </div>
    </div>
  );
};

export default ServicePanel;

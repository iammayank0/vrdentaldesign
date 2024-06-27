import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../axiosInstance';
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import './Panel.css';

const CTAPanel = () => {
  const [ctaContent, setCtaContent] = useState(null);
  const [formData, setFormData] = useState({
    CTAbg: null,
    ctaTitle: '',
    ctaSubtitle: '',
    phoneNumber: '',
  });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchCTAContent();
  }, []);

  const fetchCTAContent = async () => {
    try {
      const response = await axiosInstance.get('/CTA');
      if (response.data.length > 0) {
        setCtaContent(response.data[0]);
      }
    } catch (error) {
      console.error('Error fetching CTA content:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  const handleEdit = () => {
    if (ctaContent) {
      const { ctaTitle, ctaSubtitle, phoneNumber } = ctaContent;
      setFormData({
        CTAbg: null,
        ctaTitle,
        ctaSubtitle,
        phoneNumber,
      });
      setEditing(true);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('ctaTitle', formData.ctaTitle);
      formDataToSend.append('ctaSubtitle', formData.ctaSubtitle);
      formDataToSend.append('phoneNumber', formData.phoneNumber);
      if (formData.CTAbg) {
        formDataToSend.append('CTAbg', formData.CTAbg);
      }

      const response = await axiosInstance.put(`/CTA/${ctaContent._id}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        fetchCTAContent();
        setFormData({ CTAbg: null, ctaTitle: '', ctaSubtitle: '', phoneNumber: '' });
        setEditing(false);
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
      <div className="Cta-panel-container">
      <h2 className="cta-panel-heading">CTA Panel</h2>
      <form className="admin-form" onSubmit={handleUpdate}>
        <div>
          <label htmlFor="CTAbg">Background Image:</label>
          <input type="file" name="CTAbg" onChange={handleFileChange} accept="image/*" />
        </div>
        <div>
          <label htmlFor="ctaTitle">CTA Title:</label>
          <input type="text" name="ctaTitle" value={formData.ctaTitle} onChange={handleChange} placeholder="CTA Title" required />
        </div>
        <div>
          <label htmlFor="ctaSubtitle">CTA Subtitle:</label>
          <input type="text" name="ctaSubtitle" value={formData.ctaSubtitle} onChange={handleChange} placeholder="CTA Subtitle" required />
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Phone Number" required />
        </div>
        <button type="submit">Update</button>
        {editing && <button type="button" onClick={() => setEditing(false)}>Cancel</button>}
      </form>
      {ctaContent && !editing && (
        <div>
          <h3>{ctaContent.ctaTitle}</h3>
          <p>{ctaContent.ctaSubtitle}</p>
          <p>Phone Number: {ctaContent.phoneNumber}</p>
          <button onClick={handleEdit}>Edit</button>
        </div>
      )}
    </div>
      </div>
    </div>
  );
};

export default CTAPanel;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
      const response = await axios.get('http://localhost:5000/api/CTA');
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

      const response = await axios.put(`http://localhost:5000/api/CTA/${ctaContent._id}`, formDataToSend, {
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
    <div className="admin-panel-container">
      <h2 className="admin-panel-heading">CTA Panel</h2>
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
  );
};

export default CTAPanel;

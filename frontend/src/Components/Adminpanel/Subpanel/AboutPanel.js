import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Panel.css';

const AboutPanel = () => {
  const [aboutContent, setAboutContent] = useState(null);
  const [formData, setFormData] = useState({
    subTitle: '',
    title: '',
    description: '',
    services: '',
    companyName: '',
    founders: '',
    img1: null,
    img2: null,
    signImage: null,
  });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchAboutContent();
  }, []);

  const fetchAboutContent = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/about');
      setAboutContent(response.data);
    } catch (error) {
      console.error('Error fetching About content:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  const handleEdit = () => {
    if (aboutContent) {
      const { subTitle, title, description, services, companyName, founders } = aboutContent;
      setFormData({
        subTitle,
        title,
        description,
        services: services.join('\n'), // Convert services array to newline separated string
        companyName,
        founders,
        img1: null,
        img2: null,
        signImage: null,
      });
      setEditing(true);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('subTitle', formData.subTitle);
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('services', JSON.stringify(formData.services.split('\n')));
      formDataToSend.append('companyName', formData.companyName);
      formDataToSend.append('founders', formData.founders);
      if (formData.img1) {
        formDataToSend.append('img1', formData.img1);
      }
      if (formData.img2) {
        formDataToSend.append('img2', formData.img2);
      }
      if (formData.signImage) {
        formDataToSend.append('signImage', formData.signImage);
      }

      const response = await axios.put(`http://localhost:5000/api/about/${aboutContent._id}`, formDataToSend, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        fetchAboutContent();
        setFormData({ subTitle: '', title: '', description: '', services: '', companyName: '', founders: '', img1: null, img2: null, signImage: null });
        setEditing(false);
      } else {
        console.error('Update failed:', response.statusText);
      }
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  return (
    <div className="admin-slide-container">
      <h2 className="admin-slide-heading">About Panel</h2>
      <form className="admin-form" onSubmit={handleUpdate}>
        <div>
          <label htmlFor="img1">Image 1:</label>
          <input type="file" name="img1" onChange={handleFileChange} accept="image/*" />
        </div>
        <div>
          <label htmlFor="img2">Image 2:</label>
          <input type="file" name="img2" onChange={handleFileChange} accept="image/*" />
        </div>
        <div>
          <label htmlFor="signImage">Sign Image:</label>
          <input type="file" name="signImage" onChange={handleFileChange} accept="image/*" />
        </div>
        <div>
          <label htmlFor="subTitle">Sub Title:</label>
          <input type="text" name="subTitle" value={formData.subTitle} onChange={handleChange} placeholder="Sub Title" required />
        </div>
        <div>
          <label htmlFor="title">Title:</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
        </div>
        <div>
          <label htmlFor="services">Services:</label>
          <textarea name="services" value={formData.services} onChange={handleChange} placeholder="Services (one per line)" required />
        </div>
        <div>
          <label htmlFor="companyName">Company Name:</label>
          <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Company Name" required />
        </div>
        <div>
          <label htmlFor="founders">Founders:</label>
          <input type="text" name="founders" value={formData.founders} onChange={handleChange} placeholder="Founders" required />
        </div>
        <button type="submit">Update</button>
        {editing && <button type="button" onClick={() => setEditing(false)}>Cancel</button>}
      </form>
      {aboutContent && !editing && (
        <div>
          <h3>{aboutContent.title}</h3>
          <p>{aboutContent.subTitle}</p>
          <p>{aboutContent.description}</p>
          <p>Services: {aboutContent.services.join(', ')}</p>
          <p>Company Name: {aboutContent.companyName}</p>
          <p>Founders: {aboutContent.founders}</p>
          <button onClick={handleEdit}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default AboutPanel;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Panel.css';

const Main = () => {
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
      const response = await axios.get('http://localhost:5000/api/services');
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

  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

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

      const response = await axios.put(`http://localhost:5000/api/services/${service._id}`, formDataToSend, {
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
    <div className="admin-slide-container">
      <h2 className="admin-slide-heading">Service Panel</h2>
      {serviceContents.map((service) => (
        <div key={service._id} className="service">
          <form className="admin-form" onSubmit={(e) => handleFormSubmit(e, service)}>
            <div>
              <label htmlFor="img1">Image 1:</label>
              <input type="file" name="img1" onChange={handleFileChange} accept="image/*" />
              <input type="text" name="img1Title" value={formData.img1Title} onChange={handleChange} placeholder="Image 1 Title" />
            </div>
            <div>
              <label htmlFor="img2">Image 2:</label>
              <input type="file" name="img2" onChange={handleFileChange} accept="image/*" />
              <input type="text" name="img2Title" value={formData.img2Title} onChange={handleChange} placeholder="Image 2 Title" />
            </div>
            <div>
              <label htmlFor="img3">Image 3:</label>
              <input type="file" name="img3" onChange={handleFileChange} accept="image/*" />
              <input type="text" name="img3Title" value={formData.img3Title} onChange={handleChange} placeholder="Image 3 Title" />
            </div>
            <div>
              <label htmlFor="img4">Image 4:</label>
              <input type="file" name="img4" onChange={handleFileChange} accept="image/*" />
              <input type="text" name="img4Title" value={formData.img4Title} onChange={handleChange} placeholder="Image 4 Title" />
            </div>
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
    </div>
  );
};

export default Main;

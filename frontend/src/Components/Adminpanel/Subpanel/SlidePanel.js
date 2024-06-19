import React, { useState, useEffect } from 'react';
import './Panel.css';

const SlidePanel = () => {
  const [slides, setSlides] = useState([]);
  const [formData, setFormData] = useState({ title: '', heading: '', description: '', position: '', image: null });
  const [editingItemId, setEditingItemId] = useState(null);

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/banner');
      const data = await response.json();
      setSlides(data);
    } catch (error) {
      console.error('Error fetching slides:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('heading', formData.heading);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('position', formData.position);
      formDataToSend.append('image', formData.image);
  
      const response = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formDataToSend
      });
      if (response.ok) {
        // handle success
        await fetchSlides(); // Refetch slides to get the updated list
        setFormData({ title: '', heading: '', description: '', position: '', image: null });
      } else {
        console.error('Create failed:', response.statusText);
      }
    } catch (error) {
      console.error('Create error:', error);
    }
  };
  
  
  

  const handleEdit = (itemId) => {
    const slideToEdit = slides.find((slide) => slide._id === itemId);
    if (slideToEdit) {
      const { _id, title, heading, description, position } = slideToEdit;
      setFormData({ _id, title, heading, description, position, image: null });
      setEditingItemId(itemId);
    }
  };
  

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('heading', formData.heading);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('position', formData.position);
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      const response = await fetch(`http://localhost:5000/api/banner/${editingItemId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formDataToSend
      });
      if (response.ok) {
        await fetchSlides();
        setFormData({ title: '', heading: '', description: '', position: '', image: null });
        setEditingItemId(null);
      } else {
        console.error('Update failed:', response.statusText);
      }
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  const handleDelete = async (itemId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/banner/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        // handle success
        await fetchSlides(); // Refresh the slides after deletion
      } else {
        console.error('Delete failed:', response.statusText);
      }
    } catch (error) {
      console.error('Delete error:', error);
    }
  };
  

  return (
    <div className="admin-slide-container">
      <h2 className="admin-slide-heading">Slide Panel</h2>
      <form className="admin-form" onSubmit={editingItemId ? handleUpdate : handleCreate}>
        <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
        <input type="text" name="heading" value={formData.heading} onChange={handleChange} placeholder="Heading" required />
        <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
        <input type="number" name="position" value={formData.position} onChange={handleChange} placeholder="Position" required />
        <input type="file" name="image" onChange={handleFileChange} accept="image/*" />
        <button type="submit">{editingItemId ? 'Update' : 'Create'}</button>
        {editingItemId && <button type="button" onClick={() => setEditingItemId(null)}>Cancel</button>}
      </form>
      <ul className="slide-list">
        {slides.sort((a, b) => a.position - b.position).map((slide) => (
          <li key={slide._id}>
            <h3>{slide.title}</h3>
            <p>{slide.heading}</p>
            <p>{slide.description}</p>
            <p>Position: {slide.position}</p>
            <button onClick={() => handleEdit(slide._id)}>Edit</button>
            <button onClick={() => handleDelete(slide._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SlidePanel;

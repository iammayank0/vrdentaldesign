import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Panel.css';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const DoctorPanel = () => {
  const [doctors, setDoctors] = useState([]);
  const [newDoctor, setNewDoctor] = useState({ title: '', time: '', img: null, socialLinks: { facebook: '', twitter: '', linkedin: '', instagram: '' } });
  const [editingDoctor, setEditingDoctor] = useState(null);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/doctors');
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDoctor({ ...newDoctor, [name]: value });
  };

  const handleFileChange = (e) => {
    setNewDoctor({ ...newDoctor, img: e.target.files[0] });
  };

  const handleSocialLinkChange = (e) => {
    const { name, value } = e.target;
    setNewDoctor({ ...newDoctor, socialLinks: { ...newDoctor.socialLinks, [name]: value } });
  };

  const handleAddDoctor = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('img', newDoctor.img);
    formData.append('title', newDoctor.title);
    formData.append('time', newDoctor.time);
    formData.append('facebook', newDoctor.socialLinks.facebook);
    formData.append('twitter', newDoctor.socialLinks.twitter);
    formData.append('linkedin', newDoctor.socialLinks.linkedin);
    formData.append('instagram', newDoctor.socialLinks.instagram);

    try {
      await axios.post('http://localhost:5000/api/doctors/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      fetchDoctors();
      setNewDoctor({ title: '', time: '', img: null, socialLinks: { facebook: '', twitter: '', linkedin: '', instagram: '' } });
    } catch (error) {
      console.error('Error adding doctor:', error);
    }
  };

  const handleEditDoctor = (doctor) => {
    setEditingDoctor(doctor);
    setNewDoctor({ title: doctor.title, time: doctor.time, img: null, socialLinks: { ...doctor.socialLinks } });
  };

  const handleUpdateDoctor = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (newDoctor.img) {
      formData.append('img', newDoctor.img);
    }
    formData.append('title', newDoctor.title);
    formData.append('time', newDoctor.time);
    formData.append('facebook', newDoctor.socialLinks.facebook);
    formData.append('twitter', newDoctor.socialLinks.twitter);
    formData.append('linkedin', newDoctor.socialLinks.linkedin);
    formData.append('instagram', newDoctor.socialLinks.instagram);

    try {
      await axios.put(`http://localhost:5000/api/doctors/${editingDoctor._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      fetchDoctors();
      setEditingDoctor(null);
      setNewDoctor({ title: '', time: '', img: null, socialLinks: { facebook: '', twitter: '', linkedin: '', instagram: '' } });
    } catch (error) {
      console.error('Error updating doctor:', error);
    }
  };

  const handleDeleteDoctor = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/doctors/${id}`);
      fetchDoctors();
    } catch (error) {
      console.error('Error deleting doctor:', error);
    }
  };

  return (
    <div className="admin-panel">
      <h2>Doctor Management Panel</h2>
      <form onSubmit={editingDoctor ? handleUpdateDoctor : handleAddDoctor}>
        <input type="text" name="title" placeholder="Title" value={newDoctor.title} onChange={handleInputChange} required />
        <input type="text" name="time" placeholder="Time" value={newDoctor.time} onChange={handleInputChange} required />
        <input type="file" name="img" onChange={handleFileChange} />
        <input type="text" name="facebook" placeholder="Facebook" value={newDoctor.socialLinks.facebook} onChange={handleSocialLinkChange} />
        <input type="text" name="twitter" placeholder="Twitter" value={newDoctor.socialLinks.twitter} onChange={handleSocialLinkChange} />
        <input type="text" name="linkedin" placeholder="LinkedIn" value={newDoctor.socialLinks.linkedin} onChange={handleSocialLinkChange} />
        <input type="text" name="instagram" placeholder="Instagram" value={newDoctor.socialLinks.instagram} onChange={handleSocialLinkChange} />
        <button type="submit">{editingDoctor ? 'Update Doctor' : 'Add Doctor'}</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Time</th>
            <th>Image</th>
            <th>Social Links</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor) => (
            <tr key={doctor._id}>
              <td>{doctor.title}</td>
              <td>{doctor.time}</td>
              <td><img src={doctor.img} alt={doctor.title} width="50" /></td>
              <td>
                {doctor.socialLinks.facebook && <a href={doctor.socialLinks.facebook} target="_blank" rel="noopener noreferrer"><FaFacebook /></a>}
                {doctor.socialLinks.twitter && <a href={doctor.socialLinks.twitter} target="_blank" rel="noopener noreferrer"><FaTwitter /></a>}
                {doctor.socialLinks.linkedin && <a href={doctor.socialLinks.linkedin} target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>}
                {doctor.socialLinks.instagram && <a href={doctor.socialLinks.instagram} target="_blank" rel="noopener noreferrer"><FaInstagram /></a>}
              </td>
              <td>
                <button onClick={() => handleEditDoctor(doctor)}>Edit</button>
                <button onClick={() => handleDeleteDoctor(doctor._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorPanel;

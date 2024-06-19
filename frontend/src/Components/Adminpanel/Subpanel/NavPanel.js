import React, { useState, useEffect } from 'react';
import './Panel.css';

const NavPanel = () => {
  const [navbarItems, setNavbarItems] = useState([]);
  const [contactInfo, setContactInfo] = useState({});
  const [socialLinks, setSocialLinks] = useState([]);
  const [formData, setFormData] = useState({ title: '', url: '', position: '' });
  const [editingItemId, setEditingItemId] = useState(null);

  useEffect(() => {
    fetchNavbarItems();
    fetchContactInfo();
    fetchSocialLinks();
  }, []);

  const fetchNavbarItems = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/navbar');
      const data = await response.json();
      setNavbarItems(data);
    } catch (error) {
      console.error('Error fetching navbar items:', error);
    }
  };

  const fetchContactInfo = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/contact-info');
      const data = await response.json();
      setContactInfo(data);
    } catch (error) {
      console.error('Error fetching contact info:', error);
    }
  };

  const fetchSocialLinks = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/social-links');
      const data = await response.json();
      setSocialLinks(data);
    } catch (error) {
      console.error('Error fetching social links:', error);
    }
  };
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleContactInfoChange = (e) => {
    setContactInfo({ ...contactInfo, [e.target.name]: e.target.value });
  };
  

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/navbar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        await fetchNavbarItems(); 
        setFormData({ title: '', url: '', position: '' }); 
      } else {
        console.error('Create failed:', response.statusText);
      }
    } catch (error) {
      console.error('Create error:', error);
    }
  };

  const handleEdit = (itemId) => {
    const itemToEdit = navbarItems.find(item => item._id === itemId);
    if (itemToEdit) {
      setFormData({ title: itemToEdit.title, url: itemToEdit.url, position: itemToEdit.position });
      setEditingItemId(itemId);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/navbar/${editingItemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        await fetchNavbarItems(); 
        setFormData({ title: '', url: '', position: '' }); 
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
      const response = await fetch(`http://localhost:5000/api/navbar/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        await fetchNavbarItems(); 
      } else {
        console.error('Delete failed:', response.statusText);
      }
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const handleContactInfoUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/contact-info`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(contactInfo) 
      });
      if (response.ok) {
        await fetchContactInfo();
      } else {
        console.error('Update failed:', response.statusText);
      }
    } catch (error) {
      console.error('Update error:', error);
    }
  };
  
  

  const handleSocialLinkEdit = (itemId) => {
    const linkToEdit = socialLinks.find(link => link._id === itemId);
    if (linkToEdit) {
      setFormData({ url: linkToEdit.url, icon: linkToEdit.icon });
      setEditingItemId(itemId);
    }
  };

  const handleSocialLinkUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/social-links/${editingItemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        await fetchSocialLinks();
        setFormData({ url: '', icon: '' }); 
        setEditingItemId(null); 
      } else {
        console.error('Update failed:', response.statusText);
      }
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  return (
    <div className="admin-nav-container">
      <h2 className="admin-nav-heading">Navbar Panel</h2>
      <form className="admin-form" onSubmit={editingItemId ? handleUpdate : handleCreate}>
        <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
        <input type="text" name="url" value={formData.url} onChange={handleChange} placeholder="URL" required />
        <input type="number" name="position" value={formData.position} onChange={handleChange} placeholder="Position" required />
        <button type="submit">{editingItemId ? 'Update' : 'Create'}</button>
        {editingItemId && <button type="button" onClick={() => setEditingItemId(null)}>Cancel</button>}
      </form>
      <ul className="navbar-item-list">
        {navbarItems.sort((a, b) => a.position - b.position).map(item => (
          <li key={item._id}>
            {item.title} - {item.url} - Position: {item.position}
            <button onClick={() => handleEdit(item._id)}>Edit</button>
            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </li>
        ))}
      </ul>


      {/* Contact Info Form */}
      <form className="admin-form" onSubmit={handleContactInfoUpdate}>
        <input type="text" name="phone" value={contactInfo.phone || ''} onChange={handleContactInfoChange} placeholder="Phone" required />
        <input type="text" name="email" value={contactInfo.email || ''} onChange={handleContactInfoChange} placeholder="Email" required />
        <button type="submit">Update Contact Info</button>
      </form>


      {/* Social Links Form */}
      <form className="admin-form" onSubmit={handleSocialLinkUpdate}>
        <input type="text" name="url" value={formData.url} onChange={handleChange} placeholder="URL" required />
        <input type="text" name="icon" value={formData.icon} onChange={handleChange} placeholder="Icon" required />
        <button type="submit">{editingItemId ? 'Update' : 'Create'}</button>
        {editingItemId && <button type="button" onClick={() => setEditingItemId(null)}>Cancel</button>}
      </form>
      {/* Social Links List */}
      <ul className="social-links-list">
        {socialLinks.map((link) => (
          <li key={link._id}>
            <a href={link.url}>{link.icon}</a>
            <button onClick={() => handleSocialLinkEdit(link._id)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavPanel;

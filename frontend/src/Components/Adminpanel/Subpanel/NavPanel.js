import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import './Panel.css';

const NavPanel = () => {
  const [navbarItems, setNavbarItems] = useState([]);
  const [contactInfo, setContactInfo] = useState({});
  const [socialLinks, setSocialLinks] = useState([]);
  const [logo, setLogo] = useState({});
  const [formData, setFormData] = useState({ title: '', url: '', position: '' });
  const [editingItemId, setEditingItemId] = useState(null);

  useEffect(() => {
    fetchNavbarItems();
    fetchContactInfo();
    fetchSocialLinks();
    fetchLogo();
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

  const fetchLogo = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/logo');
      const data = await response.json();
      setLogo(data);
    } catch (error) {
      console.error('Error fetching logo:', error);
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

  const handleLogoUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', e.target.logo.files[0]);

    try {
      const response = await fetch('http://localhost:5000/api/logo', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        await fetchLogo();
      } else {
        console.error('Logo upload failed:', response.statusText);
      }
    } catch (error) {
      console.error('Logo upload error:', error);
    }
  };

  const handleLogoEdit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', e.target.logo.files[0]);

    try {
      const response = await fetch(`http://localhost:5000/api/logo/${logo._id}`, {
        method: 'PUT',
        body: formData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        await fetchLogo();
      } else {
        console.error('Logo update failed:', response.statusText);
      }
    } catch (error) {
      console.error('Logo update error:', error);
    }
  };

  return (
    <div className="panel-container">
      <div className="panel-button">
              <aside className="panel-widget-area">
                <section className="panel-list">
                    <div className="panel-btn" >
                    <h3>Home Page</h3>
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
      <ul className="social-links-list">
        {socialLinks.map((link) => (
          <li key={link._id}>
            <a href={link.url}>{link.icon}</a>
            <button onClick={() => handleSocialLinkEdit(link._id)}>Edit</button>
          </li>
        ))}
      </ul>

      {/* Logo Upload Form */}
      <form className="admin-form" onSubmit={logo._id ? handleLogoEdit : handleLogoUpload}>
        <input type="file" name="logo" required />
        <button type="submit">{logo._id ? 'Update Logo' : 'Upload Logo'}</button>
      </form>
      {logo.url && (
        <div className="logo-preview">
          <img src={logo.url} alt="Current Logo" />
        </div>
      )}
      </div>
    </div>
  );
};

export default NavPanel;

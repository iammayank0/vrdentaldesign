import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Panel.css';

const FooterPanel = () => {
  const [footer, setFooter] = useState({
    description: { logo: '', text: '' },
    socialLinks: { facebook: '', twitter: '', linkedin: '', instagram: '' },
    quickLinks: [],
    contactInfo: { location1: '', location2: '', phone: '' },
    copyright: '',
  });

  useEffect(() => {
    const fetchFooter = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/footer');
        setFooter(response.data);
      } catch (error) {
        console.error('Error fetching footer data:', error);
      }
    };

    fetchFooter();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFooter(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSocialLinkChange = (e) => {
    const { name, value } = e.target;
    setFooter(prevState => ({
      ...prevState,
      socialLinks: {
        ...prevState.socialLinks,
        [name]: value,
      }
    }));
  };

  const handleQuickLinkChange = (index, e) => {
    const { name, value } = e.target;
    const updatedQuickLinks = [...footer.quickLinks];
    updatedQuickLinks[index][name] = value;
    setFooter(prevState => ({
      ...prevState,
      quickLinks: updatedQuickLinks,
    }));
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('logo', file);

    try {
      const response = await axios.post('http://localhost:5000/api/footer/upload-logo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setFooter(prevState => ({
        ...prevState,
        description: {
          ...prevState.description,
          logo: response.data.logoUrl,
        },
      }));

      console.log('Logo uploaded successfully');
    } catch (error) {
      console.error('Error uploading logo:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/footer/edit/${footer._id}`, footer);
      if (response.status === 200) {
        console.log('Footer updated successfully');
      } else {
        console.error('Update failed:', response.statusText);
      }
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  return (
    <div className="footer-panel-container">
      <h2 className="footer-panel-heading">Footer Panel</h2>
      
      {/* Description Section */}
      <div className="footer-section">
        <h3>Description</h3>
        <input
          type="text"
          name="description.text"
          value={footer.description.text}
          onChange={handleChange}
          placeholder="Description Text"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleLogoUpload}
          required
        />
        {footer.description.logo && (
          <img src={footer.description.logo} alt="Logo" className="footer-logo-preview" />
        )}
      </div>

      {/* Social Links Section */}
      <div className="footer-section">
        <h3>Social Links</h3>
        <input
          type="text"
          name="socialLinks.facebook"
          value={footer.socialLinks.facebook}
          onChange={handleSocialLinkChange}
          placeholder="Facebook"
          required
        />
        <input
          type="text"
          name="socialLinks.twitter"
          value={footer.socialLinks.twitter}
          onChange={handleSocialLinkChange}
          placeholder="Twitter"
          required
        />
        <input
          type="text"
          name="socialLinks.linkedin"
          value={footer.socialLinks.linkedin}
          onChange={handleSocialLinkChange}
          placeholder="LinkedIn"
          required
        />
        <input
          type="text"
          name="socialLinks.instagram"
          value={footer.socialLinks.instagram}
          onChange={handleSocialLinkChange}
          placeholder="Instagram"
          required
        />
      </div>

      {/* Quick Links Section */}
      <div className="footer-section">
        <h3>Quick Links</h3>
        {footer.quickLinks.map((link, index) => (
          <div key={index}>
            <input
              type="text"
              name={`quickLinks[${index}].text`}
              value={link.text}
              onChange={(e) => handleQuickLinkChange(index, e)}
              placeholder="Link Text"
              required
            />
            <input
              type="text"
              name={`quickLinks[${index}].url`}
              value={link.url}
              onChange={(e) => handleQuickLinkChange(index, e)}
              placeholder="Link URL"
              required
            />
          </div>
        ))}
      </div>

      {/* Contact Info Section */}
      <div className="footer-section">
        <h3>Contact Information</h3>
        <input
          type="text"
          name="contactInfo.location1"
          value={footer.contactInfo.location1}
          onChange={handleChange}
          placeholder="Location 1"
          required
        />
        <input
          type="text"
          name="contactInfo.location2"
          value={footer.contactInfo.location2}
          onChange={handleChange}
          placeholder="Location 2"
          required
        />
        <input
          type="text"
          name="contactInfo.phone"
          value={footer.contactInfo.phone}
          onChange={handleChange}
          placeholder="Phone"
          required
        />
      </div>

      {/* Copyright Section */}
      <div className="footer-section">
        <h3>Copyright</h3>
        <input
          type="text"
          name="copyright"
          value={footer.copyright}
          onChange={handleChange}
          placeholder="Copyright Text"
          required
        />
      </div>

      {/* Submit Button */}
      <button onClick={handleSubmit}>Update Footer</button>
    </div>
  );
};

export default FooterPanel;

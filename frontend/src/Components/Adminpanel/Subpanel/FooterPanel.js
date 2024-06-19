import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FooterPanel = () => {
  const [footerData, setFooterData] = useState({
    _id: '',
    description: {
      logo: '',
      text: '',
    },
    socialLinks: {
      facebook: '',
      twitter: '',
      linkedin: '',
      instagram: '',
    },
    quickLinks: [
      {
        text: '',
        url: '',
      },
    ],
    contactInfo: {
      location1: '',
      location2: '',
      phone: '',
    },
    copyright: '',
  });

  useEffect(() => {
    fetchFooterData();
  }, []);

  const fetchFooterData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/footer');
      if (response.data) {
        setFooterData(response.data);
      } else {
        console.error('No footer data found');
      }
    } catch (error) {
      console.error('Error fetching footer data:', error);
    }
  };

  const handleChangeQuickLinks = (e, index, field) => {
    const updatedQuickLinks = [...footerData.quickLinks];
    updatedQuickLinks[index][field] = e.target.value;
    setFooterData({
      ...footerData,
      quickLinks: updatedQuickLinks,
    });
  };

  const handleAddQuickLink = () => {
    setFooterData({
      ...footerData,
      quickLinks: [
        ...footerData.quickLinks,
        { text: '', url: '' },
      ],
    });
  };

  const handleRemoveQuickLink = (index) => {
    const updatedQuickLinks = [...footerData.quickLinks];
    updatedQuickLinks.splice(index, 1);
    setFooterData({
      ...footerData,
      quickLinks: updatedQuickLinks,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/api/footer/edit/${footerData._id}`, {
        description: footerData.description,
        socialLinks: footerData.socialLinks,
        quickLinks: footerData.quickLinks, // Ensure quickLinks is in the correct format
        contactInfo: footerData.contactInfo,
        copyright: footerData.copyright,
      });

      if (response.status === 200) {
        console.log('Footer data updated successfully.');
        fetchFooterData(); // Refresh data after update
      } else {
        console.error('Update failed:', response.statusText);
      }
    } catch (error) {
      console.error('Update error:', error);
      if (error.response) {
        console.error('Server response:', error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Request setup error:', error.message);
      }
    }
  };

  return (
    <div className="footer-panel">
      <h2>Edit Footer</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Description Text:</label>
          <input
            type="text"
            value={footerData.description.text}
            onChange={(e) => setFooterData({ ...footerData, description: { ...footerData.description, text: e.target.value } })}
          />
        </div>
        <div>
          <label>Social Links:</label>
          <input
            type="text"
            value={footerData.socialLinks.facebook}
            onChange={(e) => setFooterData({ ...footerData, socialLinks: { ...footerData.socialLinks, facebook: e.target.value } })}
            placeholder="Facebook"
          />
          <input
            type="text"
            value={footerData.socialLinks.twitter}
            onChange={(e) => setFooterData({ ...footerData, socialLinks: { ...footerData.socialLinks, twitter: e.target.value } })}
            placeholder="Twitter"
          />
          <input
            type="text"
            value={footerData.socialLinks.linkedin}
            onChange={(e) => setFooterData({ ...footerData, socialLinks: { ...footerData.socialLinks, linkedin: e.target.value } })}
            placeholder="LinkedIn"
          />
          <input
            type="text"
            value={footerData.socialLinks.instagram}
            onChange={(e) => setFooterData({ ...footerData, socialLinks: { ...footerData.socialLinks, instagram: e.target.value } })}
            placeholder="Instagram"
          />
        </div>
        <div>
          <label>Quick Links:</label>
          {footerData.quickLinks.map((link, index) => (
            <div key={index}>
              <input
                type="text"
                value={link.text}
                onChange={(e) => handleChangeQuickLinks(e, index, 'text')}
                placeholder="Text"
              />
              <input
                type="text"
                value={link.url}
                onChange={(e) => handleChangeQuickLinks(e, index, 'url')}
                placeholder="URL"
              />
              {index > 0 && (
                <button type="button" onClick={() => handleRemoveQuickLink(index)}>Remove</button>
              )}
            </div>
          ))}
          <button type="button" onClick={handleAddQuickLink}>Add Quick Link</button>
        </div>
        <div>
          <label>Contact Info:</label>
          <input
            type="text"
            value={footerData.contactInfo.location1}
            onChange={(e) => setFooterData({ ...footerData, contactInfo: { ...footerData.contactInfo, location1: e.target.value } })}
            placeholder="Location 1"
          />
          <input
            type="text"
            value={footerData.contactInfo.location2}
            onChange={(e) => setFooterData({ ...footerData, contactInfo: { ...footerData.contactInfo, location2: e.target.value } })}
            placeholder="Location 2"
          />
          <input
            type="text"
            value={footerData.contactInfo.phone}
            onChange={(e) => setFooterData({ ...footerData, contactInfo: { ...footerData.contactInfo, phone: e.target.value } })}
            placeholder="Phone"
          />
        </div>
        <div>
          <label>Copyright:</label>
          <input
            type="text"
            value={footerData.copyright}
            onChange={(e) => setFooterData({ ...footerData, copyright: e.target.value })}
          />
        </div>
        <button type="submit">Update Footer</button>
      </form>
    </div>
  );
};

export default FooterPanel;

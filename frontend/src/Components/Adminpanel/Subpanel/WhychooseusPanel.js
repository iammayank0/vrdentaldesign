import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../axiosInstance';
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import './Panel.css';

const WhyChooseUsPanel = () => {
  const [content, setContent] = useState(null);
  const [formData, setFormData] = useState({
    sectionTitle: '',
    subtitle: '',
    mainImage: null,
    features: [
      { title: '', description: '', image: null },
      { title: '', description: '', image: null },
      { title: '', description: '', image: null },
      { title: '', description: '', image: null }
    ]
  });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchWhyChooseUsContent();
  }, []);

  const fetchWhyChooseUsContent = async () => {
    try {
      const response = await axiosInstance.get('/whychooseus');
      setContent(response.data);
    } catch (error) {
      console.error('Error fetching Why Choose Us content:', error);
    }
  };

  const handleChange = (e, index) => {
    const { name, value, files } = e.target;
    if (name.includes('Title') || name.includes('Description')) {
      const fieldName = name.includes('Title') ? 'title' : 'description';
      setFormData({
        ...formData,
        features: formData.features.map((feature, i) =>
          i === index ? { ...feature, [fieldName]: value } : feature
        )
      });
    } else if (name.includes('Image')) {
      setFormData({
        ...formData,
        features: formData.features.map((feature, i) =>
          i === index ? { ...feature, image: files[0] } : feature
        )
      });
    }
  };
  


  const handleEdit = () => {
    if (content) {
      const { sectionTitle, subtitle, features } = content;
      setFormData({
        sectionTitle,
        subtitle,
        features: features.map(feature => ({ ...feature, image: null }))
      });
      setEditing(true);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('sectionTitle', formData.sectionTitle);
      formDataToSend.append('subtitle', formData.subtitle);
      formDataToSend.append('mainImage', formData.mainImage); // Include mainImage
      formDataToSend.append('features', JSON.stringify(formData.features.map(feature => ({
        title: feature.title,
        description: feature.description
      }))));
      formData.features.forEach((feature, index) => {
        formDataToSend.append(`feature${index + 1}Image`, feature.image);
      });

      const response = await axiosInstance.put(`/whychooseus/${content._id}`, formDataToSend, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        fetchWhyChooseUsContent();
        setFormData({
          sectionTitle: '',
          subtitle: '',
          mainImage: null,
          features: [
            { title: '', description: '', image: null },
            { title: '', description: '', image: null },
            { title: '', description: '', image: null },
            { title: '', description: '', image: null }
          ]
        });
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
      <div className="admin-slide-container">
      <h2 className="admin-slide-heading">Why Choose Us Panel</h2>
      <form className="admin-form" onSubmit={handleUpdate}>
        <div>
          <label htmlFor="mainImage">Main Image:</label>
          <input type="file" name="mainImage" onChange={(e) => setFormData({ ...formData, mainImage: e.target.files[0] })} accept="image/*" />
        </div>
        <div>
          <label htmlFor="sectionTitle">Section Title:</label>
          <input type="text" name="sectionTitle" value={formData.sectionTitle} onChange={(e) => setFormData({ ...formData, sectionTitle: e.target.value })} placeholder="Section Title" required />
        </div>
        <div>
          <label htmlFor="subtitle">Subtitle:</label>
          <input type="text" name="subtitle" value={formData.subtitle} onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })} placeholder="Subtitle" required />
        </div>
        {/* Inputs for features */}
        {formData.features.map((feature, index) => (
          <div key={index}>
            <label htmlFor={`feature${index + 1}Title`}>Feature {index + 1} Title:</label>
            <input type="text" name={`feature${index + 1}Title`} value={feature.title} onChange={(e) => handleChange(e, index)} placeholder={`Feature ${index + 1} Title`} required />
            <label htmlFor={`feature${index + 1}Description`}>Feature {index + 1} Description:</label>
            <input type="text" name={`feature${index + 1}Description`} value={feature.description} onChange={(e) => handleChange(e, index)} placeholder={`Feature ${index + 1} Description`} required />
            <label htmlFor={`feature${index + 1}Image`}>Feature {index + 1} Image:</label>
            <input type="file" name={`feature${index + 1}Image`} onChange={(e) => handleChange(e, index)} accept="image/*" />
          </div>
        ))}
        <button type="submit">Update</button>
        {editing && <button type="button" onClick={() => setEditing(false)}>Cancel</button>}
      </form>
      {content && !editing && (
        <div>
          {/* Display current content */}
          <h3>{content.sectionTitle}</h3>
          <p>{content.subtitle}</p>
          {/* Display feature titles and descriptions */}
          {content.features.map((feature, index) => (
            <div key={index}>
              <p>Feature {index + 1}: {feature.title} - {feature.description}</p>
            </div>
          ))}
          <button onClick={handleEdit}>Edit</button>
        </div>
      )}
    </div>
      </div>
    </div>
  );
};

export default WhyChooseUsPanel;

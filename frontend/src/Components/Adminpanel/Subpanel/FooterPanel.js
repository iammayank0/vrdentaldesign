import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../axiosInstance';
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { MdOutlineLocationOn, MdPhone, MdEdit } from "react-icons/md";

const FooterPanel = () => {
  const [footerData, setFooterData] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    descriptionText: '',
    logo: null,
    facebook: '',
    twitter: '',
    linkedin: '',
    instagram: '',
    quickLinks: [],
    locations: [],
    phone: '',
    copyright: '',
  });

  useEffect(() => {

    const fetchFooterData = async () => {
      try {
        const response = await axiosInstance.get('/footer'); 
        setFooterData(response.data);
        setFormData({
          descriptionText: response.data.description.text,
          facebook: response.data.socialLinks.facebook,
          twitter: response.data.socialLinks.twitter,
          linkedin: response.data.socialLinks.linkedin,
          instagram: response.data.socialLinks.instagram,
          quickLinks: response.data.quickLinks.map(link => ({ text: link.text, url: link.url })),
          locations: response.data.contactInfo.locations.slice(), 
          phone: response.data.contactInfo.phone,
          copyright: response.data.copyright,
        });
      } catch (error) {
        console.error('Error fetching footer data:', error);
      }
    };

    fetchFooterData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleQuickLinksChange = (index, key, value) => {
    const updatedQuickLinks = [...formData.quickLinks];
    updatedQuickLinks[index][key] = value;
    setFormData(prevState => ({
      ...prevState,
      quickLinks: updatedQuickLinks
    }));
  };

  const handleLocationChange = (index, value) => {
    const updatedLocations = [...formData.locations];
    updatedLocations[index] = value;
    setFormData(prevState => ({
      ...prevState,
      locations: updatedLocations
    }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setFormData(prevState => ({
      ...prevState,
      logo: file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('descriptionText', formData.descriptionText);
      formDataToSend.append('facebook', formData.facebook);
      formDataToSend.append('twitter', formData.twitter);
      formDataToSend.append('linkedin', formData.linkedin);
      formDataToSend.append('instagram', formData.instagram);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('copyright', formData.copyright);
      formDataToSend.append('quickLinks', JSON.stringify(formData.quickLinks));
      formDataToSend.append('locations', JSON.stringify(formData.locations));
      if (formData.logo) {
        formDataToSend.append('logo', formData.logo);
      }

      await axiosInstance.put(`/footer/edit/${footerData._id}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setEditing(false);
      
      const response = await axiosInstance.get('/footer'); 
      setFooterData(response.data);
    } catch (error) {
      console.error('Error updating footer data:', error);
    }
  };

  if (!footerData) {
    return null; 
  }

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
      <footer className='footer-area'>
        <div className="container-footer">
          <div className="footer-row">
            <div className="single-footer-widget">
              <div className="Description">
                {editing ? (
                  <>
                    <input type="file" name="logo" onChange={handleLogoChange} accept="image/*" />
                    {formData.logo && <img src={URL.createObjectURL(formData.logo)} alt="footer-logo-img" />}
                    <input type="text" name="descriptionText" value={formData.descriptionText} onChange={handleInputChange} />
                  </>
                ) : (
                  <>
                    {footerData.description.logo && <img src={footerData.description.logo} alt="footer-logo-img" />}
                    <p>{footerData.description.text}</p>
                  </>
                )}
              </div>
              <ul className="footer-social">
                <li>
                  {editing ? (
                    <input type="text" name="facebook" value={formData.facebook} onChange={handleInputChange} />
                  ) : (
                    <a href={footerData.socialLinks.facebook}><FaFacebook /></a>
                  )}
                </li>
                <li>
                  {editing ? (
                    <input type="text" name="twitter" value={formData.twitter} onChange={handleInputChange} />
                  ) : (
                    <a href={footerData.socialLinks.twitter}><FaTwitter /> </a>
                  )}
                </li>
                <li>
                  {editing ? (
                    <input type="text" name="linkedin" value={formData.linkedin} onChange={handleInputChange} />
                  ) : (
                    <a href={footerData.socialLinks.linkedin}><FaLinkedin /> </a>
                  )}
                </li>
                <li>
                  {editing ? (
                    <input type="text" name="instagram" value={formData.instagram} onChange={handleInputChange} />
                  ) : (
                    <a href={footerData.socialLinks.instagram}><FaInstagram /> </a>
                  )}
                </li>
              </ul>
            </div>
            <div className="single-footer-widget">
              <h3>QUICK LINKS</h3>
              <ul className='footer-quick-links'>
                {editing ? (
                  formData.quickLinks.map((link, index) => (
                    <li key={index}>
                      <input type="text" value={link.text} onChange={(e) => handleQuickLinksChange(index, 'text', e.target.value)} />
                      <input type="text" value={link.url} onChange={(e) => handleQuickLinksChange(index, 'url', e.target.value)} />
                    </li>
                  ))
                ) : (
                  footerData.quickLinks.map((link, index) => (
                    <li key={index}><a href={link.url}>{link.text}</a></li>
                  ))
                )}
              </ul>
            </div>
            <div className="single-footer-widget">
              <h3>CONTACT INFO</h3>
              <ul className="footer-contact-info">
                {editing ? (
                  formData.locations.map((location, index) => (
                    <li key={index}>
                      <input type="text" value={location} onChange={(e) => handleLocationChange(index, e.target.value)} />
                    </li>
                  ))
                ) : (
                  footerData.contactInfo.locations.map((location, index) => (
                    <li key={index}>
                      <span><MdOutlineLocationOn /></span> {location}
                    </li>
                  ))
                )}
                <li>
                  <span><MdPhone /></span> {editing ? (
                    <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} />
                  ) : (
                    footerData.contactInfo.phone
                  )}
                </li>
              </ul>
            </div>
          </div>
          <div className="edit-button">
            {editing ? (
              <button onClick={handleSubmit}>Save Changes</button>
            ) : (
              <button onClick={() => setEditing(true)}><MdEdit /> Edit Footer</button>
            )}
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
}

export default FooterPanel;

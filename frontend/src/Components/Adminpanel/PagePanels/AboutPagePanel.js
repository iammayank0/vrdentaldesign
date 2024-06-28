import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../axiosInstance';
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const AboutPagePanel = () => {
  const [aboutBg, setAboutBg] = useState([]);
  const [aboutPageContent, setAboutPageContent] = useState([]);
  const [aboutUsContent, setAboutUsContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bgResponse, pageContentResponse, usContentResponse] = await Promise.all([
          axiosInstance.get('/backgroundcontent'),
          axiosInstance.get('/aboutpagecontent'),
          axiosInstance.get('/aboutuscontent')
        ]);

        setAboutBg(bgResponse.data);
        setAboutPageContent(pageContentResponse.data);
        setAboutUsContent(usContentResponse.data);
        setLoading(false);

      } catch (error) {
        setError(error.message);
        setLoading(false);
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const updateAboutBg = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('BackgroundImage', e.target.files[0]);

    try {
      const response = await axiosInstance.put(`/aboutbg/${aboutBg[0]._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setAboutBg([response.data]);
      console.log('Updated aboutBg:', response.data);
    } catch (error) {
      console.error('Failed to update About Background:', error);
    }
  };

  const updateAboutPageContent = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedContent = {
      title1: formData.get('title1'),
      description1: formData.get('description1'),
      title2: formData.get('title2'),
      description2: formData.get('description2'),
    };

    try {
      const response = await axiosInstance.put(`/aboutpagecontent/${aboutPageContent[0]._id}`, updatedContent);
      setAboutPageContent([response.data]);
      console.log('Updated aboutPageContent:', response.data);
    } catch (error) {
      console.error('Failed to update About Page Content:', error);
    }
  };

  const updateAboutUsContent = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedContent = {
      title: formData.get('title'),
      heading: formData.get('heading'),
      description: formData.get('description'),
    };

    try {
      const response = await axiosInstance.put(`/aboutuscontent/${aboutUsContent[0]._id}`, updatedContent);
      setAboutUsContent([response.data]);
      console.log('Updated aboutUsContent:', response.data);
    } catch (error) {
      console.error('Failed to update About Us Content:', error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

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
                            to="/admin/about-page"
                          >
                            About Page <div className="arrow-icn"><FaArrowRight /></div>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/admin/gallery"
                          >
                            Gallery <div className="arrow-icn"><FaArrowRight /></div>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/admin/Service-page"
                          >
                            Service Page <div className="arrow-icn"><FaArrowRight /></div>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/admin/ContactUs"
                          >
                            Contact Us <div className="arrow-icn"><FaArrowRight /></div>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/admin/team"
                          >
                            Team <div className="arrow-icn"><FaArrowRight /></div>
                          </Link>
                        </li>
                      </ul>
                    </div>
                </section>
              </aside>
            </div>
      <div className="panel-form">
      <div className='about-page-panel'>
      {/* About Background Section */}
      <section>
        <h2>About Background</h2>
        {aboutBg.length > 0 && aboutBg[0].BackgroundImage && (
          <img src={aboutBg[0].BackgroundImage} alt="Background" style={{ maxWidth: '100%' }} />
        )}
        <input type="file" onChange={updateAboutBg} />
      </section>

      {/* About Page Content Section */}
      <section>
        <h2>About Page Content</h2>
        {aboutPageContent.length > 0 && (
          <form onSubmit={updateAboutPageContent}>
            <div>
              <label>Title 1:</label>
              <input type="text" name="title1" defaultValue={aboutPageContent[0].title1} />
            </div>
            <div>
              <label>Description 1:</label>
              <textarea name="description1" defaultValue={aboutPageContent[0].description1}></textarea>
            </div>
            <div>
              <label>Title 2:</label>
              <input type="text" name="title2" defaultValue={aboutPageContent[0].title2} />
            </div>
            <div>
              <label>Description 2:</label>
              <textarea name="description2" defaultValue={aboutPageContent[0].description2}></textarea>
            </div>
            <button type="submit">Update About Page Content</button>
          </form>
        )}
      </section>

      {/* About Us Content Section */}
      <section>
        <h2>About Us Content</h2>
        {aboutUsContent.length > 0 && (
          <form onSubmit={updateAboutUsContent}>
            <div>
              <label>Title:</label>
              <input type="text" name="title" defaultValue={aboutUsContent[0].title} />
            </div>
            <div>
              <label>Heading:</label>
              <input type="text" name="heading" defaultValue={aboutUsContent[0].heading} />
            </div>
            <div>
              <label>Description:</label>
              <textarea name="description" defaultValue={aboutUsContent[0].description}></textarea>
            </div>
            <button type="submit">Update About Us Content</button>
          </form>
        )}
      </section>
    </div>
      </div>
    </div>
  );
};

export default AboutPagePanel;

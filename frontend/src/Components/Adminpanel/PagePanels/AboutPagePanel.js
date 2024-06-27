import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AboutPagePanel = () => {
  const [aboutBg, setAboutBg] = useState({});
  const [aboutPageContent, setAboutPageContent] = useState({});
  const [aboutUsContent, setAboutUsContent] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bgResponse, pageContentResponse, usContentResponse] = await Promise.all([
          axios.get('/api/aboutbg'),
          axios.get('/api/aboutpagecontent'),
          axios.get('/api/aboutuscontent')
        ]);

        setAboutBg(bgResponse.data);
        setAboutPageContent(pageContentResponse.data);
        setAboutUsContent(usContentResponse.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle updating About Background
  const updateAboutBg = async (formData) => {
    try {
      const response = await axios.put(`/api/aboutbg/${aboutBg._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setAboutBg(response.data);
      // Handle success or feedback
    } catch (error) {
      // Handle error
      console.error('Failed to update About Background:', error);
    }
  };

  // Handle updating About Page Content
  const updateAboutPageContent = async (updatedContent) => {
    try {
      const response = await axios.put(`/api/aboutpagecontent/${aboutPageContent._id}`, updatedContent);
      setAboutPageContent(response.data);
      // Handle success or feedback
    } catch (error) {
      // Handle error
      console.error('Failed to update About Page Content:', error);
    }
  };

  // Handle updating About Us Content
  const updateAboutUsContent = async (updatedContent) => {
    try {
      const response = await axios.put(`/api/aboutuscontent/${aboutUsContent._id}`, updatedContent);
      setAboutUsContent(response.data);
      // Handle success or feedback
    } catch (error) {
      // Handle error
      console.error('Failed to update About Us Content:', error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {/* About Background Section */}
      <section>
        <h2>About Background</h2>
        <img src={aboutBg.BackgroundImage} alt="Background" style={{ maxWidth: '100%' }} />
        <input type="file" onChange={(e) => updateAboutBg(new FormData(e.target.form))} />
      </section>

      {/* About Page Content Section */}
      <section>
        <h2>About Page Content</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const updatedContent = {
            title1: formData.get('title1'),
            description1: formData.get('description1'),
            title2: formData.get('title2'),
            description2: formData.get('description2'),
          };
          updateAboutPageContent(updatedContent);
        }}>
          <div>
            <label>Title 1:</label>
            <input type="text" name="title1" defaultValue={aboutPageContent.title1} />
          </div>
          <div>
            <label>Description 1:</label>
            <textarea name="description1" defaultValue={aboutPageContent.description1}></textarea>
          </div>
          <div>
            <label>Title 2:</label>
            <input type="text" name="title2" defaultValue={aboutPageContent.title2} />
          </div>
          <div>
            <label>Description 2:</label>
            <textarea name="description2" defaultValue={aboutPageContent.description2}></textarea>
          </div>
          <button type="submit">Update About Page Content</button>
        </form>
      </section>

      {/* About Us Content Section */}
      <section>
        <h2>About Us Content</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const updatedContent = {
            title: formData.get('title'),
            heading: formData.get('heading'),
            description: formData.get('description'),
          };
          updateAboutUsContent(updatedContent);
        }}>
          <div>
            <label>Title:</label>
            <input type="text" name="title" defaultValue={aboutUsContent.title} />
          </div>
          <div>
            <label>Heading:</label>
            <input type="text" name="heading" defaultValue={aboutUsContent.heading} />
          </div>
          <div>
            <label>Description:</label>
            <textarea name="description" defaultValue={aboutUsContent.description}></textarea>
          </div>
          <button type="submit">Update About Us Content</button>
        </form>
      </section>
    </div>
  );
};

export default AboutPagePanel;

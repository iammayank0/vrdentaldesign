import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../Navbar/Navbar';
import Footer from "../../Footer/Footer";
import Blog from '../../Main/Home-Page/Blog'
import { Link } from 'react-router-dom';
import "./BlogPage.css";

const BlogPage = () => {
    const [backgroundImage, setBackgroundImage] = useState('');

    useEffect(() => {
    
        const fetchBackgroundImage = async () => {
          try {
            const response = await axios.get('http://localhost:5000/api/gallerybg');
            
            setBackgroundImage(response.data.length > 0 ? response.data[0].BackgroundImage : '');
          } catch (error) {
            console.error('Failed to fetch gallery background image:', error);
          }
        };
    
        fetchBackgroundImage();
      }, []);
  return (
    <>
      <div className='page' style={{ backgroundImage: `url(${backgroundImage})` }}>
        <Navbar />
        <div className='d-table'>
          <div className="d-table-cell">
            <div className="page-container">
              <div className="page-title-content">
                <h2>BLOGS</h2>
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>Blogs</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className='blog-page'>
        <Blog />
      </section>
      <section className='blog-footer'>
        <Footer />
      </section>
    </>
  )
}

export default BlogPage

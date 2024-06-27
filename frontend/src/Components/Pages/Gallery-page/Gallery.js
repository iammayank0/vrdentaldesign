import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../axiosInstance';
import Navbar from '../../Navbar/Navbar';
import Footer from "../../Footer/Footer";
import { Link } from 'react-router-dom';
import "./Gallery.css";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState('');

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axiosInstance.get('/galleryimg');
        setImages(response.data); 
      } catch (error) {
        console.error('Failed to fetch gallery images:', error);
      }
    };

    const fetchBackgroundImage = async () => {
      try {
        const response = await axiosInstance.get('/gallerybg');
        
        setBackgroundImage(response.data.length > 0 ? response.data[0].BackgroundImage : '');
      } catch (error) {
        console.error('Failed to fetch gallery background image:', error);
      }
    };

    fetchImages();
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
                <h2>Gallery</h2>
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>Gallery</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className='image-gallery'>
        <div className="page-container">
          <h1 className='page-title'>Image Gallery</h1>
          <div className="gallery-row">
            {images.map((image, index) => (
              <div className="single-image" key={index}>
                <img src={image.GalleryImage} alt={`gallery-img-${index}`} />
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className='gallery-footer'>
        <Footer />
      </section>
    </>
  );
};

export default Gallery;

import React from 'react';
import Navbar from '../../Navbar/Navbar';
import Footer from "../../Footer/Footer"
import { Link } from 'react-router-dom';
import "./Gallery.css"

import aboutBG from '../../../Assets/images/page-title-image/1.jpg';
import galleryImg1 from '../../../Assets/images/doctor-image/1.jpg';
import galleryImg2 from '../../../Assets/images/doctor-image/2.jpg';
import galleryImg3 from '../../../Assets/images/doctor-image/3.jpg';
// Add more imports as needed

const imageUrls = [
  galleryImg1,
  galleryImg2,
  galleryImg3,
  galleryImg1,
  galleryImg2,
  galleryImg3,
  galleryImg1,
  galleryImg2,
  galleryImg3,
  galleryImg1,
  galleryImg2,
  galleryImg3,
  galleryImg1,
  galleryImg2,
  galleryImg3,
  galleryImg1,
  galleryImg2,
  galleryImg3,
  galleryImg1,
  galleryImg2,
];

const Gallery = () => {
  return (
    <>
      <div className='page' style={{ backgroundImage: `url(${aboutBG})` }}>
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
            {imageUrls.map((imgSrc, index) => (
              <div className="single-image" key={index}>
                <img src={imgSrc} alt={`gallery-img-${index}`} />
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

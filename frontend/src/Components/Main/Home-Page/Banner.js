import React from 'react';
import banner from "../../../Assets/banner.mp4";
import './Banner.css';
import Navbar from '../../Navbar/Navbar';

const Banner = () => {
  const handleVideoError = (e) => {
    console.error("Error loading video", e);
  };

  return (
    <div className="banner-container">
        <Navbar />
      <video className="video" autoPlay loop muted playsInline onError={handleVideoError}>
        <source src={banner} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default Banner;

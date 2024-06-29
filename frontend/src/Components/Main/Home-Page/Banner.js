import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../axiosInstance';
import './Banner.css';
import Navbar from '../../Navbar/Navbar';

const Banner = () => {
  const [bannerUrl, setBannerUrl] = useState('');
  const [error, setError] = useState(null);

  const handleVideoError = (e) => {
    console.error("Error loading video", e);
    setError("Failed to load video");
  };

  useEffect(() => {
    const fetchBannerVideo = async () => {
      try {
        const response = await axiosInstance.get('/banner-video');
        if (response.data.length > 0) {
          setBannerUrl(response.data[0].Video);
        }
      } catch (error) {
        console.error('Failed to fetch banner video:', error);
        setError("Failed to fetch banner video");
      }
    };

    fetchBannerVideo();
  }, []);

  return (
    <div className="banner-container">
      <Navbar />
      {bannerUrl ? (
        <video className="banner-video" autoPlay loop muted playsInline onError={handleVideoError}>
          <source src={bannerUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <p>{error ? error : "Loading..."}</p>
      )}
    </div>
  );
}

export default Banner;

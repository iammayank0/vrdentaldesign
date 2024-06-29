import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axiosInstance';
import "./map.css"

const WorldMap = () => {
  const [mapUrl, setMapUrl] = useState('');
  const [error, setError] = useState(null);

  const handleVideoError = (e) => {
    console.error("Error loading video", e);
    setError("Failed to load video");
  };

  useEffect(() => {
    const fetchMapVideo = async () => {
      try {
        const response = await axiosInstance.get('/map');
        if (response.data.length > 0) {
          setMapUrl(response.data[0].Video);
        }
      } catch (error) {
        console.error('Failed to fetch map video:', error);
        setError("Failed to fetch map video");
      }
    };

    fetchMapVideo();
  }, []);
  return (
    <div className="video-container">
      {mapUrl ? (
        <video className="map-video" autoPlay loop muted playsInline onError={handleVideoError}>
          <source src={mapUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <p>{error ? error : "Loading..."}</p>
      )}
    </div>
  )
}

export default WorldMap

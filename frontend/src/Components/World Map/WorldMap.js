import React from 'react';
import map from "../../Assets/map.mp4"
import "./map.css"

const WorldMap = () => {
  return (
    <div className="video-container">
      <video className="map-video" autoPlay loop muted playsInline>
        <source src={map} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}

export default WorldMap

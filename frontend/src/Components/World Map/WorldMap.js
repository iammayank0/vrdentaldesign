import React from 'react';
import gifImage from '../../Assets/MAP.gif';
import "./map.css"

const WorldMap = () => {
  return (
    <div className='map'>
      <h2>My GIF</h2>
      <img src={gifImage} alt="Example GIF" />
    </div>
  )
}

export default WorldMap

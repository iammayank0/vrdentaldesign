import React from 'react';
import Navbar from '../../Navbar/Navbar';
import { Link } from 'react-router-dom';

import aboutBG from '../../../Assets/images/page-title-image/1.jpg';

const Gallery = () => {
  return (
    <>
    <div className='page' style={{ backgroundImage: `url(${aboutBG})`}}>
      <Navbar />
      <div className='d-table'>
        <div className="d-table-cell">
            <div className="page-container">
            <div className="page-title-content">
                <h2>Gallery</h2>
                <ul>
                  <li>
                    <Link to="/*">Home</Link>
                  </li>
                  <li>Gallery</li>
                </ul>
            </div>
            </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Gallery

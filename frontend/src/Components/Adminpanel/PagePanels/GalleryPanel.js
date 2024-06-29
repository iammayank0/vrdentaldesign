import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../axiosInstance';
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa"; 

const GalleryPanel = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [galleryBackground, setGalleryBackground] = useState(null);
  const [file, setFile] = useState(null);
  const [editImageId, setEditImageId] = useState(null); 

  useEffect(() => {
    fetchGalleryData();
  }, []);

  const fetchGalleryData = async () => {
    try {
      const responseImages = await axiosInstance.get('/galleryimg');
      setGalleryImages(responseImages.data);

      const responseBackground = await axiosInstance.get('/gallerybg');
      if (responseBackground.data.length > 0) {
        setGalleryBackground(responseBackground.data[0]); 
      }
    } catch (error) {
      console.error('Error fetching gallery data:', error);
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleImageUpload = async () => {
    if (!file) {
      alert('Please select an image file!');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('GalleryImage', file);

      const response = await axiosInstance.post('/galleryimg/upload', formData);
      setGalleryImages([...galleryImages, response.data]);
      setFile(null);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleBackgroundUpload = async () => {
    if (!file) {
      alert('Please select an image file!');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('BackgroundImage', file);

      const response = await axiosInstance.put(`/gallerybg/${galleryBackground._id}`, formData);
      setGalleryBackground(response.data);
      setFile(null);
    } catch (error) {
      console.error('Error uploading background image:', error);
    }
  };

  const handleImageEdit = (imageId) => {
    setEditImageId(imageId);
    
  };

  const handleImageUpdate = async (imageId) => {
    if (!file) {
      alert('Please select an image file!');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('GalleryImage', file);

      const response = await axiosInstance.put(`/galleryimg/${imageId}`, formData);
      const updatedImages = galleryImages.map((image) =>
        image._id === imageId ? response.data : image
      );
      setGalleryImages(updatedImages);
      setEditImageId(null);
      setFile(null);
    } catch (error) {
      console.error('Error updating image:', error);
    }
  };

  const cancelImageEdit = () => {
    setEditImageId(null);
    setFile(null);
  };

  const handleImageDelete = async (imageId) => {
    try {
      await axiosInstance.delete(`/galleryimg/${imageId}`);
      const updatedImages = galleryImages.filter((image) => image._id !== imageId);
      setGalleryImages(updatedImages);
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  return (
    <div className="panel-container">
      <div className="panel-button">
              <aside className="panel-widget-area">
                <section className="panel-list">
                    <div className="panel-btn" >
                    <Link to="/admin" ><h3>Home Page</h3></Link>
                    <ul>
                        <li>
                          <Link
                            to="/admin/about-page"
                          >
                            About Page <div className="arrow-icn"><FaArrowRight /></div>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/admin/gallery"
                          >
                            Gallery <div className="arrow-icn"><FaArrowRight /></div>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/admin/Service-page"
                          >
                            Service Page <div className="arrow-icn"><FaArrowRight /></div>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/admin/ContactUs"
                          >
                            Contact Us <div className="arrow-icn"><FaArrowRight /></div>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/admin/team"
                          >
                            Team <div className="arrow-icn"><FaArrowRight /></div>
                          </Link>
                        </li>
                      </ul>
                    </div>
                </section>
              </aside>
            </div>
      <div className="panel-form">
      <div>
      <h2>Gallery Management</h2>

      {/* Gallery Background Section */}
      <div>
        <h3>Gallery Background</h3>
        {galleryBackground && (
          <div>
            <img src={galleryBackground.BackgroundImage} alt="Gallery Background" style={{ width: '100px', height: 'auto' }} />
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleBackgroundUpload}>Update Background</button>
          </div>
        )}
      </div>

      {/* Gallery Images Section */}
      <div>
        <h3>Gallery Images</h3>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleImageUpload}>Upload Image</button>

        <div>
          {galleryImages.map((image) => (
            <div key={image._id}>
              {editImageId === image._id ? (
                <div>
                  <input type="file" onChange={handleFileChange} />
                  <button onClick={() => handleImageUpdate(image._id)}>Update</button>
                  <button onClick={cancelImageEdit}>Cancel</button>
                </div>
              ) : (
                <div>
                  <img src={image.GalleryImage} alt="Gallery" style={{ width: '100px', height: 'auto' }} />
                  <button onClick={() => handleImageEdit(image._id)}>Edit</button>
                  <button onClick={() => handleImageDelete(image._id)}>Delete</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
      </div>
    </div>
  );
};

export default GalleryPanel;

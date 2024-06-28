import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../axiosInstance';
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const BannerPanel = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [bannerVideos, setBannerVideos] = useState([]);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false); 

  useEffect(() => {
   
    const fetchBannerVideos = async () => {
      try {
        const response = await axiosInstance.get('/banner-video');
        if (response.data && response.data.length > 0) {
          setBannerVideos(response.data);
          setCurrentVideoIndex(0); 
        } else {
          setError('No videos found.');
        }
      } catch (error) {
        console.error('Error fetching banner videos:', error);
        setError('Failed to fetch banner videos.');
      }
    };

    fetchBannerVideos();
  }, []);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setError(null); // Clear previous errors on file change
  };

  const handleVideoUpload = async () => {
    if (!selectedFile) {
      setError('Please select a video file.');
      return;
    }

    try {
      setUploading(true); 

      const formData = new FormData();
      formData.append('Video', selectedFile);

      const bannerVideoId = bannerVideos[currentVideoIndex]._id; 

      const response = await axiosInstance.put(`/banner-video/${bannerVideoId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        const updatedVideo = response.data;
        const updatedVideos = [...bannerVideos];
        updatedVideos[currentVideoIndex] = updatedVideo;
        setBannerVideos(updatedVideos); 
        setSelectedFile(null); 
      } else {
        setError('Failed to update banner video.');
      }
    } catch (error) {
      console.error('Error uploading video:', error);
      setError('Failed to upload video. Please try again.');
    } finally {
      setUploading(false); 
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
                            to="/admin/nav-panel"
                          >
                            Navbar <div className="arrow-icn"><FaArrowRight /></div>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/admin/banner"
                          >
                            Banner <div className="arrow-icn"><FaArrowRight /></div>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/admin/about-section"
                          >
                            About <div className="arrow-icn"><FaArrowRight /></div>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/admin/funFacts"
                          >
                            Fun Facts <div className="arrow-icn"><FaArrowRight /></div>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/admin/OurSpecialisation"
                          >
                            Our Specialisation <div className="arrow-icn"><FaArrowRight /></div>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/admin/wycu"
                          >
                            Why You Choose Us <div className="arrow-icn"><FaArrowRight /></div>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/admin/services"
                          >
                            Services <div className="arrow-icn"><FaArrowRight /></div>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/admin/cta"
                          >
                            CTA <div className="arrow-icn"><FaArrowRight /></div>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/admin/partners"
                          >
                            Partners Image <div className="arrow-icn"><FaArrowRight /></div>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/admin/blog"
                          >
                            Blogs <div className="arrow-icn"><FaArrowRight /></div>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/admin/footer"
                          >
                            Footer <div className="arrow-icn"><FaArrowRight /></div>
                          </Link>
                        </li>
                      </ul>
                    </div>
                </section>
              </aside>
            </div>
      <div className="panel-form">
      <div className="banner-panel">
      <h2>Banner Video Panel</h2>
      <div>
        <input type="file" onChange={handleFileChange} accept="video/mp4" />
        <button onClick={handleVideoUpload} disabled={uploading}>
          {uploading ? 'Uploading...' : 'Upload Video'}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
      <div>
        <h3>Current Video:</h3>
        {bannerVideos.length > 0 ? (
          <video controls>
            <source src={bannerVideos[currentVideoIndex].Video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <p>No videos found.</p>
        )}
      </div>
    </div>
      </div>
    </div>
  );
};

export default BannerPanel;

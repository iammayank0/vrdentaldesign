import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../axiosInstance';

const ServiceVideoPanel = () => {
  const [videos, setVideos] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Fetch videos from the backend
    const fetchVideos = async () => {
      try {
        const response = await axiosInstance.get('/service-video');
        setVideos(response.data);
      } catch (error) {
        console.error('Error fetching videos:', error);
        setErrorMessage('Failed to fetch videos');
      }
    };

    fetchVideos();
  }, []);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setSelectedFile(selectedFile);
    setSelectedVideo(URL.createObjectURL(selectedFile));
  };

  const handleVideoSelect = (index) => {
    setSelectedIndex(index);
    setSelectedVideo(videos[index].Video);
  };

  const handleSubmit = async () => {
    try {
      if (!selectedFile) {
        setErrorMessage('Please select a video file to update.');
        return;
      }

      setIsLoading(true);
      const formData = new FormData();
      formData.append('Video', selectedFile);

      const id = videos[selectedIndex]._id;
      const response = await axiosInstance.put(`/service-video/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setIsLoading(false);
      setSelectedFile(null);
      setSelectedVideo(null);
      setSelectedIndex(null);
      setErrorMessage('');

      // Update the video list after successful update
      const updatedVideos = [...videos];
      updatedVideos[selectedIndex] = response.data;
      setVideos(updatedVideos);

      console.log('Service video updated successfully:', response.data);
    } catch (error) {
      setIsLoading(false);
      setErrorMessage('Failed to update service video. Please try again.');
      console.error('Error updating service video:', error);
    }
  };

  return (
    <div>
      <h2>Update Service Video</h2>
      <div>
        <h3>Select a video to edit</h3>
        <ul>
          {videos.map((video, index) => (
            <li key={video._id}>
              <button onClick={() => handleVideoSelect(index)}>
                {`Video ${index + 1}`}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {selectedVideo && (
        <div>
          <h3>Selected Video</h3>
          <video controls width="300">
            <source src={selectedVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
      <input type="file" onChange={handleFileChange} />
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <button
        onClick={handleSubmit}
        disabled={!selectedFile || isLoading || selectedIndex === null}
      >
        {isLoading ? 'Updating...' : 'Update Video'}
      </button>
    </div>
  );
};

export default ServiceVideoPanel;

import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../axiosInstance';
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const ServicePagePanel = () => {
  const [backgroundImage, setBackgroundImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [serviceBg, setServiceBg] = useState(null);
  const [loadingServices, setLoadingServices] = useState(false);
  const [errorServices, setErrorServices] = useState(null);
  const [services, setServices] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editService, setEditService] = useState({
    _id: '',
    title: '',
    image: null, 
    description: ''
  });

  useEffect(() => {
    fetchServiceBackground();
  }, []);

  const fetchServiceBackground = async () => {
    try {
      const response = await axiosInstance.get('/servicebg');
      const fetchedServiceBg = response.data[0]; 
      setServiceBg(fetchedServiceBg);
      setBackgroundImage(fetchedServiceBg.BackgroundImage);
    } catch (error) {
      console.error('Failed to fetch service background:', error);
      setError('Failed to fetch service background');
    }
  };

  const handleBgChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setBackgroundImage(file);
    }
  };

  const handleUpload = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('BackgroundImage', backgroundImage);

      if (serviceBg) {
        await axiosInstance.put(`/servicebg/${serviceBg._id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        alert('Service background updated successfully');
        
        fetchServiceBackground(); 
      } else {
        console.error('Service background is not defined.');
        setError('Service background is not defined.');
      }
    } catch (error) {
      console.error('Failed to update service background:', error);
      setError('Failed to update service background');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoadingServices(true);
      const response = await axiosInstance.get('/single-services');
      setServices(response.data);
    } catch (error) {
      console.error('Failed to fetch services:', error);
      setErrorServices('Failed to fetch services');
    } finally {
      setLoadingServices(false);
    }
  };

  const handleEdit = (service) => {
    setEditMode(true);
    setEditService({
      _id: service._id,
      title: service.title,
      image: null, 
      description: service.description
    });
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditService({
      _id: '',
      title: '',
      image: null,
      description: ''
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditService(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setEditService(prevState => ({
        ...prevState,
        image: file
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoadingServices(true);
    try {
      const formData = new FormData();
      formData.append('title', editService.title);
      formData.append('description', editService.description);
      
      // Append image if it's selected
      if (editService.image) {
        formData.append('image', editService.image);
      }

      const response = await axiosInstance.put(`/single-services/${editService._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const updatedServices = services.map(service =>
        service._id === editService._id ? response.data : service
      );
      setServices(updatedServices);
      alert('Service updated successfully');
      setEditMode(false);
    } catch (error) {
      console.error('Failed to update service:', error);
      setErrorServices('Failed to update service');
    } finally {
      setLoadingServices(false);
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
      {error && <p>{error}</p>}
      <h2>Edit Service Background</h2>
      {loading ? (
        <p>Updating...</p>
      ) : (
        <div>
          <img src={backgroundImage} alt="Service Background" style={{ maxWidth: '100%' }} />
          <input type="file" onChange={handleBgChange} accept="image/*" />
          <button onClick={handleUpload}>Update Background</button>
        </div>
      )}
    </div>
    <div>
      <h2>Edit Services</h2>
      {loadingServices ? (
        <p>Loading...</p>
      ) : errorServices ? (
        <p>{errorServices}</p>
      ) : (
        <div>
          {!editMode && (
            <div>
              {services.map(service => (
                <div key={service._id}>
                  <h3>{service.title}</h3>
                  <img src={service.image} alt={service.title} style={{ maxWidth: '100px' }} />
                  <p>{service.description}</p>
                  <button onClick={() => handleEdit(service)}>Edit</button>
                </div>
              ))}
            </div>
          )}

          {editMode && (
            <form onSubmit={handleSubmit}>
              <label>Title:</label>
              <input
                type="text"
                name="title"
                value={editService.title}
                onChange={handleInputChange}
                required
              />
              <br />

              <label>Description:</label>
              <textarea
                name="description"
                value={editService.description}
                onChange={handleInputChange}
                required
              />
              <br />

              <label>Image:</label>
              <input
                type="file"
                onChange={handleFileChange}
                accept="image/*"
              />
              <br />

              <button type="submit">Update Service</button>
              <button type="button" onClick={handleCancelEdit}>Cancel</button>
            </form>
          )}
        </div>
      )}
    </div>
      </div>
    </div>
  );
};

export default ServicePagePanel;

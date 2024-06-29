import React, { useState } from 'react';
import axiosInstance from '../../../axiosInstance';
import '../Main.css';
import Swal from 'sweetalert2';
import { FaArrowRight } from 'react-icons/fa';
import { CiUser, CiMail, CiPhone } from 'react-icons/ci';
import { RiMessage2Line } from 'react-icons/ri';

const Enquiry = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log('Submitting form data:', formData);

    // Basic phone number validation
    if (formData.phone.length > 15 || formData.phone.length < 10) {
      Swal.fire({
        icon: "error",
        title: "Invalid Phone Number",
        text: "Phone number should be between 10 and 15 digits",
      });
      setIsLoading(false);
      return;
    }

    const formattedData = {
      ...formData,
      phone: formData.phone.toString(),
    };

    try {
      const response = await axiosInstance.post('/enquiry/submit', formattedData);

      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.data.message || `HTTP error! status: ${response.status}`);
      }

      const result = response.data;
      Swal.fire("Enquiry Submitted Successfully.");
      console.log('Success response:', result);

      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message || "Something went wrong!",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <section className='container'>
        <div className='content'>
          <span className='title'>ENQUIRY FORM</span>
          <h2>Enquiry Now</h2>

          <form className="enquiry-form" onSubmit={handleSubmit}>
            <div className='personal-details'>
              <div className="text-name">
                <CiUser className="icon" />
                <div className="separator">|</div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="YOUR NAME"
                  required
                />
              </div>
              <div className="text-email">
                <CiMail className="icon" />
                <div className="separator">|</div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="YOUR EMAIL"
                  required
                />
              </div>
              <div className="text-num">
                <CiPhone className="icon" />
                <div className="separator">|</div>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="YOUR PHONE"
                  required
                />
              </div>
            </div>
            <div className="message">
              <RiMessage2Line className="icon" />
              <div className="separator">|</div>
              <input
                type="text"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message"
                required
              />
            </div>
            <div className="enquiry-button">
              <button type="submit" className="submit-button" disabled={isLoading}>
                {isLoading ? 'Submitting...' : 'SEND ENQUIRY'}
                <span className="icon--circle"><FaArrowRight /></span>
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Enquiry;

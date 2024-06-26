import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import './Panel.css';

const PartnerPanel = () => {
  const [partners, setPartners] = useState([]); // State to hold partners data
  const [newPartnerImage, setNewPartnerImage] = useState(null); // State to hold new partner image file object

  // Function to fetch partners from backend
  const fetchPartners = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/partner');
      if (!response.ok) {
        throw new Error('Failed to fetch partners');
      }
      const data = await response.json();
      setPartners(data);
    } catch (error) {
      console.error('Error fetching partners:', error);
    }
  };

  // Fetch partners on component mount
  useEffect(() => {
    fetchPartners();
  }, []);

  // Function to handle file selection for new partner image
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewPartnerImage(file);
  };

  // Function to handle adding a new partner with local image file
  const handleAddPartner = async () => {
    try {
      if (!newPartnerImage) {
        throw new Error('Please select an image file');
      }

      const formData = new FormData();
      formData.append('PartnerImage', newPartnerImage);

      const response = await fetch('http://localhost:5000/api/partner/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to add partner');
      }

      // Refresh partners list after adding new partner
      fetchPartners();
      setNewPartnerImage(null); // Clear file selection after adding partner
    } catch (error) {
      console.error('Error adding partner:', error);
    }
  };

  // Function to handle deleting a partner
  const handleDeletePartner = async (partnerId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/partner/${partnerId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete partner');
      }

      // Refresh partners list after deleting partner
      fetchPartners();
    } catch (error) {
      console.error('Error deleting partner:', error);
    }
  };

  // JSX to render partner panel UI
  return (
    <div className="panel-container">
      <div className="panel-button">
              <aside className="panel-widget-area">
                <section className="panel-list">
                    <div className="panel-btn" >
                    <h3>Home Page</h3>
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
      <div>
      {/* Input for adding new partner image */}
      <h1>Partner Images</h1>
      <div className="partner-add-form">
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleAddPartner}>Add Partner</button>
      </div>

      {/* List of current partners with delete button */}
      <div className="partner-list">
        {partners.map((partner) => (
          <div className="partner-item" key={partner._id}>
            <img src={partner.PartnerImage} alt={`Partner ${partner._id}`} />
            <button onClick={() => handleDeletePartner(partner._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
      </div>
    </div>
  );
};

export default PartnerPanel;

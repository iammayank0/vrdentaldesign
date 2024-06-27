import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../axiosInstance';
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import './Panel.css';

const FactPanel = () => {
  const [funFacts, setFunFacts] = useState([]);

  useEffect(() => {
    const fetchFunFacts = async () => {
      try {
        const response = await axiosInstance.get('/fun-facts');
        setFunFacts(response.data);
      } catch (error) {
        console.error('Error fetching fun facts:', error);
      }
    };

    fetchFunFacts();
  }, []);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedFacts = [...funFacts];
    updatedFacts[index][name] = value;
    setFunFacts(updatedFacts);
  };

  const handleSubmit = async (index) => {
    try {
      const response = await axiosInstance.put(`/fun-facts/${funFacts[index]._id}`, funFacts[index]);
      if (response.status === 200) {
        console.log('Fun fact updated successfully');
      } else {
        console.error('Update failed:', response.statusText);
      }
    } catch (error) {
      console.error('Update error:', error);
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
      <div className="fact-panel-container">
      <h2 className="fact-panel-heading">Fun Facts Panel</h2>
      {funFacts.map((fact, index) => (
        <div key={index} className="fact-panel-item">
          <input
            type="number"
            name="number"
            value={fact.number}
            onChange={(e) => handleChange(index, e)}
            placeholder="Number"
            required
          />
          <input
            type="text"
            name="label"
            value={fact.label}
            onChange={(e) => handleChange(index, e)}
            placeholder="Label"
            required
          />
          <button onClick={() => handleSubmit(index)}>Update</button>
        </div>
      ))}
    </div>
      </div>
    </div>
  );
};

export default FactPanel;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Panel.css';

const FactPanel = () => {
  const [funFacts, setFunFacts] = useState([]);

  useEffect(() => {
    const fetchFunFacts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/fun-facts');
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
      const response = await axios.put(`http://localhost:5000/api/fun-facts/${funFacts[index]._id}`, funFacts[index]);
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
  );
};

export default FactPanel;
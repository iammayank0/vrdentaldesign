import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Main.css';

const FunFacts = () => {

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

  return (
    <div>
      {/* Fun Facts Area */}
      <section className="factArea">
        <div className="container-fact">
          <div className="content-fact">
            <div className="fact-text">
              <span className='fun-title'>FUN FACTS</span>
              <h2>Learn More About Our Success Stories</h2>
            </div>
            <div className="fact-num">
              {funFacts.map((fact, index) => (
                <div className="single-funFact" key={index}>
                  <h3>
                    <span className="odometer-digit">{fact.number}</span>
                    <sup>+</sup>
                  </h3>
                  <p>{fact.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default FunFacts

import React, { useState, useEffect } from 'react';
import '../Main.css';

const Partner = () => {
  const [partners, setPartners] = useState([]);
  const [numVisible, setNumVisible] = useState(5);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 850) {
        setNumVisible(4);
      } else if (window.innerWidth < 700) {
        setNumVisible(3);
      } else if (window.innerWidth < 500) {
        setNumVisible(2);
      } else {
        setNumVisible(5); 
      }
    };


    handleResize();

    window.addEventListener('resize', handleResize);


    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {

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

    fetchPartners();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + numVisible) % partners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [numVisible, partners]);

  const displayedPartners = partners.slice(currentIndex, currentIndex + numVisible);
  return (
    <div>
      <section className='partner-area'>
        <div className="partner-container">
          <div className="partner-slides">
            {displayedPartners.map((partner, index) => (
              <div className="single-partner-item" key={partner._id}>
                <img src={partner.PartnerImage} alt={`Partner ${currentIndex + index + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Partner

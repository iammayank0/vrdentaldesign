import React, { useEffect, useState } from 'react';
import '../Main.css';

const WhyChooseUs = () => {

    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch Why Choose Us content from the backend
        const fetchWhyChooseUsContent = async () => {
          try {
            const response = await fetch('http://localhost:5000/api/whychooseus');
            if (!response.ok) {
              throw new Error('Failed to fetch Why Choose Us content');
            }
            const data = await response.json();
            setContent(data);
          } catch (error) {
            console.error('Error fetching Why Choose Us content:', error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchWhyChooseUsContent();
      }, []);

      if (loading) {
        return <div>Loading...</div>;
      }
    
      if (!content) {
        return <div>No content available</div>;
      }

  return (
    <div>
      {/* why choose us */}
      <section className="why-choose-us-area">
        <div className="container-why-choose-us">
          <div className="why-choose-us-text">
            <div className="why-choose-us-text-content">
              <span className="why-choose-us-text-title">{content.sectionTitle}</span>
              <h2>{content.subtitle}</h2>
              <ul className="features-list">
                {content.features.map((feature, index) => (
                  <li key={index}>
                    <div className="feature">
                      <img src={feature.image} alt={feature.title} className='feature-img' /> {/* Use feature image */}
                      <span>{feature.title}</span>
                      <p>{feature.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="why-choose-us-img">
            <div className="why-choose-us-image">
              <img src={content.mainImage} alt="Why Choose Us" /> {/* Use main image */}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default WhyChooseUs

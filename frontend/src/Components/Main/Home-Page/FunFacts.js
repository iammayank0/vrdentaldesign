import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import axiosInstance from '../../../axiosInstance';
import '../Main.css';

const FunFacts = () => {
    const [funFacts, setFunFacts] = useState([]);
    const { ref, inView } = useInView({
        triggerOnce: true, // Trigger animation only once
        threshold: 0.1, // Percentage of element visibility required to trigger
    });

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
                        <div className="fact-num" ref={ref}>
                            {funFacts.map((fact, index) => (
                                <div className="single-funFact" key={index}>
                                    <h3>
                                        <span className="digit">
                                            {inView && (
                                                <CountUp start={0} end={fact.number} duration={2.5} />
                                            )}
                                        </span>
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
    );
};

export default FunFacts;

import React, { useEffect, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import Navbar from '../../Navbar/Navbar';
import '../Main.css';

const Banner = () => {
    const [slides, setSlides] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [loadingBanner, setLoadingBanner] = useState(true);
    const [error, setError] = useState(null);
    const [animateH5, setAnimateH5] = useState(false);
    const [animateH1P, setAnimateH1P] = useState(false);

    useEffect(() => {
        const fetchBannerContent = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/banner');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setSlides(data);
                setLoadingBanner(false);
            } catch (error) {
                console.error('Error fetching banner content:', error);
                setError('Failed to load banner content.');
                setLoadingBanner(false);
            }
        };

        fetchBannerContent();
    }, []);

    useEffect(() => {
        if (slides.length > 0) {
            const interval = setInterval(() => {
                setCurrentSlide(prevSlide => (prevSlide + 1) % slides.length);
            }, 6000);
            return () => clearInterval(interval);
        }
    }, [slides]);

    useEffect(() => {
        // Reset animation classes on slide change
        setAnimateH5(false);
        setAnimateH1P(false);
        // Trigger animation classes after a short delay
        const timeout = setTimeout(() => {
            setAnimateH5(true);
            setAnimateH1P(true);
        }, 100);

        return () => clearTimeout(timeout);
    }, [currentSlide]);

    return (
        <div className="banner-container" style={{ backgroundImage: `url(${slides[currentSlide]?.backgroundImageUrl})` }}>
            <Navbar />
            {loadingBanner && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {!loadingBanner && !error && (
                <div className="banner-section">
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            className={`slide ${index === currentSlide ? 'active' : ''}`}
                            role="tabpanel"
                            aria-hidden={index !== currentSlide}
                            aria-labelledby={`slide-${index}`}
                        >
                            <div className="main-banner">
                                <div className="text">
                                    <h5 className={animateH5 ? 'animate-up' : ''} id={`slide-${index}`}>{slide.title}</h5>
                                    <h1 className={animateH1P ? 'animate-left' : ''}>{slide.heading}</h1>
                                    <p className={animateH1P ? 'animate-left' : ''}>{slide.description}</p>
                                
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Banner;

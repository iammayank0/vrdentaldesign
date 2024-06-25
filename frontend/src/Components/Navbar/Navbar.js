import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';
import { FaPhone } from 'react-icons/fa';
import { SiMinutemailer } from 'react-icons/si';
import { IoMenuSharp, IoClose } from 'react-icons/io5';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const iconMap = {
  FaFacebook: FaFacebook,
  FaTwitter: FaTwitter,
  FaLinkedin: FaLinkedin,
  FaInstagram: FaInstagram,
};

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [navbarItems, setNavbarItems] = useState([]);
  const [contactInfo, setContactInfo] = useState({});
  const [socialLinks, setSocialLinks] = useState([]);
  const [logoUrl, setLogoUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSticky, setIsSticky] = useState(false);

  const navbarRef = useRef(null);
  const placeholderRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [navbarItemsResponse, contactInfoResponse, socialLinksResponse, logoResponse] = await Promise.all([
          fetch('http://localhost:5000/api/navbar'),
          fetch('http://localhost:5000/api/contact-info'),
          fetch('http://localhost:5000/api/social-links'),
          fetch('http://localhost:5000/api/logo')
        ]);

        const navbarItemsData = await navbarItemsResponse.json();
        const contactInfoData = await contactInfoResponse.json();
        const socialLinksData = await socialLinksResponse.json();
        const logoData = await logoResponse.json();

        setNavbarItems(navbarItemsData);
        setContactInfo(contactInfoData);
        setSocialLinks(socialLinksData);
        setLogoUrl(logoData.logoUrl);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error loading data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (navbarRef.current) {
        const sticky = navbarRef.current.offsetTop;
        if (window.pageYOffset > sticky) {
          setIsSticky(true);
          if (placeholderRef.current) {
            placeholderRef.current.style.height = `${navbarRef.current.offsetHeight}px`;
          }
        } else {
          setIsSticky(false);
          if (placeholderRef.current) {
            placeholderRef.current.style.height = '0px';
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="header">
      <div className="contact-info">
        <div className='info'>
          <h3><FaPhone className='icon' /> {contactInfo.phone}</h3>
          <h3><SiMinutemailer className='icon' /> {contactInfo.email}</h3>
        </div>
        <div className='social'>
          {socialLinks.map((link, index) => {
            const IconComponent = iconMap[link.icon];
            return (
              <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" title={link.icon}>
                <IconComponent className='icon' />
              </a>
            );
          })}
        </div>
      </div>
      <div ref={placeholderRef} className="navbar-placeholder"></div>
      <nav className={`main-nav ${isSticky ? 'sticky' : ''}`} ref={navbarRef} id='navbar'>
        <div className="logo">
          <img src={logoUrl} alt="logo" />
        </div>
        <div className={`menu-link ${menuOpen ? 'hidden' : ''}`}>
          <ul>
            {navbarItems.map((item, index) => (
              <li key={index}><Link to={item.url}>{item.title}</Link></li>
            ))}
          </ul>
        </div>
        <button className='menu-icons' onClick={handleMenuToggle} aria-label="Toggle menu">
          {menuOpen ? <IoClose /> : <IoMenuSharp />}
        </button>
      </nav>
      {menuOpen && (
        <div className="dropdown-menu">
          <ul>
            {navbarItems.map((item, index) => (
              <li key={index}><Link to={item.url}>{item.title}</Link></li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;

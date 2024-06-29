import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../axiosInstance';
import Navbar from '../../Navbar/Navbar';
import Footer from "../../Footer/Footer";
import Blog from '../../Main/Home-Page/Blog'
import { Link } from 'react-router-dom';
import "./BlogPage.css";

const BlogPage = () => {
    const [backgroundImage, setBackgroundImage] = useState('');

    useEffect(() => {
        const fetchBackgroundImage = async () => {
            try {
                const response = await axiosInstance.get('/gallerybg');
                if (response.data && response.data.length > 0) {
                    setBackgroundImage(response.data[0].BackgroundImage);
                } else {
                    setBackgroundImage(''); // Fallback or default image URL
                }
            } catch (error) {
                console.error('Failed to fetch gallery background image:', error);
                setBackgroundImage(''); // Fallback or default image URL
            }
        };

        fetchBackgroundImage();
    }, []);

    return (
        <>
            <div className='page' style={{ backgroundImage: `url(${backgroundImage})` }}>
                <Navbar />
                <div className='d-table'>
                    <div className="d-table-cell">
                        <div className="page-container">
                            <div className="page-title-content">
                                <h2>BLOGS</h2>
                                <ul>
                                    <li>
                                        <Link to="/">Home</Link>
                                    </li>
                                    <li>Blogs</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className='blog-page'>
                <Blog />
            </section>
            <section className='blog-footer'>
                <Footer />
            </section>
        </>
    );
}

export default BlogPage;

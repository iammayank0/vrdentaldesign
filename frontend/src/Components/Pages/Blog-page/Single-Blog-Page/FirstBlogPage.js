import React, { useEffect, useState } from "react";
import axios from "axios";
import "../BlogPage.css";
import Navbar from "../../../Navbar/Navbar";
import { Link } from "react-router-dom";
import Footer from "../../../Footer/Footer";

import { FaRegCalendarAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa";

const FirstBlogPage = () => {
  const [backgroundImage, setBackgroundImage] = useState("");
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBackgroundImage = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/servicebg");
        setBackgroundImage(
          response.data.length > 0 ? response.data[0].BackgroundImage : ""
        );
      } catch (error) {
        console.error("Failed to fetch about background image:", error);
      }
    };

    const fetchBlogData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/blogs");
        if (response.data.length > 0) {
          setBlog(response.data[0]);
        }
      } catch (error) {
        console.error("Error fetching Blogs:", error);
      }
    };

    fetchBlogData();
    fetchBackgroundImage();
  }, []);

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div
        className="page"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <Navbar />
        <div className="d-table">
          <div className="d-table-cell">
            <div className="page-container">
              <div className="page-title-content">
                <h2>{blog.BlogTitle}</h2>
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>{blog.BlogTitle}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="single-blog-detail">
        <div className="page-container">
          <div className="blog-page">
            <div className="single-Blog-img">
              <img src={blog.image} alt={blog.BlogTitle} />
            </div>
            <div className="single-blog-content">
              <div className="entry-meta">
                <ul>
                  <li>
                  <FaRegCalendarAlt />
                  <a href="#/">{blog.date}</a>
                  </li>
                  <li>
                    <FaUser />
                    Admin
                  </li>
                </ul>
              </div>
              <h3>{blog.BlogTitle}</h3>
              <p></p>
              <p>
                <span>{blog.descriptionTitle}</span>
              </p>
              <div className="Blog-detail-desc">
                <p>
                  <span>{blog.description}</span>
                </p>
              </div>
            </div>
          </div>
          <div className="blog-widget">
            <aside className="blog-widget-area">
              <section className="widget-class">
                <h3 className="blog-widget-title">
                  po
                </h3>
              </section>
            </aside>
          </div>
        </div>
      </section>
      <section className="single-Blog-footer">
        <Footer />
      </section>
    </>
  );
};

export default FirstBlogPage;

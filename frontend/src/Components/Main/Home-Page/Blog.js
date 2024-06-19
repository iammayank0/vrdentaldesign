import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Main.css';

import { FaRegCalendarAlt } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [blogText, setBlogText] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const [blogsResponse, blogTextResponse] = await Promise.all([
          axios.get('http://localhost:5000/api/blogs'),
          axios.get('http://localhost:5000/api/blog-texts')
        ]);

        setBlogs(blogsResponse.data);
        setBlogText(blogTextResponse.data[0]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching data: {error}</p>;
  }

  return (
    <div>
      <section className='blog-area'>
        <div className='container-blog'>
          <div className="blog-text">
            <span className='blog-title'>{blogText.title}</span>
            <h2>{blogText.heading}</h2>
            <p>{blogText.description}</p>
          </div>
          <div className="blog">
            {blogs.map(blog => (
              <div className="blog-card" key={blog._id}>
                <div className="single-blog-post">
                  <div className="post-image">
                    <img src={blog.image} alt="blog-img" />
                    <div className="date">
                      <FaRegCalendarAlt />
                      {blog.date}
                    </div>
                
                  </div>
                 
                </div>
                  <div className="post-content">
                      <h3>{blog.BlogTitle}</h3>
                      <a href={blog.link} className='blog-read-more-btn'>READ MORE<IoIosArrowForward /></a>
                    </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Blog;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BlogPanel = () => {
  const [blogs, setBlogs] = useState([]);
  const [blogTexts, setBlogTexts] = useState([]);
  const [newBlogTitle, setNewBlogTitle] = useState('');
  const [newBlogDate, setNewBlogDate] = useState('');
  const [newBlogLink, setNewBlogLink] = useState('');
  const [newBlogImage, setNewBlogImage] = useState(null);
  const [selectedBlogId, setSelectedBlogId] = useState(null);
  const [editBlogTitle, setEditBlogTitle] = useState('');
  const [editBlogDate, setEditBlogDate] = useState('');
  const [editBlogLink, setEditBlogLink] = useState('');
  const [editBlogImage, setEditBlogImage] = useState(null);
  const [editBlogImageUrl, setEditBlogImageUrl] = useState('');
  const [selectedBlogTextId, setSelectedBlogTextId] = useState(null);
  const [editBlogTextTitle, setEditBlogTextTitle] = useState('');
  const [editBlogTextHeading, setEditBlogTextHeading] = useState('');
  const [editBlogTextDescription, setEditBlogTextDescription] = useState('');

  useEffect(() => {
    fetchBlogs();
    fetchBlogTexts();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/blogs');
      setBlogs(response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const fetchBlogTexts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/blog-texts');
      setBlogTexts(response.data);
    } catch (error) {
      console.error('Error fetching blog texts:', error);
    }
  };

  const handleBlogSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('BlogTitle', newBlogTitle);
    formData.append('date', newBlogDate);
    formData.append('link', newBlogLink);
    if (newBlogImage) {
      formData.append('image', newBlogImage);
    }

    try {
      const response = await axios.post('http://localhost:5000/api/blog/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setBlogs([...blogs, response.data]);
      setNewBlogTitle('');
      setNewBlogDate('');
      setNewBlogLink('');
      setNewBlogImage(null);
    } catch (error) {
      console.error('Failed to create blog:', error);
    }
  };

  const handleBlogEdit = async () => {
    if (!selectedBlogId) return;
    
    const formData = new FormData();
    formData.append('BlogTitle', editBlogTitle);
    formData.append('date', editBlogDate);
    formData.append('link', editBlogLink);
    if (editBlogImage) {
      formData.append('image', editBlogImage);
    }

    try {
      const response = await axios.put(`http://localhost:5000/api/blog/${selectedBlogId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const updatedBlogs = blogs.map(blog => (blog._id === selectedBlogId ? response.data : blog));
      setBlogs(updatedBlogs);
      setSelectedBlogId(null);
      setEditBlogTitle('');
      setEditBlogDate('');
      setEditBlogLink('');
      setEditBlogImage(null);
      setEditBlogImageUrl('');
    } catch (error) {
      console.error('Failed to update blog:', error);
    }
  };

  const handleBlogDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/blog/${id}`);
      const updatedBlogs = blogs.filter(blog => blog._id !== id);
      setBlogs(updatedBlogs);
    } catch (error) {
      console.error('Failed to delete blog:', error);
    }
  };

  const handleBlogTextEdit = async () => {
    try {
      const updates = {
        title: editBlogTextTitle,
        heading: editBlogTextHeading,
        description: editBlogTextDescription,
      };
      const response = await axios.put(`http://localhost:5000/api/blog-text/${selectedBlogTextId}`, updates);
      const updatedBlogTexts = blogTexts.map(blogText => (blogText._id === selectedBlogTextId ? response.data : blogText));
      setBlogTexts(updatedBlogTexts);
      setSelectedBlogTextId(null);
      setEditBlogTextTitle('');
      setEditBlogTextHeading('');
      setEditBlogTextDescription('');
    } catch (error) {
      console.error('Failed to update blog text:', error);
    }
  };

  const handleBlogSelect = (e) => {
    const selectedId = e.target.value;
    setSelectedBlogId(selectedId);
    if (selectedId) {
      const selectedBlog = blogs.find(blog => blog._id === selectedId);
      setEditBlogTitle(selectedBlog.BlogTitle);
      setEditBlogDate(selectedBlog.date);
      setEditBlogLink(selectedBlog.link);
      setEditBlogImageUrl(selectedBlog.image);
    } else {
      setEditBlogTitle('');
      setEditBlogDate('');
      setEditBlogLink('');
      setEditBlogImageUrl('');
    }
  };

  const handleBlogTextSelect = (blogText) => {
    setSelectedBlogTextId(blogText._id);
    setEditBlogTextTitle(blogText.title);
    setEditBlogTextHeading(blogText.heading);
    setEditBlogTextDescription(blogText.description);
  };

  return (
    <div>
      <h2>Create New Blog</h2>
      <form onSubmit={handleBlogSubmit}>
        <label>Title:</label>
        <input type="text" value={newBlogTitle} onChange={(e) => setNewBlogTitle(e.target.value)} required />
        <label>Date:</label>
        <input type="text" value={newBlogDate} onChange={(e) => setNewBlogDate(e.target.value)} required />
        <label>Link:</label>
        <input type="text" value={newBlogLink} onChange={(e) => setNewBlogLink(e.target.value)} required />
        <label>Image:</label>
        <input type="file" onChange={(e) => setNewBlogImage(e.target.files[0])} />
        <button type="submit">Create Blog</button>
      </form>

      <h2>Edit Blog</h2>
      <select onChange={handleBlogSelect} value={selectedBlogId || ''}>
        <option value="">Select Blog to Edit</option>
        {blogs.map(blog => (
          <option key={blog._id} value={blog._id}>{blog.BlogTitle}</option>
        ))}
      </select>
      {selectedBlogId && (
        <div>
          <label>Title:</label>
          <input type="text" value={editBlogTitle} onChange={(e) => setEditBlogTitle(e.target.value)} />
          <label>Date:</label>
          <input type="text" value={editBlogDate} onChange={(e) => setEditBlogDate(e.target.value)} />
          <label>Link:</label>
          <input type="text" value={editBlogLink} onChange={(e) => setEditBlogLink(e.target.value)} />
          {editBlogImageUrl && (
            <div>
              <label>Current Image:</label>
              <img src={editBlogImageUrl} alt="Current Blog" style={{ width: '100px', height: '100px' }} />
            </div>
          )}
          <label>Image:</label>
          <input type="file" onChange={(e) => setEditBlogImage(e.target.files[0])} />
          <button onClick={handleBlogEdit}>Save Changes</button>
        </div>
      )}
      
      <h2>Delete Blog</h2>
      <ul>
        {blogs.map(blog => (
          <li key={blog._id}>
            {blog.BlogTitle} - {blog.date} (<button onClick={() => handleBlogDelete(blog._id)}>Delete</button>)
          </li>
        ))}
      </ul>

      <h2>Edit Blog Text</h2>
      {blogTexts.map(blogText => (
        <div key={blogText._id}>
          <h3>{blogText.title}</h3>
          <label>Title:</label>
          <input type="text" value={selectedBlogTextId === blogText._id ? editBlogTextTitle : blogText.title} onChange={(e) => setEditBlogTextTitle(e.target.value)} />
          <label>Heading:</label>
          <input type="text" value={selectedBlogTextId === blogText._id ? editBlogTextHeading : blogText.heading} onChange={(e) => setEditBlogTextHeading(e.target.value)} />
          <label>Description:</label>
          <textarea value={selectedBlogTextId === blogText._id ? editBlogTextDescription : blogText.description} onChange={(e) => setEditBlogTextDescription(e.target.value)} />
          <button onClick={() => handleBlogTextSelect(blogText)}>Edit</button>
          {selectedBlogTextId === blogText._id && (
            <button onClick={handleBlogTextEdit}>Save Changes</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default BlogPanel;

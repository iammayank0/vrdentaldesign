import React, { useState, useEffect } from "react";
import axiosInstance from '../../../axiosInstance';
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import "./Panel.css";

const AboutPanel = () => {
  const [aboutContent, setAboutContent] = useState(null);
  const [formData, setFormData] = useState({
    subTitle: "",
    title: "",
    description: "",
    services: "",
    companyName: "",
    founders: "",
    img1: null,
    img2: null,
    signImage: null,
  });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchAboutContent();
  }, []);

  const fetchAboutContent = async () => {
    try {
      const response = await axiosInstance.get("/about");
      setAboutContent(response.data);
    } catch (error) {
      console.error("Error fetching About content:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  const handleEdit = () => {
    if (aboutContent) {
      const { subTitle, title, description, services, companyName, founders } =
        aboutContent;
      setFormData({
        subTitle,
        title,
        description,
        services: services.join("\n"), 
        companyName,
        founders,
        img1: null,
        img2: null,
        signImage: null,
      });
      setEditing(true);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("subTitle", formData.subTitle);
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append(
        "services",
        JSON.stringify(formData.services.split("\n"))
      );
      formDataToSend.append("companyName", formData.companyName);
      formDataToSend.append("founders", formData.founders);
      if (formData.img1) {
        formDataToSend.append("img1", formData.img1);
      }
      if (formData.img2) {
        formDataToSend.append("img2", formData.img2);
      }
      if (formData.signImage) {
        formDataToSend.append("signImage", formData.signImage);
      }

      const response = await axiosInstance.put(
        `/about/${aboutContent._id}`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        fetchAboutContent();
        setFormData({
          subTitle: "",
          title: "",
          description: "",
          services: "",
          companyName: "",
          founders: "",
          img1: null,
          img2: null,
          signImage: null,
        });
        setEditing(false);
      } else {
        console.error("Update failed:", response.statusText);
      }
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  return (
    <div className="panel-container">
      <div className="panel-button">
              <aside className="panel-widget-area">
                <section className="panel-list">
                    <div className="panel-btn" >
                    <Link to="/admin" ><h3>Home Page</h3></Link>
                      <ul>
                        <li>
                          <Link
                            to="/admin/nav-panel"
                          >
                            Navbar <div className="arrow-icn"><FaArrowRight /></div>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/admin/banner"
                          >
                            Banner <div className="arrow-icn"><FaArrowRight /></div>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/admin/about-section"
                          >
                            About <div className="arrow-icn"><FaArrowRight /></div>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/admin/funFacts"
                          >
                            Fun Facts <div className="arrow-icn"><FaArrowRight /></div>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/admin/OurSpecialisation"
                          >
                            Our Specialisation <div className="arrow-icn"><FaArrowRight /></div>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/admin/wycu"
                          >
                            Why You Choose Us <div className="arrow-icn"><FaArrowRight /></div>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/admin/services"
                          >
                            Services <div className="arrow-icn"><FaArrowRight /></div>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/admin/cta"
                          >
                            CTA <div className="arrow-icn"><FaArrowRight /></div>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/admin/partners"
                          >
                            Partners Image <div className="arrow-icn"><FaArrowRight /></div>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/admin/blog"
                          >
                            Blogs <div className="arrow-icn"><FaArrowRight /></div>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/admin/footer"
                          >
                            Footer <div className="arrow-icn"><FaArrowRight /></div>
                          </Link>
                        </li>
                      </ul>
                    </div>
                </section>
              </aside>
            </div>
      <div className="panel-form">
      <div className="admin-slide-container">
          <h2 className="admin-slide-heading">About Panel</h2>
          <form className="admin-form" onSubmit={handleUpdate}>
            <div>
              <label htmlFor="img1">Image 1:</label>
              <input
                type="file"
                name="img1"
                onChange={handleFileChange}
                accept="image/*"
              />
            </div>
            <div>
              <label htmlFor="img2">Image 2:</label>
              <input
                type="file"
                name="img2"
                onChange={handleFileChange}
                accept="image/*"
              />
            </div>
            <div>
              <label htmlFor="signImage">Sign Image:</label>
              <input
                type="file"
                name="signImage"
                onChange={handleFileChange}
                accept="image/*"
              />
            </div>
            <div>
              <label htmlFor="subTitle">Sub Title:</label>
              <input
                type="text"
                name="subTitle"
                value={formData.subTitle}
                onChange={handleChange}
                placeholder="Sub Title"
                required
              />
            </div>
            <div>
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Title"
                required
              />
            </div>
            <div>
              <label htmlFor="description">Description:</label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                required
              />
            </div>
            <div>
              <label htmlFor="services">Services:</label>
              <textarea
                name="services"
                value={formData.services}
                onChange={handleChange}
                placeholder="Services (one per line)"
                required
              />
            </div>
            <div>
              <label htmlFor="companyName">Company Name:</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Company Name"
                required
              />
            </div>
            <div>
              <label htmlFor="founders">Founders:</label>
              <input
                type="text"
                name="founders"
                value={formData.founders}
                onChange={handleChange}
                placeholder="Founders"
                required
              />
            </div>
            <button type="submit">Update</button>
            {editing && (
              <button type="button" onClick={() => setEditing(false)}>
                Cancel
              </button>
            )}
          </form>
          {aboutContent && !editing && (
            <div>
              <h3>{aboutContent.title}</h3>
              <p>{aboutContent.subTitle}</p>
              <p>{aboutContent.description}</p>
              <p>Services: {aboutContent.services.join(", ")}</p>
              <p>Company Name: {aboutContent.companyName}</p>
              <p>Founders: {aboutContent.founders}</p>
              <button onClick={handleEdit}>Edit</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutPanel;

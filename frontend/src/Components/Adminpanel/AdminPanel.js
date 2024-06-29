import React from 'react';
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const AdminPanel = () => {
  return (
    <div className="panel-container">
      <div className="panel-button">
              <aside className="panel-widget-area">
                <section className="panel-list">
                    <div className="panel-btn" >
                    <h3>Home Page Panel</h3>
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
      <div className="welcome-panel">
      <h1>Welcome to Admin Panel</h1>
      </div>
      <div className="panel-button">
              <aside className="panel-widget-area">
                <section className="panel-list">
                    <div className="panel-btn" >
                    <h3>Pages Panel</h3>
                      <ul>
                        <li>
                          <Link
                            to="/admin/about-page"
                          >
                            About Page <div className="arrow-icn"><FaArrowRight /></div>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/admin/gallery"
                          >
                            Gallery <div className="arrow-icn"><FaArrowRight /></div>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/admin/Service-page"
                          >
                            Service Page <div className="arrow-icn"><FaArrowRight /></div>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/admin/ContactUs"
                          >
                            Contact Us <div className="arrow-icn"><FaArrowRight /></div>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/admin/team"
                          >
                            Team <div className="arrow-icn"><FaArrowRight /></div>
                          </Link>
                        </li>
                      </ul>
                    </div>
                </section>
              </aside>
            </div>
    </div>
  )
}

export default AdminPanel

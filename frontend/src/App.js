import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AdminPanel from './Components/Adminpanel/AdminPanel';
import Main from './Components/Main/Main';
import Login from './Components/Login/Login';
import './App.css';
import AboutPage from './Components/Pages/About-page/AboutPage';
import Gallery from './Components/Pages/Gallery-page/Gallery';
import ContactPage from "./Components/Pages/ContactPage";
import ServicePage from './Components/Pages/Service-page/ServicePage';
import TermAndCondition from './Components/Pages/Terms-page/TermAndCondition';
import ValplastFlexible from './Components/Pages/Service-page/Single-service-pages/ValplastFlexible';
import CosmeticDentistry from './Components/Pages/Service-page/Single-service-pages/CosmeticDentistry';
import ScrewRetainCrown from './Components/Pages/Service-page/Single-service-pages/ScrewRetainCrown';
import CPD from './Components/Pages/Service-page/Single-service-pages/CPD';
import NightGaurd from './Components/Pages/Service-page/Single-service-pages/NightGaurd';
import InlayOnlay from './Components/Pages/Service-page/Single-service-pages/InlayOnlay';
import Veneer from './Components/Pages/Service-page/Single-service-pages/Veneer';
import SnapOnSmile from './Components/Pages/Service-page/Single-service-pages/SnapOnSmile';
import CustomTray from './Components/Pages/Service-page/Single-service-pages/CustomTray';
import ModelCreate from './Components/Pages/Service-page/Single-service-pages/ModelCreate';
import SurgicalGuide from './Components/Pages/Service-page/Single-service-pages/SurgicalGuide';
import DigitalDenture from './Components/Pages/Service-page/Single-service-pages/DigitalDenture';
import Crown from './Components/Pages/Service-page/Single-service-pages/Crown';
import BlogPage from './Components/Pages/Blog-page/BlogPage';
import FirstBlogPage from './Components/Pages/Blog-page/Single-Blog-Page/FirstBlogPage';
import SecondBlogPage from './Components/Pages/Blog-page/Single-Blog-Page/SecondBlogPage';
import ThirdBlogPage from './Components/Pages/Blog-page/Single-Blog-Page/ThirdBlogPage';
import FourthBlogPage from './Components/Pages/Blog-page/Single-Blog-Page/FourthBlogPage';
import FifthBlogPage from './Components/Pages/Blog-page/Single-Blog-Page/FifthBlogPage';
import SixthBlogPage from './Components/Pages/Blog-page/Single-Blog-Page/SixthBlogPage';


const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        {/* Login Page Route */}
        <Route
          path="/login"
          element={<Login setLoggedIn={setLoggedIn} />}
        />

        {/* Admin Panel Route */}
        <Route
          path="/admin"
          element={loggedIn ? <AdminPanel /> : <Navigate to="/login" />}
        />

        {/* Default Route */}
        <Route
          path="/*"
          element={<Main />}
        />

      
        <Route
          exact path="/about-page"
          element={<AboutPage />}
        />

        <Route
          exact path="/gallery-page"
          element={<Gallery /> }
        />

        <Route
          exact path="/services-page"
          element={<ServicePage /> }
        />

        <Route
          exact path="/contact-page"
          element={<ContactPage /> }
        />

        <Route
          exact path="/term&condition-page"
          element={<TermAndCondition /> }
        />

        <Route
          exact path="/service-detail/valplast-flexible"
          element={<ValplastFlexible /> }
        />

        <Route
          exact path="/service-detail/cosmetic-dentistry"
          element={<CosmeticDentistry /> }
        />

        <Route
          exact path="/service-detail/screw-retain-crown"
          element={<ScrewRetainCrown /> }
        />

        <Route
          exact path="/service-detail/cpd-rpd"
          element={<CPD /> }
        />

        <Route
          exact path="/service-detail/night-guard"
          element={<NightGaurd /> }
        />

        <Route
          exact path="/service-detail/inlay-onlay"
          element={<InlayOnlay /> }
        />

        <Route
          exact path="/service-detail/veneer"
          element={<Veneer /> }
        />

        <Route
          exact path="/service-detail/snap-on-smile"
          element={<SnapOnSmile /> }
        />

        <Route
          exact path="/service-detail/custom-tray"
          element={<CustomTray /> }
        />

        <Route
          exact path="/service-detail/model-create"
          element={<ModelCreate /> }
        />

        <Route
          exact path="/service-detail/surgical-guide"
          element={<SurgicalGuide /> }
        />

        <Route
          exact path="/service-detail/digital-denture"
          element={<DigitalDenture /> }
        />

        <Route
          exact path="/service-detail/crown-&-bridge"
          element={<Crown /> }
        />

        <Route
          exact path="/blogs"
          element={<BlogPage /> }
        />

        <Route
          exact path="/blog-post/1"
          element={<FirstBlogPage /> }
        />

        <Route
          exact path="/blog-post/2"
          element={<SecondBlogPage /> }
        />

        <Route
          exact path="/blog-post/3"
          element={<ThirdBlogPage /> }
        />

        <Route
          exact path="/blog-post/4"
          element={<FourthBlogPage /> }
        />

        <Route
          exact path="/blog-post/5"
          element={<FifthBlogPage /> }
        />

        <Route
          exact path="/blog-post/6"
          element={<SixthBlogPage /> }
        />

          
      </Routes>
    </Router>
  );
}

export default App;

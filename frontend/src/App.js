import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AdminPanel from './Components/Adminpanel/AdminPanel';
import Main from './Components/Main/Main';
import Login from './Components/Login/Login';
import './App.css';
import AboutPage from './Components/Pages/AboutPage';
import Gallery from './Components/Pages/Gallery-page/Gallery';
import ContactPage from "./Components/Pages/ContactPage";
import ServicePage from './Components/Pages/Service-page/ServicePage';
import TermAndCondition from './Components/Pages/Terms-page/TermAndCondition';


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

          
      </Routes>
    </Router>
  );
}

export default App;

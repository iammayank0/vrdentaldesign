import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AdminPanel from './Components/Adminpanel/AdminPanel';
import Main from './Components/Main/Main';
import Login from './Components/Login/Login';

import './App.css';
import AboutPage from './Components/Pages/AboutPage';
import ServicePage from './Components/Pages/ServicePage';
import TermCondition from './Components/Pages/TermCondition';
import ContactPage from './Components/Pages/ContactPage'


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
          exact path="/contact-page"
          element={<ContactPage />}
        />
       <Route
          exact path="/service-page"
          element={<ServicePage />}
        />
        <Route
        exact path="/term&condition-page"
        element={<TermCondition/>}
        />

          
      </Routes>
    </Router>
  );
}

export default App;

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AdminPanel from './Components/Adminpanel/AdminPanel';
import Main from './Components/Main/Main';
import Login from './Components/Login/Login';

import './App.css';
import AboutPage from './Components/Pages/AboutPage';
<<<<<<< HEAD
import ServicePage from './Components/Pages/ServicePage';
import TermCondition from './Components/Pages/TermCondition';
import ContactPage from './Components/Pages/ContactPage'
=======
import Gallery from './Components/Pages/Gallery-page/Gallery';
>>>>>>> 468a4261d271a309c1a2016c305a97eb26b93589


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

        <Route
          exact path="/gallery-page"
          element={<Gallery /> }
        />

          
      </Routes>
    </Router>
  );
}

export default App;

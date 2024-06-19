import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import './Login.css';
import Swal from 'sweetalert2';

const Login = ({ setLoggedIn }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = formData;

    
    if (username === 'admin' && password === 'password') {
      // Simulate a successful login
      localStorage.setItem('token', 'fakeToken'); // Dummy token
      setLoggedIn(true);
      Swal.fire({
        icon: "success",
        title: "You have successfully logged in",
      });
      navigate('/admin');
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Login failed: Invalid credentials",
      });
      console.error('Login failed: Invalid credentials');
    }
  };

  return (
    <div className="wholebody">
    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div>
          <label> <FaUser />Username: </label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} />
        </div>
        <div>
          <label> <RiLockPasswordFill />Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
    </div>
  );
};

export default Login;

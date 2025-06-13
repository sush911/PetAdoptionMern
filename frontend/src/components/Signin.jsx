import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaGooglePlusG, FaXTwitter } from 'react-icons/fa6';
import { FaFacebookF } from 'react-icons/fa';
import { SlSocialVkontakte } from 'react-icons/sl';
import loginImg from '../assets/2.jpg';

export const Signin = ({ setToken }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSocialClick = (platform) => {
    console.log(`Clicked ${platform} login`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://localhost:5000/api/login', form);
      localStorage.setItem('token', response.data.token);
      setToken(response.data.token);
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <div className="d-flex vh-100">
        <div
          className="col-md-6 p-0 d-none d-md-block"
          style={{ backgroundColor: '#f8f9fa' }}
        >
          <img
            src={loginImg}
            alt="Login Visual"
            className="w-100 h-100 object-fit-cover"
            onError={(e) => (e.target.src = 'https://via.placeholder.com/600x800')}
          />
        </div>
        <div className="col-12 col-md-6 bg-light d-flex align-items-center justify-content-center">
          <div className="w-100 p-4" style={{ maxWidth: '500px' }}>
            <h2 className="text-dark text-center mb-4">Login</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label text-dark">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={form.email}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label text-dark">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={form.password}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <button type="submit" className="btn btn-info w-100 text-white">
                LOGIN
              </button>
            </form>
            <p className="text-center mt-4">Or via social network</p>
            <div className="d-flex justify-content-center mb-4">
              {[FaGooglePlusG, FaFacebookF, FaXTwitter, SlSocialVkontakte].map((Icon, i) => (
                <button
                  key={i}
                  className="btn btn-secondary rounded-circle mx-2"
                  style={{ width: '40px', height: '40px' }}
                  onClick={() => handleSocialClick(Icon.name)}
                  aria-label={`Login with ${Icon.name}`}
                >
                  <Icon className="text-white" />
                </button>
              ))}
            </div>
            <p className="text-center">Don't have an account?</p>
            <Link to="/signup" className="btn btn-info w-100 text-white">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

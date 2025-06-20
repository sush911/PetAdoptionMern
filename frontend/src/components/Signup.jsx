import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import loginImg from '../assets/2.jpg';

export const Signup = ({ setToken }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://localhost:5000/api/register', form);
      localStorage.setItem('token', response.data.token);
      setToken(response.data.token);
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    }
  };

  return (
    <div className="d-flex vh-100">
      <div className="col-md-6 p-0 d-none d-md-block">
        <img
          src={loginImg}
          alt="Register Visual"
          className="w-100 h-100 object-fit-cover"
          onError={(e) => (e.target.src = 'https://via.placeholder.com/600x800')}
        />
      </div>
      <div className="col-12 col-md-6 bg-dark d-flex flex-column align-items-center justify-content-start pt-4">
        {/* Title at the top */}
        <h1
          className="text-info text-center display-3 fw-bold mb-4"
          style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}
        >
          PetForPat
        </h1>

        <div className="w-100 p-4" style={{ maxWidth: '500px' }}>
          <h2 className="text-white text-center mb-4">Register</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label text-white">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={form.name}
                onChange={handleChange}
                className="form-control bg-secondary text-light border-0"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label text-white">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={form.email}
                onChange={handleChange}
                className="form-control bg-secondary text-light border-0"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label text-white">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                value={form.password}
                onChange={handleChange}
                className="form-control bg-secondary text-light border-0"
                required
              />
            </div>
            <button type="submit" className="btn btn-info w-100 text-white">REGISTER</button>
          </form>

          <p className="text-white text-center mt-4">Already have an account?</p>
          <Link to="/login" className="btn btn-info w-100 text-white">Login</Link>
        </div>
      </div>
    </div>
  );
};

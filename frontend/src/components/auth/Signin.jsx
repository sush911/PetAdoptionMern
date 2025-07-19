import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode'; // Correct for Vite

export const Signin = ({ setToken }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://localhost:5000/api/login', form);
      const token = response.data.token;
      const decoded = jwtDecode(token);

      localStorage.setItem('token', token);
      localStorage.setItem('role', decoded.role); // Store role
      setToken(token);
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const token = credentialResponse.credential;

      const res = await axios.post('http://localhost:5000/api/auth/google', { token });
      const appToken = res.data.token;
      const decoded = jwtDecode(appToken);

      localStorage.setItem('token', appToken);
      localStorage.setItem('role', decoded.role); // Store role
      setToken(appToken);
      navigate('/home');
    } catch (err) {
      console.error('Google login failed', err);
      alert('Google login failed. Please try again.');
    }
  };

  return (
    <div className="d-flex vh-100">
      {/* Left Image Side */}
      <div className="col-md-6 p-0 d-none d-md-block">
        <img
          src="/assets/1.jpg"
          alt="Login Visual"
          className="w-100 h-100 object-fit-cover"
          onError={(e) => (e.target.src = 'https://via.placeholder.com/600x800')}
        />
      </div>

      {/* Right Login Form */}
      <div className="col-12 col-md-6 bg-dark d-flex flex-column align-items-center justify-content-start pt-4">
        <h1
          className="text-info text-center display-3 fw-bold mb-4"
          style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}
        >
          PetForPat
        </h1>

        <div className="w-100 p-4" style={{ maxWidth: '500px' }}>
          <h2 className="text-white text-center mb-4">Login</h2>
          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>
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

            <button type="submit" className="btn btn-info w-100 text-white">LOGIN</button>

            <Link to="/forgot-password" className="btn btn-info w-100 text-white mt-3">
              Forgot Password?
            </Link>
          </form>

          {/* Google Login Button */}
          <p className="text-white text-center mt-4">Or login with</p>
          <div className="d-flex justify-content-center mb-4">
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => console.error('Google Login Failed')}
              theme="filled_black"
              text="signin_with"
              shape="pill"
            />
          </div>

          <p className="text-white text-center">Don't have an account?</p>
          <Link to="/signup" className="btn btn-info w-100 text-white">Register</Link>
        </div>
      </div>
    </div>
  );
};

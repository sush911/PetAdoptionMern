import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaGooglePlusG, FaXTwitter } from 'react-icons/fa6';
import { FaFacebookF } from 'react-icons/fa';
import { SlSocialVkontakte } from 'react-icons/sl';
import myImg from '../assets/1.jpg';

export const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [isChecked, setIsChecked] = useState(false);
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
    if (!isChecked) {
      setError('You must accept the terms and conditions.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/api/register', form);
      localStorage.setItem('token', response.data.token);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="d-flex vh-100">
      <div className="col-md-6 p-0 d-none d-md-block">
        <img
          src={myImg}
          alt="Signup Visual"
          className="w-100 h-100 object-fit-cover"
          onError={(e) => (e.target.src = 'https://via.placeholder.com/600x800')}
        />
      </div>
      <div className="col-12 col-md-6 bg-dark d-flex align-items-center justify-content-center">
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
            <div className="form-check mb-3">
              <input
                type="checkbox"
                id="terms"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
                className="form-check-input"
              />
              <label htmlFor="terms" className="form-check-label text-white ms-2">
                I accept the <span className="text-info">Terms</span> and <span className="text-info">Privacy Policy</span>
              </label>
            </div>
            <button
              type="submit"
              disabled={!isChecked}
              className={`btn w-100 ${isChecked ? 'btn-info' : 'btn-secondary'} text-white`}
            >
              Register
            </button>
          </form>
          <p className="text-white text-center mt-4">Or via social network</p>
          <div className="d-flex justify-content-center mb-4">
            {[
              { Icon: FaGooglePlusG, name: 'Google' },
              { Icon: FaFacebookF, name: 'Facebook' },
              { Icon: FaXTwitter, name: 'Twitter' },
              { Icon: SlSocialVkontakte, name: 'VKontakte' },
            ].map(({ Icon, name }, i) => (
              <button
                key={i}
                className="btn btn-secondary rounded-circle mx-2"
                style={{ width: '40px', height: '40px' }}
                onClick={() => handleSocialClick(name)}
                aria-label={`Login with ${name}`}
              >
                <Icon className="text-white" />
              </button>
            ))}
          </div>
          <p className="text-white text-center">Already have an account?</p>
          <Link to="/login" className="btn btn-info w-100 text-white">Login</Link>
        </div>
      </div>
    </div>
  );
};
// src/components/auth/ForgotPassword.jsx
import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const res = await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
      setMessage(res.data.message || 'If an account exists, a reset link was sent.');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Try again.');
    }
  };

  return (
    <div className="d-flex vh-100">
      <div className="col-md-6 p-0 d-none d-md-block">
        <img
          src="/assets/3.jpg"
          alt="Forgot Password Visual"
          className="w-100 h-100 object-fit-cover"
          onError={(e) => (e.target.src = 'https://via.placeholder.com/600x800')}
        />
      </div>

      <div className="col-12 col-md-6 bg-dark d-flex flex-column align-items-center justify-content-start pt-4">
        <h1 className="text-info text-center display-4 fw-bold mb-4">Forgot Password</h1>
        <div className="w-100 p-4" style={{ maxWidth: '500px' }}>
          {message && <div className="alert alert-success">{message}</div>}
          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label text-white">Enter your email</label>
              <input
                type="email"
                id="email"
                className="form-control bg-secondary text-light border-0"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-info w-100 text-white">Send Reset Link</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

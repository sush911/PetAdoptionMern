import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    try {
      await axios.post(`http://localhost:5000/api/auth/reset-password/${token}`, {
        password,
      });
      setMessage('Password reset successful. You can now log in.');
      setTimeout(() => navigate('/signin'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Reset failed. Try again.');
    }
  };

  return (
    <div className="d-flex vh-100">
      {/* Left image panel */}
      <div className="col-md-6 p-0 d-none d-md-block">
        <img
          src="/assets/2.jpg"
          alt="Reset Visual"
          className="w-100 h-100 object-fit-cover"
          onError={(e) => (e.target.src = 'https://via.placeholder.com/600x800')}
        />
      </div>

      {/* Right Reset Form */}
      <div className="col-12 col-md-6 bg-dark d-flex flex-column align-items-center justify-content-start pt-4">
        <h1 className="text-info text-center display-4 fw-bold mb-4">Reset Password</h1>

        <div className="w-100 p-4" style={{ maxWidth: '500px' }}>
          {message && <div className="alert alert-success">{message}</div>}
          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleReset}>
            <div className="mb-3">
              <label htmlFor="password" className="form-label text-white">New Password</label>
              <input
                type="password"
                id="password"
                className="form-control bg-secondary text-light border-0"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label text-white">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                className="form-control bg-secondary text-light border-0"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-info w-100 text-white">Reset Password</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword; 
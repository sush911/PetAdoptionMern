import React, { useState } from 'react';
import axios from 'axios';

const RescueForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    animalType: 'dog',
    description: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      await axios.post('http://localhost:5000/api/rescues', formData, {
        headers: { 'x-auth-token': token },
      });
      setMessage('Rescue request submitted successfully.');
      setFormData({
        name: '',
        phone: '',
        location: '',
        animalType: 'dog',
        description: '',
      });
    } catch (error) {
      setMessage('Failed to submit rescue request.');
      console.error(error);
    }
  };

  return (
    <div className="container my-5" style={{ maxWidth: '600px' }}>
      <h2 className="text-center mb-4 text-success">Report a Rescue</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit} className="shadow-sm p-4 rounded bg-light border">
        <div className="mb-3">
          <label className="form-label">Your Name</label>
          <input className="form-control" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Phone Number</label>
          <input className="form-control" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Location</label>
          <input className="form-control" name="location" value={formData.location} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Animal Type</label>
          <select className="form-select" name="animalType" value={formData.animalType} onChange={handleChange} required>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <button className="btn btn-success w-100 d-flex justify-content-center align-items-center" type="submit">
          <i className="bi bi-heart-pulse me-2"></i>Submit Rescue Request
        </button>
      </form>
    </div>
  );
};

export default RescueForm;

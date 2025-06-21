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
      const res = await axios.post('http://localhost:5000/api/rescues', formData, {
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
    <div className="container mt-4">
      <h2 className="text-center mb-4">Report a Rescue</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit} className="border p-4 rounded shadow-sm">
        <div className="mb-3">
          <label className="form-label">Your Name</label>
          <input className="form-control" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Phone Number</label>
          <input className="form-control" name="phone" value={formData.phone} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Location</label>
          <input className="form-control" name="location" value={formData.location} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Animal Type</label>
          <select className="form-select" name="animalType" value={formData.animalType} onChange={handleChange}>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea className="form-control" name="description" value={formData.description} onChange={handleChange} rows="3" />
        </div>
        <button type="submit" className="btn btn-primary w-100">Submit Rescue</button>
      </form>
    </div>
  );
};

export default RescueForm;

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
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        backgroundImage: `url('/assets/rescue.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Dark overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          zIndex: 1,
        }}
      />

      {/* Form container */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          paddingTop: '4rem',
          paddingBottom: '4rem',
        }}
      >
        <div
          className="dark-form-container"
          style={{
            width: '100%',
            maxWidth: '600px',
            padding: '1.5rem 2rem',
            backgroundColor: 'rgba(20, 20, 30, 0.97)',
            color: '#eee',
            borderRadius: '10px',
            boxShadow: '0 0 25px rgba(100, 108, 255, 0.4)'
          }}
        >
          <h2 className="text-center mb-4" style={{ color: '#8ecae6' }}>Report a Rescue</h2>
          {message && (
            <div
              style={{
                marginBottom: '1rem',
                padding: '0.75rem 1rem',
                backgroundColor: '#2a2a3e',
                color: '#aaddff',
                borderRadius: '5px',
                border: '1px solid #646cff',
                textAlign: 'center',
              }}
            >
              {message}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" style={{ display: 'block', marginBottom: '0.3rem', fontWeight: '600' }}>
                Your Name
              </label>
              <input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  borderRadius: '6px',
                  border: '1px solid #444',
                  backgroundColor: '#222238',
                  color: '#eee',
                }}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="phone" style={{ display: 'block', marginBottom: '0.3rem', fontWeight: '600' }}>
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                required
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  borderRadius: '6px',
                  border: '1px solid #444',
                  backgroundColor: '#222238',
                  color: '#eee',
                }}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="location" style={{ display: 'block', marginBottom: '0.3rem', fontWeight: '600' }}>
                Location
              </label>
              <input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Where is the animal located?"
                required
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  borderRadius: '6px',
                  border: '1px solid #444',
                  backgroundColor: '#222238',
                  color: '#eee',
                }}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="animalType" style={{ display: 'block', marginBottom: '0.3rem', fontWeight: '600' }}>
                Animal Type
              </label>
              <select
                id="animalType"
                name="animalType"
                value={formData.animalType}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  borderRadius: '6px',
                  border: '1px solid #444',
                  backgroundColor: '#222238',
                  color: '#eee',
                }}
              >
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="description" style={{ display: 'block', marginBottom: '0.3rem', fontWeight: '600' }}>
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                placeholder="Additional details (optional)"
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  borderRadius: '6px',
                  border: '1px solid #444',
                  backgroundColor: '#222238',
                  color: '#eee',
                  resize: 'vertical',
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '0.7rem',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: '#8ecae6',
                color: '#1c1c2e',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#219ebc')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#8ecae6')}
            >
              Submit Rescue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RescueForm;

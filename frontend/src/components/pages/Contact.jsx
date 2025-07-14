import React, { useState } from 'react';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');

    try {
      const res = await axios.post('http://localhost:5000/api/contact', formData);
      setStatus('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error(error);
      setStatus('Failed to send message. Please try again.');
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: '100vh',
        backgroundColor: '#1e293b',
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div className="container my-5" style={{ maxWidth: '700px' }}>
        <div className="text-center mb-4">
          <h2 className="text-info fw-bold">Contact Us</h2>
          <p className="text-light">
            PetForPat is dedicated to rescuing and rehoming animals across Nepal.
            Whether you want to adopt, report an issue, or volunteer — we’d love to hear from you.
          </p>
        </div>

        <form className="bg-light shadow rounded p-4" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label text-dark">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="Your full name"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-dark">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Your email address"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-dark">Message</label>
            <textarea
              className="form-control"
              name="message"
              rows="4"
              placeholder="How can we help you?"
              required
              value={formData.message}
              onChange={handleChange}
            ></textarea>
          </div>

          <button type="submit" className="btn btn-info w-100 text-white fw-semibold">
            <i className="bi bi-send-fill me-2"></i>Send Message
          </button>
        </form>

        {status && (
          <div className="mt-3 text-center">
            <p className="text-light">{status}</p>
          </div>
        )}

        <div className="mt-5 text-center">
          <h5 className="text-white fw-bold mb-3">Contact Info</h5>
          <p className="text-light">
            <i className="bi bi-envelope-fill me-2"></i>
            adopt@petrescuenepal.org
          </p>
          <p className="text-light">
            <i className="bi bi-telephone-fill me-2"></i>
            98000000
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;

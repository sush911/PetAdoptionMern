import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/Contact.css'; // still using it for background and optional styles


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
      await axios.post('http://localhost:5000/api/contact', formData);
      setStatus('✅ Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error(error);
      setStatus('❌ Failed to send message. Please try again.');
    }
  };

  return (
    <div className="contact-page d-flex flex-column justify-content-center align-items-center">
      <div className="text-center mb-5">
        <h2 className="text-info fw-bold display-4">Contact Us</h2>
        <p className="text-white-50 fs-5">
          Reach out for adoption, rescue, volunteering — or just to say hi! 🐾
        </p>
      </div>

      <form onSubmit={handleSubmit} className="w-100 px-3" style={{ maxWidth: '720px' }}>
        <div className="mb-4">
          <label className="form-label text-white fw-semibold">Name</label>
          <input
            type="text"
            className="form-control form-control-lg"
            name="name"
            placeholder="Your full name"
            required
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="form-label text-white fw-semibold">Email</label>
          <input
            type="email"
            className="form-control form-control-lg"
            name="email"
            placeholder="Your email address"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="form-label text-white fw-semibold">Message</label>
          <textarea
            className="form-control form-control-lg"
            name="message"
            rows="5"
            placeholder="How can we help you?"
            required
            value={formData.message}
            onChange={handleChange}
          ></textarea>
        </div>

        <button
          type="submit"
          className="btn btn-lg btn-info text-white w-100 fw-bold shadow-sm"
        >
          <i className="bi bi-send-fill me-2"></i>Send Message
        </button>
      </form>

      {status && (
        <div className="mt-4 text-center">
          <span className="status-message text-white">{status}</span>
        </div>
      )}

      <div className="mt-5 text-center">
        <h5 className="text-white fw-bold mb-3">📞 Contact Info</h5>
        <p className="text-light mb-1">
          <i className="bi bi-envelope-fill me-2"></i> adopt@petrescuenepal.org
        </p>
        <p className="text-light">
          <i className="bi bi-telephone-fill me-2"></i> 98000000
        </p>
      </div>
    </div>
  );
};

export default Contact;

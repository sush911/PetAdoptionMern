import React from 'react';

const Contact = () => {
  return (
    <div className="container my-5" style={{ maxWidth: '600px' }}>
      <h2 className="mb-4 text-center text-info">Contact Us</h2>
      <p className="text-muted text-center">
        We'd love to hear from you! Fill out the form below or email us directly.
      </p>

      <form className="mt-4 shadow-sm p-4 rounded bg-light">
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" className="form-control" placeholder="Your name" required />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" placeholder="Your email" required />
        </div>

        <div className="mb-3">
          <label className="form-label">Message</label>
          <textarea className="form-control" rows="4" placeholder="Your message" required></textarea>
        </div>

        <button type="submit" className="btn btn-info w-100 text-white">
          <i className="bi bi-send-fill me-2"></i>Send Message
        </button>
      </form>

      <div className="mt-5 text-center">
        <h5 className="mb-3">Contact Info:</h5>
        <p><i className="bi bi-envelope-fill me-2"></i>adopt@petrescue.org</p>
        <p><i className="bi bi-telephone-fill me-2"></i>+1 234-567-8901</p>
      </div>
    </div>
  );
};

export default Contact;

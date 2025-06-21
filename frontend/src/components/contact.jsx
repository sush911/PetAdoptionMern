import React from 'react';

const Contact = () => {
  return (
    <div className="container mt-5">
      <h2>Contact Us</h2>
      <p className="text-muted">
        We'd love to hear from you! Fill out the form below or email us directly.
      </p>

      <form className="mt-4">
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

        <button type="submit" className="btn btn-primary">Send Message</button>
      </form>

      <div className="mt-5">
        <h5>Contact Info:</h5>
        <p>Email: adopt@petrescue.org</p>
        <p>Phone: +1 234-567-8901</p>
      </div>
    </div>
  );
};

export default Contact;

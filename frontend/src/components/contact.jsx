import React from 'react';

const Contact = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: '100vh',
        backgroundColor: '#1e293b', // matches your dark theme
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

        <form className="bg-light shadow rounded p-4">
          <div className="mb-3">
            <label className="form-label text-dark">Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Your full name"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-dark">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Your email address"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-dark">Message</label>
            <textarea
              className="form-control"
              rows="4"
              placeholder="How can we help you?"
              required
            ></textarea>
          </div>

          <button type="submit" className="btn btn-info w-100 text-white fw-semibold">
            <i className="bi bi-send-fill me-2"></i>Send Message
          </button>
        </form>

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

      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap"
        rel="stylesheet"
      />
    </div>
  );
};

export default Contact;

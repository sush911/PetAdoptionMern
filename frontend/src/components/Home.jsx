import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const imageCount = 6;
  const petImages = Array.from({ length: imageCount }, (_, i) => `/assets/${i + 1}.jpg`);

  return (
    <div className="container my-5">
      {/* Header */}
      <h1 className="text-primary fw-bold mb-3">Welcome to Pet Adoption!</h1>
      <p className="lead text-secondary mb-4">
        Explore and adopt your new furry friend.
      </p>

      {/* Button Panel - Moved here and styled nicely */}
      <div className="dashboard-buttons mb-5 p-4 rounded shadow-sm bg-light">
        <h3 className="mb-4 text-center" style={{ color: '#343a40', letterSpacing: '1.5px' }}>
          Quick Actions
        </h3>
        <div className="d-flex flex-wrap justify-content-center gap-3">
          <Link to="/rescue" className="btn btn-warning btn-lg">
            <i className="bi bi-heart-fill me-2"></i>Rescue a Pet
          </Link>
          <Link to="/admin/rescues" className="btn btn-secondary btn-lg">
            <i className="bi bi-list-check me-2"></i>Rescue Admin
          </Link>
          <Link to="/admin/pets" className="btn btn-primary btn-lg">
            <i className="bi bi-paw-fill me-2"></i>Manage Pets
          </Link>
          <Link to="/contact" className="btn btn-outline-dark btn-lg">
            <i className="bi bi-envelope me-2"></i>Contact Us
          </Link>
        </div>
      </div>

      {/* Pet cards */}
      <div className="row g-3">
        {petImages.map((img, idx) => (
          <div key={idx} className="col-sm-6 col-md-4">
            <div className="card shadow-sm pet-card-hover">
              <img
                src={img}
                className="card-img-top rounded"
                alt={`Pet ${idx + 1}`}
                style={{ height: '220px', objectFit: 'cover' }}
              />
              <div className="card-body text-center">
                <p className="card-text fw-semibold mb-0">Pet #{idx + 1}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .pet-card-hover:hover {
          transform: scale(1.05);
          transition: transform 0.3s ease;
          box-shadow: 0 0.5rem 1rem rgba(0,0,0,0.15);
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default Home;

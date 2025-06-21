import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    alert('You have been logged out.');
    navigate('/login');
  };

  const imageCount = 6;
  const petImages = Array.from({ length: imageCount }, (_, i) => `/assets/${i + 1}.jpg`);

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-primary fw-bold">Welcome to Pet Adoption!</h1>
        <button
          className="btn btn-outline-danger d-flex align-items-center"
          onClick={handleLogout}
          title="Logout"
        >
          <i className="bi bi-box-arrow-right me-2"></i>Logout
        </button>
      </div>
      <p className="lead text-secondary text-center mb-5">
        Explore and adopt your new furry friend.
      </p>

      <div className="row g-3 mb-5">
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

      <div className="text-center">
        <Link to="/rescue" className="btn btn-warning mx-2 mb-2">
          <i className="bi bi-heart-fill me-1"></i>Rescue a Pet
        </Link>
        <Link to="/admin/rescues" className="btn btn-secondary mx-2 mb-2">
          <i className="bi bi-list-check me-1"></i>Rescue Admin
        </Link>
        <Link to="/admin/pets" className="btn btn-primary mx-2 mb-2">
          <i className="bi bi-paw-fill me-1"></i>Manage Pets
        </Link>
        <Link to="/contact" className="btn btn-outline-dark mx-2 mb-2">
          <i className="bi bi-envelope me-1"></i>Contact Us
        </Link>
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

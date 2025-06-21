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

  const imageCount = 6; // Adjust based on how many images you have in /assets
  const petImages = Array.from({ length: imageCount }, (_, i) => `/assets/${i + 1}.jpg`);

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Welcome to Pet Adoption!</h1>
        <button className="btn btn-info text-white" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <p className="lead text-muted">Explore and adopt your new furry friend.</p>

      <div className="row mb-5">
        {petImages.map((img, idx) => (
          <div className="col-md-4 mb-3" key={idx}>
            <div className="card shadow-sm">
              <img src={img} className="card-img-top" alt={`Pet ${idx + 1}`} />
              <div className="card-body text-center">
                <p className="card-text">Pet #{idx + 1}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <Link to="/rescue" className="btn btn-warning mx-2">Rescue a Pet</Link>
        <Link to="/admin/rescues" className="btn btn-secondary mx-2">Rescue Admin</Link>
        <Link to="/admin/pets" className="btn btn-primary mx-2">Manage Pets</Link>
        <Link to="/contact" className="btn btn-outline-dark mx-2">Contact Us</Link>
      </div>
    </div>
  );
};

export default Home;

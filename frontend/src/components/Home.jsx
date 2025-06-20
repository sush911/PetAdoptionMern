import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirect if no token
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    alert('You have been logged out.');
    navigate('/login');
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Welcome to Pet Adoption!</h1>
      <p className="text-center">Explore and adopt your new furry friend.</p>
      <div className="text-center mt-3">
        <button className="btn btn-info text-white" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;

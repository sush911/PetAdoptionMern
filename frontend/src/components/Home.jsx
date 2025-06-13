import React from 'react';

const Home = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
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

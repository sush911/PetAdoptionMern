import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ token, setToken }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
    alert('Logged out successfully!');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/home">Pet Adoption</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          {token ? (
            <>
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/home">Home</Link>
                </li>

                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#!"
                    id="adminDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Admin Dashboard
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="adminDropdown">
                    <li><Link className="dropdown-item" to="/admin/pets">Manage Pets</Link></li>
                    <li><Link className="dropdown-item" to="/admin/rescues">Manage Rescues</Link></li>
                  </ul>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/rescue">Rescue</Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/contact">Contact Us</Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/about">About Us</Link>
                </li>
              </ul>

              <button className="btn btn-outline-light" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <ul className="navbar-nav ms-auto">
              <li className="nav-item me-2">
                <Link className="btn btn-outline-light" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="btn btn-light" to="/signup">Sign Up</Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

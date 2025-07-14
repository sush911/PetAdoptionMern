import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Layout = ({ children, setToken }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
    alert('Logged out');
    navigate('/login');
  };

  return (
    <>
      <nav style={navStyle}>
        <div style={logoStyle}>
          <Link to="/home" style={logoLinkStyle}>Pet Rescue</Link>
        </div>
        <div style={navLinksStyle}>
          <Link to="/home" style={linkStyle}>Home</Link>
          <Link to="/rescue" style={linkStyle}>Report Rescue</Link>
          <Link to="/admin" style={linkStyle}>Admin</Link>
          <Link to="/contact" style={linkStyle}>Contact</Link>
          <button onClick={handleLogout} style={logoutBtnStyle}>Logout</button>
        </div>
      </nav>

      <main style={mainWrapperStyle}>
        {children}
      </main>
    </>
  );
};

// === Styles ===

const navStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#0f172a',
  padding: '1rem 2rem',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.6)',
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
};

const logoStyle = {
  fontSize: '1.8rem',
  fontWeight: '900',
};

const logoLinkStyle = {
  color: '#38bdf8',
  textDecoration: 'none',
  letterSpacing: '3px',
};

const navLinksStyle = {
  display: 'flex',
  gap: '2rem',
  alignItems: 'center',
};

const linkStyle = {
  color: '#f1f5f9',
  fontSize: '1.1rem',
  textDecoration: 'none',
  fontWeight: '600',
  transition: 'color 0.3s',
};

const logoutBtnStyle = {
  backgroundColor: '#ef4444',
  border: 'none',
  padding: '0.5rem 1rem',
  borderRadius: '6px',
  color: '#fff',
  cursor: 'pointer',
  fontWeight: '600',
  fontSize: '1rem',
  marginLeft: '1rem',
};

const mainWrapperStyle = {
  padding: '2rem',
  backgroundColor: '#1e293b',
  color: '#e2e8f0',
  minHeight: '100vh',
};

export default Layout;

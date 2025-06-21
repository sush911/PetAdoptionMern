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
          <Link to="/home" style={linkStyle}>Pet Rescue</Link>
        </div>
        <div style={navLinksStyle}>
          <Link to="/home" style={linkStyle}>Home</Link>
          <Link to="/rescue" style={linkStyle}>Report Rescue</Link>
          <Link to="/admin/rescues" style={linkStyle}>Admin</Link>
          <Link to="/contact" style={linkStyle}>Contact</Link>
          <button onClick={handleLogout} style={logoutBtnStyle}>Logout</button>
        </div>
      </nav>

      <main style={{ padding: '1rem' }}>
        {children}
      </main>
    </>
  );
};

// Styles
const navStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#1a1a2e',
  padding: '1rem 2rem',
  boxShadow: '0 2px 8px rgba(0,0,0,0.7)',
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
};

const logoStyle = {
  fontSize: '1.8rem',
  fontWeight: '900',
  color: '#fca311',
  letterSpacing: '3px',
  cursor: 'default',
};

const navLinksStyle = {
  display: 'flex',
  gap: '2.5rem', // <-- this creates space between links
  fontSize: '1.1rem',
  fontWeight: '600',
  color: '#e5e5e5',
};

const linkStyle = {
  color: '#e5e5e5',
  textDecoration: 'none',
  transition: 'color 0.3s',
};

const logoutBtnStyle = {
  backgroundColor: '#f94144',
  border: 'none',
  padding: '0.4rem 1rem',
  borderRadius: '6px',
  color: '#fff',
  cursor: 'pointer',
  fontWeight: '700',
  fontSize: '1rem',
  marginLeft: '1rem',
};

export default Layout;

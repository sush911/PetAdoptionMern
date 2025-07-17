import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Layout = ({ children, setToken }) => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const decoded = jwtDecode(token);
        setIsAdmin(decoded?.user?.role === 'admin');
      }
    } catch {
      setIsAdmin(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
    alert('Logged out');
    navigate('/login');
  };

  return (
    <>
      <nav style={navStyle}>
        <div style={logoContainerStyle}>
          <img src="/assets/petlogo.png" alt="Pet Logo" style={logoImgStyle} />
          <NavLink to="/home" style={logoTextStyle}>PetForPat</NavLink>
        </div>

        <div style={navLinksStyle}>
          <NavLink to="/home" style={navLinkStyle}>Home</NavLink>
          <NavLink to="/adopt" style={navLinkStyle}>Adopt Us</NavLink>
          <NavLink to="/rescue" style={navLinkStyle}>Report Rescue</NavLink>
          {isAdmin && <NavLink to="/admin" style={navLinkStyle}>Admin</NavLink>}
          <NavLink to="/contact" style={navLinkStyle}>Contact</NavLink>
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
  padding: '1.5rem 3rem',
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.6)',
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
};

const logoContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
};

const logoImgStyle = {
  height: '60px',
  width: '60px',
  objectFit: 'contain',
  borderRadius: '50%',
};

const logoTextStyle = {
  color: '#38bdf8',
  fontSize: '2.3rem',
  fontWeight: '900',
  textDecoration: 'none',
  letterSpacing: '2px',
};

const navLinksStyle = {
  display: 'flex',
  gap: '3rem',
  alignItems: 'center',
};

const navLinkStyle = ({ isActive }) => ({
  color: isActive ? '#38bdf8' : '#f1f5f9',
  fontSize: '1.5rem',
  textDecoration: 'none',
  fontWeight: '600',
  transition: 'color 0.3s ease',
});

const logoutBtnStyle = {
  backgroundColor: '#ef4444',
  border: 'none',
  padding: '0.8rem 1.5rem',
  borderRadius: '8px',
  color: '#fff',
  cursor: 'pointer',
  fontWeight: '600',
  fontSize: '1.3rem',
  marginLeft: '2rem',
  transition: 'background-color 0.3s ease',
};

const mainWrapperStyle = {
  padding: '3rem 4rem',
  backgroundColor: '#1e293b',
  color: '#e2e8f0',
  minHeight: '100vh',
  fontSize: '1.2rem',
};

export default Layout;

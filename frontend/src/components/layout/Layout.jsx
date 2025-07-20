// src/components/layout/Layout.jsx
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';

const Layout = ({ children, setToken, pageStyle = {} }) => {
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
      <Navbar
        bg="dark"
        variant="dark"
        expand="lg"
        sticky="top"
        className="shadow-lg py-4 px-4"
        style={{ fontSize: '1.2rem' }}
      >
        <Container fluid className="d-flex justify-content-between align-items-center">
          <Navbar.Brand as={NavLink} to="/home" className="d-flex align-items-center gap-3">
            <img
              src="/assets/logoweb.png"
              alt="Pet Logo"
              height="70"
              width="70"
              style={{ borderRadius: '50%', objectFit: 'cover' }}
            />
            <span className="fw-bold fs-2 text-info">PetForPat</span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="main-navbar-nav" />
          <Navbar.Collapse id="main-navbar-nav" className="justify-content-end">
            <Nav className="gap-4 align-items-center">
              <Nav.Link as={NavLink} to="/home" className="fs-5 px-3">Home</Nav.Link>
              <Nav.Link as={NavLink} to="/adopt" className="fs-5 px-3">Adopt Us</Nav.Link>
              <Nav.Link as={NavLink} to="/rescue" className="fs-5 px-3">Report Rescue</Nav.Link>
              <Nav.Link as={NavLink} to="/about" className="fs-5 px-3">About</Nav.Link> {/* ✅ Added */}
              {isAdmin && <Nav.Link as={NavLink} to="/admin" className="fs-5 px-3">Admin</Nav.Link>}
              <Nav.Link as={NavLink} to="/contact" className="fs-5 px-3">Contact</Nav.Link>
              <Button
                variant="danger"
                onClick={handleLogout}
                className="px-4 py-2 fs-6 ms-3"
              >
                Logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <main
        style={{
          ...mainWrapperStyle,
          ...pageStyle,
        }}
      >
        <Container fluid className="py-5 px-4" style={{ maxWidth: '1440px' }}>
          {children}
        </Container>
      </main>
    </>
  );
};

// === Default page layout styles ===
const mainWrapperStyle = {
  minHeight: '100vh',
  fontSize: '1.2rem',
  display: 'flex',
  justifyContent: 'center',
  padding: 0,
  backgroundColor: 'transparent',
};

export default Layout;

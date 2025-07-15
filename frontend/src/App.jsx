import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { jwtDecode } from 'jwt-decode'; // ✅ named import

import { Signup } from './components/auth/Signup';
import { Signin } from './components/auth/Signin';
import Home from './components/home/Home';
import RescueForm from './components/rescue/RescueForm';
import Contact from './components/pages/Contact';
import AdminDashboard from './components/dashboard/AdminDashboard';
import Layout from './components/layout/Layout';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const isAdmin = useMemo(() => {
    if (!token) return false;
    try {
      const decoded = jwtDecode(token);
      return decoded?.user?.role === 'admin';
    } catch (err) {
      console.error('Invalid token:', err);
      return false;
    }
  }, [token]);

  const ProtectedRoute = ({ children }) =>
    token ? children : <Navigate to="/login" />;

  const AdminRoute = ({ children }) =>
    token && isAdmin ? children : <Navigate to="/home" />;

  useEffect(() => {
    const stored = localStorage.getItem('token');
    if (stored !== token) setToken(stored || '');
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={token ? <Navigate to="/home" /> : <Navigate to="/login" />} />
        <Route path="/signup" element={<Signup setToken={setToken} />} />
        <Route path="/login" element={<Signin setToken={setToken} />} />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Layout setToken={setToken}>
                <Home />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/rescue"
          element={
            <ProtectedRoute>
              <Layout setToken={setToken}>
                <RescueForm />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/contact"
          element={
            <ProtectedRoute>
              <Layout setToken={setToken}>
                <Contact />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Layout setToken={setToken}>
                <AdminDashboard />
              </Layout>
            </AdminRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;

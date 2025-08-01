import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { jwtDecode } from 'jwt-decode';

import { Signup } from './components/auth/Signup';
import { Signin } from './components/auth/Signin';
import ForgotPassword from './components/auth/ForgetPassword';
import ResetPassword from './components/auth/ResetPassword';

import Home from './components/home/Home';
import RescueForm from './components/rescue/RescueForm';
import Contact from './components/pages/Contact';
import AdminDashboard from './components/dashboard/AdminDashboard';
import Layout from './components/layout/Layout';
import AdoptUs from './components/pages/AdoptUs';
import AdoptionForm from './components/pages/AdoptionForm';
import About from './components/pages/About'; // ✅ Import About page

import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css/animate.min.css';

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
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Layout setToken={setToken} pageStyle={{ backgroundColor: '#e5d7a4ff', color: '#1e293b' }} >
                <Home />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/adopt"
          element={
            <Layout setToken={setToken} pageStyle={{ backgroundColor: '#e0f2fe', color: '#0f172a' }}>
              <AdoptUs />
            </Layout>
          }
        />

        <Route
          path="/adopt/:petId"
          element={
            <ProtectedRoute>
              <Layout setToken={setToken} pageStyle={{ backgroundColor: '#f0fdf4', color: '#064e3b' }}>
                <AdoptionForm />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/rescue"
          element={
            <ProtectedRoute>
              <Layout setToken={setToken} pageStyle={{ backgroundColor: '#fef2f2', color: '#991b1b' }}>
                <RescueForm />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/contact"
          element={
            <ProtectedRoute>
              <Layout setToken={setToken} pageStyle={{ backgroundColor: '#1e293b', color: '#0c4a6e' }}>
                <Contact />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <Layout setToken={setToken} pageStyle={{ backgroundColor: '#0f172a', color: '#f8fafc' }}>
                <About />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Layout setToken={setToken} pageStyle={{ backgroundColor: '#dbc41063', color: '#0f172a' }}>
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

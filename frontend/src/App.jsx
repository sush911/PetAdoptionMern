import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Signup } from './components/auth/Signup';
import { Signin } from './components/auth/Signin';
import Home from './components/home/Home';
import RescueForm from './components/rescue/RescueForm';
import RescueList from './components/rescue/RescueList';
import PetsList from './components/pets/PetsList'; 
import Contact from './components/pages/Contact';
import Layout from './components/layout/Layout'; 

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const ProtectedRoute = ({ children }) => {
    return token ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={token ? <Navigate to="/home" /> : <Navigate to="/login" />} />
        <Route path="/signup" element={<Signup setToken={setToken} />} />
        <Route path="/login" element={<Signin setToken={setToken} />} />

        {/* Protected routes wrapped in Layout */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Layout setToken={setToken}>
                <Home setToken={setToken} />
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
          path="/admin/rescues"
          element={
            <ProtectedRoute>
              <Layout setToken={setToken}>
                <RescueList />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/pets"
          element={
            <ProtectedRoute>
              <Layout setToken={setToken}>
                <PetsList />
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
        <Route path="/register" element={<Navigate to="/signup" />} />
      </Routes>
    </Router>
  );
};

export default App;

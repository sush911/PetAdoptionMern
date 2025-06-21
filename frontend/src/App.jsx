import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { Signup } from './components/Signup';
import { Signin } from './components/Signin';
import Home from './components/Home';
import RescueForm from './components/RescueForm';
import RescueList from './components/RescueList';
import PetsList from './components/PetsList';
import Contact from './components/Contact';
import Navbar from './components/Navbar';


const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const ProtectedRoute = ({ children }) => {
    return token ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Navbar token={token} setToken={setToken} />

      <Routes>
        <Route path="/" element={token ? <Navigate to="/home" /> : <Navigate to="/login" />} />
        <Route path="/signup" element={<Signup setToken={setToken} />} />
        <Route path="/login" element={<Signin setToken={setToken} />} />
        <Route path="/home" element={<ProtectedRoute><Home setToken={setToken} /></ProtectedRoute>} />
        <Route path="/rescue" element={<ProtectedRoute><RescueForm /></ProtectedRoute>} />
        <Route path="/admin/rescues" element={<ProtectedRoute><RescueList /></ProtectedRoute>} />
        <Route path="/admin/pets" element={<ProtectedRoute><PetsList /></ProtectedRoute>} />
        <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
        <Route path="/register" element={<Navigate to="/signup" />} />
      </Routes>
    </Router>
  );
};

export default App;

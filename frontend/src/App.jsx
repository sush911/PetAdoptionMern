import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Signup } from './components/Signup';
import { Signin } from './components/Signin';
import Home from './components/Home';
import RescueForm from './components/RescueForm';
import RescueList from './components/RescueList';
// import PetList from './components/PetList'; // Optional
// import Contact from './components/Contact'; // Optional

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

        <Route path="/home" element={<ProtectedRoute><Home setToken={setToken} /></ProtectedRoute>} />
        <Route path="/rescue" element={<ProtectedRoute><RescueForm /></ProtectedRoute>} />
        <Route path="/admin/rescues" element={<ProtectedRoute><RescueList /></ProtectedRoute>} />

        {/* Optional future routes */}
        {/* <Route path="/admin/pets" element={<ProtectedRoute><PetList /></ProtectedRoute>} /> */}
        {/* <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} /> */}

        <Route path="/register" element={<Navigate to="/signup" />} />
      </Routes>
    </Router>
  );
};

export default App;

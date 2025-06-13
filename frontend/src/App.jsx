import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Signup } from './components/Signup';
import { Signin } from './components/Signin';
import Home from './components/Home';

const App = () => {
  // React state for token
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Function to update token state and localStorage together
  const handleLogin = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  // ProtectedRoute now uses token state
  const ProtectedRoute = ({ children }) => {
    return token ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Routes>
        {/* Login route passes handleLogin to update token on success */}
        <Route
          path="/login"
          element={<Signin onLogin={handleLogin} />}
        />
        {/* Signup route */}
        <Route
          path="/signup"
          element={<Signup />}
        />
        <Route path="/register" element={<Navigate to="/signup" />} />

        {/* Home is protected and receives logout function */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />

        {/* Catch all - redirect to login or home */}
        <Route
          path="*"
          element={<Navigate to={token ? "/" : "/login"} />}
        />
      </Routes>
    </Router>
  );
};

export default App;

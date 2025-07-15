// src/components/pages/Unauthorized.jsx
import React from 'react';

const Unauthorized = () => {
  return (
    <div className="container my-5 text-center">
      <h2 className="text-danger">🚫 Access Denied</h2>
      <p>You do not have permission to view this page.</p>
    </div>
  );
};

export default Unauthorized; 

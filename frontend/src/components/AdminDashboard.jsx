import React from 'react';
import PetsList from './PetsList';
import RescueList from './RescueList';

const AdminDashboard = () => (
  <div className="container my-5">
    <h2 className="mb-4 text-primary text-center">Admin Dashboard</h2>

    <div className="row g-4">
      <div className="col-lg-6">
        <div className="card shadow-sm border-primary">
          <div className="card-header bg-primary text-white d-flex align-items-center">
            <i className="bi bi-paw-fill me-2"></i>
            <h5 className="mb-0">Manage Pets</h5>
          </div>
          <div className="card-body">
            <PetsList />
          </div>
        </div>
      </div>

      <div className="col-lg-6">
        <div className="card shadow-sm border-success">
          <div className="card-header bg-success text-white d-flex align-items-center">
            <i className="bi bi-heart-pulse-fill me-2"></i>
            <h5 className="mb-0">Rescue Requests</h5>
          </div>
          <div className="card-body">
            <RescueList />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default AdminDashboard;

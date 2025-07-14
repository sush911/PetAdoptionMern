import React from 'react';
import PetsList from '../pets/PetsList';
import RescueList from '../rescue/RescueList';
import ContactList from '../pages/ContactList';

const AdminDashboard = () => {
  return (
    <div className="container my-5">
      <h1 className="text-center mb-5 text-primary fw-bold">Admin Dashboard</h1>
      <div className="accordion" id="adminAccordion">

        {/* Pets CRUD */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingPets">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapsePets"
              aria-expanded="true"
              aria-controls="collapsePets"
            >
              🐶 Manage Pets
            </button>
          </h2>
          <div
            id="collapsePets"
            className="accordion-collapse collapse show"
            aria-labelledby="headingPets"
            data-bs-parent="#adminAccordion"
          >
            <div className="accordion-body">
              <PetsList />
            </div>
          </div>
        </div>

        {/* Rescue Requests */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingRescue">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseRescue"
              aria-expanded="false"
              aria-controls="collapseRescue"
            >
              🚨 Manage Rescues
            </button>
          </h2>
          <div
            id="collapseRescue"
            className="accordion-collapse collapse"
            aria-labelledby="headingRescue"
            data-bs-parent="#adminAccordion"
          >
            <div className="accordion-body">
              <RescueList />
            </div>
          </div>
        </div>

        {/* Contact Messages */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingContact">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseContact"
              aria-expanded="false"
              aria-controls="collapseContact"
            >
              📬 Manage Contact Messages
            </button>
          </h2>
          <div
            id="collapseContact"
            className="accordion-collapse collapse"
            aria-labelledby="headingContact"
            data-bs-parent="#adminAccordion"
          >
            <div className="accordion-body">
              <ContactList />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;

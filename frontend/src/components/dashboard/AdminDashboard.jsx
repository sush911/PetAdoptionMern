import React from 'react';
import { jwtDecode } from 'jwt-decode'; // ✅ Fix here
import Unauthorized from '../pages/Unauthorized';
import PetsList from '../pets/PetsList';
import RescueList from '../rescue/RescueList';
import ContactList from '../pages/ContactList';

const AdminDashboard = () => {
  const token = localStorage.getItem('token');

  if (!token) return <Unauthorized />;

  let decoded;
  try {
    decoded = jwtDecode(token); // ✅ Use the correct function name
  } catch (e) {
    return <Unauthorized />;
  }

  if (!decoded?.isAdmin) {
    return <Unauthorized />;
  }

  return (
    <div className="container my-5">
      <h1 className="text-center text-primary fw-bold mb-4">Admin Dashboard</h1>

      <div className="accordion" id="adminAccordion">
        {/* Pets */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingPets">
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapsePets">
              🐶 Manage Pets
            </button>
          </h2>
          <div id="collapsePets" className="accordion-collapse collapse show" data-bs-parent="#adminAccordion">
            <div className="accordion-body">
              <PetsList />
            </div>
          </div>
        </div>

        {/* Rescues */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingRescue">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseRescue">
              🚨 Manage Rescues
            </button>
          </h2>
          <div id="collapseRescue" className="accordion-collapse collapse" data-bs-parent="#adminAccordion">
            <div className="accordion-body">
              <RescueList />
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingContact">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseContact">
              📬 Manage Contacts
            </button>
          </h2>
          <div id="collapseContact" className="accordion-collapse collapse" data-bs-parent="#adminAccordion">
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

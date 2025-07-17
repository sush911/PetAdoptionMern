// src/components/dashboard/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '../../api/axios';
import PetForm from '../pets/PetForm';
import Unauthorized from '../pages/Unauthorized'; // ✅ imported

const AdminDashboard = () => {
  const [isAdmin, setIsAdmin] = useState(null); // ✅ distinguish admin status
  const [pets, setPets] = useState([]);
  const [rescues, setRescues] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [editingPet, setEditingPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      const token = localStorage.getItem('token');
      const decoded = jwtDecode(token);
      setIsAdmin(decoded?.user?.role === 'admin');
    } catch (err) {
      setIsAdmin(false);
    }
  }, []);

  useEffect(() => {
    const fetchAllData = async () => {
      if (isAdmin === false) return;
      setLoading(true);
      setError('');
      try {
        const [petsRes, rescuesRes, contactsRes] = await Promise.all([
          api.get('/pets'),
          api.get('/rescues'),
          api.get('/contact'),
        ]);
        setPets(petsRes.data);
        setRescues(rescuesRes.data);
        setContacts(contactsRes.data);
      } catch (err) {
        setError('Failed to load data. Please try again.');
        console.error(err);
      }
      setLoading(false);
    };
    fetchAllData();
  }, [isAdmin]);

  const handleDeletePet = async (id) => {
    if (!window.confirm('Are you sure you want to delete this pet?')) return;
    try {
      await api.delete(`/pets/${id}`);
      setPets((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      alert('Failed to delete pet.');
      console.error(err);
    }
  };

  const handlePetAddedOrUpdated = (pet) => {
    setPets((prev) =>
      prev.some((p) => p._id === pet._id)
        ? prev.map((p) => (p._id === pet._id ? pet : p))
        : [...prev, pet]
    );
    setEditingPet(null);
  };

  const handleEditPet = (pet) => {
    setEditingPet(pet);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => setEditingPet(null);

  const handleDeleteRescue = async (id) => {
    if (!window.confirm('Delete this rescue request?')) return;
    try {
      await api.delete(`/rescues/${id}`);
      setRescues((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      alert('Failed to delete rescue.');
      console.error(err);
    }
  };

  const handleDeleteContact = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      await api.delete(`/contact/${id}`);
      setContacts((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      alert('Failed to delete contact.');
      console.error(err);
    }
  };

  if (isAdmin === null) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-success" role="status"></div>
        <p>Checking permissions...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="container my-4">
        <h1 className="mb-4 text-success fw-bold">Admin Dashboard</h1>
        <Unauthorized />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-success" role="status"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger my-5 text-center">{error}</div>;
  }

  return (
    <div className="container my-4">
      <h1 className="mb-4 text-success fw-bold">Admin Dashboard</h1>

      {/* Pet Form */}
      <PetForm onPetAdded={handlePetAddedOrUpdated} existingPet={editingPet} onCancelEdit={cancelEdit} />

      {/* Manage Pets */}
      <h3 className="mt-5 mb-3 text-success">Manage Pets</h3>
      <div className="table-responsive">
        <table className="table table-striped align-middle">
          <thead className="table-success">
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Type</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pets.map((pet) => (
              <tr key={pet._id}>
                <td>
                  <img
                    src={`http://localhost:5000/uploads/${pet.image}`}
                    alt={pet.name}
                    width="60"
                    height="60"
                    style={{ objectFit: 'cover', borderRadius: '5px' }}
                  />
                </td>
                <td>{pet.name}</td>
                <td>
                  {pet.type?.toLowerCase() === 'dog'
                    ? '🐶 Dog'
                    : pet.type?.toLowerCase() === 'cat'
                    ? '🐱 Cat'
                    : '❓ Unknown'}
                </td>
                <td>{pet.description}</td>
                <td>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => handleEditPet(pet)}>
                    ✏️ Edit
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDeletePet(pet._id)}>
                    🗑 Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Rescue Table */}
      <section className="mb-5">
        <h3 className="mb-3 text-warning">Manage Rescue Requests</h3>
        {rescues.length === 0 ? (
          <p>No rescue requests found.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped">
              <thead className="table-warning">
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Location</th>
                  <th>Animal</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {rescues.map((r) => (
                  <tr key={r._id}>
                    <td>{r.name}</td>
                    <td>{r.phone}</td>
                    <td>{r.location}</td>
                    <td>{r.animalType}</td>
                    <td>{r.description}</td>
                    <td>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDeleteRescue(r._id)}>
                        🗑 Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Contact Messages */}
      <section>
        <h3 className="mb-3 text-info">Manage Contact Messages</h3>
        {contacts.length === 0 ? (
          <p>No messages found.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped">
              <thead className="table-info">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Message</th>
                  <th>Sent At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((c) => (
                  <tr key={c._id}>
                    <td>{c.name}</td>
                    <td>{c.email}</td>
                    <td>{c.message}</td>
                    <td>{new Date(c.createdAt).toLocaleString()}</td>
                    <td>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDeleteContact(c._id)}>
                        🗑 Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminDashboard;

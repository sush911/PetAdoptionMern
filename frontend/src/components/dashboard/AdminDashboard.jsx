import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '../../api/axios';
import PetForm from '../pets/PetForm';
import Unauthorized from '../pages/Unauthorized';

const AdminDashboard = () => {
  const [isAdmin, setIsAdmin] = useState(null);
  const [pets, setPets] = useState([]);
  const [rescues, setRescues] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [adoptions, setAdoptions] = useState([]);
  const [editingPet, setEditingPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      const token = localStorage.getItem('token');
      const decoded = jwtDecode(token);
      setIsAdmin(decoded?.user?.role === 'admin');
    } catch {
      setIsAdmin(false);
    }
  }, []);

  useEffect(() => {
    const fetchAllData = async () => {
      if (!isAdmin) return;
      setLoading(true);
      setError('');
      try {
        const [petsRes, rescuesRes, contactsRes, adoptionsRes] = await Promise.all([
          api.get('/pets'),
          api.get('/rescues'),
          api.get('/contact'),
          api.get('/adoptions')
        ]);
        setPets(petsRes.data);
        setRescues(rescuesRes.data);
        setContacts(contactsRes.data);
        setAdoptions(adoptionsRes.data);
      } catch {
        setError('Failed to load data. Please try again.');
      }
      setLoading(false);
    };
    fetchAllData();
  }, [isAdmin]);

  const handleDeletePet = async (id) => {
    if (!window.confirm('Are you sure you want to delete this pet?')) return;
    try {
      await api.delete(`/pets/${id}`);
      setPets(prev => prev.filter(p => p._id !== id));
    } catch {
      alert('Failed to delete pet.');
    }
  };

  const handleDeleteRescue = async (id) => {
    if (!window.confirm('Delete this rescue request?')) return;
    try {
      await api.delete(`/rescues/${id}`);
      setRescues(prev => prev.filter(r => r._id !== id));
    } catch {
      alert('Failed to delete rescue.');
    }
  };

  const handleDeleteContact = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      await api.delete(`/contact/${id}`);
      setContacts(prev => prev.filter(c => c._id !== id));
    } catch {
      alert('Failed to delete contact.');
    }
  };

  const handleDeleteAdoption = async (id) => {
    if (!window.confirm('Delete this adoption request?')) return;
    try {
      await api.delete(`/adoptions/${id}`);
      setAdoptions(prev => prev.filter(a => a._id !== id));
    } catch {
      alert('Failed to delete adoption request.');
    }
  };

  const handlePetAddedOrUpdated = (pet) => {
    setPets(prev =>
      prev.some(p => p._id === pet._id)
        ? prev.map(p => (p._id === pet._id ? pet : p))
        : [...prev, pet]
    );
    setEditingPet(null);
  };

  const handleEditPet = (pet) => {
    setEditingPet(pet);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => setEditingPet(null);

  const handleUpdateStatus = (id, newStatus) => {
    api.put(`/adoptions/${id}`, { status: newStatus })
      .then(res => {
        setAdoptions(prev => prev.map(a => a._id === id ? res.data : a));
      }).catch(() => {
        alert("Failed to update adoption status.");
      });
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
    <div className="container my-5">
      <h1 className="mb-4 text-success fw-bold display-5">
        <i className="bi bi-speedometer2 me-2"></i>Admin Dashboard
      </h1>

      <PetForm onPetAdded={handlePetAddedOrUpdated} existingPet={editingPet} onCancelEdit={cancelEdit} />

      {/* Manage Pets */}
      <section className="bg-light p-4 shadow-sm rounded my-5">
        <h3 className="text-success mb-4"><i className="bi bi-paw me-2"></i>Manage Pets</h3>
        <div className="table-responsive">
          <table className="table table-hover align-middle">
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
                      className="rounded"
                      width="60"
                      height="60"
                      style={{ objectFit: 'cover' }}
                    />
                  </td>
                  <td><span className="fw-semibold">{pet.name}</span></td>
                  <td>
                    <span className="badge bg-secondary">
                      {pet.type?.toLowerCase() === 'dog' ? '🐶 Dog' :
                        pet.type?.toLowerCase() === 'cat' ? '🐱 Cat' : '❓ Unknown'}
                    </span>
                  </td>
                  <td>{pet.description}</td>
                  <td>
                    <button className="btn btn-outline-warning btn-sm me-2" onClick={() => handleEditPet(pet)}>
                      ✏️ Edit
                    </button>
                    <button className="btn btn-outline-danger btn-sm" onClick={() => handleDeletePet(pet._id)}>
                      🗑 Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Manage Rescues */}
      <section className="bg-light p-4 shadow-sm rounded my-5">
        <h3 className="text-warning mb-4"><i className="bi bi-life-preserver me-2"></i>Manage Rescue Requests</h3>
        {rescues.length === 0 ? (
          <p className="text-muted">No rescue requests found.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle">
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
                    <td><span className="badge bg-info text-dark">{r.animalType}</span></td>
                    <td>{r.description}</td>
                    <td>
                      <button className="btn btn-outline-danger btn-sm" onClick={() => handleDeleteRescue(r._id)}>
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

      {/* Manage Contacts */}
      <section className="bg-light p-4 shadow-sm rounded my-5">
        <h3 className="text-info mb-4"><i className="bi bi-envelope-paper me-2"></i>Manage Contact Messages</h3>
        {contacts.length === 0 ? (
          <p className="text-muted">No messages found.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle">
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
                      <button className="btn btn-outline-danger btn-sm" onClick={() => handleDeleteContact(c._id)}>
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

      {/* Manage Adoptions */}
      <section className="bg-light p-4 shadow-sm rounded my-5">
        <h3 className="text-primary mb-4">
          <i className="bi bi-heart-pulse me-2"></i>Manage Adoptions
        </h3>

        {adoptions.length === 0 ? (
          <p className="text-muted">No adoption requests found.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-primary">
                <tr>
                  <th>Pet</th>
                  <th>Adopter</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {adoptions.map((a) => (
                  <tr key={a._id}>
                    <td>{a.petName || 'Unknown'}</td>
                    <td>{a.name}</td>
                    <td>{a.email}</td>
                    <td>{a.phone || 'N/A'}</td>
                    <td>{a.address || 'N/A'}</td>
                    <td>
                      <span className={`badge ${a.status === 'approved' ? 'bg-success' : a.status === 'rejected' ? 'bg-danger' : 'bg-warning text-dark'}`}>
                        {a.status}
                      </span>
                    </td>
                    <td>
                      {a.status === 'pending' && (
                        <>
                          <button className="btn btn-outline-success btn-sm me-2"
                            onClick={() => handleUpdateStatus(a._id, 'approved')}>
                            ✅ Approve
                          </button>
                          <button className="btn btn-outline-danger btn-sm me-2"
                            onClick={() => handleUpdateStatus(a._id, 'rejected')}>
                            ❌ Reject
                          </button>
                        </>
                      )}
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleDeleteAdoption(a._id)}
                      >
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

import React, { useState, useEffect } from 'react';
import api from '../../api/axios';

const PetsList = ({ refreshFlag, setPet }) => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch pets whenever refreshFlag changes
  useEffect(() => {
    const fetchPets = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await api.get('/pets');
        setPets(res.data);
      } catch (err) {
        setError('Failed to load pets.');
        console.error(err);
      }
      setLoading(false);
    };
    fetchPets();
  }, [refreshFlag]);

  // Delete pet handler
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this pet?')) return;
    try {
      await api.delete(`/pets/${id}`);
      setPets((prev) => prev.filter((pet) => pet._id !== id));
      alert('Pet deleted successfully');
    } catch (err) {
      alert('Failed to delete pet.');
      console.error(err);
    }
  };

  // Edit pet handler
  const handleEdit = (pet) => {
    setPet(pet);
  };

  if (loading) {
    return (
      <div className="text-center py-3">
        <div className="spinner-border text-success" role="status" aria-hidden="true"></div>
        <span className="ms-2">Loading pets...</span>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (pets.length === 0) {
    return <p>No pets found. Add some pets to get started.</p>;
  }

  return (
    <div className="table-responsive shadow rounded bg-white">
      <table className="table table-striped table-hover align-middle mb-0">
        <thead className="table-success">
          <tr>
            <th>Name</th>
            <th>Species</th>
            <th>Breed</th>
            <th>Age</th>
            <th>Description</th>
            <th>Image</th>
            <th style={{ minWidth: '110px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pets.map((pet) => (
            <tr key={pet._id}>
              <td>{pet.name}</td>
              <td>{pet.species}</td>
              <td>{pet.breed || '-'}</td>
              <td>{pet.age}</td>
              <td>{pet.description ? pet.description.slice(0, 40) + (pet.description.length > 40 ? '...' : '') : '-'}</td>
              <td>
                {pet.image ? (
                  <img
                    src={pet.image}
                    alt={pet.name}
                    style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '6px' }}
                  />
                ) : (
                  '-'
                )}
              </td>
              <td>
                <button
                  className="btn btn-primary btn-sm me-2"
                  onClick={() => handleEdit(pet)}
                  title="Edit pet"
                >
                  <i className="bi bi-pencil-square"></i>
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(pet._id)}
                  title="Delete pet"
                >
                  <i className="bi bi-trash-fill"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PetsList;

// src/components/pets/PetsList.jsx
import React, { useState, useEffect } from 'react';
import api from '../../api/axios';

const PetsList = ({ setPet }) => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPets = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await api.get('/pets');
        setPets(response.data);
      } catch (err) {
        setError('Failed to load pets.');
      } finally {
        setLoading(false);
      }
    };
    fetchPets();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this pet?')) return;
    try {
      await api.delete(`/pets/${id}`);
      setPets((prev) => prev.filter((p) => p._id !== id));
    } catch {
      alert('Failed to delete pet.');
    }
  };

  const baseImageUrl = 'http://localhost:5000/uploads/';

  if (loading) return <p className="text-center fs-5 mt-4">⏳ Loading pets...</p>;
  if (error) return <p className="text-danger text-center">{error}</p>;

  return (
    <div className="table-responsive">
      <table className="table table-hover table-bordered text-center align-middle">
        <thead className="table-light">
          <tr className="fw-bold">
            <th>Image</th>
            <th>Name</th>
            <th>Type</th>
            <th>Age</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pets.map((pet) => (
            <tr key={pet._id}>
              <td>
                {pet.image ? (
                  <img
                    src={`${baseImageUrl}${pet.image}`}
                    alt={pet.name}
                    width="60"
                    height="60"
                    style={{ objectFit: 'cover', borderRadius: '6px' }}
                  />
                ) : (
                  <span>No image</span>
                )}
              </td>
              <td className="fw-semibold">{pet.name}</td>
              <td>{pet.type?.charAt(0).toUpperCase() + pet.type?.slice(1) || 'Unknown'}</td>
              <td>{pet.age || 'N/A'}</td>
              <td style={{ maxWidth: '200px' }}>{pet.description}</td>
              <td>
                <button
                  className="btn btn-sm btn-outline-warning me-2"
                  onClick={() => setPet(pet)}
                >
                  ✏️ Edit
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDelete(pet._id)}
                >
                  🗑 Delete
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

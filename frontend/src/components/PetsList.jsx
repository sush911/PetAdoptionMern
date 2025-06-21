import React, { useState, useEffect } from 'react';
import PetForm from './PetForm';
import axios from 'axios';

const PetsList = () => {
  const [pets, setPets] = useState([]);
  const [editingPet, setEditingPet] = useState(null);

  const fetchPets = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/pets', {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      setPets(res.data);
    } catch (error) {
      console.error('Failed to fetch pets', error);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this pet?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/pets/${id}`, {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      fetchPets();
    } catch (error) {
      console.error('Failed to delete pet', error);
    }
  };

  return (
    <div className="mb-5">
      <h3 className="mb-4 text-primary">Manage Pets</h3>
      <PetForm refresh={fetchPets} pet={editingPet} setPet={setEditingPet} />

      <div className="row g-4">
        {pets.map(p => (
          <div key={p._id} className="col-md-4">
            <div className="card shadow-sm pet-card-hover h-100">
              <img
                src={`/assets/${p.image}`}
                className="card-img-top rounded-top"
                alt={p.name}
                style={{ height: '220px', objectFit: 'cover' }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text text-muted">{p.type}, {p.age} yrs</p>
                <div className="mt-auto d-flex justify-content-end gap-2">
                  <button
                    className="btn btn-warning btn-sm d-flex align-items-center"
                    onClick={() => setEditingPet(p)}
                    title="Edit Pet"
                  >
                    <i className="bi bi-pencil-fill"></i>
                  </button>
                  <button
                    className="btn btn-danger btn-sm d-flex align-items-center"
                    onClick={() => handleDelete(p._id)}
                    title="Delete Pet"
                  >
                    <i className="bi bi-trash-fill"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {pets.length === 0 && (
          <p className="text-center text-muted">No pets available.</p>
        )}
      </div>

      <style>{`
        .pet-card-hover:hover {
          transform: scale(1.03);
          box-shadow: 0 0.5rem 1rem rgba(0,0,0,0.15);
          transition: all 0.3s ease;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default PetsList;

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
      <h3>Manage Pets</h3>
      <PetForm refresh={fetchPets} pet={editingPet} setPet={setEditingPet} />
      <div className="row">
        {pets.map(p => (
          <div key={p._id} className="col-md-4 mb-3">
            <div className="card">
              <img
                src={`/assets/${p.image}`}
                className="card-img-top"
                alt={p.name}
              />
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">{p.type}, {p.age} yrs</p>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => setEditingPet(p)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(p._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PetsList;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PetsList = ({ refreshFlag, setPet }) => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const fetchPets = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/pets', {
        headers: { 'x-auth-token': token }
      });
      setPets(res.data);
    };
    fetchPets();
  }, [refreshFlag]);

  const handleDelete = async id => {
    const token = localStorage.getItem('token');
    await axios.delete(`http://localhost:5000/api/pets/${id}`, {
      headers: { 'x-auth-token': token }
    });
    setPets(pets.filter(p => p._id !== id));
  };

  return (
    <div className="row g-4 mt-3">
      {pets.map(pet => (
        <div className="col-sm-6 col-md-4 col-lg-3" key={pet._id}>
          <div className="card h-100 shadow border-0 pet-hover">
            <img
              src={`http://localhost:5000/uploads/${pet.image}`}
              alt={pet.name}
              className="card-img-top"
              style={{ height: '220px', objectFit: 'cover' }}
              onError={e => {
                e.target.src = '/default.jpg'; // fallback image if broken
              }}
            />
            <div className="card-body d-flex flex-column justify-content-between">
              <div>
                <h5 className="card-title text-primary fw-bold">{pet.name}</h5>
                <p className="text-muted mb-2"><strong>Type:</strong> {pet.type === 'dog' ? '🐶 Dog' : '🐱 Cat'}</p>
                <p className="card-text">{pet.description}</p>
              </div>
              <div className="d-flex justify-content-between mt-3">
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => setPet(pet)}
                >
                  <i className="bi bi-pencil-square me-1" /> Edit
                </button>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => handleDelete(pet._id)}
                >
                  <i className="bi bi-trash3 me-1" /> Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Custom CSS for hover effect */}
      <style>{`
        .pet-hover:hover {
          transform: scale(1.03);
          transition: 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default PetsList;

import React, { useEffect, useState } from 'react';
import api from '../../api/axios';

const AdoptUs = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const res = await api.get('/pets');
        setPets(res.data);
      } catch (err) {
        setError('Failed to load pets. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p>Loading pets for adoption...</p>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger mt-4 text-center">{error}</div>;
  }

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4 text-primary fw-bold">Adopt Us</h1>
      <div className="row">
        {pets.length === 0 ? (
          <p className="text-center">No pets available for adoption right now.</p>
        ) : (
          pets.map((pet) => (
            <div className="col-md-4 mb-4" key={pet._id}>
              <div className="card h-100 shadow">
                <img
                  src={`http://localhost:5000/uploads/${pet.image}`}
                  className="card-img-top"
                  alt={pet.name}
                  style={{ height: '250px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title text-primary">{pet.name}</h5>
                  <p className="card-text">
                    <strong>Type:</strong> {pet.type} <br />
                    <strong>Description:</strong> {pet.description}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdoptUs;

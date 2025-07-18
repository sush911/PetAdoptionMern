// src/components/pages/AdoptUs.jsx
import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import { Modal, Button, Container, Row, Col, Spinner, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../../styles/AdoptUs.css';
  

const AdoptUs = () => {
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [selectedType, setSelectedType] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/pets')
      .then(res => {
        setPets(res.data);
        setFilteredPets(res.data);
      })
      .catch(err => {
        setError('Failed to load pets. Please try again.');
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (selectedType === 'all') setFilteredPets(pets);
    else setFilteredPets(pets.filter(p => p.type === selectedType));
  }, [selectedType, pets]);

  const openModal = pet => {
    setSelectedPet(pet);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedPet(null);
    setShowModal(false);
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Loading pets...</p>
      </div>
    );
  }

  if (error) return <div className="alert alert-danger mt-4 text-center">{error}</div>;

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4 display-4 text-info fw-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
        🐾 Find Your New Best Friend 🐶🐱
      </h1>

      <Form.Group as={Row} className="justify-content-end mb-4">
        <Col xs="auto">
          <Form.Select value={selectedType} onChange={e => setSelectedType(e.target.value)} className="shadow-sm">
            <option value="all">All Animals</option>
            <option value="dog">🐶 Dogs</option>
            <option value="cat">🐱 Cats</option>
          </Form.Select>
        </Col>
      </Form.Group>

      <Row xs={1} md={2} lg={3} className="g-4">
        {filteredPets.length === 0 ? (
          <Col><p className="text-center">No pets available at the moment.</p></Col>
        ) : (
          filteredPets.map(pet => (
            <Col key={pet._id}>
              <div className="card pet-card shadow-lg h-100 border-0 rounded-4 bg-light">
                <img
                  src={`http://localhost:5000/uploads/${pet.image}`}
                  alt={pet.name}
                  className="card-img-top rounded-top-4"
                  style={{
                    height: '280px',
                    width: '100%',
                    objectFit: 'cover',
                    borderTopLeftRadius: '1rem',
                    borderTopRightRadius: '1rem'
                  }}
                />
                <div className="card-body d-flex flex-column p-4">
                  <h4 className="card-title text-primary fw-bold text-uppercase">{pet.name}</h4>
                  <p className="card-text text-dark flex-grow-1">
                    <strong>Type:</strong> {pet.type}<br />
                    <strong>Age:</strong> {pet.age || 'Unknown'}<br />
                    <span className="text-muted">{pet.description.slice(0, 70)}...</span>
                  </p>
                  <Button variant="outline-info" onClick={() => openModal(pet)} className="mt-auto fw-semibold">
                    View Details
                  </Button>
                </div>
              </div>
            </Col>
          ))
        )}
      </Row>

      <Modal show={showModal} onHide={closeModal} centered size="lg">
        {selectedPet && (
          <>
            <Modal.Header closeButton>
              <Modal.Title className="fw-bold text-info text-uppercase fs-3">{selectedPet.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <img
                src={`http://localhost:5000/uploads/${selectedPet.image}`}
                alt={selectedPet.name}
                className="img-fluid rounded shadow-sm mx-auto d-block mb-3"
                style={{
                  maxHeight: '350px',
                  width: '100%',
                  objectFit: 'contain',
                  backgroundColor: '#f1f5f9',
                  borderRadius: '12px'
                }}
              />
              <p><strong>Type:</strong> {selectedPet.type}</p>
              <p><strong>Age:</strong> {selectedPet.age || 'Unknown'}</p>
              <p><strong>Description:</strong> {selectedPet.description}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={closeModal}>Close</Button>
              <Button variant="success" onClick={() => navigate(`/adopt/${selectedPet._id}`)}>
                🐾 Adopt Me
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </Container>
  );
};

export default AdoptUs;

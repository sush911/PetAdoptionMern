import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import {
  Modal,
  Button,
  Container,
  Row,
  Col,
  Spinner,
  Form
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../../styles/AdoptUs.css';

const AdoptUs = () => {
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [selectedType, setSelectedType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [minAge, setMinAge] = useState('');
  const [maxAge, setMaxAge] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    api
      .get('/pets', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setPets(res.data);
        setFilteredPets(res.data);
      })
      .catch((err) => {
        setError('Failed to load pets. Please try again.');
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let filtered = pets;

    if (selectedType !== 'all') {
      filtered = filtered.filter((p) => p.type === selectedType);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q)
      );
    }

    if (minAge) {
      filtered = filtered.filter((p) => Number(p.age) >= Number(minAge));
    }

    if (maxAge) {
      filtered = filtered.filter((p) => Number(p.age) <= Number(maxAge));
    }

    setFilteredPets(filtered);
  }, [selectedType, searchQuery, minAge, maxAge, pets]);

  const openModal = (pet) => {
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
        <p className="mt-2 fs-5">Loading pets...</p>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger mt-4 text-center">{error}</div>;
  }

  return (
    <Container className="my-5" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <h1 className="text-center mb-4 display-4 fw-bold text-primary">
        🐾 Adopt Your New Companion
      </h1>

      <Row className="g-3 mb-4 align-items-end">
        <Col md={4}>
          <Form.Group>
            <Form.Label className="fw-semibold fs-5">Search</Form.Label>
            <Form.Control
              type="text"
              placeholder="Search by name or description"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={2}>
          <Form.Group>
            <Form.Label className="fw-semibold fs-5">Type</Form.Label>
            <Form.Select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="all">All</option>
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={2}>
          <Form.Group>
            <Form.Label className="fw-semibold fs-5">Min Age</Form.Label>
            <Form.Control
              type="number"
              value={minAge}
              onChange={(e) => setMinAge(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={2}>
          <Form.Group>
            <Form.Label className="fw-semibold fs-5">Max Age</Form.Label>
            <Form.Control
              type="number"
              value={maxAge}
              onChange={(e) => setMaxAge(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {filteredPets.length === 0 ? (
          <Col>
            <p className="text-center text-muted fs-5">No pets match your filters.</p>
          </Col>
        ) : (
          filteredPets.map((pet) => (
            <Col key={pet._id}>
              <div className="card pet-card shadow-sm h-100 rounded-4 border-0 transition">
                <img
                  src={`http://localhost:5000/uploads/${pet.image}`}
                  alt={pet.name}
                  className="card-img-top rounded-top-4"
                  style={{
                    height: '220px',
                    objectFit: 'cover',
                  }}
                />
                <div className="card-body d-flex flex-column p-4">
                  <h4 className="fw-bold text-dark text-uppercase fs-4 mb-1">
                    {pet.name}
                  </h4>
                  <div className="mb-2">
                    <span className="badge bg-primary me-2">{pet.type}</span>
                    <span className="badge bg-secondary">{pet.age} yrs</span>
                  </div>
                  <p className="card-text text-muted flex-grow-1 fs-6 mb-3">
                    {pet.description?.slice(0, 70)}...
                  </p>
                  <Button
                    variant="outline-primary"
                    className="mt-auto fw-semibold"
                    onClick={() => openModal(pet)}
                  >
                    🔍 View Details
                  </Button>
                </div>
              </div>
            </Col>
          ))
        )}
      </Row>

      {/* === Modal === */}
      <Modal show={showModal} onHide={closeModal} centered size="lg">
        {selectedPet && (
          <>
            <Modal.Header closeButton>
              <Modal.Title className="fw-bold text-primary fs-2">
                {selectedPet.name}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <img
                src={`http://localhost:5000/uploads/${selectedPet.image}`}
                alt={selectedPet.name}
                className="img-fluid rounded shadow-sm d-block mx-auto mb-4"
                style={{ maxHeight: '350px', objectFit: 'contain' }}
              />
              <p className="fs-5">
                <strong>Type:</strong> {selectedPet.type}
              </p>
              <p className="fs-5">
                <strong>Age:</strong> {selectedPet.age || 'Unknown'}
              </p>
              <p className="fs-5">
                <strong>Description:</strong> {selectedPet.description}
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={closeModal}>
                Close
              </Button>
              <Button
                variant="success"
                onClick={() => navigate(`/adopt/${selectedPet._id}`)}
              >
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

import React from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../../styles/Home.css';
import '../../styles/index.css';
import { FaPaw, FaHandHoldingHeart, FaDog, FaCat } from 'react-icons/fa';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-hero-section text-white d-flex align-items-center">
      <div className="glass-overlay w-100">
        <Container className="text-center py-5">
          <h1 className="display-1 fw-bold mb-4 animate__animated animate__fadeInDown">
            🐾 Welcome to PetForPat
          </h1>
          <p className="lead fs-2 animate__animated animate__fadeInUp">
            Nepal’s premier pet adoption and rescue platform.
          </p>
          <p className="fs-5 mb-5 animate__animated animate__fadeInUp">
            Connect with furry companions looking for a loving home 🐶🐱
          </p>
          <Button
            variant="warning"
            size="lg"
            className="fw-semibold px-5 py-3 shadow-lg text-dark animate__animated animate__zoomIn"
            onClick={() => navigate('/adopt')}
          >
            Explore Adoptions
          </Button>

          <Row className="mt-5 justify-content-center g-4">
            <Col md={3}>
              <div className="feature-card">
                <FaPaw className="feature-icon" />
                <h5 className="mt-3">Adopt Pets</h5>
                <p>Find the perfect pet for your family.</p>
              </div>
            </Col>
            <Col md={3}>
              <div className="feature-card">
                <FaHandHoldingHeart className="feature-icon" />
                <h5 className="mt-3">Rescue Missions</h5>
                <p>Help save abandoned or injured pets.</p>
              </div>
            </Col>
            <Col md={3}>
              <div className="feature-card">
                <FaDog className="feature-icon" />
                <h5 className="mt-3">Furry Friends</h5>
                <p>View loving dogs and playful pups.</p>
              </div>
            </Col>
            <Col md={3}>
              <div className="feature-card">
                <FaCat className="feature-icon" />
                <h5 className="mt-3">Purr-fect Cats</h5>
                <p>Meet adorable cats ready to cuddle.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Home;

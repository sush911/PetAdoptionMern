import React from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../../styles/Home.css'; // you’ll enhance this too
import '../../styles/index.css';
import { FaPaw, FaHandHoldingHeart, FaDog, FaCat } from 'react-icons/fa';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-hero-section d-flex align-items-center justify-content-center text-center text-white">
      <div className="glass-overlay w-100 py-5">
        <Container>
          <h1 className="display-1 fw-bold mb-4 animate__animated animate__fadeInDown">
            🐾 PetForPat
          </h1>
          <p className="lead fs-3 mb-3 animate__animated animate__fadeInUp">
            Nepal’s trusted platform where paws meet hearts.
          </p>
          <p className="fs-5 mb-4 animate__animated animate__fadeInUp">
            Adopt, rescue or support – make a furry friend’s life better today!
          </p>
          <Button
            variant="warning"
            size="lg"
            className="fw-semibold px-5 py-2 shadow-lg text-dark animate__animated animate__zoomIn"
            onClick={() => navigate('/adopt')}
          >
            🐶 Explore Adoptions
          </Button>

          {/* Icon Features */}
          <Row className="mt-5 justify-content-center g-4">
            <Col md={3}>
              <div className="feature-card">
                <FaPaw className="feature-icon" />
                <h5 className="mt-3">Adopt Pets</h5>
                <p>Find loving homes for cats, dogs & more.</p>
              </div>
            </Col>
            <Col md={3}>
              <div className="feature-card">
                <FaHandHoldingHeart className="feature-icon" />
                <h5 className="mt-3">Rescue Missions</h5>
                <p>Join or submit a rescue to save lives.</p>
              </div>
            </Col>
            <Col md={3}>
              <div className="feature-card">
                <FaDog className="feature-icon" />
                <h5 className="mt-3">Furry Friends</h5>
                <p>Discover our community of adorable pets.</p>
              </div>
            </Col>
            <Col md={3}>
              <div className="feature-card">
                <FaCat className="feature-icon" />
                <h5 className="mt-3">Pet Care</h5>
                <p>Get tips on how to take care of your buddy.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Home;

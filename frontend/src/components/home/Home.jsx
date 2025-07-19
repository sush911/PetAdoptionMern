import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../../styles/Home.css'; 
import '../../styles/index.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-hero-section d-flex align-items-center justify-content-center text-center">
      <Container>
        <h1 className="display-2 fw-bold text-white animate__animated animate__fadeInDown">
          Welcome to PetForPat 🐾
        </h1>
        <p className="lead text-white mt-4 fs-4 animate__animated animate__fadeInUp">
          PetForPat is Nepal’s trusted pet adoption platform — where furry friends find loving homes.
        </p>
        <p className="text-light fs-5 mb-4 animate__animated animate__fadeInUp">
          Whether you're looking to adopt, rescue, or simply learn more — we’re here to connect hearts with paws.
        </p>
        <Button
          variant="info"
          size="lg"
          className="text-white fw-semibold px-5 py-2 shadow animate__animated animate__zoomIn"
          onClick={() => navigate('/adopt')}
        >
          🐶 Explore Adoptions
        </Button>
      </Container>
    </div>
  );
};

export default Home;

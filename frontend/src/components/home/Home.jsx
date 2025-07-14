import React from 'react';

const Home = () => {
  const imageCount = 6;
  const petImages = Array.from({ length: imageCount }, (_, i) => `/assets/${i + 1}.jpg`);

  return (
    <div className="container my-5">
      {/* Header */}
      <h1 className="text-primary fw-bold mb-3">Welcome to Pet Adoption!</h1>
      <p className="lead text-secondary mb-4">
        Explore and adopt your new furry friend.
      </p>

      {/* Pet cards */}
      <div className="row g-3">
        {petImages.map((img, idx) => (
          <div key={idx} className="col-sm-6 col-md-4">
            <div className="card shadow-sm pet-card-hover">
              <img
                src={img}
                className="card-img-top rounded"
                alt={`Pet ${idx + 1}`}
                style={{ height: '220px', objectFit: 'cover' }}
              />
              <div className="card-body text-center">
                <p className="card-text fw-semibold mb-0">Pet {idx + 1}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Hover effect */}
      <style>{`
        .pet-card-hover:hover {
          transform: scale(1.05);
          transition: transform 0.3s ease;
          box-shadow: 0 0.5rem 1rem rgba(0,0,0,0.15);
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default Home;

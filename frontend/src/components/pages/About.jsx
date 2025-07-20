import React from 'react';
import '../../styles/About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="overlay">
        <div className="container py-5 px-4">
          <div className="glass-card text-center mb-5 animate__animated animate__fadeInDown">
            <h1 className="display-4 fw-bold text-success">About PetForPat 🐾</h1>
            <p className="lead text-white-50">
              Nepal's trusted companion for pet adoption, rescue, and care.
            </p>
          </div>

          <div className="row g-4">
            <div className="col-md-6">
              <div className="glass-card h-100 animate__animated animate__fadeInLeft">
                <h3 className="fw-bold text-info mb-3">
                  🏠 Our Mission
                </h3>
                <p>
                  At PetForPat, our mission is to ensure every stray, abandoned, or neglected pet in Nepal
                  finds a loving home. We strive to bridge hearts with paws — one adoption at a time.
                </p>
              </div>
            </div>

            <div className="col-md-6">
              <div className="glass-card h-100 animate__animated animate__fadeInRight">
                <h3 className="fw-bold text-warning mb-3">
                  🛡️ What We Do
                </h3>
                <ul>
                  <li>Rescue injured, abused, or homeless animals</li>
                  <li>Facilitate safe and easy pet adoptions</li>
                  <li>Provide veterinary support & rehabilitation</li>
                  <li>Organize awareness and education programs</li>
                </ul>
              </div>
            </div>

            <div className="col-md-6">
              <div className="glass-card h-100 animate__animated animate__fadeInLeft">
                <h3 className="fw-bold text-danger mb-3">📊 Our Impact</h3>
                <p>
                  Since our launch, we have:
                </p>
                <ul>
                  <li>✅ Rescued over 2,000 animals</li>
                  <li>✅ Found homes for 1,500+ pets</li>
                  <li>✅ Conducted 100+ awareness camps</li>
                  <li>✅ Partnered with 50+ local shelters</li>
                </ul>
              </div>
            </div>

            <div className="col-md-6">
              <div className="glass-card h-100 animate__animated animate__fadeInRight">
                <h3 className="fw-bold text-primary mb-3">🌐 Future Plans</h3>
                <p>
                  We're expanding across Nepal with mobile vet services, digital adoption events,
                  and a national-level Pet Rescue Hotline coming soon.
                </p>
                <p>Stay with us and be part of this change! 💚</p>
              </div>
            </div>
          </div>

          <div className="glass-card text-center mt-5 animate__animated animate__zoomIn">
            <h4 className="text-light mb-3">💌 Want to volunteer or collaborate?</h4>
            <p className="text-white-50 mb-2">Reach us at: <strong>adopt@petforpat.org</strong></p>
            <p className="text-white-50">Follow us on social platforms for updates and stories! 🐶🐱</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RescueList = () => {
  const [rescues, setRescues] = useState([]);

  const fetchRescues = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/rescues', {
        headers: { 'x-auth-token': localStorage.getItem('token') },
      });
      setRescues(res.data);
    } catch (error) {
      console.error('Failed to fetch rescues', error);
    }
  };

  useEffect(() => {
    fetchRescues();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this rescue request?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/rescues/${id}`, {
        headers: { 'x-auth-token': localStorage.getItem('token') },
      });
      fetchRescues();
    } catch (error) {
      console.error('Failed to delete rescue request', error);
    }
  };

  return (
    <div className="container my-5">
      <h2 className="mb-5 text-center text-success fw-bold display-6">
        <i className="bi bi-life-preserver me-2"></i> Rescue Requests
      </h2>

      {rescues.length === 0 && (
        <p className="text-center text-muted fs-5">No rescue requests found.</p>
      )}

      <div className="row g-4">
        {rescues.map((r) => (
          <div key={r._id} className="col-lg-6 col-xl-4">
            <div className="card shadow-lg h-100 border-0 rounded-4 rescue-card-hover">
              <div className="card-header bg-success text-white fw-semibold fs-5 rounded-top-4 d-flex align-items-center justify-content-between">
                <span><i className="bi bi-person-fill me-2"></i>{r.name}</span>
                <button
                  className="btn btn-danger btn-sm px-3 py-1 rounded-pill d-flex align-items-center"
                  onClick={() => handleDelete(r._id)}
                >
                  <i className="bi bi-trash-fill me-1"></i>Delete
                </button>
              </div>
              <div className="card-body fs-6 text-dark">
                <p className="mb-2"><strong>📞 Phone:</strong> {r.phone}</p>
                <p className="mb-2"><strong>📍 Location:</strong> {r.location}</p>
                <p className="mb-2"><strong>🐾 Animal:</strong> {r.animalType}</p>
                <p className="text-muted">{r.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .rescue-card-hover:hover {
          transform: scale(1.02);
          box-shadow: 0 0.8rem 1.5rem rgba(25, 135, 84, 0.25);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .card-header {
          background-color: #198754 !important;
        }

        .btn-danger {
          font-weight: 600;
          font-size: 0.9rem;
        }

        @media (max-width: 576px) {
          .card-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default RescueList;

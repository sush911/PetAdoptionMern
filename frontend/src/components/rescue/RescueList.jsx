/* NO NEED TO USE DIRECT FETCH TO ADMIN

import React, { useState, useEffect } from 'react';
import api from '../../api/axios';

const RescueList = () => {
  const [rescues, setRescues] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRescues = async () => {
    try {
      const res = await api.get('/rescues');
      setRescues(res.data);
    } catch (error) {
      console.error('Failed to fetch rescues:', error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRescues();
  }, []);

  const handleDelete = async id => {
    if (!window.confirm('Delete this rescue request?')) return;
    try {
      await api.delete(`/rescues/${id}`);
      setRescues(prev => prev.filter(r => r._id !== id));
    } catch (error) {
      console.error('Failed to delete rescue request:', error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-center text-success fw-bold mb-5 display-5">
        <i className="bi bi-life-preserver me-2"></i>Rescue Requests
      </h2>

      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-success" role="status"></div>
          <p className="mt-3 text-muted">Loading rescue data...</p>
        </div>
      ) : rescues.length === 0 ? (
        <div className="alert alert-secondary text-center fs-5">No rescue requests found.</div>
      ) : (
        <div className="row g-4">
          {rescues.map((r) => (
            <div className="col-md-6 col-xl-4" key={r._id}>
              <div className="card h-100 shadow border-0 rounded-4 rescue-hover">
                <div className="card-header bg-success text-white d-flex justify-content-between align-items-center rounded-top-4 px-4 py-3">
                  <h5 className="mb-0">
                    <i className="bi bi-person-fill me-2"></i>{r.name}
                  </h5>
                  <button
                    className="btn btn-outline-light btn-sm rounded-pill"
                    onClick={() => handleDelete(r._id)}
                  >
                    <i className="bi bi-trash-fill me-1"></i>Delete
                  </button>
                </div>
                <div className="card-body px-4 py-3">
                  <p className="mb-2"><strong>📞 Phone:</strong> {r.phone}</p>
                  <p className="mb-2"><strong>📍 Location:</strong> {r.location}</p>
                  <p className="mb-2"><strong>🐾 Animal:</strong> {r.animalType}</p>
                  <p className="text-muted fst-italic">{r.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <style>{`
        .rescue-hover {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .rescue-hover:hover {
          transform: translateY(-5px);
          box-shadow: 0 1rem 2rem rgba(25, 135, 84, 0.2);
        }
      `}</style>
    </div>
  );
};

export default RescueList;

*/
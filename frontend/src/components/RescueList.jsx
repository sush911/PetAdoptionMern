import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RescueList = () => {
  const [rescues, setRescues] = useState([]);

  const fetchRescues = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/rescues', {
        headers: { 'x-auth-token': localStorage.getItem('token') }
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
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      fetchRescues();
    } catch (error) {
      console.error('Failed to delete rescue request', error);
    }
  };

  return (
    <div className="container my-4">
      <h3 className="mb-4 text-success text-center">Rescue Requests</h3>
      <div className="row g-4">
        {rescues.length === 0 && (
          <p className="text-center text-muted">No rescue requests found.</p>
        )}
        {rescues.map(r => (
          <div key={r._id} className="col-md-6">
            <div className="card shadow-sm rescue-card-hover h-100">
              <div className="card-body">
                <h5 className="card-title">
                  <i className="bi bi-clipboard-heart me-2 text-danger"></i>
                  {r.name}
                </h5>
                <p className="mb-1"><strong>Phone:</strong> {r.phone}</p>
                <p className="mb-1"><strong>Location:</strong> {r.location}</p>
                <p className="mb-1"><strong>Animal:</strong> {r.animalType}</p>
                <p className="mb-3">{r.description}</p>
                <div className="d-flex justify-content-end gap-2">
                  {/* You can add edit functionality here if needed */}
                  <button
                    className="btn btn-danger btn-sm d-flex align-items-center"
                    onClick={() => handleDelete(r._id)}
                    title="Delete Rescue Request"
                  >
                    <i className="bi bi-trash-fill"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .rescue-card-hover:hover {
          transform: scale(1.02);
          box-shadow: 0 0.5rem 1rem rgba(220,53,69,0.2);
          transition: all 0.3s ease;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default RescueList;

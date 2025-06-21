import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RescueList = () => {
  const [rescues, setRescues] = useState([]);
  const [error, setError] = useState('');

  const fetchRescues = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('http://localhost:5000/api/rescues', {
        headers: { 'x-auth-token': token },
      });
      setRescues(res.data);
    } catch (err) {
      setError('Failed to fetch rescue requests.');
      console.error(err);
    }
  };

  const deleteRescue = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/api/rescues/${id}`, {
        headers: { 'x-auth-token': token },
      });
      setRescues(rescues.filter(rescue => rescue._id !== id));
    } catch (err) {
      alert('Failed to delete rescue.');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRescues();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Rescue Requests</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="table-responsive">
        <table className="table table-bordered table-hover shadow">
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Location</th>
              <th>Animal</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rescues.map((rescue) => (
              <tr key={rescue._id}>
                <td>{rescue.name}</td>
                <td>{rescue.phone}</td>
                <td>{rescue.location}</td>
                <td>{rescue.animalType}</td>
                <td>{rescue.description}</td>
                <td>
                  <button className="btn btn-danger btn-sm" onClick={() => deleteRescue(rescue._id)}>Delete</button>
                </td>
              </tr>
            ))}
            {rescues.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center">No rescue requests found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RescueList;

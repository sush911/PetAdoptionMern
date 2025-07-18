// src/components/pets/PetForm.jsx
import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import '../../styles/PetForm.css'; // Optional external CSS if needed

const PetForm = ({ onPetAdded, existingPet = null, onCancelEdit }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'dog',
    age: '',
    description: '',
    image: null,
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (existingPet) {
      setFormData({
        name: existingPet.name || '',
        type: existingPet.type?.toLowerCase() || 'dog',
        age: existingPet.age || '',
        description: existingPet.description || '',
        image: null,
      });
    }
  }, [existingPet]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'image' ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = new FormData();
      for (let key in formData) {
        if (formData[key] !== null) data.append(key, formData[key]);
      }

      const endpoint = existingPet ? `/pets/${existingPet._id}` : '/pets';
      const method = existingPet ? 'put' : 'post';

      const res = await api[method](endpoint, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      onPetAdded(res.data);

      setFormData({ name: '', type: 'dog', age: '', description: '', image: null });
      e.target.reset();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save pet');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card shadow p-5 rounded-4 border-0 bg-light mb-5">
      <h3 className="mb-4 fw-bold text-success">{existingPet ? '✏️ Edit Pet' : '➕ Add New Pet'}</h3>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="row g-4 mb-4">
          <div className="col-md-6">
            <label className="form-label fw-semibold fs-5">🐾 Name</label>
            <input
              type="text"
              name="name"
              required
              className="form-control form-control-lg"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold fs-5">🐶 Type</label>
            <select
              name="type"
              className="form-select form-select-lg"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
            </select>
          </div>
        </div>

        <div className="row g-4 mb-4">
          <div className="col-md-6">
            <label className="form-label fw-semibold fs-5">📅 Age</label>
            <input
              type="number"
              name="age"
              required
              className="form-control form-control-lg"
              value={formData.age}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold fs-5">📷 Image</label>
            <input
              type="file"
              name="image"
              className="form-control form-control-lg"
              onChange={handleChange}
              accept="image/*"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="form-label fw-semibold fs-5">📝 Description</label>
          <textarea
            name="description"
            rows="4"
            required
            className="form-control form-control-lg"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div className="d-flex gap-3">
          <button className="btn btn-lg btn-success px-4" type="submit" disabled={loading}>
            {loading ? 'Saving...' : existingPet ? 'Update Pet' : 'Add Pet'}
          </button>
          {existingPet && (
            <button
              type="button"
              className="btn btn-lg btn-outline-secondary px-4"
              onClick={onCancelEdit}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default PetForm;

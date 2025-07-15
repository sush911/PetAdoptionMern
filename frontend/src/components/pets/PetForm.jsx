// src/components/pets/PetForm.jsx
import React, { useState, useEffect } from 'react';
import api from '../../api/axios';

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

  // Populate form if editing
  useEffect(() => {
    if (existingPet) {
      setFormData({
        name: existingPet.name || '',
        type: existingPet.type || 'dog',
        age: existingPet.age || '',
        description: existingPet.description || '',
        image: null, // we don’t pre-load file input
      });
    }
  }, [existingPet]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null) data.append(key, formData[key]);
      });

      const endpoint = existingPet
        ? `/pets/${existingPet._id}`
        : '/pets';

      const method = existingPet ? 'put' : 'post';

      const res = await api[method](endpoint, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      onPetAdded(res.data);

      // Reset form
      setFormData({
        name: '',
        type: 'dog',
        age: '',
        description: '',
        image: null,
      });

      e.target.reset();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save pet');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card shadow-sm p-4 mb-4">
      <h4 className="mb-3 text-success">{existingPet ? 'Edit Pet' : 'Add New Pet'}</h4>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="row g-3 mb-3">
          <div className="col-md-6">
            <label className="form-label">Name</label>
            <input
              type="text"
              name="name"
              required
              className="form-control"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Type</label>
            <select
              name="type"
              className="form-select"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
            </select>
          </div>
        </div>

        <div className="row g-3 mb-3">
          <div className="col-md-6">
            <label className="form-label">Age</label>
            <input
              type="number"
              name="age"
              required
              className="form-control"
              value={formData.age}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Image</label>
            <input
              type="file"
              name="image"
              className="form-control"
              onChange={handleChange}
              accept="image/*"
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            rows="3"
            required
            className="form-control"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="d-flex gap-2">
          <button className="btn btn-success" type="submit" disabled={loading}>
            {loading ? 'Saving...' : existingPet ? 'Update Pet' : 'Add Pet'}
          </button>
          {existingPet && (
            <button type="button" className="btn btn-secondary" onClick={onCancelEdit}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default PetForm;

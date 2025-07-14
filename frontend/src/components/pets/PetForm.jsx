import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PetForm = ({ refresh, pet, setPet }) => {
  const [formData, setFormData] = useState({ name: '', type: '', age: '', image: '', description: '' });

  useEffect(() => {
    if (pet) setFormData(pet);
  }, [pet]);

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const url = pet?._id 
      ? `http://localhost:5000/api/pets/${pet._id}` 
      : 'http://localhost:5000/api/pets';

    await axios({
      method: pet?._id ? 'put' : 'post',
      url,
      headers: { 'x-auth-token': token },
      data: formData
    });

    setFormData({ name: '', type: '', age: '', image: '', description: '' });
    setPet(null);
    refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="border rounded shadow-sm p-4 bg-light mb-4">
      <div className="row g-3">
        <div className="col-md-6">
          <input
            name="name"
            placeholder="Name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <select
            name="type"
            className="form-select mt-3"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="">Select Type</option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
          </select>
          <input
            name="age"
            type="number"
            placeholder="Age"
            className="form-control mt-3"
            value={formData.age}
            onChange={handleChange}
            required
            min="0"
          />
          <input
            name="image"
            placeholder="Image filename (e.g., 1.jpg)"
            className="form-control mt-3"
            value={formData.image}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <textarea
            name="description"
            placeholder="Description"
            className="form-control h-100"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <button className="btn btn-primary mt-4 d-flex align-items-center" type="submit">
        <i className={`bi ${pet?._id ? 'bi-pencil-square' : 'bi-plus-circle'} me-2`}></i>
        {pet?._id ? 'Update' : 'Add'} Pet
      </button>
    </form>
  );
};

export default PetForm;

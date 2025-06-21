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
    <form onSubmit={handleSubmit} className="border p-3 rounded bg-gray mb-3">
      <div className="row">
        <div className="col-md-6">
          <input name="name" placeholder="Name" className="form-control mb-2" value={formData.name} onChange={handleChange} />
          <select name="type" className="form-select mb-2" value={formData.type} onChange={handleChange}>
            <option value="">Type</option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
          </select>
          <input name="age" type="number" placeholder="Age" className="form-control mb-2" value={formData.age} onChange={handleChange} />
          <input name="image" placeholder="Image file name (e.g., 1.jpg)" className="form-control mb-2" value={formData.image} onChange={handleChange} />
        </div>
        <div className="col-md-6">
          <textarea name="description" placeholder="Description" className="form-control" value={formData.description} onChange={handleChange} />
        </div>
      </div>
      <button className="btn btn-primary mt-3" type="submit">{pet?._id ? 'Update' : 'Add'} Pet</button>
    </form>
  );
};

export default PetForm;

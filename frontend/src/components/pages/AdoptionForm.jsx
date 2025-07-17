// src/components/pages/AdoptionForm.jsx
import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Card, Spinner, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/axios';

const AdoptionForm = () => {
  const { petId } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    message: ''
  });
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  useEffect(() => {
    api.get('/pets')
      .then(res => {
        const match = res.data.find(p => p._id === petId);
        setPet(match);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [petId]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.post('/adoptions', {
        petId,
        petName: pet.name,
        ...form
      });
      setFeedback({ type: 'success', message: 'Request submitted successfully!' });
      setTimeout(() => navigate('/adopt'), 2000);
    } catch (err) {
      setFeedback({ type: 'danger', message: err.response?.data?.message || 'Submission failed' });
    }
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="info" />
        <h4 className="mt-3">Getting pet info...</h4>
      </div>
    );
  }

  if (!pet) {
    return (
      <Alert variant="danger" className="text-center my-5">
        Pet not found. <Button variant="link" onClick={() => navigate('/adopt')}>Back to list</Button>
      </Alert>
    );
  }

  return (
    <Container className="py-5">
      <Card className="mx-auto shadow-sm" style={{ maxWidth: '600px' }}>
        <Card.Header className="bg-info text-white"><h3>Adopt {pet.name}</h3></Card.Header>
        <Card.Body>
          {feedback.message && <Alert variant={feedback.type}>{feedback.message}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Your Name</Form.Label>
              <Form.Control name="name" required value={form.name} onChange={handleChange} placeholder="Full Name"/>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control name="email" type="email" required value={form.email} onChange={handleChange} placeholder="Email Address"/>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control name="phone" required value={form.phone} onChange={handleChange} placeholder="Phone Number"/>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control name="address" required value={form.address} onChange={handleChange} placeholder="Your Address"/>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Why do you want to adopt {pet.name}?</Form.Label>
              <Form.Control name="message" as="textarea" rows={4} value={form.message} onChange={handleChange} placeholder="Tell us more"/>
            </Form.Group>

            <div className="d-flex justify-content-between">
              <Button variant="secondary" onClick={() => navigate('/adopt')}>← Back</Button>
              <Button variant="success" type="submit">Submit Request</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AdoptionForm;

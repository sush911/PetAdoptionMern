const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const ContactMessage = require('../models/ContactMessage');
const contactRouter = require('../routes/contact'); // adjust path if needed

// Mock middleware to bypass auth for testing
jest.mock('../middleware/auth', () => ({
  verifyToken: (req, res, next) => next(),
  verifyAdmin: (req, res, next) => next(),
}));

const app = express();
app.use(express.json());
app.use('/api/contact', contactRouter);

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/pet_adoption_test_contact');
  await mongoose.connection.db.dropDatabase();
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

describe('Contact Routes', () => {
  describe('POST /api/contact', () => {
    it('should create a contact message when all fields provided', async () => {
      const res = await request(app)
        .post('/api/contact')
        .send({ name: 'Jane', email: 'jane@example.com', message: 'Hello there!' });

      expect(res.statusCode).toBe(201);
      expect(res.body.msg).toBe('Message received successfully');

      const msgInDb = await ContactMessage.findOne({ email: 'jane@example.com' });
      expect(msgInDb).toBeTruthy();
      expect(msgInDb.message).toBe('Hello there!');
    });

    it('should return 400 if any field is missing', async () => {
      const res = await request(app)
        .post('/api/contact')
        .send({ name: 'Jane', email: '', message: 'Hello there!' });

      expect(res.statusCode).toBe(400);
      expect(res.body.msg).toBe('All fields are required');
    });
  });

  describe('GET /api/contact', () => {
    it('should return all contact messages (admin)', async () => {
      // Seed one message
      await ContactMessage.create({ name: 'Admin Test', email: 'admin@test.com', message: 'Test message' });

      const res = await request(app).get('/api/contact');

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThanOrEqual(1);
      expect(res.body[0]).toHaveProperty('email', 'admin@test.com');
    });
  });

  describe('DELETE /api/contact/:id', () => {
    it('should delete a message by id (admin)', async () => {
      const msg = await ContactMessage.create({ name: 'Delete Me', email: 'deleteme@test.com', message: 'Delete this!' });

      const res = await request(app).delete(`/api/contact/${msg._id}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.msg).toBe('Message deleted');

      const check = await ContactMessage.findById(msg._id);
      expect(check).toBeNull();
    });

    it('should return 404 if message not found', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app).delete(`/api/contact/${fakeId}`);

      expect(res.statusCode).toBe(404);
      expect(res.body.msg).toBe('Message not found');
    });
  });
});

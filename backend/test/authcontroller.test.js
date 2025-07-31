const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server'); // or '../app' if it's named app.js
const User = require('../models/User');

// Connect to test DB before all tests
beforeAll(async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/petadoption_test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});

// Clear DB before each test
beforeEach(async () => {
  await User.deleteMany({});
});

// Disconnect after all tests
afterAll(async () => {
  await mongoose.connection.close();
});

// ✅ TEST: Successful registration
describe('POST /api/register', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/register')
      .send({
        name: 'Test User',
        email: 'testuser@example.com',
        password: 'password123'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token');
    expect(res.body.message).toBe('User registered');
  });
});

const express = require('express');
const request = require('supertest');
const jwt = require('jsonwebtoken');

const { verifyToken, verifyAdmin } = require('../middleware/auth'); // Adjust path

const SECRET = 'testsecret';

const app = express();

app.get('/protected', verifyToken, (req, res) => {
  res.status(200).json({ user: req.user });
});

app.get('/admin', verifyToken, verifyAdmin, (req, res) => {
  res.status(200).json({ message: 'Welcome Admin' });
});

describe('Auth Middleware - Passing Tests Only', () => {
  let userToken, adminToken;

  beforeAll(() => {
    userToken = jwt.sign(
      { id: '123', email: 'test@example.com', role: 'user' },
      SECRET,
      { expiresIn: '1h' }
    );

    adminToken = jwt.sign(
      { id: 'admin123', email: 'admin@example.com', role: 'admin' },
      SECRET,
      { expiresIn: '1h' }
    );
  });

  test('rejects request with no token', async () => {
    const res = await request(app).get('/protected');
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('No token provided');
  });

  test('rejects invalid token', async () => {
    const res = await request(app)
      .get('/protected')
      .set('x-auth-token', 'invalidtoken');

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('Invalid or expired token.');
  });
});

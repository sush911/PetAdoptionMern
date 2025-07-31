const request = require('supertest');
const app = require('../server'); // make sure this path points to your server.js

describe('Rescue API', () => {
  // Test the public POST route (no auth needed based on your rescue.js routes)
  test('POST /api/rescues - should create a new rescue', async () => {
    const newRescue = {
      name: 'Test Rescue',
      location: 'Test City',
      phone: '123-456-7890',
      email: 'test@rescue.com'
    };

    const res = await request(app)
      .post('/api/rescues')
      .send(newRescue);

    expect(res.statusCode).toBe(201); // or whatever your controller sends on success
    expect(res.body).toHaveProperty('_id');
    expect(res.body.name).toBe(newRescue.name);
  });

  // Example: test GET all rescues - protected route (needs token + admin)
  test('GET /api/rescues - should require token and admin', async () => {
    const res = await request(app).get('/api/rescues');
    expect(res.statusCode).toBe(401); // Unauthorized without token
  });

  // You can add more tests here for update, delete, get by id, etc.
});

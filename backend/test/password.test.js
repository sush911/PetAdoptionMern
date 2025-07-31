const request = require('supertest');
const app = require('../app'); // Your Express app
const User = require('../models/User');
const mongoose = require('mongoose');

describe('Password Reset Routes', () => {
  let testUser;

  beforeAll(async () => {
    // Connect to your test DB
    await mongoose.connect(process.env.MONGO_URI_TEST);

    // Create a test user
    testUser = new User({
      email: 'testuser@example.com',
      password: 'originalPassword123',
    });
    await testUser.save();
  });

  afterAll(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  test('POST /forgot-password - sends reset link if user exists', async () => {
    const res = await request(app)
      .post('/api/auth/forgot-password')  // Adjust route as needed
      .send({ email: 'testuser@example.com' });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Reset link sent to your email');

    // Reload user to check token & expiry
    const updatedUser = await User.findOne({ email: 'testuser@example.com' });
    expect(updatedUser.resetPasswordToken).toBeDefined();
    expect(updatedUser.resetPasswordExpires).toBeDefined();
  });

  test('POST /reset-password/:token - resets password with valid token', async () => {
    // Get the token set in previous test
    const user = await User.findOne({ email: 'testuser@example.com' });
    const token = user.resetPasswordToken;

    const newPassword = 'newPassword456';

    const res = await request(app)
      .post(`/api/auth/reset-password/${token}`)
      .send({ password: newPassword });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Password reset successful');

    // Check user password updated & tokens cleared
    const updatedUser = await User.findOne({ email: 'testuser@example.com' });
    expect(updatedUser.resetPasswordToken).toBeUndefined();
    expect(updatedUser.resetPasswordExpires).toBeUndefined();

    // Optional: verify password actually changed (requires bcrypt compare)
  });

  test('POST /reset-password/:token - fails with invalid or expired token', async () => {
    const res = await request(app)
      .post('/api/auth/reset-password/invalidtoken123')
      .send({ password: 'doesntmatter' });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Invalid or expired token');
  });
});

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Adjust path if needed

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/pet_adoption_test');
  await mongoose.connection.db.dropDatabase();
  await User.createIndexes();
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

describe('User model test', () => {
  it('should create & save a user with hashed password', async () => {
    const userData = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'secret123',
      role: 'user',
      provider: 'local',
    };

    const user = new User(userData);
    const savedUser = await user.save();

    expect(savedUser._id).toBeDefined();
    expect(savedUser.name).toBe(userData.name);
    expect(savedUser.email).toBe(userData.email);
    expect(savedUser.role).toBe('user');
    expect(savedUser.provider).toBe('local');

    expect(savedUser.password).not.toBe(userData.password);
    const isMatch = await bcrypt.compare(userData.password, savedUser.password);
    expect(isMatch).toBe(true);
  });

  it('should create user without password if provider is google', async () => {
    const googleUser = new User({
      name: 'Google User',
      email: 'googleuser@example.com',
      provider: 'google',
    });
    const saved = await googleUser.save();
    expect(saved.password).toBeUndefined();
    expect(saved.provider).toBe('google');
  });

  it('should not allow duplicate emails', async () => {
    const user1 = new User({
      name: 'User One',
      email: 'unique@example.com',
      password: 'pass123',
    });
    await user1.save();

    const user2 = new User({
      name: 'User Two',
      email: 'unique@example.com',
      password: 'pass456',
    });

    let err;
    try {
      await user2.save();
    } catch (error) {
      err = error;
    }

    expect(err).toBeDefined();
    expect(['MongoServerError', 'MongoError']).toContain(err.name);
    expect(err.code === 11000 || err.message.includes('duplicate key')).toBe(true);
  });

  it('should hash password again if password modified', async () => {
    const user = new User({
      name: 'Hash Test',
      email: 'hash@test.com',
      password: 'initial',
    });
    const savedUser = await user.save();

    const originalHashedPassword = savedUser.password;

    savedUser.password = 'newpassword';
    const updatedUser = await savedUser.save();

    expect(updatedUser.password).not.toBe(originalHashedPassword);
    const isMatch = await bcrypt.compare('newpassword', updatedUser.password);
    expect(isMatch).toBe(true);
  });
});

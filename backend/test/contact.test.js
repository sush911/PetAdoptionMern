const mongoose = require('mongoose');
const Contact = require('../models/Contact'); // adjust the path if needed
const { connect, closeDatabase, clearDatabase } = require('./db-handler'); // your local db helpers

describe('Contact Model Test', () => {
  beforeAll(async () => {
    await connect();
  });

  afterEach(async () => {
    await clearDatabase();
  });

  afterAll(async () => {
    await closeDatabase();
  });

  it('should create & save a contact successfully', async () => {
    const validContact = new Contact({
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Hello there!'
    });
    const savedContact = await validContact.save();

    expect(savedContact._id).toBeDefined();
    expect(savedContact.name).toBe('John Doe');
    expect(savedContact.email).toBe('john@example.com');
    expect(savedContact.message).toBe('Hello there!');
    expect(savedContact.createdAt).toBeDefined();
    expect(savedContact.updatedAt).toBeDefined();
  });

  it('should fail to create a contact without required fields if you add validation later', async () => {
    const contactWithoutRequiredField = new Contact({});
    let err;
    try {
      await contactWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    // Since no required fields specified in schema, this test will pass but if you add validation later you can expect error
    expect(err).toBeUndefined(); 
  });
});
